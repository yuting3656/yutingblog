// 澳底尖山腳吳家 3D 導覽：從台北打架史的引擎分出來，加上「海」（LAND 多邊形外面全是海面）跟「族譜」面板。
// 地形＝噪聲＋高斯山脊；河沿折線往下挖；海岸外壓到水面下；聚落＝小房子群＋廟；年表每站鏡頭飛過去，
// 遷徙畫成沿地走的小人、登陸畫成弧線＋小船。資料在 data.js。效能：地形一張 mesh、樹 InstancedMesh、需要時才 render。
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { GROUP, PLACES, RIVERS, HILLS, EVENTS, URBAN, LINES, LAND, ORIGIN, TREE, ME, TOTAL, TREE_ENC_URL } from "./data.js?v=1";

const S = 6.5; // 世界單位／公里（貢寮一帶比台北盆地小，放大一倍多）
const LNG0 = ORIGIN.lng, LAT0 = ORIGIN.lat;
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
// 點是否在多邊形內（射線法）＋到邊界距離 → 有號距離（陸地為正、海為負）
const signedDistToPolygon = (x, z, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i], [xj, zj] = poly[j];
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  const d = distToPolyline(x, z, [...poly, poly[0]]);
  return inside ? d : -d;
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
    this.labelEl = document.createElement("div"); this.labelEl.className = "adi-labels"; container.appendChild(this.labelEl);
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
    this.buildCity();
    this.buildLines();
    this.buildWalkers();
    this.fxGroup = new THREE.Group(); this.scene.add(this.fxGroup);
    this.fires = []; this.marchers = []; this.pulses = []; this.crowd = []; this.boats = [];
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
    const land = LAND.map(([lng, lat]) => toWorld(lng, lat));
    const coastN = (x, z) => 0.9 * noise.noise(x * 0.35 + 11, z * 0.35 - 4) + 0.35 * noise.noise(x * 1.1 - 3, z * 1.1 + 8); // 海岸線抖一抖，不要直線
    const seaAt = (x, z) => { const sd = signedDistToPolygon(x, z, land) + coastN(x, z); return 1 - smooth(-0.3, 1.6, sd); }; // 1＝海
    this.seaAt = seaAt;
    const flats = PLACES.filter((p) => !p.hill).map((p) => { const [x, z] = toWorld(p.lng, p.lat); return { x, z, R: 0.9 + p.size * 0.45 }; });
    const urbanFlats = URBAN.map((u) => { const [x, z] = toWorld(u.lng, u.lat); return { from: u.from, x, z, R: u.r * S }; }).sort((a, b) => a.from - b.from);
    const smallHills = hills.filter((h) => h.r < 1.5); // 芝山岩、劍潭山：市區整地時保護
    // 某點被哪幾波市區開發整平（依年份排好；k＝整平程度）
    const urbanPairsAt = (x, z) => {
      let protect = 0; smallHills.forEach((h) => { protect = Math.max(protect, 1 - smooth(h.R * 1.3, h.R * 2.4, Math.hypot(x - h.x, z - h.z))); });
      const out = [];
      urbanFlats.forEach((f) => { const k = (1 - smooth(f.R, f.R + 1.6, Math.hypot(x - f.x, z - f.z))) * (1 - protect); if (k > 0.02) out.push({ from: f.from, k }); });
      return out;
    };
    const flatTarget = (x, z) => 0.22 + 0.06 * fbm(x * 0.3, z * 0.3);
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
      // 海：陸地多邊形外面壓到水面下，近岸先變沙灘再變海
      const sea = seaAt(x, z);
      if (sea > 0) h = THREE.MathUtils.lerp(h, -1.6 - 0.4 * sea, sea);
      return h;
    };
    // 市區整地是漸進的：某一年之後山腳才被鏟平（士林、北投、內湖、南港本來是谷底＋山坡）
    const heightAtYear = (x, z, year) => {
      const raw = heightAt(x, z); const pairs = urbanPairsAt(x, z); if (!pairs.length) return raw;
      let k = 0; for (const p of pairs) if (p.from <= year) k = Math.max(k, p.k);
      return k > 0 ? THREE.MathUtils.lerp(raw, Math.min(raw, flatTarget(x, z)), k) : raw;
    };
    this.heightRaw = heightAt; this.heightAtYear = heightAtYear;
    this.heightAt = (x, z) => heightAtYear(x, z, Infinity); // 預設＝全部開發完的地形（給現代建物、捷運用）
    const seg = this.weak ? 130 : 230;
    const tg = new THREE.PlaneGeometry(TERRAIN, TERRAIN, seg, seg); tg.rotateX(-Math.PI / 2);
    const pos = tg.attributes.position;
    const rawY = new Float32Array(pos.count), flatY = new Float32Array(pos.count); const morph = []; // morph：[頂點 idx, [{from,k}...]]
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i); const r = heightAt(x, z); rawY[i] = r; pos.setY(i, r);
      const pairs = urbanPairsAt(x, z); if (pairs.length && r > flatTarget(x, z) + 0.02) { flatY[i] = Math.min(r, flatTarget(x, z)); morph.push([i, pairs]); } else flatY[i] = r;
    }
    this.terrainMorph = { rawY, flatY, morph, year: -1 };
    tg.computeVertexNormals();
    const nrm = tg.attributes.normal;
    const col = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    const paddyA = new THREE.Color(0x9cc473), paddyB = new THREE.Color(0xb7d388), meadow = new THREE.Color(0xc9cf8c), forest = new THREE.Color(0x4f7a52), forestHi = new THREE.Color(0x6f9a62);
    const rock = new THREE.Color(0x8e8878), sand = new THREE.Color(0xe6d9b4), bed = new THREE.Color(0x7fa6a8);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), y = pos.getY(i);
      const slope = 1 - nrm.getY(i);
      const n = noise.noise(x * 0.08 + 3, z * 0.08) * 0.5 + 0.5;
      const n2 = noise.noise(x * 0.3 - 7, z * 0.3 + 2) * 0.5 + 0.5;
      c.copy(paddyA).lerp(paddyB, n);
      if (n2 > 0.7) c.lerp(meadow, 0.5);
      if (y > 0.6) c.lerp(n2 > 0.5 ? forest : forestHi, smooth(0.6, 2.2, y));
      if (slope > 0.42) c.lerp(rock, smooth(0.42, 0.7, slope));
      if (y < WATER_Y + 0.45) c.copy(sand).lerp(bed, smooth(WATER_Y + 0.45, WATER_Y - 0.6, y));
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    tg.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const terrain = new THREE.Mesh(tg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, flatShading: true }));
    terrain.receiveShadow = this.shadows; terrain.castShadow = false;
    this.scene.add(terrain); this.terrain = terrain;
    // 市區擴張：每個頂點記下「哪一年起、多大程度」變成市區（setEvent 再依年份上色）
    this.baseCol = col.slice(); this.terrainGeo = tg;
    const blobs = URBAN.map((u) => { const [x, z] = toWorld(u.lng, u.lat); return { from: u.from, x, z, R: u.r * S }; }).sort((a, b) => a.from - b.from);
    this.urbanBlobs = blobs;
    const urbanIdx = [], urbanFrom = [], urbanW = []; // 攤平：頂點索引、年份、權重（同頂點可多筆，依年份排好）
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), y = pos.getY(i);
      if (y > 1.3 || y < WATER_Y + 0.35) continue;
      for (const b of blobs) {
        const dist = Math.hypot(x - b.x, z - b.z); if (dist > b.R + 1.8) continue;
        const w = (1 - smooth(b.R, b.R + 1.8, dist)) * (0.75 + 0.25 * (noise.noise(x * 0.5, z * 0.5) * 0.5 + 0.5));
        if (w < 0.03) continue;
        urbanIdx.push(i); urbanFrom.push(b.from); urbanW.push(w);
      }
    }
    this.urban = { idx: urbanIdx, from: urbanFrom, w: urbanW, year: -1 };
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
      const items = []; let tries = 0;
      while (items.length < count && tries < count * 30) {
        tries += 1;
        const x = (rnd() - 0.5) * TERRAIN * 0.96, z = (rnd() - 0.5) * TERRAIN * 0.96;
        const h = heightAt(x, z);
        if (h < 0.7 || rnd() > smooth(0.7, 2.5, h)) continue;
        if (flats.some((f) => Math.hypot(x - f.x, z - f.z) < f.R + 1)) continue;
        let gone = Infinity; urbanPairsAt(x, z).forEach((p) => { if (p.k > 0.45) gone = Math.min(gone, p.from); }); // 哪一年被鏟平
        items.push({ x, z, h, sc: 0.55 + rnd() * 0.75, ry: rnd() * Math.PI * 2, c: kind === 0 ? [0x4f6f4e, 0x5e8458, 0x44654a][Math.floor(rnd() * 3)] : [0x6f9f5e, 0x8ab86f, 0x7aa065][Math.floor(rnd() * 3)], gone });
      }
      items.sort((a, b) => b.gone - a.gone); // 永遠在的排前面，越早被鏟的排後面
      items.forEach((it, i) => { dummy.position.set(it.x, it.h - 0.05, it.z); dummy.scale.set(it.sc, it.sc, it.sc); dummy.rotation.y = it.ry; dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix); mesh.setColorAt(i, tc.setHex(it.c)); });
      mesh.count = items.length; mesh.frustumCulled = false; mesh.castShadow = this.shadows && !this.weak; this.scene.add(mesh);
      (this.treeMeshes = this.treeMeshes || []).push({ mesh, gone: items.map((it) => it.gone) });
    });
    // 河名牌、海名牌
    rivers.forEach((r) => { const mid = r.w[Math.floor(r.w.length / 2)]; const tag = this.makeLabel("adi-river-tag", esc(r.name)); tag.position.set(mid[0], WATER_Y + 0.1, mid[1]); tag.always = true; });
    (ORIGIN.seaTags || []).forEach((s) => { const [x, z] = toWorld(s.lng, s.lat); const tag = this.makeLabel("adi-river-tag adi-sea-tag", esc(s.name)); tag.position.set(x, WATER_Y + 0.1, z); tag.always = true; });
    // 海上的浪花：沿岸撒一些白點（InstancedMesh）
    { const rnd2 = mulberry(77); const n = this.weak ? 120 : 320; const geo = new THREE.PlaneGeometry(0.5, 0.12); geo.rotateX(-Math.PI / 2);
      const foam = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 }), n); const d = new THREE.Object3D(); let k = 0, tries = 0;
      while (k < n && tries < n * 40) { tries++; const x = (rnd2() - 0.5) * TERRAIN * 0.95, z = (rnd2() - 0.5) * TERRAIN * 0.95; const s = seaAt(x, z); if (s < 0.55 || s > 0.95) continue; d.position.set(x, WATER_Y + 0.03, z); d.rotation.y = rnd2() * Math.PI; d.scale.setScalar(0.6 + rnd2()); d.updateMatrix(); foam.setMatrixAt(k++, d.matrix); }
      foam.count = k; foam.frustumCulled = false; this.scene.add(foam); this.foam = foam; }
    // 場景中心
    this.sceneRadius = ORIGIN.radius || 60; const [cx, cz] = toWorld(ORIGIN.centerLng ?? ORIGIN.lng, ORIGIN.centerLat ?? ORIGIN.lat); this.center = new THREE.Vector3(cx, 0, cz);
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
      const baseY = this.heightAtYear(x, z, p.from); // 蓋的那一年的地面
      const R = 0.6 + p.size * 0.42;
      const houses = [];
      const n = p.hill ? 3 : 3 + p.size * 3;
      const concrete = [mat(0xe6e2da), mat(0xd9d4cb), mat(0xcfd6dc), mat(0xf0ebe0)];
      const win = mat(0x5a6b7a, { roughness: 0.4, metalness: 0.2 });
      if (p.landmark === "tower") {
        // 總督府：長條主體＋中央高塔
        const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 0.9), mat(0xb8453a)); body.position.set(x, baseY + 0.35, z);
        const tower = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.9, 0.42), mat(0xb8453a)); tower.position.set(x, baseY + 0.95, z);
        const cap = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.4, 4), mat(0x4a4a52)); cap.position.set(x, baseY + 2.1, z); cap.rotation.y = Math.PI / 4;
        const bands = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.06, 0.94), mat(0xf4ead8)); bands.position.set(x, baseY + 0.45, z);
        [body, tower, cap, bands].forEach((m) => { m.castShadow = this.shadows; m.receiveShadow = this.shadows; g.add(m); }); houses.push(body, tower);
      } else if (p.landmark === "hall") {
        // 中正紀念堂：白色方體＋藍色八角頂＋大廣場＋牌樓
        const plaza = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.06, 2.4), mat(0xe9e4d8)); plaza.position.set(x, baseY + 0.03, z);
        const base2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 1.2), mat(0xf7f5f0)); base2.position.set(x - 0.9, baseY + 0.3, z);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.6, 8), mat(0x2f5fb3)); roof.position.set(x - 0.9, baseY + 0.85, z);
        const gate = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.6, 1.4), mat(0xf7f5f0)); gate.position.set(x + 1.4, baseY + 0.3, z);
        const gateTop = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 1.5), mat(0x2f5fb3)); gateTop.position.set(x + 1.4, baseY + 0.65, z);
        [plaza, base2, roof, gate, gateTop].forEach((m) => { m.castShadow = this.shadows; m.receiveShadow = this.shadows; g.add(m); }); houses.push(base2, roof);
      } else if (p.landmark === "t101") {
        const podium = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 1.1), mat(0x9fb9c9, { roughness: 0.3, metalness: 0.3 })); podium.position.set(x, baseY + 0.25, z); g.add(podium);
        for (let k = 0; k < 8; k++) { const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.26, 0.48, 4), mat(0x7fa3bd, { roughness: 0.25, metalness: 0.4 })); seg.position.set(x, baseY + 0.75 + k * 0.48, z); seg.rotation.y = Math.PI / 4; seg.castShadow = this.shadows; g.add(seg); houses.push(seg, seg); }
        const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.9, 5), mat(0xd9dde0)); spire.position.set(x, baseY + 4.9, z); g.add(spire);
      } else if (p.landmark && this.buildLandmark(p, g, x, z, baseY, houses, mat)) {
        /* 專屬模型見 buildLandmark */
      } else if (p.modern) {
        for (let i = 0; i < Math.max(3, n * 0.6); i++) {
          const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * R;
          const hx = x + Math.cos(a) * d, hz = z + Math.sin(a) * d;
          const w = 0.45 + rnd() * 0.4, dep = 0.4 + rnd() * 0.35, hh = (0.5 + rnd() * 0.9 * (p.size / 4)) * (p.tall && i % 3 === 0 ? p.tall : 1);
          const body = new THREE.Mesh(new THREE.BoxGeometry(w, hh, dep), concrete[i % 4]); body.position.set(hx, baseY + hh / 2, hz); body.rotation.y = rnd() * 0.5 - 0.25;
          const roof = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, 0.05, dep * 0.9), roofMat); roof.position.set(hx, baseY + hh + 0.025, hz); roof.rotation.y = body.rotation.y;
          const glass = new THREE.Mesh(new THREE.BoxGeometry(w * 0.7, hh * 0.7, 0.01), win); glass.position.set(hx, baseY + hh / 2, hz + dep / 2 + 0.006); glass.rotation.y = body.rotation.y;
          body.castShadow = this.shadows; body.receiveShadow = this.shadows; g.add(body, roof, glass); houses.push(body, roof);
        }
      } else
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
      const tag = this.makeLabel("adi-tag", `<u style="background:${hex6(grp.color)}"></u><b>${esc(p.name)}</b><small>${esc(p.today)}</small>`);
      tag.position.set(x, baseY + (p.hill ? 1.6 : 1.0) + p.size * 0.08, z); tag.data = { place: p.id }; tag.placeId = p.id;
      this.places.set(p.id, { p, g, x, z, y: baseY, R, houses, roofMat, tag, grp, charred: false });
    });
    this.proxies = proxies;
    this.charMat = mat(0x3a3330);
  }

  // ---------- 指標性建築：一個 landmark 一個小模型 ----------
  buildLandmark(p, g, x, z, y, houses, mat) {
    const sh = (m) => { m.castShadow = this.shadows; m.receiveShadow = this.shadows; g.add(m); return m; };
    const box = (w, h, d, m, dx = 0, dy = 0, dz = 0, ry = 0) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x + dx, y + dy + h / 2, z + dz); b.rotation.y = ry; return sh(b); };
    const cyl = (rt, rb, h, m, dx = 0, dy = 0, dz = 0, seg = 12) => { const c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); c.position.set(x + dx, y + dy + h / 2, z + dz); return sh(c); };
    const white = mat(0xf2ece0), cream = mat(0xe8dcc4), brick = mat(0xa8473c), dark = mat(0x3a3a40), grey = mat(0x8a8d90), glass = mat(0x8fb7d0, { roughness: 0.25, metalness: 0.35 }), green = mat(0x7fb069), steel = mat(0xc9ced3, { roughness: 0.35, metalness: 0.5 });
    const treeAt = (tx, tz, s = 1) => { const ty = this.heightAt(tx, tz); const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.3 * s, 5), mat(0x7d5a3c)); tr.position.set(tx, ty + 0.15 * s, tz); const cr = new THREE.Mesh(new THREE.IcosahedronGeometry(0.26 * s, 1), mat(0x6f9f5e)); cr.position.set(tx, ty + 0.42 * s, tz); sh(tr); sh(cr); };
    switch (p.landmark) {
      case "station": {
        // 月台＋候車室＋拱形屋頂＋一列小火車
        const old = p.group === "gov";
        box(1.9, 0.08, 0.9, mat(0xb9b2a4));
        const hall = box(1.1, 0.42, 0.62, old ? mat(0x8a6a48) : brick, 0, 0.08, -0.08);
        const vault = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 1.16, 14), old ? mat(0x5a4636) : mat(0x4a4a52)); vault.rotation.z = Math.PI / 2; vault.position.set(x, y + 0.5, z - 0.08); sh(vault);
        if (!old) { const clock = cyl(0.09, 0.09, 0.03, white, 0, 0.55, 0.26); clock.rotation.x = Math.PI / 2; }
        const loco = box(0.5, 0.18, 0.16, dark, -0.5, 0.08, 0.3); box(0.3, 0.14, 0.14, mat(0x6b2d2d), 0.0, 0.08, 0.3); box(0.3, 0.14, 0.14, mat(0x6b2d2d), 0.38, 0.08, 0.3); cyl(0.03, 0.03, 0.12, dark, -0.65, 0.26, 0.3);
        houses.push(hall, vault); void loco; return true;
      }
      case "octagon": {
        const body = cyl(0.42, 0.42, 0.62, brick, 0, 0, 0, 8); const roof = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.3, 8), dark); roof.position.set(x, y + 0.77, z); sh(roof);
        box(1.2, 0.35, 0.36, brick, 0.9, 0, 0); box(0.36, 0.35, 1.0, brick, 0.9, 0, 0);
        houses.push(body, roof); return true;
      }
      case "museum": {
        // 公園綠地＋希臘柱式博物館＋圓頂
        const lawn = new THREE.Mesh(new THREE.CircleGeometry(1.7, 24), green); lawn.rotation.x = -Math.PI / 2; lawn.position.set(x, y + 0.02, z); sh(lawn);
        const pond = new THREE.Mesh(new THREE.CircleGeometry(0.35, 16), mat(0x6fa9b8)); pond.rotation.x = -Math.PI / 2; pond.position.set(x + 0.6, y + 0.03, z + 0.7); g.add(pond);
        const hall = box(1.3, 0.5, 0.7, white, 0, 0, -0.6);
        for (let k = -2; k <= 2; k++) cyl(0.04, 0.04, 0.48, white, k * 0.24, 0.02, -0.22, 8);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(0x6f8f85)); dome.position.set(x, y + 0.5, z - 0.6); sh(dome);
        [[-1.2, 0.3], [1.2, -0.2], [-0.5, 1.1], [0.1, 1.3], [1.1, 0.9]].forEach(([dx, dz]) => treeAt(x + dx, z + dz, 0.9));
        houses.push(hall, dome); return true;
      }
      case "bridge": {
        // 橋：橋面＋桁架＋橋墩，rot＝方位、len＝長度（世界單位）
        const L = p.len || 4, rot = p.rot || 0; const deckY = WATER_Y + 0.5;
        const grpB = new THREE.Group(); grpB.position.set(x, 0, z); grpB.rotation.y = rot; g.add(grpB);
        const add = (geo, m, px, py, pz) => { const mm = new THREE.Mesh(geo, m); mm.position.set(px, py, pz); mm.castShadow = this.shadows; grpB.add(mm); return mm; };
        const iron = p.id === "taipeibridge";
        add(new THREE.BoxGeometry(L, 0.07, 0.36), iron ? grey : mat(0xcfc8bb), 0, deckY, 0);
        for (let k = -2; k <= 2; k++) add(new THREE.CylinderGeometry(0.07, 0.09, deckY - WATER_Y + 0.6, 8), mat(0x9c9484), k * (L / 5), (deckY + WATER_Y) / 2 - 0.3, 0);
        if (iron) {
          for (const sd of [-0.17, 0.17]) { add(new THREE.BoxGeometry(L, 0.04, 0.04), dark, 0, deckY + 0.42, sd); for (let k = -4; k <= 4; k++) add(new THREE.BoxGeometry(0.03, 0.4, 0.03), dark, k * (L / 9), deckY + 0.22, sd); for (let k = -4; k < 4; k++) { const dg = add(new THREE.BoxGeometry(0.03, 0.46, 0.03), dark, (k + 0.5) * (L / 9), deckY + 0.22, sd); dg.rotation.z = (k % 2 ? 1 : -1) * 0.75; } }
        } else {
          for (let k = -2; k <= 2; k += 2) { const arch = add(new THREE.TorusGeometry(L / 6.5, 0.035, 6, 16, Math.PI), mat(0xd9d2c4), k * (L / 3.2), deckY, 0); arch.rotation.y = 0; arch.position.y = deckY - 0.02; }
          for (const sd of [-0.17, 0.17]) add(new THREE.BoxGeometry(L, 0.05, 0.03), mat(0xd9d2c4), 0, deckY + 0.08, sd);
        }
        return true;
      }
      case "airport": {
        box(3.4, 0.04, 0.42, mat(0x5f6165), 0, 0, 0.3); box(3.2, 0.045, 0.03, white, 0, 0, 0.3);
        box(1.2, 0.04, 0.6, mat(0x8d9094), 0, 0, -0.4); const term = box(0.9, 0.22, 0.3, cream, 0, 0.04, -0.55); const tower = cyl(0.05, 0.05, 0.6, white, 0.7, 0.04, -0.6, 8); box(0.2, 0.08, 0.2, glass, 0.7, 0.64, -0.6);
        // 停機坪上的小飛機
        const pl = new THREE.Group(); pl.position.set(x - 0.4, y + 0.14, z - 0.35); g.add(pl);
        const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.5, 3, 8), white); body.rotation.z = Math.PI / 2; pl.add(body);
        const wing = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.02, 0.7), white); pl.add(wing);
        const tail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.16, 0.02), mat(0xd9433b)); tail.position.set(-0.28, 0.08, 0); pl.add(tail);
        pl.traverse((m) => { m.castShadow = this.shadows; });
        houses.push(term, tower); return true;
      }
      case "factory": {
        const a = box(1.5, 0.34, 0.5, mat(0xb07a62), 0, 0, -0.35); const b = box(1.5, 0.34, 0.5, mat(0xb07a62), 0, 0, 0.35); box(0.5, 0.3, 1.2, mat(0xb07a62), -0.9, 0, 0);
        for (let k = -2; k <= 2; k++) { const saw = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.14, 4), mat(0x6e6a66)); saw.rotation.y = Math.PI / 4; saw.position.set(x + k * 0.3, y + 0.41, z - 0.35); g.add(saw); const saw2 = saw.clone(); saw2.position.z = z + 0.35; g.add(saw2); }
        cyl(0.05, 0.07, 1.3, mat(0x4a4544), 0.9, 0, 0, 8);
        houses.push(a, b); return true;
      }
      case "sys": {
        box(2.6, 0.05, 2.2, mat(0xe9e4d8));
        const hall = box(1.3, 0.5, 1.3, cream, 0, 0.05, 0);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(1.25, 0.34, 4), mat(0xd9a441)); roof.rotation.y = Math.PI / 4; roof.position.set(x, y + 0.72, z); sh(roof);
        const eave = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 1.8), mat(0xd9a441)); eave.position.set(x, y + 0.56, z); sh(eave);
        for (let k = 0; k < 4; k++) cyl(0.04, 0.04, 0.5, mat(0x7a2e28), (k % 2 ? 0.6 : -0.6), 0.05, (k < 2 ? 0.6 : -0.6), 6);
        [[-1.1, 0.9], [1.1, 0.9], [-1.1, -0.9], [1.1, -0.9]].forEach(([dx, dz]) => treeAt(x + dx, z + dz, 0.8));
        houses.push(hall, roof); return true;
      }
      case "park": {
        const lawn = new THREE.Mesh(new THREE.CircleGeometry(1.9, 28), green); lawn.rotation.x = -Math.PI / 2; lawn.position.set(x, y + 0.02, z); sh(lawn);
        const pond = new THREE.Mesh(new THREE.CircleGeometry(0.45, 16), mat(0x6fa9b8)); pond.rotation.x = -Math.PI / 2; pond.position.set(x - 0.5, y + 0.03, z + 0.4); pond.scale.x = 1.5; g.add(pond);
        const rnd = mulberry(77); for (let k = 0; k < 16; k++) { const a = rnd() * Math.PI * 2, d = 0.5 + rnd() * 1.3; treeAt(x + Math.cos(a) * d, z + Math.sin(a) * d, 0.7 + rnd() * 0.6); }
        const stage = cyl(0.3, 0.3, 0.08, mat(0xd8d2c6), 0.8, 0.02, -0.6, 10); houses.push(stage, stage); return true;
      }
      case "arena": {
        const base = cyl(0.68, 0.72, 0.32, steel, 0, 0, 0, 24);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.68, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), white); dome.scale.y = 0.42; dome.position.set(x, y + 0.32, z); sh(dome);
        houses.push(base, dome); return true;
      }
      case "dome": {
        box(2.6, 0.05, 2.4, mat(0xdcd8d0));
        const base = cyl(1.05, 1.1, 0.3, mat(0xd6d3cc), 0, 0.05, 0, 28);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(1.05, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xf4f2ee)); dome.scale.y = 0.5; dome.position.set(x, y + 0.35, z); sh(dome);
        for (let k = 0; k < 6; k++) { const rib = new THREE.Mesh(new THREE.TorusGeometry(1.06, 0.015, 5, 24, Math.PI), mat(0xb9b5ad)); rib.rotation.y = (k / 6) * Math.PI; rib.scale.y = 0.5; rib.position.set(x, y + 0.35, z); g.add(rib); }
        houses.push(base, dome); return true;
      }
      case "tpac": {
        const cube = box(0.9, 0.9, 0.9, glass, 0, 0.15, 0); for (let k = 0; k < 4; k++) cyl(0.05, 0.05, 0.15, grey, (k % 2 ? 0.35 : -0.35), 0, (k < 2 ? 0.35 : -0.35), 6);
        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 14), mat(0x9fb9c9, { roughness: 0.3, metalness: 0.4 })); ball.position.set(x - 0.55, y + 0.72, z); sh(ball);
        box(0.5, 0.4, 0.5, mat(0xd8d2c6), 0.65, 0.5, 0); box(0.5, 0.4, 0.5, mat(0xd8d2c6), 0, 0.55, 0.65);
        houses.push(cube, ball); return true;
      }
      default: return false;
    }
  }

  // ---------- 城市方塊：隨年份長出來的街廓（一張 InstancedMesh，依年份排序後改 count） ----------
  buildCity() {
    const rnd = mulberry(2026);
    const items = [];
    const placeFoot = [...this.places.values()].map((pl) => ({ x: pl.x, z: pl.z, R: pl.R + 0.7 }));
    const density = this.weak ? 9 : 26; // 每平方公里幾塊
    for (const b of this.urbanBlobs) {
      const n = Math.round(density * Math.PI * (b.R / S) * (b.R / S));
      let tries = 0, placed = 0;
      while (placed < n && tries < n * 6) {
        tries += 1;
        const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * b.R;
        const x = b.x + Math.cos(a) * d, z = b.z + Math.sin(a) * d;
        const h = this.heightAt(x, z);
        if (h > 1.2 || h < WATER_Y + 0.45) continue;
        if (placeFoot.some((f) => Math.hypot(x - f.x, z - f.z) < f.R)) continue;
        const era = b.from < 1920 ? 0 : b.from < 1950 ? 1 : b.from < 1975 ? 2 : b.from < 1995 ? 3 : 4;
        const base = [0.14, 0.18, 0.28, 0.4, 0.5][era], spread = [0.1, 0.14, 0.25, 0.45, 0.7][era];
        let hh = base + rnd() * spread; if (era >= 3 && rnd() < 0.08) hh *= 2.2;
        const w = 0.22 + rnd() * 0.22, dp = 0.22 + rnd() * 0.22;
        const c = era <= 1 ? [0xe3d6c0, 0xd9cbb3, 0xcdbfa8][Math.floor(rnd() * 3)] : era === 2 ? [0xd8d2c6, 0xc9c4ba, 0xd2cbbf][Math.floor(rnd() * 3)] : [0xd9dadb, 0xc7ccd1, 0xe2e4e6, 0xb8c2cc][Math.floor(rnd() * 4)];
        items.push({ from: b.from, x, z, h, w, dp, hh, ry: rnd() * 0.6 - 0.3, c });
        placed += 1;
      }
    }
    items.sort((a, b) => a.from - b.from);
    const geo = new THREE.BoxGeometry(1, 1, 1); geo.translate(0, 0.5, 0);
    const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ roughness: 0.85 }), Math.max(1, items.length));
    const dummy = new THREE.Object3D(); const col = new THREE.Color();
    items.forEach((it, i) => { dummy.position.set(it.x, it.h, it.z); dummy.scale.set(it.w, it.hh, it.dp); dummy.rotation.y = it.ry; dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix); mesh.setColorAt(i, col.setHex(it.c)); });
    mesh.count = 0; mesh.frustumCulled = false; mesh.castShadow = this.shadows && !this.weak; mesh.receiveShadow = this.shadows;
    this.scene.add(mesh); this.city = { mesh, from: items.map((it) => it.from) };
  }

  // ---------- 線：鐵路、捷運、高速公路（＋沿線跑的小車） ----------
  buildLines() {
    this.lines = []; this.vehicles = [];
    const pillarGeo = new THREE.CylinderGeometry(0.05, 0.06, 1, 6); pillarGeo.translate(0, 0.5, 0);
    LINES.forEach((ln) => {
      const kind = ln.kind;
      const lift = kind === "mrt" ? 0.55 : kind === "highway" ? 0.42 : kind === "subway" ? 0.05 : kind === "road" ? 0.1 : 0.06;
      const w = ln.pts.map(([lng, lat]) => toWorld(lng, lat));
      const pts = [];
      for (let i = 0; i < w.length - 1; i++) { const a = new THREE.Vector3(w[i][0], 0, w[i][1]), b = new THREE.Vector3(w[i + 1][0], 0, w[i + 1][1]); const n = Math.max(4, Math.ceil(a.distanceTo(b) / 0.6)); for (let k = (i === 0 ? 0 : 1); k <= n; k++) { const v = a.clone().lerp(b, k / n); v.y = Math.max(this.heightAtYear(v.x, v.z, ln.from), WATER_Y + 0.3) + lift; pts.push(v); } }
      const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.15);
      const g = new THREE.Group(); g.visible = false; this.scene.add(g);
      const segs = Math.max(40, pts.length * 3);
      if (kind === "rail") {
        g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, segs, 0.09, 5, false), new THREE.MeshStandardMaterial({ color: 0xa39a86, roughness: 1 })));
        const rail = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, 0.045, 5, false), new THREE.MeshStandardMaterial({ color: 0x4a3f36, roughness: 0.8 })); rail.position.y = 0.05; g.add(rail);
      } else if (kind === "subway") {
        g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, segs, 0.06, 5, false), new THREE.MeshBasicMaterial({ color: ln.color || 0x2f6fc4, transparent: true, opacity: 0.45 })));
      } else {
        const m = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, kind === "highway" ? 0.16 : kind === "road" ? 0.12 : 0.09, 6, false), new THREE.MeshStandardMaterial({ color: kind === "highway" ? 0x7c7f83 : kind === "road" ? 0x8a8d90 : (ln.color || 0xc48c31), roughness: 0.7 })); m.castShadow = this.shadows; g.add(m);
        const L = curve.getLength(); const n = kind === "road" ? 0 : Math.floor(L / 1.1);
        const pil = new THREE.InstancedMesh(pillarGeo, new THREE.MeshStandardMaterial({ color: 0xb5b2aa, roughness: 0.9 }), Math.max(1, n)); pil.count = n; const d = new THREE.Object3D();
        for (let k = 0; k < n; k++) { const p = curve.getPointAt((k + 0.5) / n); const gy = Math.max(this.heightAt(p.x, p.z), WATER_Y + 0.05); d.position.set(p.x, gy, p.z); d.scale.set(1, Math.max(0.05, p.y - gy), 1); d.updateMatrix(); pil.setMatrixAt(k, d.matrix); }
        pil.castShadow = this.shadows; g.add(pil);
      }
      // 小車
      if (!this.reducedMotion && kind !== "subway") {
        const veh = new THREE.Group();
        if (kind === "rail") { const loco = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.16, 0.16), new THREE.MeshStandardMaterial({ color: 0x2b2b2b })); loco.position.y = 0.1; veh.add(loco); const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 6), new THREE.MeshStandardMaterial({ color: 0x2b2b2b })); ch.position.set(0.14, 0.22, 0); veh.add(ch); for (let k = 1; k <= 2; k++) { const car = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.14, 0.15), new THREE.MeshStandardMaterial({ color: 0x6b2d2d })); car.position.set(-0.46 * k, 0.09, 0); veh.add(car); } }
        else if (kind === "mrt") { for (let k = 0; k < 3; k++) { const car = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.16), new THREE.MeshStandardMaterial({ color: 0xf2f2f2 })); car.position.set(-0.46 * k, 0.1, 0); veh.add(car); const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.05, 0.17), new THREE.MeshStandardMaterial({ color: ln.color || 0xc48c31 })); stripe.position.set(-0.46 * k, 0.1, 0); veh.add(stripe); } }
        else { for (let k = 0; k < 3; k++) { const car = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.12), new THREE.MeshStandardMaterial({ color: [0xd9433b, 0xf2f2f2, 0x3f7fc4][k] })); car.position.set(-0.9 * k, 0.07, (k % 2 ? 0.07 : -0.07)); veh.add(car); } }
        veh.traverse((m) => { m.castShadow = this.shadows; }); g.add(veh);
        this.vehicles.push({ veh, curve, speed: kind === "highway" ? 0.03 : kind === "mrt" ? 0.025 : 0.015, off: Math.random(), g });
      }
      this.lines.push({ ln, g });
    });
  }
  applyYear(year) {
    // 地形整地：被開發的山腳這一年起往下壓
    const tm = this.terrainMorph; if (tm && tm.year !== year) {
      tm.year = year; const pos = this.terrainGeo.attributes.position;
      for (const [i, pairs] of tm.morph) { let k = 0; for (const p of pairs) if (p.from <= year) k = Math.max(k, p.k); pos.setY(i, k > 0 ? THREE.MathUtils.lerp(tm.rawY[i], tm.flatY[i], k) : tm.rawY[i]); }
      pos.needsUpdate = true; this.terrainGeo.computeVertexNormals();
      (this.treeMeshes || []).forEach((t) => { let n = 0; while (n < t.gone.length && t.gone[n] > year) n += 1; t.mesh.count = n; });
    }
    // 地形上色：市區色塊
    const u = this.urban; if (u && u.year !== year) {
      u.year = year;
      const col = this.terrainGeo.attributes.color.array; col.set(this.baseCol);
      const cOld = new THREE.Color(0xd9ccb4), cMid = new THREE.Color(0xd3cec4), cNew = new THREE.Color(0xcdd0d3);
      const c = new THREE.Color();
      for (let k = 0; k < u.idx.length; k++) {
        const from = u.from[k]; if (from > year) continue;
        const i = u.idx[k] * 3; c.setRGB(col[i], col[i + 1], col[i + 2]);
        c.lerp(from < 1950 ? cOld : from < 1990 ? cMid : cNew, u.w[k] * 0.9);
        col[i] = c.r; col[i + 1] = c.g; col[i + 2] = c.b;
      }
      this.terrainGeo.attributes.color.needsUpdate = true;
    }
    if (this.city) { let n = 0; const f = this.city.from; while (n < f.length && f[n] <= year) n += 1; this.city.mesh.count = n; }
    (this.lines || []).forEach(({ ln, g }) => { g.visible = ln.from <= year && (ln.until == null || year <= ln.until); });
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
    this.applyYear(year);
    this.clearFx();
    (ev.attacks || []).forEach((a) => this.addAttack(a));
    (ev.migrate || []).forEach((m) => this.addMigration(m));
    (ev.voyages || []).forEach((v) => this.addVoyage(v));
    burned.forEach((id) => this.addFire(id));
    (ev.defend || []).forEach((id) => this.addPulse(id));
    (ev.pulses || []).forEach((pu) => this.addPulse(pu.place, pu.color));
    (ev.rally || []).forEach((id) => this.addRally(id));
    this.flyToFocus(ev.focus || [], instant);
    this.onEvent && this.onEvent(i, ev);
    this.requestRender();
  }
  clearFx() {
    while (this.fxGroup.children.length) { const c = this.fxGroup.children.pop(); c.traverse((m) => { if (m.geometry) m.geometry.dispose(); if (m.material && m.material.dispose) m.material.dispose(); }); }
    this.fires = []; this.marchers = []; this.pulses = []; this.crowd = []; this.boats = [];
  }
  groundY(x, z) { return Math.max(this.heightAt(x, z), WATER_Y + 0.08) + 0.02; }
  // ids：地點 id 或 [lng, lat]（海上的點）
  pathOf(ids) {
    const pts = ids.map((id) => { if (Array.isArray(id)) { const [x, z] = toWorld(id[0], id[1]); return new THREE.Vector3(x, 0, z); } const pl = this.places.get(id); return pl ? new THREE.Vector3(pl.x, 0, pl.z) : null; }).filter(Boolean);
    if (pts.length < 2) return null;
    // 直線切段，貼地
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1]; const n = Math.max(6, Math.ceil(a.distanceTo(b) / 0.8));
      for (let k = (i === 0 ? 0 : 1); k <= n; k++) { const v = a.clone().lerp(b, k / n); v.y = this.groundY(v.x, v.z); out.push(v); }
    }
    return new THREE.CatmullRomCurve3(out, false, "catmullrom", 0.2);
  }
  // 渡海：從海上的點（或對岸）坐船到某個地點；船到岸邊之後換成走路的人
  addVoyage(v) {
    const grp = GROUP[v.group] || GROUP.other;
    const to = this.places.get(v.to); if (!to) return;
    const path = this.pathOf([v.from, v.to]); if (!path) return;
    const tube = new THREE.Mesh(new THREE.TubeGeometry(path, 80, 0.06, 5, false), new THREE.MeshBasicMaterial({ color: grp.color, transparent: true, opacity: 0.55 }));
    tube.position.y = 0.12; this.fxGroup.add(tube);
    if (this.reducedMotion) return;
    const n = v.boats || (this.weak ? 2 : 3);
    for (let k = 0; k < n; k++) {
      const boat = new THREE.Group();
      const hull = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.26), new THREE.MeshStandardMaterial({ color: 0x6b4a2e, roughness: 0.8 })); hull.position.y = 0.07; boat.add(hull);
      const bow = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.3, 4), new THREE.MeshStandardMaterial({ color: 0x6b4a2e })); bow.rotation.z = -Math.PI / 2; bow.rotation.y = Math.PI / 4; bow.position.set(0.5, 0.07, 0); boat.add(bow);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.7, 4), new THREE.MeshStandardMaterial({ color: 0x3a2a1a })); mast.position.set(0, 0.45, 0); boat.add(mast);
      const sail = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.5), new THREE.MeshStandardMaterial({ color: 0xf4e8cf, side: THREE.DoubleSide })); sail.position.set(-0.05, 0.5, 0.01); sail.rotation.y = 0.35; boat.add(sail);
      for (let p = 0; p < 2 + (k % 2); p++) { const fig = this.makeFigure(grp.color); fig.scale.setScalar(0.65); fig.position.set(-0.2 + p * 0.22, 0.1, 0); fig.userData.legs.forEach((l) => { l.rotation.x = 1.3; }); boat.add(fig); }
      boat.traverse((m) => { m.castShadow = this.shadows; }); this.fxGroup.add(boat);
      this.boats.push({ boat, path, off: k / n, speed: 0.022 });
    }
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
  addRally(id) {
    // 示威人群：圍在地點外圈、舉手、上下跳
    const pl = this.places.get(id); if (!pl || this.reducedMotion) return;
    const rnd = mulberry(id.length * 31 + 7);
    const n = this.weak ? 14 : 28;
    const shirts = [0xf2b544, 0xffffff, 0x1f1d1b, 0xe0703c, 0xf2b544, 0x3fa7d6];
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2 + rnd() * 0.2, d = pl.R + 0.5 + rnd() * 1.4;
      const fx = pl.x + Math.cos(a) * d, fz = pl.z + Math.sin(a) * d;
      const fig = this.makeFigure(shirts[k % shirts.length]);
      fig.position.set(fx, this.groundY(fx, fz), fz); fig.rotation.y = Math.atan2(pl.x - fx, pl.z - fz);
      const sign = k % 4 === 0 ? new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.18, 0.02), new THREE.MeshStandardMaterial({ color: k % 8 === 0 ? 0xf2b544 : 0xffffff })) : null;
      if (sign) { sign.position.set(0, 0.2, 0); fig.userData.arms[1].add(sign); }
      this.fxGroup.add(fig); this.crowd.push({ fig, ph: rnd() * 6, y0: fig.position.y });
    }
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
    for (const c of this.crowd) { const A = c.fig.userData.arms; const up = -2.6 + Math.sin(t * 5 + c.ph) * 0.3; A[0].rotation.x = up; A[1].rotation.x = up; c.fig.position.y = c.y0 + Math.max(0, Math.sin(t * 5 + c.ph)) * 0.08; }
    for (const pu of this.pulses) { const k = (t * 0.6) % 1; const s = 1 + k * 0.6; pu.m.scale.set(s, s, 1); pu.m.material.opacity = 0.8 * (1 - k); }
    for (const b of this.boats) {
      const k = (b.off + t * b.speed) % 1;
      const p = b.path.getPointAt(k), q = b.path.getPointAt(Math.min(1, k + 0.01));
      b.boat.position.set(p.x, Math.max(p.y, WATER_Y + 0.02) + Math.sin(t * 2.2 + b.off * 9) * 0.03, p.z);
      b.boat.rotation.y = Math.atan2(q.x - p.x, q.z - p.z) - Math.PI / 2; b.boat.rotation.z = Math.sin(t * 1.7 + b.off * 5) * 0.06;
    }
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
    const d = Math.max(15, size * 0.85 + 11);
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
    this.labelEl.addEventListener("click", (e) => { const t = e.target.closest(".adi-tag"); if (!t) return; const o = this.labels.find((l) => l.el === t); if (!o || !o.data.place) return; this.stopTour(); this.flyToPlace(o.data.place); this.onPlace && this.onPlace(o.data.place); });
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
      for (const v of this.vehicles || []) { if (!v.g.visible) continue; const k = (v.off + t * v.speed) % 1; const p = v.curve.getPointAt(k), q = v.curve.getPointAt(Math.min(1, k + 0.004)); v.veh.position.copy(p); v.veh.rotation.y = Math.atan2(q.x - p.x, q.z - p.z) - Math.PI / 2; }
      this.clouds.forEach((c) => { c.g.position.x += dt * c.speed; if (c.g.position.x > 120) c.g.position.x = -120; });
      this.waterMat.uniforms.uTime.value = t; animating = true;
    }
    if (this.tour) { const dur = 20; const k = (t - this.tour.t0) / dur; this.onProgress && this.onProgress(Math.min(1, k)); if (k >= 1) { if (this.eventIdx >= EVENTS.length - 1) this.stopTour(); else this.next(); } }
    if (!this.dirty && !animating) return;
    this.dirty = false; this.renderer.render(this.scene, this.camera); this.renderLabels();
  }
  dispose() { this.disposed = true; cancelAnimationFrame(this.raf); this.ro.disconnect(); this.controls.dispose(); this.renderer.dispose(); }
}

// ---------- 掛到頁面：按鈕列、年表、故事卡、年份牌 ----------
export function mountAodi(container) {
  if (!container) return null;
  let scene;
  try { scene = new HistoryScene(container); window.__adiScene = scene; }
  catch (err) { console.error("aodi init failed", err); container.innerHTML = `<div style="padding:24px;text-align:center;color:#555">這台裝置開不了 3D（WebGL）。年表請看下面的文字版。</div>`; return null; }

  const pills = document.createElement("div"); pills.className = "adi-pills";
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
  const badge = document.createElement("div"); badge.className = "adi-badge"; container.appendChild(badge);
  // 圖例
  const legend = document.createElement("div"); legend.className = "adi-legend";
  legend.innerHTML = Object.keys(GROUP).filter((k) => GROUP[k].short).map((k) => `<span><u style="background:${hex6(GROUP[k].color)}"></u>${esc(GROUP[k].short)}</span>`).join("");
  container.appendChild(legend);
  // 年表（下方）
  const tl = document.createElement("div"); tl.className = "adi-timeline";
  tl.innerHTML = `<button type="button" class="adi-nav" data-dir="-1" title="上一站">‹</button><div class="adi-years">${EVENTS.map((e, i) => `<button type="button" data-i="${i}"><b>${esc(e.label)}</b><span>${esc(e.title.split("：")[0])}</span><i></i></button>`).join("")}</div><button type="button" class="adi-nav" data-dir="1" title="下一站">›</button>`;
  tl.addEventListener("click", (e) => { const nav = e.target.closest(".adi-nav"); if (nav) { scene.stopTour(); Number(nav.dataset.dir) > 0 ? scene.next() : scene.prev(); return; } const b = e.target.closest("button[data-i]"); if (!b) return; scene.stopTour(); scene.setEvent(Number(b.dataset.i)); });
  container.appendChild(tl);
  // 故事卡（左）
  const card = document.createElement("div"); card.className = "adi-card show"; container.appendChild(card);
  const caption = document.createElement("div"); caption.className = "adi-caption"; container.appendChild(caption);

  // ---------- 族譜面板：九代一棵樹，年表走到哪一代就亮哪一代 ----------
  // 公開版 TREE 只到第 4 代；按「🔑 家族版」解開 tree.enc.json 之後整棵換掉（PRIV）
  let PRIV = null; let LINE = [];
  const treeBtn = mk("🌳 族譜", () => toggleTree(), "吳合成九代族譜");
  const treeEl = document.createElement("div"); treeEl.className = "adi-tree"; container.appendChild(treeEl);
  const renderNode = (n, gen) => {
    const tags = [];
    if (n.spouse) tags.push(`<i class="adi-sp">配 ${esc(n.spouse)}</i>`);
    if (n.note) tags.push(`<i class="adi-nt">${esc(n.note)}</i>`);
    const kids = (n.kids || []).map((k) => renderNode(k, gen + 1)).join("");
    const below = n.below ? `<ul><li class="adi-locked" data-gen="${gen + 1}" data-name=""><span class="adi-person"><i class="adi-nt">🔒 ${esc(n.below)}</i></span></li></ul>` : "";
    return `<li data-gen="${gen}" data-name="${esc(n.name)}"><span class="adi-person"><b>${esc(n.name)}</b>${tags.join("")}</span>${kids ? `<ul>${kids}</ul>` : below}</li>`;
  };
  // 樹狀圖（跟家裡那張圖一樣：世代橫列、名字直寫、配偶寫在左邊、上面一條橫槓接子女）
  const renderChart = (tree) => {
    const SLOT = 46, ROW = 118, TOP = 28, LEFT = 40, CH = 17; // 一格寬、一代高、字高
    const nodes = []; let leaf = 0, maxGen = 1;
    const layout = (n, gen) => {
      const o = { n, gen, kids: [] }; maxGen = Math.max(maxGen, gen);
      const kids = n.kids || (n.below ? [{ name: "🔒", note: n.below, locked: true }] : []);
      if (!kids.length) { o.x = leaf * SLOT; leaf += 1; }
      else { o.kids = kids.map((k) => layout(k, gen + 1)); o.x = (o.kids[0].x + o.kids[o.kids.length - 1].x) / 2; }
      nodes.push(o); return o;
    };
    layout(tree, 1);
    const W = Math.max(420, LEFT + leaf * SLOT + 20), H = TOP + maxGen * ROW + 20;
    const yOf = (gen) => TOP + (gen - 1) * ROW;
    const vt = (x, y, txt, cls) => `<text class="${cls}" x="${x}" y="${y}" style="writing-mode:vertical-rl;text-orientation:mixed">${esc(txt)}</text>`;
    let lines = "", texts = "";
    for (const o of nodes) {
      const x = LEFT + o.x + SLOT / 2, y = yOf(o.gen);
      const nameLen = o.n.name.length, h = nameLen * CH + 4;
      const note = o.n.locked ? o.n.note : (o.n.note && o.n.note.length <= 4 ? `（${o.n.note}）` : ""); // 圖上只放短註記（止／無男／在巴西／小名），長的看清單
      texts += `<g class="adi-node${o.n.locked ? " adi-locked" : ""}" data-gen="${o.gen}" data-name="${esc(o.n.locked ? "" : o.n.name)}" transform="translate(${x},${y})">` +
        `<rect x="-14" y="-4" width="28" height="${h + 4}" rx="6"></rect>` +
        vt(0, 0, o.n.name, "adi-nm") +
        (o.n.spouse ? vt(-19, 0, o.n.spouse, "adi-spn") : "") +
        (note ? vt(o.n.locked ? 0 : 0, h + 2, o.n.locked ? "" : note, "adi-ntn") : "") +
        (o.n.locked ? `<text class="adi-ntn adi-lockt" x="-14" y="${h + 14}" text-anchor="start">${esc(o.n.note.split("（")[0])}（家族版）</text>` : "") +
        `</g>`;
      if (o.kids.length) {
        const bus = y + ROW - 22;
        lines += `<line x1="${x}" y1="${y + h + (note && !o.n.locked ? note.length * CH : 0)}" x2="${x}" y2="${bus}"></line>`;
        const x0 = LEFT + o.kids[0].x + SLOT / 2, x1 = LEFT + o.kids[o.kids.length - 1].x + SLOT / 2;
        lines += `<line x1="${x0}" y1="${bus}" x2="${x1}" y2="${bus}"></line>`;
        o.kids.forEach((k) => { const kx = LEFT + k.x + SLOT / 2; lines += `<line x1="${kx}" y1="${bus}" x2="${kx}" y2="${yOf(k.gen) - 6}"></line>`; });
      }
    }
    let gens = "";
    for (let g = 1; g <= maxGen; g++) gens += `<g class="adi-genbox" data-g="${g}" transform="translate(6,${yOf(g)})"><rect x="0" y="-4" width="22" height="30" rx="4"></rect><text x="11" y="16" text-anchor="middle">${g}</text></g>`;
    return `<svg class="adi-chart-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><g class="adi-lines">${lines}</g>${texts}<g class="adi-gens-col">${gens}</g></svg>`;
  };
  const oursBtn = document.createElement("button"); oursBtn.type = "button"; oursBtn.className = "adi-ours"; oursBtn.textContent = "⭐ 只看我們這一房";
  oursBtn.addEventListener("click", () => { const on = !treeEl.classList.contains("only"); treeEl.classList.toggle("only", on); oursBtn.setAttribute("aria-pressed", on ? "true" : "false"); });
  const renderTree = (tree, me) => {
    const total = PRIV ? null : TOTAL;
    const sub = PRIV ? `來台九代・全部名字（家族版）。點名字可以看那一代在年表的哪一站。` : `公開版只有來台第一代；全族 ${total.people} 人、${total.gens} 代，名字按「🔑 家族版」解鎖。`;
    treeEl.innerHTML = `<div class="adi-tree-head"><b>吳合成・澳底尖山腳吳家族譜</b><small>${sub}</small><button type="button" class="adi-tree-x" title="關閉">✕</button></div><div class="adi-tree-gens">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((g) => `<button type="button" data-g="${g}">第${g}代</button>`).join("")}</div><div class="adi-tree-body"><ul class="adi-tree-root">${renderNode(tree, 1)}</ul></div><div class="adi-chart">${renderChart(tree)}</div>`;
    const viewBtn = document.createElement("button"); viewBtn.type = "button"; viewBtn.className = "adi-view"; viewBtn.textContent = "🌲 樹狀圖";
    viewBtn.addEventListener("click", () => { const on = !treeEl.classList.contains("chart"); treeEl.classList.toggle("chart", on); viewBtn.textContent = on ? "☰ 清單" : "🌲 樹狀圖"; viewBtn.setAttribute("aria-pressed", on ? "true" : "false");
      if (on) { const meG = treeEl.querySelector("g.adi-node.me"); if (meG) meG.scrollIntoView({ block: "center", inline: "center" }); else treeEl.querySelector(".adi-chart").scrollTo(0, 0); } try { localStorage.setItem("adi-view", on ? "chart" : "list"); } catch (e) { /* 無痕 */ } });
    treeEl.querySelector(".adi-tree-gens").appendChild(viewBtn);
    try { if (localStorage.getItem("adi-view") === "chart") viewBtn.click(); } catch (e) { /* 無痕 */ }
    // 直系：從「我」往上走到吳敝公，整條標 line；我標 me；我的小孩也算
    LINE = []; const meLi = me ? treeEl.querySelector(`li[data-name="${CSS.escape(me)}"]`) : null;
    if (meLi) { meLi.classList.add("me"); let el = meLi; while (el && el.tagName === "LI") { el.classList.add("line"); LINE.unshift(el.dataset.name); el = el.parentElement && el.parentElement.closest("li"); } [...meLi.querySelectorAll(":scope > ul > li")].forEach((k) => { k.classList.add("line"); LINE.push(k.dataset.name); }); }
    treeEl.querySelectorAll("g.adi-node").forEach((g) => { if (LINE.includes(g.dataset.name)) g.classList.add("line"); if (me && g.dataset.name === me) g.classList.add("me"); });
    if (meLi) treeEl.querySelector(".adi-tree-gens").appendChild(oursBtn);
    treeEl.querySelector(".adi-tree-x").addEventListener("click", () => toggleTree(false));
    treeEl.querySelector(".adi-tree-gens").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-g]"); if (!b) return; const g = Number(b.dataset.g);
      const i = EVENTS.findIndex((ev) => ev.gen === g); if (i >= 0) { scene.setEvent(i); } else markGen(g);
      const first = treeEl.querySelector(treeEl.classList.contains("chart") ? `g.adi-genbox[data-g="${g}"]` : `li[data-gen="${g}"]`); if (first) first.scrollIntoView({ block: "center", behavior: "smooth" });
    });
    treeEl.querySelector(".adi-chart").addEventListener("click", (e) => {
      const g = e.target.closest("g.adi-node"); if (!g) return;
      if (g.classList.contains("adi-locked")) { openUnlock(); return; }
      const gen = Number(g.dataset.gen); const i = EVENTS.findIndex((ev) => ev.gen === gen || (evView(ev).people || []).includes(g.dataset.name));
      if (i >= 0) scene.setEvent(i);
    });
    treeEl.querySelector(".adi-tree-body").addEventListener("click", (e) => {
      const li = e.target.closest("li"); if (!li) return; e.stopPropagation();
      if (li.classList.contains("adi-locked")) { openUnlock(); return; }
      const g = Number(li.dataset.gen); const i = EVENTS.findIndex((ev) => ev.gen === g || (evView(ev).people || []).includes(li.dataset.name));
      if (i >= 0) scene.setEvent(i);
    });
  };
  const toggleTree = (force) => { const on = force != null ? force : !treeEl.classList.contains("show"); treeEl.classList.toggle("show", on); treeBtn.setAttribute("aria-pressed", on ? "true" : "false"); if (on) scene.stopTour(); };
  const markGen = (gen, people) => {
    treeEl.querySelectorAll("li, g.adi-node").forEach((li) => { li.classList.toggle("on", Number(li.dataset.gen) === gen); li.classList.toggle("hit", !!(people && people.includes(li.dataset.name))); });
    treeEl.querySelectorAll(".adi-tree-gens button[data-g], g.adi-genbox").forEach((b) => b.classList.toggle("on", Number(b.dataset.g) === gen));
  };
  // 這一站的資料：公開的 ev 疊上家族版的覆寫（people／ours／story／pop）
  const evView = (ev) => (PRIV && PRIV.events && PRIV.events[ev.id]) ? { ...ev, ...PRIV.events[ev.id] } : ev;
  renderTree(TREE, ME);

  // ---------- 🔑 家族版：下載密文、用密碼在瀏覽器裡解開（WebCrypto：PBKDF2 → AES-256-GCM）----------
  const b64 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
  // 密碼正規化：NFC、去頭尾空白、半形 , . 轉全形 ，。（跟 bin/encrypt-tree.swift 一樣）
  const normPw = (pw) => pw.normalize("NFC").trim().replace(/,/g, "，").replace(/\./g, "。");
  const decryptTree = async (pw0) => {
    const pw = normPw(pw0);
    const res = await fetch(TREE_ENC_URL); if (!res.ok) throw new Error("載入密文失敗");
    const enc = await res.json();
    const baseKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(enc.salt), iterations: enc.iter, hash: "SHA-256" }, baseKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(enc.iv) }, key, b64(enc.ct));
    return JSON.parse(new TextDecoder().decode(plain));
  };
  const unlockBtn = mk("🔑 家族版", () => (PRIV ? lock() : openUnlock()), "輸入家族密碼，看第 5 代以後的名字");
  const unlockEl = document.createElement("div"); unlockEl.className = "adi-unlock"; container.appendChild(unlockEl);
  unlockEl.innerHTML = `<form class="adi-unlock-box"><b>🔑 家族版</b><p>族譜上的名字有加密。密碼在家族群組裡；解開只在你的手機／電腦上進行，不會傳到任何地方。</p><input type="password" name="pw" autocomplete="current-password" placeholder="家族密碼" required><div class="adi-unlock-row"><button type="button" class="adi-mini adi-unlock-x">取消</button><button type="submit" class="adi-mini adi-unlock-go">解鎖</button></div><small class="adi-unlock-msg"></small></form>`;
  const openUnlock = () => { unlockEl.classList.add("show"); unlockEl.querySelector(".adi-unlock-msg").textContent = ""; setTimeout(() => unlockEl.querySelector("input").focus(), 50); scene.stopTour(); };
  const closeUnlock = () => { unlockEl.classList.remove("show"); unlockEl.querySelector("input").value = ""; };
  unlockEl.querySelector(".adi-unlock-x").addEventListener("click", closeUnlock);
  unlockEl.addEventListener("click", (e) => { if (e.target === unlockEl) closeUnlock(); });
  const applyPriv = (priv) => {
    PRIV = priv; renderTree(priv.tree, priv.me); unlockBtn.textContent = "🔓 家族版"; unlockBtn.setAttribute("aria-pressed", "true");
    const sec = document.getElementById("adi-family-section"); if (sec && priv.post && priv.post.section) { sec.innerHTML = priv.post.section; sec.classList.add("show"); }
    const intro = document.getElementById("adi-family-intro"); if (intro && priv.post && priv.post.intro) { intro.textContent = " " + priv.post.intro; intro.classList.add("show"); }
    const notes = document.getElementById("adi-family-notes"); if (notes && priv.post && priv.post.notes) { notes.innerHTML = priv.post.notes.join(""); notes.classList.add("show"); }
    showEvent(scene.eventIdx, scene.event);
  };
  const lock = () => {
    PRIV = null; try { sessionStorage.removeItem("adi-pw"); } catch (e) { /* 無痕模式 */ }
    renderTree(TREE, ME); unlockBtn.textContent = "🔑 家族版"; unlockBtn.setAttribute("aria-pressed", "false"); treeEl.classList.remove("only");
    ["adi-family-section", "adi-family-intro", "adi-family-notes"].forEach((id) => { const el = document.getElementById(id); if (el) { el.innerHTML = ""; el.classList.remove("show"); } });
    showEvent(scene.eventIdx, scene.event);
  };
  unlockEl.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault(); const pw = unlockEl.querySelector("input").value; const msg = unlockEl.querySelector(".adi-unlock-msg"); const go = unlockEl.querySelector(".adi-unlock-go");
    go.disabled = true; msg.textContent = "解密中（故意算得慢，幾秒）…";
    try { const priv = await decryptTree(pw); try { sessionStorage.setItem("adi-pw", pw); } catch (e2) { /* 無痕模式 */ } closeUnlock(); applyPriv(priv); toggleTree(true); }
    catch (err) { msg.textContent = "密碼不對（或這台裝置不支援 WebCrypto）。"; }
    go.disabled = false;
  });
  try { const saved = sessionStorage.getItem("adi-pw"); if (saved) decryptTree(saved).then(applyPriv).catch(() => sessionStorage.removeItem("adi-pw")); } catch (e) { /* 無痕模式 */ }

  const placeChip = (id) => { const pl = scene.places.get(id); if (!pl) return ""; return `<button type="button" class="adi-chip" data-place="${id}" style="--c:${hex6(pl.grp.color)}">${esc(pl.p.name)}</button>`; };
  const bornHtml = (i, ev) => {
    const prev = i > 0 ? EVENTS[i - 1].year : -Infinity;
    const born = PLACES.filter((p) => p.from > prev && p.from <= ev.year && !(ev.focus || []).includes(p.id));
    const lines = LINES.filter((l) => l.from > prev && l.from <= ev.year);
    const gone = PLACES.filter((p) => p.until != null && p.until > prev && p.until <= ev.year && !(ev.burned || []).includes(p.id));
    if (!born.length && !lines.length && !gone.length) return "";
    return `<div class="adi-sub">🏗 這一站地圖上長出來的</div><div class="adi-chips">${born.map((p) => placeChip(p.id)).join("")}${lines.map((l) => `<span class="adi-chip adi-line">${l.kind === "rail" ? "🚂" : l.kind === "highway" || l.kind === "road" ? "🛣" : "🚇"} ${esc(l.name)}</span>`).join("")}${gone.map((p) => `<span class="adi-chip adi-gone">✕ ${esc(p.name)}</span>`).join("")}</div>`;
  };
  const showEvent = (i, ev0) => {
    const ev = evView(ev0);
    badge.innerHTML = `<b>${esc(ev.label)}</b><small>${esc(ev.era)}</small>${ev.pop ? `<small class="adi-pop">👥 ${esc(ev.pop)}</small>` : ""}<em>${esc(ev.west.flag)} ${esc(String(ev.west.year))}・${esc(ev.west.title)}</em>`;
    tl.querySelectorAll("button[data-i]").forEach((b) => { const on = Number(b.dataset.i) === i; b.classList.toggle("on", on); if (on) b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); });
    card.innerHTML = `<div class="adi-axis">第 ${i + 1}／${EVENTS.length} 站・${esc(ev.era)}</div><h4>${esc(ev.title)}</h4>` +
      ev.story.map((s) => `<p>${esc(s)}</p>`).join("") +
      `<div class="adi-chips">${(ev.focus || []).map(placeChip).join("")}</div>` +
      (ev.gen && PRIV ? `<div class="adi-ours-line">⭐ 我們這一房・第 ${ev.gen} 代：${LINE[ev.gen - 1] ? `<button type="button" class="adi-chip adi-who adi-line" data-who="${esc(LINE[ev.gen - 1])}">${esc(LINE[ev.gen - 1])}</button>` : "<i>族譜圖上還空著</i>"}${ev.ours ? `<span>${esc(ev.ours)}</span>` : ""}</div>` : "") +
      (ev.gen && !PRIV ? `<div class="adi-sub">🔒 這一站的人名在家族版裡 <button type="button" class="adi-chip adi-unlock-chip">🔑 解鎖</button></div>` : "") +
      (ev.people && ev.people.length ? `<div class="adi-sub">🌳 這一站的人（族譜第 ${ev.gen} 代）</div><div class="adi-chips">${ev.people.map((n) => `<button type="button" class="adi-chip adi-who${LINE.includes(n) ? " adi-line" : ""}" data-who="${esc(n)}">${esc(n)}</button>`).join("")}</div>` : "") +
      bornHtml(i, ev) +
      `<div class="adi-west"><div class="adi-west-head">${esc(ev.west.flag)} 同一時間的西方世界・${esc(String(ev.west.year))}</div><h5>${esc(ev.west.title)}</h5><p>${esc(ev.west.story)}</p>${ev.west.link ? `<a href="${esc(ev.west.link)}" target="_blank" rel="noopener">延伸閱讀 ↗</a>` : ""}</div>` +
      `<div class="adi-foot"><button type="button" class="adi-mini" data-dir="-1">‹ 上一站</button><button type="button" class="adi-mini" data-dir="1">下一站 ›</button></div>`;
    card.scrollTop = 0;
    if (ev.gen) markGen(ev.gen, ev.people);
    card.querySelectorAll(".adi-chip[data-place]").forEach((b) => b.addEventListener("click", () => { scene.stopTour(); scene.flyToPlace(b.dataset.place); showPlace(b.dataset.place); }));
    card.querySelectorAll(".adi-mini[data-dir]").forEach((b) => b.addEventListener("click", () => { scene.stopTour(); Number(b.dataset.dir) > 0 ? scene.next() : scene.prev(); }));
    card.querySelectorAll(".adi-unlock-chip").forEach((b) => b.addEventListener("click", openUnlock));
    card.querySelectorAll(".adi-who").forEach((b) => b.addEventListener("click", () => { toggleTree(true); const sel = treeEl.classList.contains("chart") ? `g.adi-node[data-name="${CSS.escape(b.dataset.who)}"]` : `li[data-name="${CSS.escape(b.dataset.who)}"]`; const li = treeEl.querySelector(sel); if (li) li.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" }); }));
  };
  const showPlace = (id) => {
    const pl = scene.places.get(id); if (!pl) return; const p = pl.p; const grp = pl.grp;
    const hits = EVENTS.map((e, i) => ({ e, i })).filter(({ e }) => (e.focus || []).includes(id) || (e.burned || []).includes(id));
    card.innerHTML = `<div class="adi-axis"><a class="adi-back">‹ 回到第 ${scene.eventIdx + 1} 站</a></div><h4><u class="adi-dot" style="background:${hex6(grp.color)}"></u>${esc(p.name)}<small>今天：${esc(p.today)}</small></h4><p>${esc(p.note)}</p><div class="adi-chips"><span class="adi-chip" style="--c:${hex6(grp.color)}">${esc(grp.name)}</span>${p.temple ? `<span class="adi-chip">⛩ ${esc(p.temple)}</span>` : ""}</div>` +
      (hits.length ? `<div class="adi-sub">出場的站</div><div class="adi-chips">${hits.map(({ e, i }) => `<button type="button" class="adi-chip" data-i="${i}">${esc(e.label)}・${esc(e.title.split("：")[0])}</button>`).join("")}</div>` : "");
    card.scrollTop = 0;
    card.querySelector(".adi-back").addEventListener("click", () => showEvent(scene.eventIdx, scene.event));
    card.querySelectorAll(".adi-chip[data-i]").forEach((b) => b.addEventListener("click", () => scene.setEvent(Number(b.dataset.i))));
  };
  scene.onEvent = showEvent;
  scene.onPlace = showPlace;
  scene.onTour = (on) => { tourBtn.setAttribute("aria-pressed", on ? "true" : "false"); tourBtn.textContent = on ? "⏸ 暫停導覽" : "▶ 自動導覽"; caption.classList.toggle("show", on); if (on) caption.textContent = "自動導覽中：每站 20 秒，拖畫面或按年表就停"; tl.classList.toggle("playing", on); };
  scene.onProgress = (k) => { const b = tl.querySelector("button[data-i].on i"); if (b) b.style.width = `${(k * 100).toFixed(1)}%`; };
  showEvent(scene.eventIdx, scene.event);
  return scene;
}
