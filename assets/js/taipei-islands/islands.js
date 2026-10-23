// 台北未來島 v2：純 three.js 群島引擎（無模型檔）。資料在 data.js、小模型在 models.js。
// 14 座六角政策島拼成台北輪廓、每座島一個主題色、樓＝政見細項、路燈夜景、走動的人、協作線、導覽。
// 效能原則：靜態零件 InstancedMesh、需要時才 render、名牌用 HTML 自行投影、弱裝置自動關陰影。
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { HERO, HEART_COLOR, HEART_NAME, ISLANDS, FLOWS, RIVAL } from "./data.js?v=2";
import { drawModel, kindOf } from "./models.js?v=2";

const TOP = 0.65;
const WATER_Y = -0.2;
const HEX = 3.1; // 六角外接圓半徑
const GAP = 1.06; // 島與島的間距係數
const INNER = HEX * 0.66; // 建築區半徑
const RING = HEX * 0.82; // 步道環半徑

// 一天四個時段（天空頂／地平線／太陽色／太陽強度／半球天／半球地／霧／夜燈強度／水色）
const DAYCYCLE = {
  dawn: { top: 0xf2b58a, horizon: 0xfbe3cf, sun: 0xffc9a0, sunI: 1.4, hemiSky: 0xffd9c2, hemiGround: 0x8a7a66, fog: 0xf6dcc8, lamp: 0.5, water: 0x7a9bb3 },
  day: { top: 0x9fd0ea, horizon: 0xe9f3f6, sun: 0xfff2d8, sunI: 2.2, hemiSky: 0xdff3ff, hemiGround: 0x7a8f6a, fog: 0xdfeef2, lamp: 0, water: 0x3f7fa6 },
  dusk: { top: 0xd97b63, horizon: 0xf7c59f, sun: 0xffb070, sunI: 1.2, hemiSky: 0xf2b58a, hemiGround: 0x5a4a44, fog: 0xe8b7a0, lamp: 0.8, water: 0x5a6f8c },
  night: { top: 0x151a33, horizon: 0x2b3458, sun: 0x8fa6d9, sunI: 0.35, hemiSky: 0x3b4670, hemiGround: 0x1d2130, fog: 0x1b2140, lamp: 1.0, water: 0x1c2b45 },
};

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mulberry = (a) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭"];
const hexShape = (r, rot = Math.PI / 6) => {
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + rot;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y); else s.lineTo(x, y);
  }
  s.closePath();
  return s;
};
// pointy-top 軸座標 → 世界座標
const axialToWorld = (q, r) => [HEX * GAP * Math.sqrt(3) * (q + r / 2), HEX * GAP * 1.5 * r];

// ---- 零件工具箱：同幾何合併成 InstancedMesh ----
function createKit() {
  const geos = {
    box: new THREE.BoxGeometry(1, 1, 1),
    rbox: new RoundedBoxGeometry(1, 1, 1, 2, 0.08),
    cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 10),
    cone: new THREE.ConeGeometry(0.5, 1, 7),
    sphere: new THREE.SphereGeometry(0.5, 10, 8),
    leaf: new THREE.IcosahedronGeometry(0.5, 1),
    ring: new THREE.TorusGeometry(0.5, 0.06, 6, 14),
  };
  const parts = {};
  const part = (kind, pos, scale, color, rot, owner) => {
    if (!parts[kind]) parts[kind] = [];
    parts[kind].push({ pos, scale, color, rot: rot || [0, 0, 0], owner: owner || null });
  };
  const build = (scene, mat, shadows) => {
    const meshes = [];
    const d = new THREE.Object3D();
    const c = new THREE.Color();
    Object.keys(parts).forEach((kind) => {
      const list = parts[kind];
      const m = new THREE.InstancedMesh(geos[kind], mat, list.length);
      list.forEach((p, i) => {
        d.position.set(p.pos[0], p.pos[1], p.pos[2]);
        d.scale.set(p.scale[0], p.scale[1], p.scale[2]);
        d.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
        d.updateMatrix();
        m.setMatrixAt(i, d.matrix);
        m.setColorAt(i, c.setHex(p.color));
      });
      m.instanceMatrix.needsUpdate = true;
      m.instanceColor.needsUpdate = true;
      m.castShadow = shadows; m.receiveShadow = shadows;
      scene.add(m);
      meshes.push(m);
    });
    return meshes;
  };
  return { part, build };
}

export class IslandScene {
  constructor(container) {
    this.container = container;
    this.dirty = true;
    this.fly = null;
    this.labels = [];
    this.buildings = new Map();
    this.lampGlow = []; // 夜燈
    this.reducedMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency || 8) <= 4 || /Mobi|Android/i.test(navigator.userAgent);
    this.weak = weak;
    this.shadows = !weak;

    const renderer = new THREE.WebGLRenderer({ antialias: !weak, powerPreference: "high-performance" });
    renderer.setPixelRatio(weak ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = this.shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    this.labelEl = document.createElement("div");
    this.labelEl.className = "tpi-labels";
    container.appendChild(this.labelEl);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(DAYCYCLE.day.fog, 60, 190);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.3, 500);
    const controls = new OrbitControls(this.camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.maxPolarAngle = THREE.MathUtils.degToRad(80);
    controls.minDistance = 4; controls.maxDistance = 110;
    controls.addEventListener("change", () => this.requestRender());
    controls.addEventListener("start", () => this.stopTour());
    this.controls = controls;

    this.buildEnvironment();
    this.buildWorld();
    this.bindPointer();
    this.setDay("day", true);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    this.resize();
    this.home(true);
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  // ---------- 環境：天空、光、水、盆地山脈、雲 ----------
  buildEnvironment() {
    const { scene } = this;
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: { uTop: { value: new THREE.Color(DAYCYCLE.day.top) }, uHorizon: { value: new THREE.Color(DAYCYCLE.day.horizon) } },
      vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 uTop; uniform vec3 uHorizon; varying vec3 vP; void main(){ float h = clamp(normalize(vP).y * 1.6 + 0.15, 0.0, 1.0); gl_FragColor = vec4(mix(uHorizon, uTop, pow(h, 0.8)), 1.0); }`,
      side: THREE.BackSide, depthWrite: false, fog: false,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(260, 24, 12), this.skyMat));
    this.hemi = new THREE.HemisphereLight(0xdff3ff, 0x7a8f6a, 0.9);
    scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xfff2d8, 2.2);
    this.sun.position.set(18, 30, 14);
    this.sun.castShadow = this.shadows;
    if (this.shadows) {
      this.sun.shadow.mapSize.set(2048, 2048);
      Object.assign(this.sun.shadow.camera, { left: -48, right: 48, top: 48, bottom: -48, near: 1, far: 140 });
      this.sun.shadow.bias = -0.0004;
    }
    scene.add(this.sun);
    const fill = new THREE.DirectionalLight(0xbcd6ff, 0.45);
    fill.position.set(-20, 14, -20);
    scene.add(fill);
    this.waterMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(DAYCYCLE.day.water) }, uFog: { value: new THREE.Color(DAYCYCLE.day.fog) } },
      vertexShader: `varying vec2 vUv; varying float vD; void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position,1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform float uTime; uniform vec3 uColor; uniform vec3 uFog; varying vec2 vUv; varying float vD;
        void main(){ vec2 p = vUv * 180.0; float w = sin(p.x * 0.9 + uTime * 0.6) * sin(p.y * 0.7 - uTime * 0.4); float band = smoothstep(0.86, 0.97, w) * 0.22; vec3 c = uColor + band; float f = clamp((vD - 60.0) / 130.0, 0.0, 1.0); gl_FragColor = vec4(mix(c, uFog, f), 1.0); }`,
      fog: false,
    });
    const water = new THREE.Mesh(new THREE.CircleGeometry(240, 48), this.waterMat);
    water.rotation.x = -Math.PI / 2; water.position.y = WATER_Y;
    scene.add(water);
    // 盆地：遠山＋山腰小房子與樹
    const rnd = mulberry(7);
    const hillMat = new THREE.MeshStandardMaterial({ color: 0x7fa36d, roughness: 0.95, flatShading: true });
    const hillMat2 = new THREE.MeshStandardMaterial({ color: 0x5f8a62, roughness: 0.95, flatShading: true });
    const kit = createKit();
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + rnd() * 0.15;
      const r = 78 + rnd() * 36;
      const h = 9 + rnd() * 16;
      const hill = new THREE.Mesh(new THREE.ConeGeometry(12 + rnd() * 16, h, 7), i % 3 ? hillMat : hillMat2);
      hill.position.set(Math.cos(a) * r, WATER_Y + h / 2 - 2, Math.sin(a) * r);
      hill.rotation.y = rnd() * Math.PI;
      scene.add(hill);
      for (let k = 0; k < 3; k++) {
        const aa = a + (rnd() - 0.5) * 0.12, rr = r - 6 - rnd() * 6, y = WATER_Y + h * 0.25 + rnd() * h * 0.25;
        const x = Math.cos(aa) * rr, z = Math.sin(aa) * rr;
        if (k === 0) { kit.part("box", [x, y + 0.5, z], [1.2, 1.0, 1.0], 0xf6efe2); kit.part("cone", [x, y + 1.3, z], [1.6, 0.7, 1.6], [0xd9534f, 0x4a7fb5, 0xe08a3c][i % 3], [0, Math.PI / 4, 0]); }
        else kit.part("cone", [x, y + 1.2, z], [1.4, 2.4, 1.4], 0x4e7d57);
      }
    }
    this.clouds = [];
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.9 });
    for (let i = 0; i < 9; i++) {
      const g = new THREE.Group();
      for (let k = 0; k < 4; k++) { const m = new THREE.Mesh(new THREE.SphereGeometry(2 + rnd() * 2.5, 8, 6), cloudMat); m.position.set(k * 2.4 - 3.6, rnd() * 0.6, rnd() * 1.5); m.scale.y = 0.55; g.add(m); }
      g.position.set((rnd() - 0.5) * 140, 28 + rnd() * 10, (rnd() - 0.5) * 140);
      scene.add(g);
      this.clouds.push({ g, speed: 0.4 + rnd() * 0.5 });
    }
    kit.build(scene, new THREE.MeshStandardMaterial({ roughness: 0.9 }), false);
  }

  // ---------- 世界：六角政策島拼圖＋安可島 ----------
  buildWorld() {
    const kit = createKit();
    const shadows = this.shadows;
    const solid = (color, extra) => new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, ...(extra || {}) });
    const islands = ISLANDS.map((isl, i) => {
      const [x, z] = axialToWorld(isl.axial[0], isl.axial[1]);
      const heart = isl.heart[0] || ["H", "E", "A", "R", "T"][i % 5];
      return { ...isl, idx: i, center: new THREE.Vector3(x, TOP, z), color: HEART_COLOR[heart], heartMain: heart, rival: false };
    });
    const bb = new THREE.Box3();
    islands.forEach((i) => bb.expandByPoint(i.center));
    const rivalCenter = new THREE.Vector3(bb.max.x + HEX * 3.4, TOP, bb.max.z - HEX * 1.2);
    islands.push({ ...RIVAL, idx: islands.length, number: 0, heart: [], center: rivalCenter, color: 0x9a9a9a, heartMain: null, rival: true, axial: null });
    this.islands = islands;
    const byId = {}; islands.forEach((i) => { byId[i.id] = i; });
    this.byId = byId;

    const groundOf = (isl) => {
      if (isl.rival) return { top: 0xd9d9d9, cliff: 0x8f8f8f, strata: 0x7a7a7a, path: 0xbdbdbd };
      const c = new THREE.Color(isl.color);
      return { top: c.clone().lerp(new THREE.Color(0xf6f0e6), 0.72).getHex(), cliff: 0xa8865f, strata: 0x7d5f44, path: c.clone().lerp(new THREE.Color(0xffffff), 0.5).getHex() };
    };

    islands.forEach((isl) => {
      const c = isl.center;
      const g = groundOf(isl);
      const depth = TOP - (WATER_Y - 0.9);
      const geo = new THREE.CylinderGeometry(HEX, HEX - 0.25, depth, 6, 1);
      geo.rotateY(Math.PI / 6);
      const body = new THREE.Mesh(geo, [solid(g.cliff, { flatShading: true }), solid(g.top), solid(g.strata)]);
      body.position.set(c.x, TOP - depth / 2, c.z);
      body.castShadow = shadows; body.receiveShadow = shadows;
      body.userData.island = isl.id;
      this.scene.add(body);
      const strata = new THREE.Mesh(new THREE.CylinderGeometry(HEX + 0.02, HEX - 0.1, 0.22, 6, 1).rotateY(Math.PI / 6), solid(g.strata, { flatShading: true }));
      strata.position.set(c.x, TOP - 0.5, c.z);
      this.scene.add(strata);
      const halo = new THREE.Mesh(new THREE.ShapeGeometry(hexShape(HEX + 0.7)), new THREE.MeshBasicMaterial({ color: 0xcfe9ea, transparent: true, opacity: 0.35, depthWrite: false }));
      halo.rotation.x = -Math.PI / 2; halo.position.set(c.x, WATER_Y + 0.01, c.z);
      this.scene.add(halo);
      const ring = new THREE.Mesh(new THREE.ShapeGeometry(hexShape(RING + 0.25)), solid(g.path));
      ring.rotation.x = -Math.PI / 2; ring.position.set(c.x, TOP + 0.006, c.z); ring.receiveShadow = shadows;
      this.scene.add(ring);
      const inner = new THREE.Mesh(new THREE.ShapeGeometry(hexShape(RING - 0.25)), solid(g.top));
      inner.rotation.x = -Math.PI / 2; inner.position.set(c.x, TOP + 0.012, c.z); inner.receiveShadow = shadows;
      this.scene.add(inner);
      const tag = this.makeLabel(`tpi-island-tag${isl.rival ? " rival" : ""}`, `<i>${isl.rival ? "安" : String(isl.number).padStart(2, "0")}</i><span>${esc(isl.name)}</span>`);
      tag.position.set(c.x, TOP + 0.1, c.z + HEX * 0.92);
      tag.data = { island: isl.id };
      // 樓：主角在中間、其餘環狀排列（太多就再一圈內環）
      const rnd = mulberry(isl.idx * 17 + 3);
      const n = isl.buildings.length;
      const slots = [];
      if (n === 1) slots.push([0, 0]);
      else {
        slots.push([0, -0.15]);
        const outerN = Math.min(n - 1, 8);
        const rr = INNER * 0.68;
        for (let k = 0; k < outerN; k++) { const a = (k / outerN) * Math.PI * 2 + Math.PI / 2; slots.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
        const innerN = n - 1 - outerN;
        for (let k = 0; k < innerN; k++) { const a = (k / innerN) * Math.PI * 2 + Math.PI / 6; slots.push([Math.cos(a) * INNER * 0.36, Math.sin(a) * INNER * 0.36 + 0.3]); }
      }
      isl.buildings.forEach((b, k) => {
        const [sx, sz] = slots[k];
        const x = c.x + sx, z = c.z + sz;
        const s = (k === 0 ? 1.2 : 0.85) * (n > 9 ? 0.82 : 1);
        const kind = b.kind || kindOf(b.id, b.name);
        drawModel(kind, { part: kit.part, x, z, y: TOP, s, owner: b.id, color: isl.color, rnd });
        const btag = this.makeLabel(`tpi-bld-tag${isl.rival ? " rival" : ""}`, `<i>${isl.rival ? "📢" : CIRCLED[k] || k + 1}</i>${esc(b.name)}`);
        btag.position.set(x, TOP + 1.9 * s, z);
        btag.data = { building: b.id };
        btag.near = true;
        btag.islandId = isl.id;
        this.buildings.set(b.id, { pos: new THREE.Vector3(x, TOP + 0.6 * s, z), isl, b, k, tag: btag, s, kind });
      });
      // 路燈（六個頂點）＋樹＋長椅＋花
      for (let v = 0; v < 6; v++) {
        const a = (Math.PI / 3) * v + Math.PI / 6;
        const lx = c.x + Math.cos(a) * RING, lz = c.z + Math.sin(a) * RING;
        kit.part("cyl", [lx, TOP + 0.55, lz], [0.05, 1.1, 0.05], 0x4a4a4a);
        const glow = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), new THREE.MeshStandardMaterial({ color: 0xffe9a8, emissive: 0xffd666, emissiveIntensity: 0 }));
        glow.position.set(lx, TOP + 1.15, lz);
        this.scene.add(glow); this.lampGlow.push(glow.material);
        if (isl.rival) continue;
        if (v % 2 === 0) {
          const tx = c.x + Math.cos(a + 0.35) * (RING - 0.5), tz = c.z + Math.sin(a + 0.35) * (RING - 0.5);
          const ts = 0.8 + rnd() * 0.4;
          kit.part("cyl", [tx, TOP + 0.25 * ts, tz], [0.14 * ts, 0.5 * ts, 0.14 * ts], 0x8a6a4e);
          kit.part(v % 4 === 0 ? "leaf" : "cone", [tx, TOP + 0.78 * ts, tz], [0.9 * ts, 0.85 * ts, 0.9 * ts], [0x7fb36a, 0x9fc77a, 0x4e7d57][v % 3]);
        } else {
          const bx = c.x + Math.cos(a - 0.3) * (RING - 0.3), bz = c.z + Math.sin(a - 0.3) * (RING - 0.3);
          kit.part("box", [bx, TOP + 0.2, bz], [0.5, 0.05, 0.2], 0xc9a27a, [0, -a, 0]);
          kit.part("sphere", [bx + 0.5, TOP + 0.12, bz], [0.22, 0.18, 0.22], [0xf2a1a1, 0xfcea8b, 0xffffff][v % 3]);
        }
      }
      if (isl.rival) {
        const sign = this.makeLabel("tpi-rival-sign", esc(RIVAL.sign));
        sign.position.set(c.x, TOP + 0.3, c.z + HEX * 0.5);
        this.loopLabel = this.makeLabel("tpi-loop", "");
        this.loopLabel.position.set(c.x, TOP + 4.2, c.z);
        kit.part("cone", [c.x - HEX * 0.6, TOP + 0.7, c.z - HEX * 0.3], [0.5, 0.9, 0.5], 0x666666, [Math.PI, 0, 0]);
        kit.part("cyl", [c.x - HEX * 0.6, TOP + 0.2, c.z - HEX * 0.3], [0.08, 0.4, 0.08], 0x444444);
      }
    });

    // 相鄰島之間的步道橋
    const key = (q, r) => `${q},${r}`;
    const byAxial = {}; islands.forEach((i) => { if (i.axial) byAxial[key(i.axial[0], i.axial[1])] = i; });
    const NB = [[1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
    islands.forEach((a) => {
      if (!a.axial) return;
      NB.forEach(([dq, dr]) => {
        const b = byAxial[key(a.axial[0] + dq, a.axial[1] + dr)];
        if (!b || b.idx < a.idx) return;
        const mid = a.center.clone().lerp(b.center, 0.5);
        const ry = Math.atan2(b.center.x - a.center.x, b.center.z - a.center.z);
        const len = a.center.distanceTo(b.center) - 2 * (HEX * Math.cos(Math.PI / 6)) + 1.6;
        kit.part("box", [mid.x, TOP + 0.03, mid.z], [1.2, 0.1, len], 0xc9a27a, [0, ry, 0]);
        for (const sgn of [-1, 1]) { const off = new THREE.Vector3(0.55 * sgn, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry); kit.part("box", [mid.x + off.x, TOP + 0.3, mid.z + off.z], [0.05, 0.45, len], 0x8a6a4e, [0, ry, 0]); }
      });
    });

    // 周邊小島：燈塔、風車、小山、礁岩
    const rnd = mulberry(5);
    const bbx = new THREE.Box3(); islands.forEach((i) => { if (!i.rival) bbx.expandByPoint(i.center); });
    const ctr = bbx.getCenter(new THREE.Vector3());
    this.rotors = [];
    [{ a: 0.3, r: 26, kind: "lighthouse" }, { a: 1.6, r: 24, kind: "windmill" }, { a: 2.7, r: 22, kind: "hill" }, { a: 3.9, r: 25, kind: "rock" }, { a: 5.0, r: 27, kind: "windmill" }].forEach((it) => {
      const x = ctr.x + Math.cos(it.a) * it.r, z = ctr.z + Math.sin(it.a) * it.r;
      const R = 2.2 + rnd();
      const m = new THREE.Mesh(new THREE.CylinderGeometry(R, R - 0.2, 1.3, 7), [solid(0xa8865f), solid(0xe8dcc3), solid(0x7d5f44)]);
      m.position.set(x, TOP - 0.65, z); m.castShadow = shadows; m.receiveShadow = shadows; this.scene.add(m);
      if (it.kind === "lighthouse") {
        kit.part("cyl", [x, TOP + 1.2, z], [0.6, 2.4, 0.6], 0xffffff); kit.part("cyl", [x, TOP + 1.2, z], [0.62, 0.5, 0.62], 0xd9534f); kit.part("cyl", [x, TOP + 2.5, z], [0.5, 0.3, 0.5], 0x2b2b2b);
        const gl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshStandardMaterial({ color: 0xffe9a8, emissive: 0xffd666, emissiveIntensity: 0 })); gl.position.set(x, TOP + 2.45, z); this.scene.add(gl); this.lampGlow.push(gl.material);
      }
      if (it.kind === "windmill") {
        kit.part("cyl", [x, TOP + 1.5, z], [0.18, 3.0, 0.18], 0xf4f4f4);
        const rotor = new THREE.Group();
        for (let b = 0; b < 3; b++) { const bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.6, 0.05), new THREE.MeshStandardMaterial({ color: 0xffffff })); bl.position.y = 0.8; const pivot = new THREE.Group(); pivot.add(bl); pivot.rotation.z = (b * Math.PI * 2) / 3; rotor.add(pivot); }
        rotor.position.set(x, TOP + 3.0, z + 0.2); this.scene.add(rotor); this.rotors.push(rotor);
      }
      if (it.kind === "hill") { kit.part("cone", [x, TOP + 0.9, z], [3.2, 1.8, 3.2], 0x8fb37a); kit.part("cone", [x, TOP + 1.8, z], [1.8, 1.2, 1.8], 0x7fa36d); kit.part("cone", [x + 0.9, TOP + 1.0, z + 0.6], [0.7, 1.2, 0.7], 0x4e7d57); }
      if (it.kind === "rock") { kit.part("sphere", [x, TOP + 0.5, z], [2.0, 1.2, 1.6], 0x8f8f8f); kit.part("sphere", [x + 1.0, TOP + 0.3, z - 0.6], [1.0, 0.8, 0.9], 0x7a7a7a); }
    });

    this.kitMeshes = kit.build(this.scene, new THREE.MeshStandardMaterial({ roughness: 0.8 }), shadows);
    const proxy = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial(), this.buildings.size);
    const d = new THREE.Object3D(); const owners = []; let n = 0;
    this.buildings.forEach((b, id) => { d.position.copy(b.pos); d.scale.set(1.2 * b.s, 1.4 * b.s, 1.2 * b.s); d.updateMatrix(); proxy.setMatrixAt(n, d.matrix); owners[n] = id; n += 1; });
    proxy.instanceMatrix.needsUpdate = true; proxy.visible = false; proxy.userData.owners = owners;
    this.scene.add(proxy); this.pick = proxy;
    this.islandMeshes = this.scene.children.filter((o) => o.userData && o.userData.island);
    const all = new THREE.Box3();
    islands.forEach((i) => { all.expandByPoint(new THREE.Vector3(i.center.x - HEX, 0, i.center.z - HEX)); all.expandByPoint(new THREE.Vector3(i.center.x + HEX, 0, i.center.z + HEX)); });
    this.center = all.getCenter(new THREE.Vector3()).setY(0);
    this.sceneRadius = all.getSize(new THREE.Vector3()).length() / 2;
    this.sun.target.position.copy(this.center); this.scene.add(this.sun.target);
    this.buildWalkers();
    this.flowGroup = new THREE.Group(); this.scene.add(this.flowGroup);
  }

  // ---------- 走動的人（大頭小人）＋騎車的人 ----------
  makeFigure(shirt, bike) {
    const g = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({ color: 0xf3cfae, roughness: 0.7 });
    const pants = new THREE.MeshStandardMaterial({ color: 0x3b3a42, roughness: 0.7 });
    const top = new THREE.MeshStandardMaterial({ color: shirt, roughness: 0.7 });
    const hair = new THREE.MeshStandardMaterial({ color: [0x2b2b2b, 0x5a3b2e, 0x8a6a4e][shirt % 3], roughness: 0.8 });
    const legL = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.14, 0.09, 2, 0.03), pants); legL.geometry.translate(0, -0.07, 0); legL.position.set(-0.06, 0.14, 0);
    const legR = legL.clone(); legR.position.x = 0.06;
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.12, 3, 8), top); body.position.y = 0.27;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), skin); head.position.y = 0.55;
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), hair); cap.position.y = 0.58;
    const armL = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.16, 0.06, 2, 0.025), top); armL.geometry.translate(0, -0.08, 0); armL.position.set(-0.16, 0.36, 0);
    const armR = armL.clone(); armR.position.x = 0.16;
    [legL, legR, body, head, cap, armL, armR].forEach((m) => { m.castShadow = this.shadows; g.add(m); });
    if (bike) {
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b });
      for (const dz of [-0.22, 0.22]) { const w = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.03, 6, 12), wheelMat); w.position.set(0, 0.13, dz); g.add(w); }
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.44), new THREE.MeshStandardMaterial({ color: 0xd9534f })); frame.position.y = 0.2; g.add(frame);
    }
    g.userData.legs = [legL, legR]; g.userData.arms = [armL, armR];
    return g;
  }
  buildWalkers() {
    this.walkers = [];
    if (this.reducedMotion) return;
    const shirts = [0x6f7fb5, 0x58a6a6, 0xe8c547, 0xf2a1a1, 0x8fb37a, 0xb58fd0, 0xdb6a41];
    const rnd = mulberry(99);
    this.islands.forEach((isl, i) => {
      const n = isl.rival ? 1 : this.weak ? 2 : 3;
      for (let k = 0; k < n; k++) {
        const bike = !isl.rival && /transport|sport|trails/.test(isl.id) && k === 0;
        const fig = this.makeFigure(shirts[(i * 2 + k) % shirts.length], bike);
        this.scene.add(fig);
        this.walkers.push({ fig, cx: isl.center.x, cz: isl.center.z, r: RING + (k % 2 ? 0.12 : -0.12), speed: (bike ? 0.5 : 0.14 + rnd() * 0.08) * (k % 2 ? -1 : 1), phase: rnd() * Math.PI * 2, bike });
      }
    });
    this.guide = this.makeFigure(0xdb6a41); this.guide.visible = false; this.scene.add(this.guide);
  }
  updateWalkers(t) {
    for (const w of this.walkers) {
      const ang = w.phase + t * w.speed;
      w.fig.position.set(w.cx + Math.cos(ang) * w.r, TOP + (w.bike ? 0.05 : 0), w.cz + Math.sin(ang) * w.r);
      w.fig.rotation.y = -ang + (w.speed > 0 ? Math.PI : 0);
      const sw = w.bike ? 0.2 : Math.sin(t * 7 + w.phase) * 0.5;
      w.fig.userData.legs[0].rotation.x = sw; w.fig.userData.legs[1].rotation.x = -sw;
      w.fig.userData.arms[0].rotation.x = -sw * 0.6; w.fig.userData.arms[1].rotation.x = sw * 0.6;
    }
  }

  // ---------- 協作線：選到的島連到有關係的島（貝茲弧） ----------
  showFlows(islandId) {
    while (this.flowGroup.children.length) { const c = this.flowGroup.children.pop(); c.geometry.dispose(); c.material.dispose(); }
    if (!islandId) { this.requestRender(); return []; }
    const related = new Set();
    FLOWS.forEach((f) => { if (f.from.includes(islandId)) f.to.forEach((t) => related.add(t)); if (f.to.includes(islandId)) f.from.forEach((t) => related.add(t)); });
    related.delete(islandId);
    // flows 也會指到非島的資料端口（如警政資料），只留真的島
    Array.from(related).forEach((id) => { if (!this.byId[id]) related.delete(id); });
    const a = this.byId[islandId];
    related.forEach((id) => {
      const b = this.byId[id]; if (!b || !a) return;
      const mid = a.center.clone().lerp(b.center, 0.5); mid.y = TOP + 2.2 + a.center.distanceTo(b.center) * 0.18;
      const curve = new THREE.QuadraticBezierCurve3(a.center.clone().setY(TOP + 1.2), mid, b.center.clone().setY(TOP + 1.2));
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.06, 5, false), new THREE.MeshBasicMaterial({ color: 0xdb6a41, transparent: true, opacity: 0.85 }));
      this.flowGroup.add(tube);
    });
    this.requestRender();
    return Array.from(related);
  }

  // ---------- 時段 ----------
  setDay(key, instant) {
    const k = DAYCYCLE[key] || DAYCYCLE.day;
    this.dayKey = key;
    this.dayTarget = k;
    if (instant || !this.dayCur) { this.dayCur = { ...k }; this.applyDay(this.dayCur); }
    this.requestRender();
  }
  applyDay(k) {
    this.skyMat.uniforms.uTop.value.setHex(k.top); this.skyMat.uniforms.uHorizon.value.setHex(k.horizon);
    this.sun.color.setHex(k.sun); this.sun.intensity = k.sunI;
    this.hemi.color.setHex(k.hemiSky); this.hemi.groundColor.setHex(k.hemiGround);
    this.scene.fog.color.setHex(k.fog);
    this.waterMat.uniforms.uColor.value.setHex(k.water); this.waterMat.uniforms.uFog.value.setHex(k.fog);
    this.lampGlow.forEach((m) => { m.emissiveIntensity = k.lamp * 2.2; });
  }

  // ---------- 名牌 ----------
  makeLabel(cls, html) {
    const el = document.createElement("div");
    el.className = cls; el.innerHTML = html; el.style.display = "none";
    this.labelEl.appendChild(el);
    const o = { el, position: new THREE.Vector3(), shown: false, near: false, data: {} };
    this.labels.push(o);
    return o;
  }
  renderLabels() {
    const cam = this.camera, w = this.labelW, h = this.labelH;
    const v = new THREE.Vector3();
    const camDist = cam.position.distanceTo(this.controls.target);
    const showNear = camDist < 22;
    const far = camDist > 48; // 全景時島名牌只留編號，才不會疊成一團
    if (far !== this.lastFar) { this.lastFar = far; this.labelEl.classList.toggle("far", far); }
    for (const o of this.labels) {
      const visible = !o.near || (showNear && (!this.focusIsland || o.islandId === this.focusIsland));
      v.copy(o.position).project(cam);
      const on = visible && v.z < 1 && v.x > -1.1 && v.x < 1.1 && v.y > -1.1 && v.y < 1.1;
      if (!on) { if (o.shown) { o.el.style.display = "none"; o.shown = false; } continue; }
      o.el.style.transform = `translate(-50%,-50%) translate(${((v.x * 0.5 + 0.5) * w).toFixed(1)}px,${((-v.y * 0.5 + 0.5) * h).toFixed(1)}px)`;
      if (!o.shown) { o.el.style.display = ""; o.shown = true; }
    }
  }

  // ---------- 相機 ----------
  overviewPosition() {
    const aspect = this.camera.aspect || 1.6;
    const fit = Math.max(1, 1.3 / Math.min(aspect, 1.6));
    const d = (this.sceneRadius * 1.1 * fit) / Math.tan(THREE.MathUtils.degToRad(16)) * 0.82 + 4;
    return this.center.clone().add(new THREE.Vector3(d * 0.04, d * 0.7, d * 0.74));
  }
  flyTo(pos, target, instant) {
    if (instant) { this.camera.position.copy(pos); this.controls.target.copy(target); this.fly = null; }
    else this.fly = { t0: performance.now(), from: this.camera.position.clone(), to: pos, old: this.controls.target.clone(), target, dur: 1100 };
    this.requestRender();
  }
  home(instant) { this.focusIsland = null; this.flyTo(this.overviewPosition(), this.center.clone(), instant); }
  bird() { this.focusIsland = null; this.flyTo(this.center.clone().add(new THREE.Vector3(0.01, this.sceneRadius * 2.2, 0.5)), this.center.clone()); }
  flyToIsland(id) {
    const isl = this.byId[id]; if (!isl) return;
    this.focusIsland = id;
    const c = isl.center;
    this.flyTo(c.clone().add(new THREE.Vector3(0.6, HEX * 2.4, HEX * 2.9)), c.clone().setY(TOP + 0.6));
  }
  flyToBuilding(id) {
    const b = this.buildings.get(id); if (!b) return;
    this.focusIsland = b.isl.id;
    const t = b.pos.clone().setY(TOP + 0.7);
    this.flyTo(t.clone().add(new THREE.Vector3(2.4, 3.4, 6.0)), t);
  }

  // ---------- 互動 ----------
  castAt(x, y) {
    if (!this.ray) { this.ray = new THREE.Raycaster(); this.ndc = new THREE.Vector2(); }
    const r = this.renderer.domElement.getBoundingClientRect();
    this.ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(this.ndc, this.camera);
    const hits = this.ray.intersectObjects([this.pick, ...this.islandMeshes], false);
    for (const h of hits) {
      if (h.object === this.pick) return { building: this.pick.userData.owners[h.instanceId] };
      if (h.object.userData.island) return { island: h.object.userData.island };
    }
    return null;
  }
  bindPointer() {
    const el = this.renderer.domElement;
    let down = null;
    el.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; });
    el.addEventListener("pointerup", (e) => {
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
      down = null;
      const hit = this.castAt(e.clientX, e.clientY);
      if (hit && hit.building) { this.flyToBuilding(hit.building); this.onSelect && this.onSelect({ building: hit.building }); }
      else if (hit && hit.island) { this.flyToIsland(hit.island); this.onSelect && this.onSelect({ island: hit.island }); }
      else this.onSelect && this.onSelect(null);
    });
    this.labelEl.addEventListener("click", (e) => {
      const t = e.target.closest(".tpi-island-tag, .tpi-bld-tag");
      if (!t) return;
      const o = this.labels.find((l) => l.el === t); if (!o) return;
      this.stopTour();
      if (o.data.island) { this.flyToIsland(o.data.island); this.onSelect && this.onSelect({ island: o.data.island }); }
      if (o.data.building) { this.flyToBuilding(o.data.building); this.onSelect && this.onSelect({ building: o.data.building }); }
    });
  }

  // ---------- 導覽：紅衣小人逐島走 ----------
  startTour() {
    const order = this.islands.filter((i) => !i.rival).map((i) => i.id).concat([RIVAL.id]);
    this.tour = { order, i: -1, t0: 0 };
    if (this.guide) this.guide.visible = true;
    this.tourNext(performance.now() / 1000);
    this.onTour && this.onTour(true);
  }
  stopTour() {
    if (!this.tour) return;
    this.tour = null;
    if (this.guide) this.guide.visible = false;
    this.onTour && this.onTour(false);
    this.requestRender();
  }
  tourNext(t) {
    const tr = this.tour;
    tr.i = (tr.i + 1) % tr.order.length; tr.t0 = t;
    const id = tr.order[tr.i];
    const isl = this.byId[id];
    if (this.guide) { this.guide.position.set(isl.center.x, TOP, isl.center.z + RING); this.guide.rotation.y = Math.PI; }
    this.flyToIsland(id);
    this.onSelect && this.onSelect({ island: id, tour: true });
  }

  // ---------- 迴圈 ----------
  requestRender() { this.dirty = true; }
  resize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.labelW = w; this.labelH = h;
    this.requestRender();
  }
  frame(now) {
    if (this.disposed) return;
    this.raf = requestAnimationFrame((t) => this.frame(t));
    if (document.hidden) return;
    const t = now / 1000;
    const dt = Math.min(0.05, (now - (this.lastNow || now)) / 1000); this.lastNow = now;
    let animating = false;
    if (this.fly) {
      const v = ease(Math.min(1, (now - this.fly.t0) / this.fly.dur));
      this.camera.position.lerpVectors(this.fly.from, this.fly.to, v);
      this.controls.target.lerpVectors(this.fly.old, this.fly.target, v);
      if (v >= 1) this.fly = null;
      animating = true;
    }
    if (this.controls.update()) animating = true;
    if (this.dayTarget && this.dayCur) {
      const k = Math.min(1, dt * 2.5); let moving = false;
      const cur = this.dayCur, tg = this.dayTarget;
      ["sunI", "lamp"].forEach((f) => { if (Math.abs(cur[f] - tg[f]) > 0.005) { cur[f] += (tg[f] - cur[f]) * k; moving = true; } });
      ["top", "horizon", "sun", "hemiSky", "hemiGround", "fog", "water"].forEach((f) => {
        if (cur[f] !== tg[f]) { const a = new THREE.Color(cur[f]); a.lerp(new THREE.Color(tg[f]), k); const hex = a.getHex(); cur[f] = Math.abs(hex - tg[f]) < 0x030303 ? tg[f] : hex; moving = true; }
      });
      if (moving) { this.applyDay(cur); animating = true; }
    }
    if (!this.reducedMotion) {
      if (this.walkers && this.walkers.length) this.updateWalkers(t);
      this.rotors.forEach((r) => { r.rotation.z += dt * 1.2; });
      this.clouds.forEach((c) => { c.g.position.x += dt * c.speed; if (c.g.position.x > 90) c.g.position.x = -90; });
      this.waterMat.uniforms.uTime.value = t;
      animating = true;
    }
    if (this.tour && t - this.tour.t0 > 7) this.tourNext(t);
    if (this.loopLabel && Math.floor(t * 1.2) !== this.loopTick) { this.loopTick = Math.floor(t * 1.2); this.loopLabel.el.textContent = `📢 ${RIVAL.loop[this.loopTick % RIVAL.loop.length]}…`; }
    if (!this.dirty && !animating) return;
    this.dirty = false;
    this.renderer.render(this.scene, this.camera);
    this.renderLabels();
  }
  dispose() { this.disposed = true; cancelAnimationFrame(this.raf); this.ro.disconnect(); this.controls.dispose(); this.renderer.dispose(); }
}

// ---------- 掛到頁面：按鈕列、時段、島清單、政見卡 ----------
export function mountTaipeiIslands(container) {
  if (!container) return null;
  let scene;
  try { scene = new IslandScene(container); }
  catch (err) { container.innerHTML = `<div style="padding:24px;text-align:center;color:#555">這台裝置開不了 3D（WebGL）。政見清單請看 <a href="${HERO.site}" target="_blank" rel="noopener">官方政見</a>。</div>`; return null; }

  const pills = document.createElement("div"); pills.className = "tpi-pills";
  const mk = (text, fn, title) => { const b = document.createElement("button"); b.type = "button"; b.textContent = text; if (title) b.title = title; b.addEventListener("click", fn); pills.appendChild(b); return b; };
  mk("↗ 全景", () => { scene.stopTour(); scene.home(); closeCard(); });
  mk("◇ 鳥瞰", () => { scene.stopTour(); scene.bird(); });
  const tourBtn = mk("🚶 導覽", () => { if (scene.tour) scene.stopTour(); else scene.startTour(); });
  const dayBtns = {};
  [["dawn", "🌅"], ["day", "☀️"], ["dusk", "🌇"], ["night", "🌙"]].forEach(([k, icon]) => { dayBtns[k] = mk(icon, () => { scene.setDay(k); Object.keys(dayBtns).forEach((j) => dayBtns[j].setAttribute("aria-pressed", j === k ? "true" : "false")); }, { dawn: "清晨", day: "白天", dusk: "黃昏", night: "夜晚" }[k]); });
  dayBtns.day.setAttribute("aria-pressed", "true");
  mk("安可島", () => { scene.stopTour(); scene.flyToIsland(RIVAL.id); showIsland(RIVAL.id); });
  container.appendChild(pills);

  const list = document.createElement("div"); list.className = "tpi-list";
  list.innerHTML = `<div class="tpi-list-head">${esc(HERO.name)}・${esc(HERO.slogan)}<small>${ISLANDS.length} 項政策主題 ／ ${ISLANDS.reduce((n, i) => n + i.buildings.length, 0)} 個細項</small></div>` +
    ISLANDS.map((i) => `<button type="button" data-island="${i.id}"><i>${String(i.number).padStart(2, "0")}</i><span>${esc(i.name)}</span><em>${i.buildings.length}</em><b>${i.heart.map((h) => `<u style="background:#${HEART_COLOR[h].toString(16).padStart(6, "0")}"></u>`).join("")}</b></button>`).join("");
  list.addEventListener("click", (e) => { const b = e.target.closest("button[data-island]"); if (!b) return; scene.stopTour(); scene.flyToIsland(b.dataset.island); showIsland(b.dataset.island); });
  container.appendChild(list);
  mk("☰ 清單", () => list.classList.toggle("open"));

  const card = document.createElement("div"); card.className = "tpi-card"; container.appendChild(card);
  const caption = document.createElement("div"); caption.className = "tpi-caption"; container.appendChild(caption);
  const closeCard = () => { card.classList.remove("show"); scene.showFlows(null); list.querySelectorAll("button").forEach((b) => b.classList.remove("on")); };
  const hex6 = (n) => `#${n.toString(16).padStart(6, "0")}`;
  const heartChips = (isl) => isl.heart.map((h) => `<span class="tpi-chip" style="--c:${hex6(HEART_COLOR[h])}">HEART・${h} ${esc(HEART_NAME[h].split(" ")[1])}</span>`).join("");

  const showIsland = (id) => {
    const isl = scene.byId[id];
    list.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.island === id));
    const related = scene.showFlows(isl.rival ? null : id);
    card.innerHTML = isl.rival
      ? `<button type="button" class="tpi-close">×</button><div class="tpi-axis">${esc(RIVAL.owner)}・${esc(RIVAL.subtitle)}</div><h4>${esc(RIVAL.name)}</h4><div>${esc(RIVAL.sign)}</div><ol class="tpi-items">${RIVAL.buildings.map((b) => `<li data-building="${b.id}"><span>${esc(b.name)}</span><small>${esc(b.phase)}</small></li>`).join("")}</ol><div class="tpi-who" style="margin-top:6px">${esc(RIVAL.footnote)}</div><div><a href="${esc(RIVAL.url)}" target="_blank" rel="noopener">來源：數位時代政見比較</a></div>`
      : `<button type="button" class="tpi-close">×</button><div class="tpi-axis">POLICY ${String(isl.number).padStart(2, "0")}・政見</div><h4>${esc(isl.name)}</h4><div>${esc(isl.summary)}</div><div class="tpi-chips">${heartChips(isl)}<span class="tpi-chip">${isl.buildings.length} 個細項</span>${related.length ? `<span class="tpi-chip">${related.length} 條協作</span>` : ""}</div><div class="tpi-sub">政策細項（點了飛過去）</div><ol class="tpi-items">${isl.buildings.map((b) => `<li data-building="${b.id}"><span>${esc(b.name)}</span>${b.phase ? `<small>${esc(b.phase.split("；")[0])}</small>` : ""}</li>`).join("")}</ol>${related.length ? `<div class="tpi-sub">和誰一起做</div><div class="tpi-chips">${related.map((r) => `<button type="button" class="tpi-chip tpi-link" data-island="${r}">↔ ${esc(scene.byId[r].name)}</button>`).join("")}</div>` : ""}<div><a href="${esc(isl.url)}" target="_blank" rel="noopener">看政見原文（puma.taipei）</a></div>`;
    card.classList.add("show");
    card.querySelector(".tpi-close").addEventListener("click", () => { closeCard(); scene.stopTour(); });
    card.querySelectorAll("li[data-building]").forEach((li) => li.addEventListener("click", () => { scene.stopTour(); scene.flyToBuilding(li.dataset.building); showBuilding(li.dataset.building); }));
    card.querySelectorAll(".tpi-link[data-island]").forEach((b) => b.addEventListener("click", () => { scene.stopTour(); scene.flyToIsland(b.dataset.island); showIsland(b.dataset.island); }));
  };
  const showBuilding = (id) => {
    const b = scene.buildings.get(id); const isl = b.isl; const p = b.b;
    card.innerHTML = `<button type="button" class="tpi-close">×</button><div class="tpi-axis"><a class="tpi-back" data-island="${isl.id}">‹ ${esc(isl.name)}</a></div><h4>${isl.rival ? "" : CIRCLED[b.k] + " "}${esc(p.name)}</h4>${p.plain ? `<div>${esc(p.plain)}</div>` : ""}${p.who ? `<div class="tpi-who">對誰有好處：${esc(p.who)}</div>` : ""}${p.facts && p.facts.length ? `<ul class="tpi-facts">${p.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}${p.phase ? `<div class="tpi-chips"><span class="tpi-chip">⏱ ${esc(p.phase)}</span></div>` : ""}${isl.rival ? `<div class="tpi-who" style="margin-top:6px">${esc(RIVAL.footnote)}</div>` : ""}<div><a href="${esc(isl.rival ? RIVAL.url : isl.url)}" target="_blank" rel="noopener">${isl.rival ? "來源：數位時代政見比較" : "看政見原文（puma.taipei）"}</a></div>`;
    card.classList.add("show");
    card.querySelector(".tpi-close").addEventListener("click", () => { closeCard(); scene.stopTour(); });
    card.querySelector(".tpi-back").addEventListener("click", () => { scene.flyToIsland(isl.id); showIsland(isl.id); });
  };

  scene.onTour = (on) => { tourBtn.setAttribute("aria-pressed", on ? "true" : "false"); caption.classList.toggle("show", on); if (on) caption.textContent = `${HERO.name} 帶你逛台北：逐島走一圈，碰畫面就停`; };
  scene.onSelect = (sel) => { if (!sel) { closeCard(); return; } if (sel.building) showBuilding(sel.building); else if (sel.island) showIsland(sel.island); };
  return scene;
}
