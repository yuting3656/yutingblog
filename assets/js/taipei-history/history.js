// 台北械鬥史 3D 導覽：純 three.js 台北盆地（無模型檔）。資料在 data.js。
// 盆地地形＝噪聲＋幾座高斯山；河流沿折線往下挖、露出水面；聚落＝小房子群＋廟；年表每一站鏡頭飛過去，
// 打仗畫成弧線＋沿地面走的小人，被燒的庄冒火冒煙，守住的地方有脈衝圈。效能：地形一張 mesh、樹 InstancedMesh、需要時才 render。
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { GROUP, PLACES, RIVERS, HILLS, EVENTS } from "./data.js?v=1";

const S = 3.0; // 世界單位／公里
const LNG0 = 121.505, LAT0 = 25.06;
const KM_LNG = 111 * Math.cos((25 * Math.PI) / 180), KM_LAT = 111;
export const toWorld = (lng, lat) => [(lng - LNG0) * KM_LNG * S, -(lat - LAT0) * KM_LAT * S];
const WATER_Y = -0.42;
const TERRAIN = 150;

const DAYCYCLE = {
  dawn: { top: 0xf2b58a, horizon: 0xfbe3cf, sun: 0xffc9a0, sunI: 1.4, hemiSky: 0xffd9c2, hemiGround: 0x8a7a66, fog: 0xf6dcc8, lamp: 0.5, water: 0x7a9bb3 },
  day: { top: 0x9fd0ec, horizon: 0xf4f1e8, sun: 0xfff1de, sunI: 2.6, hemiSky: 0xeef6fa, hemiGround: 0x8f8270, fog: 0xeef0e4, lamp: 0, water: 0x6fa9b8 },
  dusk: { top: 0xd97b63, horizon: 0xf7c59f, sun: 0xffb070, sunI: 1.2, hemiSky: 0xf2b58a, hemiGround: 0x5a4a44, fog: 0xe8b7a0, lamp: 0.8, water: 0x5a6f8c },
  night: { top: 0x151a33, horizon: 0x2b3458, sun: 0x8fa6d9, sunI: 0.35, hemiSky: 0x3b4670, hemiGround: 0x1d2130, fog: 0x1b2140, lamp: 1.0, water: 0x1c2b45 },
};
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mulberry = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hex6 = (n) => `#${n.toString(16).padStart(6, "0")}`;

// 點到折線的距離（世界座標）
const distToPolyline = (x, z, pts) => {
  let best = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
    const dx = bx - ax, dz = bz - az;
    const L2 = dx * dx + dz * dz || 1;
    let t = ((x - ax) * dx + (z - az) * dz) / L2; t = Math.max(0, Math.min(1, t));
    const px = ax + dx * t, pz = az + dz * t;
    best = Math.min(best, Math.hypot(x - px, z - pz));
  }
  return best;
};

export class HistoryScene {
  constructor(container) {
    this.container = container;
    this.dirty = true; this.fly = null; this.labels = []; this.lampGlow = [];
    this.reducedMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency || 8) <= 4 || /Mobi|Android/i.test(navigator.userAgent);
    this.weak = weak; this.shadows = !weak;
    const renderer = new THREE.WebGLRenderer({ antialias: !weak, powerPreference: "high-performance" });
    renderer.setPixelRatio(weak ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = this.shadows; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement); this.renderer = renderer;
    this.labelEl = document.createElement("div"); this.labelEl.className = "tph-labels"; container.appendChild(this.labelEl);
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(DAYCYCLE.day.fog, 90, 260);
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.3, 700);
    const controls = new OrbitControls(this.camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.maxPolarAngle = THREE.MathUtils.degToRad(82);
    controls.minDistance = 3; controls.maxDistance = 230;
    controls.addEventListener("change", () => this.requestRender());
    controls.addEventListener("start", () => { this.stopTour(); });
    this.controls = controls;
    this.buildEnvironment();
    this.buildTerrain();
    this.buildPlaces();
    this.buildWalkers();
    this.fxGroup = new THREE.Group(); this.scene.add(this.fxGroup);
    this.fires = []; this.marchers = []; this.pulses = [];
    this.bindPointer();
    this.setDay("day", true);
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(container);
    this.resize();
    this.home(true);
    this.setEvent(0, true);
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  // ---------- 天空、光、水、雲 ----------
  buildEnvironment() {
    const { scene } = this;
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: { uTop: { value: new THREE.Color(DAYCYCLE.day.top) }, uHorizon: { value: new THREE.Color(DAYCYCLE.day.horizon) } },
      vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 uTop; uniform vec3 uHorizon; varying vec3 vP; void main(){ float h = clamp(normalize(vP).y * 1.6 + 0.15, 0.0, 1.0); gl_FragColor = vec4(mix(uHorizon, uTop, pow(h, 0.8)), 1.0); }`,
      side: THREE.BackSide, depthWrite: false, fog: false,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(400, 24, 12), this.skyMat));
    this.hemi = new THREE.HemisphereLight(0xdff3ff, 0x7a8f6a, 0.9); scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xfff2d8, 2.2); this.sun.position.set(40, 70, 30); this.sun.castShadow = this.shadows;
    if (this.shadows) { this.sun.shadow.mapSize.set(2048, 2048); Object.assign(this.sun.shadow.camera, { left: -70, right: 70, top: 70, bottom: -70, near: 1, far: 220 }); this.sun.shadow.bias = -0.0005; }
    scene.add(this.sun);
    const fill = new THREE.DirectionalLight(0xbcd6ff, 0.45); fill.position.set(-30, 20, -30); scene.add(fill);
    this.waterMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(DAYCYCLE.day.water) }, uFog: { value: new THREE.Color(DAYCYCLE.day.fog) } },
      vertexShader: `varying vec2 vUv; varying float vD; void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position,1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform float uTime; uniform vec3 uColor; uniform vec3 uFog; varying vec2 vUv; varying float vD;
        void main(){ vec2 p = vUv * 260.0; float w = sin(p.x * 0.9 + uTime * 0.6) * sin(p.y * 0.7 - uTime * 0.4); float band = smoothstep(0.86, 0.97, w) * 0.2; vec3 c = uColor + band; float f = clamp((vD - 90.0) / 170.0, 0.0, 1.0); gl_FragColor = vec4(mix(c, uFog, f), 1.0); }`,
      fog: false,
    });
    const water = new THREE.Mesh(new THREE.CircleGeometry(380, 48), this.waterMat);
    water.rotation.x = -Math.PI / 2; water.position.y = WATER_Y; scene.add(water); this.water = water;
    const rnd = mulberry(7); this.clouds = [];
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.9 });
    for (let i = 0; i < 10; i++) {
      const g = new THREE.Group();
      for (let k = 0; k < 4; k++) { const m = new THREE.Mesh(new THREE.SphereGeometry(2.5 + rnd() * 3, 8, 6), cloudMat); m.position.set(k * 3 - 4.5, rnd() * 0.6, rnd() * 1.5); m.scale.y = 0.55; g.add(m); }
      g.position.set((rnd() - 0.5) * 180, 34 + rnd() * 12, (rnd() - 0.5) * 180);
      scene.add(g); this.clouds.push({ g, speed: 0.5 + rnd() * 0.6 });
    }
  }

  // ---------- 盆地地形：山＋河＋聚落平地 ----------
  buildTerrain() {
    const noise = new SimplexNoise({ random: mulberry(17) });
    const fbm = (x, z) => { let v = 0, a = 0.5, f = 1; for (let i = 0; i < 3; i++) { v += a * noise.noise(x * f, z * f); a *= 0.5; f *= 2; } return v; };
    const rivers = RIVERS.map((r) => ({ ...r, w: r.pts.map(([lng, lat]) => toWorld(lng, lat)) }));
    const hills = HILLS.map((h) => { const [x, z] = toWorld(h.lng, h.lat); const o = { ...h, x, z, R: h.r * S }; if (h.lng2) { const [x2, z2] = toWorld(h.lng2, h.lat2); o.x2 = x2; o.z2 = z2; } return o; });
    const flats = PLACES.filter((p) => !p.hill).map((p) => { const [x, z] = toWorld(p.lng, p.lat); return { x, z, R: 0.9 + p.size * 0.45 }; });
    const riverDepth = (x, z) => { let d = 0, bank = 0; rivers.forEach((r) => { const dist = distToPolyline(x, z, r.w); const inner = r.width, outer = r.width * 1.7; d = Math.max(d, 1 - smooth(inner, outer, dist)); bank = Math.max(bank, 1 - smooth(outer, outer + 2.0, dist)); }); return { d, bank }; };
    const heightAt = (x, z) => {
      let h = 0.12 * fbm(x * 0.06, z * 0.06) + 0.05 * noise.noise(x * 0.25, z * 0.25);
      hills.forEach((hl) => {
        let dist = Math.hypot(x - hl.x, z - hl.z);
        if (hl.x2 != null) { dist = Math.min(dist, distToPolyline(x, z, [[hl.x, hl.z], [hl.x2, hl.z2]])); }
        const g = Math.exp(-(dist * dist) / (hl.R * hl.R));
        h += hl.h * g * (0.72 + 0.45 * fbm(x * 0.09 + 3, z * 0.09 - 2));
      });
      // 河：往下挖到水面下
      const { d, bank } = riverDepth(x, z);
      h = THREE.MathUtils.lerp(h, Math.min(h, 0.15), bank); // 河岸壓平
      h = THREE.MathUtils.lerp(h, -1.3, d); // 河道挖到水面下，山也擋不住
      // 聚落平地
      flats.forEach((f) => { const k = 1 - smooth(f.R, f.R + 2.2, Math.hypot(x - f.x, z - f.z)); h = THREE.MathUtils.lerp(h, Math.max(h, 0.06), k); });
      return h;
    };
    this.heightAt = heightAt;
    const seg = this.weak ? 130 : 230;
    const tg = new THREE.PlaneGeometry(TERRAIN, TERRAIN, seg, seg); tg.rotateX(-Math.PI / 2);
    const pos = tg.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
    tg.computeVertexNormals();
    const nrm = tg.attributes.normal;
    const col = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    const paddyA = new THREE.Color(0x9cc473), paddyB = new THREE.Color(0xb7d388), meadow = new THREE.Color(0xc9cf8c), forest = new THREE.Color(0x5e8458), forestHi = new THREE.Color(0x7aa065);
    const rock = new THREE.Color(0x9c9480), sand = new THREE.Color(0xd9ccaa), bed = new THREE.Color(0x8fb0ad);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), y = pos.getY(i);
      const slope = 1 - nrm.getY(i);
      const n = noise.noise(x * 0.08 + 3, z * 0.08) * 0.5 + 0.5;
      const n2 = noise.noise(x * 0.3 - 7, z * 0.3 + 2) * 0.5 + 0.5;
      c.copy(paddyA).lerp(paddyB, n);
      if (n2 > 0.7) c.lerp(meadow, 0.5);
      if (y > 0.8) c.lerp(n2 > 0.5 ? forest : forestHi, smooth(0.8, 2.6, y));
      if (slope > 0.42) c.lerp(rock, smooth(0.42, 0.7, slope));
      if (y < WATER_Y + 0.35) c.copy(sand).lerp(bed, smooth(WATER_Y + 0.35, WATER_Y - 0.5, y));
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    tg.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const terrain = new THREE.Mesh(tg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, flatShading: true }));
    terrain.receiveShadow = this.shadows; terrain.castShadow = false;
    this.scene.add(terrain); this.terrain = terrain;
    // 山上的樹
    const rnd = mulberry(31);
    const dummy = new THREE.Object3D(); const tc = new THREE.Color();
    const treeN = this.weak ? 350 : 1100;
    const pine = mergeGeometries([new THREE.ConeGeometry(0.5, 0.95, 6).translate(0, 0.72, 0), new THREE.ConeGeometry(0.38, 0.8, 6).translate(0, 1.12, 0), new THREE.CylinderGeometry(0.08, 0.1, 0.5, 5).translate(0, 0.25, 0)]);
    const round = mergeGeometries([new THREE.IcosahedronGeometry(0.55, 1).translate(0, 1.0, 0), new THREE.IcosahedronGeometry(0.4, 1).translate(0.3, 0.8, 0.1), new THREE.CylinderGeometry(0.1, 0.14, 0.7, 6).translate(0, 0.35, 0).toNonIndexed()]);
    const treeMat = new THREE.MeshStandardMaterial({ roughness: 0.9 });
    [pine, round].forEach((geo, kind) => {
      const count = Math.floor(treeN * 0.5);
      const mesh = new THREE.InstancedMesh(geo, treeMat, count);
      let placed = 0, tries = 0;
      while (placed < count && tries < count * 30) {
        tries += 1;
        const x = (rnd() - 0.5) * TERRAIN * 0.96, z = (rnd() - 0.5) * TERRAIN * 0.96;
        const h = heightAt(x, z);
        if (h < 0.7 || rnd() > smooth(0.7, 2.5, h)) continue;
        if (flats.some((f) => Math.hypot(x - f.x, z - f.z) < f.R + 1)) continue;
        const sc = 0.55 + rnd() * 0.75;
        dummy.position.set(x, h - 0.05, z); dummy.scale.set(sc, sc, sc); dummy.rotation.y = rnd() * Math.PI * 2; dummy.updateMatrix();
        mesh.setMatrixAt(placed, dummy.matrix);
        tc.setHex(kind === 0 ? [0x4f6f4e, 0x5e8458, 0x44654a][Math.floor(rnd() * 3)] : [0x6f9f5e, 0x8ab86f, 0x7aa065][Math.floor(rnd() * 3)]);
        mesh.setColorAt(placed, tc); placed += 1;
      }
      mesh.count = placed; mesh.castShadow = this.shadows && !this.weak; this.scene.add(mesh);
    });
    // 河名牌
    rivers.forEach((r) => { const mid = r.w[Math.floor(r.w.length / 2)]; const tag = this.makeLabel("tph-river-tag", esc(r.name)); tag.position.set(mid[0], WATER_Y + 0.1, mid[1]); tag.always = true; });
    // 指北針位置
    this.sceneRadius = 60; this.center = new THREE.Vector3(2, 0, 0);
    this.sun.target.position.copy(this.center); this.scene.add(this.sun.target);
  }

  // ---------- 聚落：房子群＋廟＋隘門／城牆 ----------
  buildPlaces() {
    this.places = new Map();
    const mats = {}; const mat = (hexc, extra) => { const k = `${hexc}:${JSON.stringify(extra || {})}`; if (!mats[k]) mats[k] = new THREE.MeshStandardMaterial({ color: hexc, roughness: 0.9, ...(extra || {}) }); return mats[k]; };
    const wallMat = mat(0xf4ead8), wall2 = mat(0xe9dcc3), wood = mat(0x7d5a3c), dark = mat(0x3a3330), stone = mat(0x9c9484), red = mat(0x9b2f2a), gold = mat(0xd9a441, { metalness: 0.3, roughness: 0.5 });
    const proxies = [];
    PLACES.forEach((p, idx) => {
      const [x, z] = toWorld(p.lng, p.lat);
      const g = new THREE.Group();
      const grp = GROUP[p.group] || GROUP.other;
      const roofMat = mat(new THREE.Color(grp.color).lerp(new THREE.Color(0x3a2a22), 0.35).getHex());
      const rnd = mulberry(idx * 13 + 5);
      const baseY = this.heightAt(x, z);
      const R = 0.6 + p.size * 0.42;
      const houses = [];
      const n = p.hill ? 3 : 3 + p.size * 3;
      for (let i = 0; i < n; i++) {
        const a = rnd() * Math.PI * 2, d = p.hill ? 0.5 + rnd() * 0.6 : Math.sqrt(rnd()) * R;
        const hx = x + Math.cos(a) * d, hz = z + Math.sin(a) * d;
        const hy = p.hill ? this.heightAt(hx, hz) : baseY;
        const w = 0.5 + rnd() * 0.35, dep = 0.4 + rnd() * 0.3, hh = 0.32 + rnd() * 0.12;
        const body = new THREE.Mesh(new THREE.BoxGeometry(w, hh, dep), i % 3 ? wallMat : wall2); body.position.set(hx, hy + hh / 2, hz);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, dep) * 0.78, 0.26, 4), roofMat); roof.position.set(hx, hy + hh + 0.13, hz); roof.rotation.y = Math.PI / 4;
        const ry = rnd() * 0.6 - 0.3; body.rotation.y = ry; roof.rotation.y += ry;
        body.castShadow = this.shadows; roof.castShadow = this.shadows; body.receiveShadow = this.shadows;
        g.add(body, roof); houses.push(body, roof);
      }
      if (p.temple) {
        const ty = p.hill ? this.heightAt(x, z) : baseY;
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 1.1), stone); base.position.set(x, ty + 0.06, z);
        const hall = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.55, 0.9), mat(0xf6e4c8)); hall.position.set(x, ty + 0.12 + 0.275, z);
        const roof = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.14, 1.15), p.wall ? stone : red); roof.position.set(x, ty + 0.74, z);
        const ridge = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 0.5), p.wall ? stone : red); ridge.position.set(x, ty + 0.86, z);
        const ornL = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 5), gold); ornL.position.set(x - 0.5, ty + 0.98, z); ornL.rotation.z = 0.5;
        const ornR = ornL.clone(); ornR.position.x = x + 0.5; ornR.rotation.z = -0.5;
        [base, hall, roof, ridge, ornL, ornR].forEach((m) => { m.castShadow = this.shadows; m.receiveShadow = this.shadows; g.add(m); });
        for (const dx of [-0.42, 0.42]) { const lan = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshStandardMaterial({ color: 0xff8a5c, emissive: 0xff6a3c, emissiveIntensity: 0 })); lan.position.set(x + dx, ty + 0.62, z + 0.5); g.add(lan); this.lampGlow.push(lan.material); }
      }
      if (p.hill) {
        // 隘門：兩座石門
        [[0.9, 0.0], [-0.1, -0.9]].forEach(([dx, dz]) => {
          const gx = x + dx * 1.6, gz = z + dz * 1.6, gy = this.heightAt(gx, gz);
          const l = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.3), stone); l.position.set(gx - 0.2, gy + 0.25, gz);
          const r = l.clone(); r.position.x = gx + 0.2;
          const top = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.14, 0.34), stone); top.position.set(gx, gy + 0.55, gz);
          [l, r, top].forEach((m) => { m.castShadow = this.shadows; g.add(m); });
        });
      }
      if (p.wall) {
        // 台北城：方形城牆＋五座城門樓（北門在上）
        const W = 2.6, H = 0.42;
        const segs = [[0, -W / 2, W, 0.18], [0, W / 2, W, 0.18], [-W / 2, 0, 0.18, W], [W / 2, 0, 0.18, W]];
        segs.forEach(([dx, dz, sx, sz]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(sx, H, sz), stone); m.position.set(x + dx, baseY + H / 2, z + dz); m.castShadow = this.shadows; g.add(m); });
        [[0, -W / 2], [0.5, W / 2], [-0.6, W / 2], [-W / 2, -0.2], [W / 2, 0.3]].forEach(([dx, dz]) => {
          const t = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.5, 0.42), mat(0xe9dcc3)); t.position.set(x + dx, baseY + H + 0.25, z + dz);
          const rf = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.2, 4), red); rf.position.set(x + dx, baseY + H + 0.6, z + dz); rf.rotation.y = Math.PI / 4;
          t.castShadow = this.shadows; g.add(t, rf);
        });
      }
      // 幾棵樹
      for (let i = 0; i < 2 + Math.floor(p.size / 2); i++) {
        const a = rnd() * Math.PI * 2, d = R + 0.4 + rnd() * 0.8; const tx = x + Math.cos(a) * d, tz = z + Math.sin(a) * d; const ty = this.heightAt(tx, tz); if (ty < WATER_Y + 0.2) continue;
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.4, 5), wood); trunk.position.set(tx, ty + 0.2, tz);
        const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 1), mat([0x6f9f5e, 0x8ab86f][i % 2])); crown.position.set(tx, ty + 0.55, tz);
        crown.castShadow = this.shadows; g.add(trunk, crown);
      }
      this.scene.add(g);
      const proxy = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.6, R + 0.6, 1.2, 10), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(x, baseY + 0.5, z); proxy.userData.place = p.id; g.add(proxy); proxies.push(proxy);
      const tag = this.makeLabel("tph-tag", `<u style="background:${hex6(grp.color)}"></u><b>${esc(p.name)}</b><small>${esc(p.today)}</small>`);
      tag.position.set(x, baseY + (p.hill ? 1.6 : 1.0) + p.size * 0.08, z); tag.data = { place: p.id }; tag.placeId = p.id;
      this.places.set(p.id, { p, g, x, z, y: baseY, R, houses, roofMat, tag, grp, charred: false });
    });
    this.proxies = proxies;
    this.charMat = mat(0x3a3330);
  }

  // ---------- 平時走動的人（農夫、挑夫） ----------
  makeFigure(shirt, weapon) {
    const g = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({ color: 0xf3cfae, roughness: 0.7 });
    const pants = new THREE.MeshStandardMaterial({ color: 0x3b3a42, roughness: 0.7 });
    const top = new THREE.MeshStandardMaterial({ color: shirt, roughness: 0.7 });
    const hair = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.8 });
    const legL = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.14, 0.09, 2, 0.03), pants); legL.geometry.translate(0, -0.07, 0); legL.position.set(-0.06, 0.14, 0);
    const legR = legL.clone(); legR.position.x = 0.06;
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.12, 3, 8), top); body.position.y = 0.27;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), skin); head.position.y = 0.55;
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), hair); cap.position.y = 0.58;
    const queue = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.015, 0.3, 4), hair); queue.position.set(0, 0.45, -0.17); queue.rotation.x = 0.4; // 辮子
    const armL = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.16, 0.06, 2, 0.025), top); armL.geometry.translate(0, -0.08, 0); armL.position.set(-0.16, 0.36, 0);
    const armR = armL.clone(); armR.position.x = 0.16;
    [legL, legR, body, head, cap, queue, armL, armR].forEach((m) => { m.castShadow = this.shadows; g.add(m); });
    if (weapon) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.7, 4), new THREE.MeshStandardMaterial({ color: 0x5a3b2e })); pole.position.set(0, -0.05, 0.05); pole.rotation.x = -0.35;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.02), new THREE.MeshStandardMaterial({ color: 0xcfd3d6, metalness: 0.6, roughness: 0.3 })); blade.position.set(0, 0.28, -0.07); blade.rotation.x = -0.35;
      armR.add(pole, blade);
      if (weapon === "torch") { const fl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), new THREE.MeshStandardMaterial({ color: 0xffb347, emissive: 0xff7a1a, emissiveIntensity: 1.5 })); fl.position.set(0, 0.3, -0.08); armR.add(fl); blade.visible = false; }
    }
    g.userData.legs = [legL, legR]; g.userData.arms = [armL, armR];
    return g;
  }
  buildWalkers() {
    this.walkers = [];
    if (this.reducedMotion) return;
    const shirts = [0x6f7fb5, 0x58a6a6, 0xe8c547, 0xb58fd0, 0x8fb37a];
    const rnd = mulberry(99);
    this.places.forEach((pl) => {
      const n = this.weak ? 1 : 2;
      for (let k = 0; k < n; k++) {
        const fig = this.makeFigure(shirts[(pl.p.size + k) % shirts.length]); this.scene.add(fig);
        this.walkers.push({ fig, pl, r: pl.R + 0.35 + k * 0.25, speed: (0.12 + rnd() * 0.08) * (k % 2 ? -1 : 1), phase: rnd() * Math.PI * 2 });
      }
    });
  }
  updateWalkers(t) {
    for (const w of this.walkers) {
      if (!w.fig.visible) continue;
      const ang = w.phase + t * w.speed;
      const x = w.pl.x + Math.cos(ang) * w.r, z = w.pl.z + Math.sin(ang) * w.r;
      w.fig.position.set(x, Math.max(this.heightAt(x, z), WATER_Y + 0.1) + 0.02, z);
      w.fig.rotation.y = -ang + (w.speed > 0 ? Math.PI : 0);
      const sw = Math.sin(t * 7 + w.phase) * 0.5;
      w.fig.userData.legs[0].rotation.x = sw; w.fig.userData.legs[1].rotation.x = -sw;
      w.fig.userData.arms[0].rotation.x = -sw * 0.6; w.fig.userData.arms[1].rotation.x = sw * 0.6;
    }
  }

  // ---------- 年表：切換到某一站 ----------
  setEvent(i, instant) {
    const ev = EVENTS[i]; if (!ev) return;
    this.eventIdx = i; this.event = ev;
    const year = ev.year;
    const burned = new Set(ev.burned || []);
    // 哪些地點這一年存在
    this.places.forEach((pl) => {
      const p = pl.p;
      const alive = p.from <= year && (p.until == null || year <= p.until);
      pl.g.visible = alive; pl.tag.hidden = !alive;
      const charred = burned.has(p.id);
      if (charred !== pl.charred) { pl.charred = charred; pl.houses.forEach((m, k) => { if (k % 2 === 1) m.material = charred ? this.charMat : pl.roofMat; }); }
      pl.tag.el.classList.toggle("on", (ev.focus || []).includes(p.id));
      pl.tag.el.classList.toggle("burn", charred);
    });
    this.walkers.forEach((w) => { w.fig.visible = w.pl.g.visible && !w.pl.charred; });
    this.clearFx();
    (ev.attacks || []).forEach((a) => this.addAttack(a));
    (ev.migrate || []).forEach((m) => this.addMigration(m));
    burned.forEach((id) => this.addFire(id));
    (ev.defend || []).forEach((id) => this.addPulse(id));
    this.flyToFocus(ev.focus || [], instant);
    this.onEvent && this.onEvent(i, ev);
    this.requestRender();
  }
  clearFx() {
    while (this.fxGroup.children.length) { const c = this.fxGroup.children.pop(); c.traverse((m) => { if (m.geometry) m.geometry.dispose(); if (m.material && m.material.dispose) m.material.dispose(); }); }
    this.fires = []; this.marchers = []; this.pulses = [];
  }
  groundY(x, z) { return Math.max(this.heightAt(x, z), WATER_Y + 0.08) + 0.02; }
  pathOf(ids) {
    const pts = ids.map((id) => this.places.get(id)).filter(Boolean).map((pl) => new THREE.Vector3(pl.x, 0, pl.z));
    if (pts.length < 2) return null;
    // 直線切段，貼地
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1]; const n = Math.max(6, Math.ceil(a.distanceTo(b) / 0.8));
      for (let k = (i === 0 ? 0 : 1); k <= n; k++) { const v = a.clone().lerp(b, k / n); v.y = this.groundY(v.x, v.z); out.push(v); }
    }
    return new THREE.CatmullRomCurve3(out, false, "catmullrom", 0.2);
  }
  addAttack(a) {
    const grp = GROUP[a.group] || GROUP.other;
    const from = this.places.get(a.from), to = this.places.get(a.to); if (!from || !to) return;
    const ids = a.via ? [a.from, a.via, a.to] : [a.from, a.to];
    if (a.from === a.to) { this.addPulse(a.to, grp.color); return; }
    // 空中弧線
    const A = new THREE.Vector3(from.x, from.y + 0.8, from.z), B = new THREE.Vector3(to.x, to.y + 0.8, to.z);
    const mid = A.clone().lerp(B, 0.5); mid.y += 1.5 + A.distanceTo(B) * 0.16;
    const curve = new THREE.QuadraticBezierCurve3(A, mid, B);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.09, 6, false), new THREE.MeshBasicMaterial({ color: grp.color, transparent: true, opacity: 0.75 }));
    this.fxGroup.add(tube);
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.6, 8), new THREE.MeshBasicMaterial({ color: grp.color }));
    const endT = curve.getTangent(0.98).normalize(); head.position.copy(curve.getPoint(0.98)); head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), endT); this.fxGroup.add(head);
    // 沿地面走的人
    if (this.reducedMotion) return;
    const path = this.pathOf(ids); if (!path) return;
    const n = this.weak ? 4 : 7;
    for (let k = 0; k < n; k++) {
      const fig = this.makeFigure(grp.color, k % 3 === 2 ? "torch" : "sword"); this.fxGroup.add(fig);
      this.marchers.push({ fig, path, off: k / n, speed: 0.045 + (k % 2) * 0.008 });
    }
  }
  addMigration(m) {
    const grp = GROUP[m.group] || GROUP.other;
    const ids = [m.from, m.to, m.then].filter(Boolean);
    const path = this.pathOf(ids); if (!path) return;
    const tube = new THREE.Mesh(new THREE.TubeGeometry(path, 60, 0.05, 5, false), new THREE.MeshBasicMaterial({ color: grp.color, transparent: true, opacity: 0.6 }));
    tube.position.y = 0.15; this.fxGroup.add(tube);
    const n = this.weak ? 4 : 6;
    for (let k = 0; k < n; k++) { const fig = this.makeFigure(grp.color); this.fxGroup.add(fig); const pack = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.12), new THREE.MeshStandardMaterial({ color: 0xc9a27a })); pack.position.set(0, 0.42, -0.14); fig.add(pack); this.marchers.push({ fig, path, off: k / n, speed: 0.03, bounce: true }); }
  }
  addFire(id) {
    const pl = this.places.get(id); if (!pl) return;
    const rnd = mulberry(id.length * 7 + 11);
    const flames = [], smokes = [];
    const fm = new THREE.MeshStandardMaterial({ color: 0xffa040, emissive: 0xff5a1a, emissiveIntensity: 1.6, transparent: true, opacity: 0.95 });
    const sm = new THREE.MeshStandardMaterial({ color: 0x555555, transparent: true, opacity: 0.45, roughness: 1 });
    for (let i = 0; i < 3 + pl.p.size; i++) {
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * pl.R * 0.9;
      const f = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.55, 6), fm); f.position.set(pl.x + Math.cos(a) * d, pl.y + 0.5, pl.z + Math.sin(a) * d); this.fxGroup.add(f); flames.push({ m: f, ph: rnd() * 6 });
      for (let s = 0; s < 3; s++) { const sk = new THREE.Mesh(new THREE.SphereGeometry(0.18 + rnd() * 0.1, 6, 5), sm); sk.position.copy(f.position); this.fxGroup.add(sk); smokes.push({ m: sk, base: f.position.clone(), ph: rnd() * 4, drift: (rnd() - 0.5) * 0.4 }); }
    }
    this.fires.push({ flames, smokes });
  }
  addPulse(id, color) {
    const pl = this.places.get(id); if (!pl) return;
    const ring = new THREE.Mesh(new THREE.RingGeometry(pl.R + 0.9, pl.R + 1.15, 40), new THREE.MeshBasicMaterial({ color: color || GROUP.zhang.color, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(pl.x, pl.y + 0.25, pl.z); this.fxGroup.add(ring); this.pulses.push({ m: ring, base: pl.R + 1 });
  }
  updateFx(t, dt) {
    for (const m of this.marchers) {
      const k = (m.off + t * m.speed) % 1;
      const p = m.path.getPointAt(k), q = m.path.getPointAt(Math.min(1, k + 0.01));
      m.fig.position.copy(p); m.fig.rotation.y = Math.atan2(q.x - p.x, q.z - p.z);
      const sw = Math.sin(t * 8 + m.off * 9) * 0.5; const L = m.fig.userData.legs, A = m.fig.userData.arms;
      L[0].rotation.x = sw; L[1].rotation.x = -sw; A[0].rotation.x = -sw * 0.6; A[1].rotation.x = m.bounce ? 0.2 : -1.2 + Math.abs(Math.sin(t * 6 + m.off * 7)) * 0.9;
    }
    for (const f of this.fires) {
      f.flames.forEach((fl) => { const s = 0.8 + Math.sin(t * 9 + fl.ph) * 0.25; fl.m.scale.set(s, 1 + Math.sin(t * 7 + fl.ph * 2) * 0.35, s); });
      f.smokes.forEach((sk) => { const k = ((t * 0.35 + sk.ph) % 2) / 2; sk.m.position.set(sk.base.x + sk.drift * k * 3, sk.base.y + 0.3 + k * 2.6, sk.base.z + Math.sin(t + sk.ph) * 0.2); const s = 0.6 + k * 1.6; sk.m.scale.set(s, s, s); sk.m.material.opacity = 0.45 * (1 - k); });
    }
    for (const pu of this.pulses) { const k = (t * 0.6) % 1; const s = 1 + k * 0.6; pu.m.scale.set(s, s, 1); pu.m.material.opacity = 0.8 * (1 - k); }
    void dt;
  }

  // ---------- 時段 ----------
  setDay(key, instant) { const k = DAYCYCLE[key] || DAYCYCLE.day; this.dayKey = key; this.dayTarget = k; if (instant || !this.dayCur) { this.dayCur = { ...k }; this.applyDay(this.dayCur); } this.requestRender(); }
  applyDay(k) {
    this.skyMat.uniforms.uTop.value.setHex(k.top); this.skyMat.uniforms.uHorizon.value.setHex(k.horizon);
    this.sun.color.setHex(k.sun); this.sun.intensity = k.sunI; this.hemi.color.setHex(k.hemiSky); this.hemi.groundColor.setHex(k.hemiGround);
    this.scene.fog.color.setHex(k.fog); this.waterMat.uniforms.uColor.value.setHex(k.water); this.waterMat.uniforms.uFog.value.setHex(k.fog);
    this.lampGlow.forEach((m) => { m.emissiveIntensity = k.lamp * 2.0; });
  }

  // ---------- 名牌 ----------
  makeLabel(cls, html) { const el = document.createElement("div"); el.className = cls; el.innerHTML = html; el.style.display = "none"; this.labelEl.appendChild(el); const o = { el, position: new THREE.Vector3(), shown: false, data: {}, hidden: false }; this.labels.push(o); return o; }
  renderLabels() {
    const cam = this.camera, w = this.labelW, h = this.labelH; const v = new THREE.Vector3();
    const camDist = cam.position.distanceTo(this.controls.target);
    const far = camDist > 70; if (far !== this.lastFar) { this.lastFar = far; this.labelEl.classList.toggle("far", far); }
    for (const o of this.labels) {
      v.copy(o.position).project(cam);
      const on = !o.hidden && v.z < 1 && v.x > -1.1 && v.x < 1.1 && v.y > -1.1 && v.y < 1.1;
      if (!on) { if (o.shown) { o.el.style.display = "none"; o.shown = false; } continue; }
      o.el.style.transform = `translate(-50%,-100%) translate(${((v.x * 0.5 + 0.5) * w).toFixed(1)}px,${((-v.y * 0.5 + 0.5) * h).toFixed(1)}px)`;
      if (!o.shown) { o.el.style.display = ""; o.shown = true; }
    }
  }

  // ---------- 相機 ----------
  overviewPosition() { const aspect = this.camera.aspect || 1.6; const fit = Math.max(1, 1.3 / Math.min(aspect, 1.6)); const d = this.sceneRadius * 2.4 * fit; return this.center.clone().add(new THREE.Vector3(0, d * 0.78, d * 0.7)); }
  flyTo(pos, target, instant) { if (instant) { this.camera.position.copy(pos); this.controls.target.copy(target); this.fly = null; } else this.fly = { t0: performance.now(), from: this.camera.position.clone(), to: pos, old: this.controls.target.clone(), target, dur: 1500 }; this.requestRender(); }
  home(instant) { this.flyTo(this.overviewPosition(), this.center.clone(), instant); }
  bird() { this.flyTo(this.center.clone().add(new THREE.Vector3(0.01, this.sceneRadius * 2.6, 0.5)), this.center.clone()); }
  flyToFocus(ids, instant) {
    const pts = ids.map((id) => this.places.get(id)).filter(Boolean);
    if (!pts.length) { this.home(instant); return; }
    const bb = new THREE.Box3(); pts.forEach((pl) => bb.expandByPoint(new THREE.Vector3(pl.x, pl.y, pl.z)));
    const c = bb.getCenter(new THREE.Vector3()); const size = bb.getSize(new THREE.Vector3()).length();
    const d = Math.max(9, size * 0.9 + 7);
    this.flyTo(c.clone().add(new THREE.Vector3(d * 0.15, d * 0.8, d * 0.95)), c.clone().setY(c.y + 0.4), instant);
  }
  flyToPlace(id) { const pl = this.places.get(id); if (!pl) return; const c = new THREE.Vector3(pl.x, pl.y + 0.4, pl.z); this.flyTo(c.clone().add(new THREE.Vector3(1.5, 4.5, 6.5)), c); }

  // ---------- 互動 ----------
  castAt(x, y) {
    if (!this.ray) { this.ray = new THREE.Raycaster(); this.ndc = new THREE.Vector2(); }
    const r = this.renderer.domElement.getBoundingClientRect();
    this.ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(this.ndc, this.camera);
    const hits = this.ray.intersectObjects(this.proxies.filter((p) => p.parent.visible), false);
    return hits.length ? hits[0].object.userData.place : null;
  }
  bindPointer() {
    const el = this.renderer.domElement; let down = null;
    el.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; });
    el.addEventListener("pointerup", (e) => { if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return; down = null; const id = this.castAt(e.clientX, e.clientY); if (id) { this.stopTour(); this.flyToPlace(id); this.onPlace && this.onPlace(id); } });
    this.labelEl.addEventListener("click", (e) => { const t = e.target.closest(".tph-tag"); if (!t) return; const o = this.labels.find((l) => l.el === t); if (!o || !o.data.place) return; this.stopTour(); this.flyToPlace(o.data.place); this.onPlace && this.onPlace(o.data.place); });
  }

  // ---------- 導覽：自動一站一站走 ----------
  startTour() { this.tour = { t0: performance.now() / 1000 }; if (this.eventIdx >= EVENTS.length - 1) this.setEvent(0); else { this.flyToFocus(this.event.focus || []); this.onEvent && this.onEvent(this.eventIdx, this.event); } this.onTour && this.onTour(true); }
  stopTour() { if (!this.tour) return; this.tour = null; this.onTour && this.onTour(false); this.requestRender(); }
  next() { this.setEvent(Math.min(EVENTS.length - 1, this.eventIdx + 1)); if (this.tour) this.tour.t0 = performance.now() / 1000; }
  prev() { this.setEvent(Math.max(0, this.eventIdx - 1)); if (this.tour) this.tour.t0 = performance.now() / 1000; }

  // ---------- 迴圈 ----------
  requestRender() { this.dirty = true; }
  resize() { const w = this.container.clientWidth, h = this.container.clientHeight; if (!w || !h) return; this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.labelW = w; this.labelH = h; this.requestRender(); }
  frame(now) {
    if (this.disposed) return;
    this.raf = requestAnimationFrame((t) => this.frame(t));
    if (document.hidden) return;
    const t = now / 1000; const dt = Math.min(0.05, (now - (this.lastNow || now)) / 1000); this.lastNow = now;
    let animating = false;
    if (this.fly) { const v = ease(Math.min(1, (now - this.fly.t0) / this.fly.dur)); this.camera.position.lerpVectors(this.fly.from, this.fly.to, v); this.controls.target.lerpVectors(this.fly.old, this.fly.target, v); if (v >= 1) this.fly = null; animating = true; }
    if (this.controls.update()) animating = true;
    if (this.dayTarget && this.dayCur) {
      const k = Math.min(1, dt * 2.5); let moving = false; const cur = this.dayCur, tg = this.dayTarget;
      ["sunI", "lamp"].forEach((key) => { if (Math.abs(cur[key] - tg[key]) > 0.002) { cur[key] += (tg[key] - cur[key]) * k; moving = true; } });
      ["top", "horizon", "sun", "hemiSky", "hemiGround", "fog", "water"].forEach((key) => { if (cur[key] !== tg[key]) { const a = new THREE.Color(cur[key]), b = new THREE.Color(tg[key]); a.lerp(b, k); const hv = a.getHex(); if (Math.abs(hv - tg[key]) < 2 || k >= 1) cur[key] = tg[key]; else cur[key] = hv; moving = true; } });
      if (moving) { this.applyDay(cur); animating = true; }
    }
    if (!this.reducedMotion) {
      this.updateWalkers(t); this.updateFx(t, dt);
      this.clouds.forEach((c) => { c.g.position.x += dt * c.speed; if (c.g.position.x > 120) c.g.position.x = -120; });
      this.waterMat.uniforms.uTime.value = t; animating = true;
    }
    if (this.tour) { const dur = 16; const k = (t - this.tour.t0) / dur; this.onProgress && this.onProgress(Math.min(1, k)); if (k >= 1) { if (this.eventIdx >= EVENTS.length - 1) this.stopTour(); else this.next(); } }
    if (!this.dirty && !animating) return;
    this.dirty = false; this.renderer.render(this.scene, this.camera); this.renderLabels();
  }
  dispose() { this.disposed = true; cancelAnimationFrame(this.raf); this.ro.disconnect(); this.controls.dispose(); this.renderer.dispose(); }
}

// ---------- 掛到頁面：按鈕列、年表、故事卡、年份牌 ----------
export function mountTaipeiHistory(container) {
  if (!container) return null;
  let scene;
  try { scene = new HistoryScene(container); window.__tphScene = scene; }
  catch (err) { console.error("taipei-history init failed", err); container.innerHTML = `<div style="padding:24px;text-align:center;color:#555">這台裝置開不了 3D（WebGL）。年表請看下面的文字版。</div>`; return null; }

  const pills = document.createElement("div"); pills.className = "tph-pills";
  const mk = (text, fn, title) => { const b = document.createElement("button"); b.type = "button"; b.textContent = text; if (title) b.title = title; b.addEventListener("click", fn); pills.appendChild(b); return b; };
  mk("↗ 全景", () => { scene.stopTour(); scene.home(); });
  mk("◇ 鳥瞰", () => { scene.stopTour(); scene.bird(); });
  const tourBtn = mk("▶ 自動導覽", () => { if (scene.tour) scene.stopTour(); else scene.startTour(); });
  const dayBtns = {};
  [["day", "☀️"], ["dusk", "🌇"], ["night", "🌙"]].forEach(([k, icon]) => { dayBtns[k] = mk(icon, () => { scene.setDay(k); Object.keys(dayBtns).forEach((j) => dayBtns[j].setAttribute("aria-pressed", j === k ? "true" : "false")); }, { day: "白天", dusk: "黃昏", night: "夜晚" }[k]); });
  dayBtns.day.setAttribute("aria-pressed", "true");
  const fsBtn = mk("⛶ 全螢幕", () => {
    const isFs = container.classList.contains("fs") || document.fullscreenElement === container || document.webkitFullscreenElement === container;
    if (isFs) { container.classList.remove("fs"); if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document); document.body.style.overflow = ""; }
    else { container.classList.add("fs"); document.body.style.overflow = "hidden"; const req = container.requestFullscreen || container.webkitRequestFullscreen; if (req) { try { const r = req.call(container); if (r && r.catch) r.catch(() => {}); } catch (e) { /* 蓋版仍生效 */ } } }
  }, "全螢幕看（Esc 或再按一次離開）");
  const syncFs = () => { const on = container.classList.contains("fs") || document.fullscreenElement === container || document.webkitFullscreenElement === container; fsBtn.setAttribute("aria-pressed", on ? "true" : "false"); fsBtn.textContent = on ? "✕ 離開全螢幕" : "⛶ 全螢幕"; if (!document.fullscreenElement && !document.webkitFullscreenElement && !container.classList.contains("fs")) document.body.style.overflow = ""; scene.resize(); };
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) container.classList.remove("fs"); syncFs(); });
  document.addEventListener("webkitfullscreenchange", () => { if (!document.webkitFullscreenElement) container.classList.remove("fs"); syncFs(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && container.classList.contains("fs")) { container.classList.remove("fs"); syncFs(); } if (e.key === "ArrowRight") scene.next(); if (e.key === "ArrowLeft") scene.prev(); });
  new MutationObserver(syncFs).observe(container, { attributes: true, attributeFilter: ["class"] });
  container.appendChild(pills);

  // 年份牌（右上）
  const badge = document.createElement("div"); badge.className = "tph-badge"; container.appendChild(badge);
  // 圖例
  const legend = document.createElement("div"); legend.className = "tph-legend";
  legend.innerHTML = ["sanyi", "tongan", "anxi", "quan", "zhang", "gov"].map((k) => `<span><u style="background:${hex6(GROUP[k].color)}"></u>${esc(GROUP[k].short)}</span>`).join("");
  container.appendChild(legend);
  // 年表（下方）
  const tl = document.createElement("div"); tl.className = "tph-timeline";
  tl.innerHTML = `<button type="button" class="tph-nav" data-dir="-1" title="上一站">‹</button><div class="tph-years">${EVENTS.map((e, i) => `<button type="button" data-i="${i}"><b>${esc(e.label)}</b><span>${esc(e.title.split("：")[0])}</span><i></i></button>`).join("")}</div><button type="button" class="tph-nav" data-dir="1" title="下一站">›</button>`;
  tl.addEventListener("click", (e) => { const nav = e.target.closest(".tph-nav"); if (nav) { scene.stopTour(); Number(nav.dataset.dir) > 0 ? scene.next() : scene.prev(); return; } const b = e.target.closest("button[data-i]"); if (!b) return; scene.stopTour(); scene.setEvent(Number(b.dataset.i)); });
  container.appendChild(tl);
  // 故事卡（左）
  const card = document.createElement("div"); card.className = "tph-card show"; container.appendChild(card);
  const caption = document.createElement("div"); caption.className = "tph-caption"; container.appendChild(caption);

  const placeChip = (id) => { const pl = scene.places.get(id); if (!pl) return ""; return `<button type="button" class="tph-chip" data-place="${id}" style="--c:${hex6(pl.grp.color)}">${esc(pl.p.name)}</button>`; };
  const showEvent = (i, ev) => {
    badge.innerHTML = `<b>${esc(ev.label)}</b><small>${esc(ev.era)}</small><em>${esc(ev.west.flag)} ${esc(String(ev.west.year))}・${esc(ev.west.title)}</em>`;
    tl.querySelectorAll("button[data-i]").forEach((b) => { const on = Number(b.dataset.i) === i; b.classList.toggle("on", on); if (on) b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); });
    card.innerHTML = `<div class="tph-axis">第 ${i + 1}／${EVENTS.length} 站・${esc(ev.era)}</div><h4>${esc(ev.title)}</h4>` +
      ev.story.map((s) => `<p>${esc(s)}</p>`).join("") +
      `<div class="tph-chips">${(ev.focus || []).map(placeChip).join("")}</div>` +
      `<div class="tph-west"><div class="tph-west-head">${esc(ev.west.flag)} 同一時間的西方世界・${esc(String(ev.west.year))}</div><h5>${esc(ev.west.title)}</h5><p>${esc(ev.west.story)}</p>${ev.west.link ? `<a href="${esc(ev.west.link)}" target="_blank" rel="noopener">延伸閱讀 ↗</a>` : ""}</div>` +
      `<div class="tph-foot"><button type="button" class="tph-mini" data-dir="-1">‹ 上一站</button><button type="button" class="tph-mini" data-dir="1">下一站 ›</button></div>`;
    card.scrollTop = 0;
    card.querySelectorAll(".tph-chip[data-place]").forEach((b) => b.addEventListener("click", () => { scene.stopTour(); scene.flyToPlace(b.dataset.place); showPlace(b.dataset.place); }));
    card.querySelectorAll(".tph-mini[data-dir]").forEach((b) => b.addEventListener("click", () => { scene.stopTour(); Number(b.dataset.dir) > 0 ? scene.next() : scene.prev(); }));
  };
  const showPlace = (id) => {
    const pl = scene.places.get(id); if (!pl) return; const p = pl.p; const grp = pl.grp;
    const hits = EVENTS.map((e, i) => ({ e, i })).filter(({ e }) => (e.focus || []).includes(id) || (e.burned || []).includes(id));
    card.innerHTML = `<div class="tph-axis"><a class="tph-back">‹ 回到第 ${scene.eventIdx + 1} 站</a></div><h4><u class="tph-dot" style="background:${hex6(grp.color)}"></u>${esc(p.name)}<small>今天：${esc(p.today)}</small></h4><p>${esc(p.note)}</p><div class="tph-chips"><span class="tph-chip" style="--c:${hex6(grp.color)}">${esc(grp.name)}</span>${p.temple ? `<span class="tph-chip">⛩ ${esc(p.temple)}</span>` : ""}</div>` +
      (hits.length ? `<div class="tph-sub">出場的站</div><div class="tph-chips">${hits.map(({ e, i }) => `<button type="button" class="tph-chip" data-i="${i}">${esc(e.label)}・${esc(e.title.split("：")[0])}</button>`).join("")}</div>` : "");
    card.scrollTop = 0;
    card.querySelector(".tph-back").addEventListener("click", () => showEvent(scene.eventIdx, scene.event));
    card.querySelectorAll(".tph-chip[data-i]").forEach((b) => b.addEventListener("click", () => scene.setEvent(Number(b.dataset.i))));
  };
  scene.onEvent = showEvent;
  scene.onPlace = showPlace;
  scene.onTour = (on) => { tourBtn.setAttribute("aria-pressed", on ? "true" : "false"); tourBtn.textContent = on ? "⏸ 暫停導覽" : "▶ 自動導覽"; caption.classList.toggle("show", on); if (on) caption.textContent = "自動導覽中：每站 16 秒，拖畫面或按年表就停"; tl.classList.toggle("playing", on); };
  scene.onProgress = (k) => { const b = tl.querySelector("button[data-i].on i"); if (b) b.style.width = `${(k * 100).toFixed(1)}%`; };
  showEvent(scene.eventIdx, scene.event);
  return scene;
}
