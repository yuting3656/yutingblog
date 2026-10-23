// 台北未來島 v2：純 three.js 群島引擎（無模型檔）。資料在 data.js、小模型在 models.js。
// 14 座六角政策島拼成台北輪廓、每座島一個主題色、樓＝政見細項、路燈夜景、走動的人、協作線、導覽。
// 效能原則：靜態零件 InstancedMesh、需要時才 render、名牌用 HTML 自行投影、弱裝置自動關陰影。
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
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
  day: { top: 0x9fd0ec, horizon: 0xf4f1e8, sun: 0xfff1de, sunI: 2.6, hemiSky: 0xeef6fa, hemiGround: 0x8f8270, fog: 0xeef0e4, lamp: 0, water: 0x6fa9b8 },
  dusk: { top: 0xd97b63, horizon: 0xf7c59f, sun: 0xffb070, sunI: 1.2, hemiSky: 0xf2b58a, hemiGround: 0x5a4a44, fog: 0xe8b7a0, lamp: 0.8, water: 0x5a6f8c },
  night: { top: 0x151a33, horizon: 0x2b3458, sun: 0x8fa6d9, sunI: 0.35, hemiSky: 0x3b4670, hemiGround: 0x1d2130, fog: 0x1b2140, lamp: 1.0, water: 0x1c2b45 },
};

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
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
    this.water = water;
    const rnd = mulberry(7);
    this.clouds = [];
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.9 });
    for (let i = 0; i < 9; i++) {
      const g = new THREE.Group();
      for (let k = 0; k < 4; k++) { const m = new THREE.Mesh(new THREE.SphereGeometry(2 + rnd() * 2.5, 8, 6), cloudMat); m.position.set(k * 2.4 - 3.6, rnd() * 0.6, rnd() * 1.5); m.scale.y = 0.55; g.add(m); }
      g.position.set((rnd() - 0.5) * 140, 28 + rnd() * 10, (rnd() - 0.5) * 140);
      scene.add(g);
      this.clouds.push({ g, speed: 0.4 + rnd() * 0.5 });
    }
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
      if (isl.rival) return { top: 0xd9d9d9, cliff: 0x9c9c9c, strata: 0x8a8a8a, path: 0xbdbdbd };
      const c = new THREE.Color(isl.color);
      return { top: c.clone().lerp(new THREE.Color(0xf6f0e6), 0.72).getHex(), cliff: 0xb9b3a6, strata: 0xa39d90, path: c.clone().lerp(new THREE.Color(0xffffff), 0.5).getHex() };
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
        sign.position.set(c.x, TOP + 0.2, c.z + HEX * 0.78);
        this.loopLabel = this.makeLabel("tpi-loop", "");
        this.loopLabel.position.set(c.x, TOP + 5.6, c.z);
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

    this.rotors = [];
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
    this.buildCampus();
    this.buildWalkers();
    this.flowGroup = new THREE.Group(); this.scene.add(this.flowGroup);
  }

  // ---------- 園區地形（搬自工廠地圖園區風）：起伏草原＋碎石步道＋池塘＋樹＋樹籬＋路燈＋石頭＋廊館＋風車＋花圃 ----------
  buildCampus() {
    const rim = new THREE.Group();
    const shadows = this.shadows;
    const noise = new SimplexNoise({ random: mulberry(7) });
    const ctr = this.center;
    const islands = this.islands.map((i) => ({ x: i.center.x - ctr.x, z: i.center.z - ctr.z, R: HEX }));
    const core = new THREE.Box3(); this.islands.forEach((i) => { if (!i.rival) core.expandByPoint(i.center); });
    const coreR = core.getSize(new THREE.Vector3()).length() / 2 + HEX;
    const Rp = Math.max(coreR, this.sceneRadius * 0.9) + 5; // 環狀步道半徑
    const outer = Rp + 36;
    const size = outer * 2 + 24;
    const seg = this.weak ? 120 : 190;
    const fbm = (x, z) => { let v = 0, a = 0.5, f = 1; for (let i = 0; i < 3; i++) { v += a * noise.noise(x * f, z * f); a *= 0.5; f *= 2; } return v; };
    const ponds = [
      { x: Math.cos(-2.4) * (Rp + 9), z: Math.sin(-2.4) * (Rp + 9), r: 5.5 },
      { x: Math.cos(-0.5) * (Rp + 11), z: Math.sin(-0.5) * (Rp + 11), r: 4.5 },
      { x: Math.cos(1.9) * (Rp + 8), z: Math.sin(1.9) * (Rp + 8), r: 4 },
    ];
    const spokes = [-Math.PI / 2 - 1.15, -Math.PI / 2, -Math.PI / 2 + 1.15, Math.PI / 2];
    const pathDist = (x, z) => {
      const d = Math.hypot(x, z);
      let best = Math.abs(d - Rp);
      if (d > Rp - 1) { const ang = Math.atan2(z, x); spokes.forEach((sa) => { let da = Math.abs(ang - sa); da = Math.min(da, Math.PI * 2 - da); best = Math.min(best, Math.sin(Math.min(da, Math.PI / 2)) * d); }); }
      return best;
    };
    const flatFactor = (x, z) => { let f = 1; islands.forEach((i) => { f = Math.min(f, smooth(i.R + 1.0, i.R + 5, Math.hypot(x - i.x, z - i.z))); }); return f; };
    const waterLevel = WATER_Y - 0.35;
    const heightAt = (x, z) => {
      const d = Math.hypot(x, z);
      let h = 0.55 * fbm(x * 0.05, z * 0.05) + 0.25 * noise.noise(x * 0.14, z * 0.14);
      h += smooth(Rp + 6, outer, d) * (2.4 + 3.6 * fbm(x * 0.03 + 9, z * 0.03 - 4));
      h *= flatFactor(x, z);
      h *= 0.55 + 0.45 * smooth(0.8, 3.0, pathDist(x, z));
      ponds.forEach((pnd) => { h -= (1 - smooth(pnd.r * 0.55, pnd.r, Math.hypot(x - pnd.x, z - pnd.z))) * 1.3; });
      return WATER_Y + 0.03 + h;
    };
    const tg = new THREE.PlaneGeometry(size, size, seg, seg);
    tg.rotateX(-Math.PI / 2);
    const pos = tg.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
    tg.computeVertexNormals();
    const nrm = tg.attributes.normal;
    const col = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    const lawnA = new THREE.Color(0x8fbf6a), lawnB = new THREE.Color(0xa9cf7e), dry = new THREE.Color(0xc2c98a), dirt = new THREE.Color(0xb9a27a);
    const gravel = new THREE.Color(0xd8cfbb), sand = new THREE.Color(0xe0d6b4), bed = new THREE.Color(0x8fb3ad), forest = new THREE.Color(0x6f8a62);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), y = pos.getY(i);
      const slope = 1 - nrm.getY(i);
      const n = noise.noise(x * 0.09 + 3, z * 0.09) * 0.5 + 0.5;
      const n2 = noise.noise(x * 0.3 - 7, z * 0.3 + 2) * 0.5 + 0.5;
      c.copy(lawnA).lerp(lawnB, n);
      if (n2 > 0.72) c.lerp(dry, 0.5);
      if (y > WATER_Y + 1.6) c.lerp(forest, smooth(1.6, 4.5, y - WATER_Y) * 0.6);
      if (slope > 0.3) c.lerp(dirt, 0.5);
      const pd = pathDist(x, z);
      if (pd < 1.1) c.copy(gravel).offsetHSL(0, 0, (n2 - 0.5) * 0.06);
      else if (pd < 1.6) c.lerp(gravel, 1 - (pd - 1.1) / 0.5);
      if (y < waterLevel + 0.25) c.copy(sand).lerp(bed, smooth(waterLevel + 0.25, waterLevel - 0.3, y));
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    tg.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const terrain = new THREE.Mesh(tg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, flatShading: true }));
    terrain.receiveShadow = shadows;
    rim.add(terrain);
    this.water.position.y = waterLevel;

    const rnd = mulberry(11);
    const dummy = new THREE.Object3D();
    const tc = new THREE.Color();
    const okSpot = (x, z) => { if (Math.hypot(x, z) > outer + 4) return false; if (flatFactor(x, z) < 0.98) return false; if (pathDist(x, z) < 2.0) return false; const h = heightAt(x, z); if (h < WATER_Y + 0.12) return false; return h; };
    // 樹：針葉＋圓冠，近疏遠密
    const treeN = this.weak ? 260 : 700;
    const pine = mergeGeometries([new THREE.ConeGeometry(0.5, 0.95, 6).translate(0, 0.72, 0), new THREE.ConeGeometry(0.38, 0.8, 6).translate(0, 1.12, 0), new THREE.CylinderGeometry(0.08, 0.1, 0.5, 5).translate(0, 0.25, 0)]);
    const round = mergeGeometries([new THREE.IcosahedronGeometry(0.55, 1).translate(0, 1.0, 0), new THREE.IcosahedronGeometry(0.4, 1).translate(0.3, 0.8, 0.1), new THREE.CylinderGeometry(0.1, 0.14, 0.7, 6).translate(0, 0.35, 0).toNonIndexed()]);
    const treeMat = new THREE.MeshStandardMaterial({ roughness: 0.9 });
    [pine, round].forEach((geo, kind) => {
      const count = Math.floor(treeN * (kind === 0 ? 0.45 : 0.55));
      const mesh = new THREE.InstancedMesh(geo, treeMat, count);
      let placed = 0, tries = 0;
      while (placed < count && tries < count * 25) {
        tries += 1;
        const a = rnd() * Math.PI * 2;
        const d = Rp - 6 + Math.pow(rnd(), 0.6) * (outer - Rp + 10);
        const x = Math.cos(a) * d, z = Math.sin(a) * d;
        const h = okSpot(x, z); if (h === false) continue;
        const sc = (kind === 0 ? 0.9 : 0.8) + rnd() * 0.8;
        dummy.position.set(x, h - 0.05, z); dummy.scale.set(sc, sc, sc); dummy.rotation.y = rnd() * Math.PI * 2; dummy.updateMatrix();
        mesh.setMatrixAt(placed, dummy.matrix);
        tc.setHex(kind === 0 ? [0x5d7656, 0x6f8a62, 0x4f6a4c][Math.floor(rnd() * 3)] : [0x7fb36a, 0x9fc77a, 0x8fb37a, 0xa8b96a][Math.floor(rnd() * 4)]);
        mesh.setColorAt(placed, tc); placed += 1;
      }
      mesh.count = placed; mesh.castShadow = shadows && kind === 1; rim.add(mesh);
    });
    // 樹籬：環狀步道外側，留放射步道開口
    const hedgeN = 110;
    const hedges = new THREE.InstancedMesh(new RoundedBoxGeometry(1.6, 0.6, 0.6, 2, 0.15), new THREE.MeshStandardMaterial({ color: 0x5f9a4e, roughness: 0.9 }), hedgeN);
    let hp = 0;
    for (let i = 0; i < hedgeN; i++) {
      const a = (i / hedgeN) * Math.PI * 2;
      let nearSpoke = false; spokes.forEach((sa) => { let da = Math.abs(a - sa); da = Math.min(da, Math.PI * 2 - da); if (da < 0.09) nearSpoke = true; });
      if (nearSpoke) continue;
      const d = Rp + 1.9, x = Math.cos(a) * d, z = Math.sin(a) * d;
      dummy.position.set(x, heightAt(x, z) + 0.25, z); dummy.scale.set(1, 1, 1); dummy.rotation.set(0, -a, 0); dummy.updateMatrix();
      hedges.setMatrixAt(hp, dummy.matrix); hp += 1;
    }
    hedges.count = hp; hedges.castShadow = shadows; rim.add(hedges);
    // 路燈：環狀步道內側（夜晚會亮）
    const lampN = Math.max(10, Math.floor((2 * Math.PI * Rp) / 9));
    const lampGeo = mergeGeometries([new THREE.CylinderGeometry(0.05, 0.07, 2.4, 6).translate(0, 1.2, 0), new THREE.SphereGeometry(0.16, 8, 6).translate(0, 2.5, 0)]);
    const lampMat = new THREE.MeshStandardMaterial({ color: 0xf4f4f0, roughness: 0.5, emissive: 0xffe2a0, emissiveIntensity: 0 });
    this.lampGlow.push(lampMat);
    const lamps = new THREE.InstancedMesh(lampGeo, lampMat, lampN);
    for (let i = 0; i < lampN; i++) { const a = (i / lampN) * Math.PI * 2 + 0.1, d = Rp - 1.6, x = Math.cos(a) * d, z = Math.sin(a) * d; dummy.position.set(x, heightAt(x, z), z); dummy.scale.set(1, 1, 1); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); lamps.setMatrixAt(i, dummy.matrix); }
    rim.add(lamps);
    // 石頭
    const rockN = this.weak ? 24 : 60;
    const rocks = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.5, 0), new THREE.MeshStandardMaterial({ color: 0xb2a38d, roughness: 1, flatShading: true }), rockN);
    let rp = 0;
    for (let t = 0; t < rockN * 20 && rp < rockN; t++) { const a = rnd() * Math.PI * 2, d = Rp + 3 + rnd() * (outer - Rp), x = Math.cos(a) * d, z = Math.sin(a) * d; const h = okSpot(x, z); if (h === false) continue; const sc = 0.4 + rnd() * 1.2; dummy.position.set(x, h - 0.1, z); dummy.scale.set(sc * (0.8 + rnd() * 0.6), sc * 0.7, sc); dummy.rotation.set(rnd(), rnd() * 3, rnd()); dummy.updateMatrix(); rocks.setMatrixAt(rp, dummy.matrix); rp += 1; }
    rocks.count = rp; rocks.castShadow = shadows; rim.add(rocks);
    // 玻璃廊館（太陽能屋頂）三座在後方
    const S = Math.min(2.2, Math.max(1, Rp / 22));
    const glass = new THREE.MeshStandardMaterial({ color: 0xa9dcee, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.6 });
    const frame = new THREE.MeshStandardMaterial({ color: 0xfbfbf7, roughness: 0.6 });
    const solar = new THREE.MeshStandardMaterial({ color: 0x2b4a7a, roughness: 0.35, metalness: 0.4 });
    const warm = new THREE.MeshStandardMaterial({ color: 0xffe2b0, emissive: 0xffc777, emissiveIntensity: 0.5, roughness: 0.8 });
    const wood = new THREE.MeshStandardMaterial({ color: 0xc9a27a, roughness: 0.9 });
    [[-0.95, 1.0], [0.0, 1.0], [0.95, 1.0]].forEach(([k, scale], n) => {
      const a = -Math.PI / 2 + k * 1.15, x = Math.cos(a) * (Rp + 4.5), z = Math.sin(a) * (Rp + 4.5);
      const w = (6 + n * 1.5) * scale * S, dep = 3.2 * S, h = (1.8 + (n % 2) * 0.5) * Math.sqrt(S);
      const g = new THREE.Group();
      const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, dep, 2, 0.3), glass); body.position.y = h / 2;
      const coreM = new THREE.Mesh(new THREE.BoxGeometry(w * 0.6, h * 0.5, dep * 0.5), warm); coreM.position.y = h * 0.35;
      const roof = new THREE.Mesh(new RoundedBoxGeometry(w + 0.6, 0.18, dep + 0.6, 2, 0.08), frame); roof.position.y = h + 0.09;
      const panel = new THREE.Mesh(new THREE.BoxGeometry(w - 0.6, 0.06, dep - 0.6), solar); panel.position.y = h + 0.22;
      const deck = new THREE.Mesh(new THREE.BoxGeometry(w + 2.4, 0.12, dep + 2.4), wood); deck.position.y = 0.06;
      [body, coreM, roof, panel, deck].forEach((m) => { m.castShadow = shadows; m.receiveShadow = shadows; g.add(m); });
      g.position.set(x, heightAt(x, z) + 0.02, z); g.rotation.y = -a + Math.PI / 2; rim.add(g);
    });
    // 風車兩座（會轉）
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xf4f4f0, roughness: 0.6 });
    [[-1, -0.3], [1, -0.4]].forEach(([sx, sz]) => {
      const g = new THREE.Group();
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 6, 8), poleMat); pole.position.y = 3;
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), poleMat); hub.position.set(0, 6, 0.2);
      g.add(pole, hub); g.scale.setScalar(S);
      const rotor = new THREE.Group(); rotor.position.set(0, 6, 0.25);
      for (let b = 0; b < 3; b++) { const blade = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.6, 0.05), poleMat); blade.geometry.translate(0, 1.3, 0); blade.rotation.z = (b * Math.PI * 2) / 3; rotor.add(blade); }
      g.add(rotor); this.rotors.push(rotor);
      const x = sx * (Rp + 8), z = sz * (Rp + 8);
      g.position.set(x, heightAt(x, z), z);
      g.traverse((m) => { if (m.isMesh) m.castShadow = shadows; });
      rim.add(g);
    });
    // 花圃：步道內側一圈
    const flowerN = this.weak ? 70 : 180;
    const flowers = new THREE.InstancedMesh(new THREE.SphereGeometry(0.16, 6, 5), new THREE.MeshStandardMaterial({ roughness: 0.8 }), flowerN);
    const fc = new THREE.Color(); const palette = [0xf2a1a1, 0xfcea8b, 0xffffff, 0xf0b2d8, 0xffb46b];
    for (let i = 0; i < flowerN; i++) { const a = rnd() * Math.PI * 2, d = Rp - 3.2 + rnd() * 1.4, x = Math.cos(a) * d, z = Math.sin(a) * d; dummy.position.set(x, heightAt(x, z) + 0.12, z); const sc = 0.8 + rnd() * 0.6; dummy.scale.set(sc, sc, sc); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); flowers.setMatrixAt(i, dummy.matrix); fc.setHex(palette[Math.floor(rnd() * palette.length)]); flowers.setColorAt(i, fc); }
    rim.add(flowers);
    rim.position.set(ctr.x, 0, ctr.z);
    this.scene.add(rim);
    this.campusRp = Rp;
    this.campusHeightAt = (x, z) => heightAt(x - ctr.x, z - ctr.z);
    this.buildLumberjack();
  }

  // ---------- 安可島伐木工：偷偷溜出去砍園區的樹（純搞笑，樹會長回來） ----------
  buildLumberjack() {
    const rival = this.islands.find((i) => i.rival);
    if (!rival || this.reducedMotion) return;
    const hAt = this.campusHeightAt;
    const ctr = this.center;
    // 受害樹：安可島外側方向、步道外圈一帶，獨立 Group 才能倒
    this.victims = [];
    const baseA = Math.atan2(rival.center.z - ctr.z, rival.center.x - ctr.x);
    const rnd = mulberry(321);
    for (let i = 0; i < 5; i++) {
      const a = baseA + (i - 2) * 0.22;
      const d = this.campusRp + 3.5 + (i % 2) * 2.2;
      const x = ctr.x + Math.cos(a) * d, z = ctr.z + Math.sin(a) * d;
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.1, 6), new THREE.MeshStandardMaterial({ color: 0x8a6a4e, roughness: 0.9 })); trunk.position.y = 0.55;
      const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 1), new THREE.MeshStandardMaterial({ color: [0x7fb36a, 0x9fc77a, 0x8fb37a][i % 3], roughness: 0.9 })); crown.position.y = 1.45;
      const crown2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), crown.material); crown2.position.set(0.35, 1.15, 0.2);
      [trunk, crown, crown2].forEach((m) => { m.castShadow = this.shadows; g.add(m); });
      const sc = 1.1 + rnd() * 0.4; g.scale.setScalar(sc);
      g.position.set(x, hAt(x, z) - 0.05, z);
      this.scene.add(g);
      const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.17 * sc, 0.2 * sc, 0.22, 6), new THREE.MeshStandardMaterial({ color: 0xa8865f, roughness: 0.9 })); stump.position.set(x, hAt(x, z) + 0.06, z); stump.visible = false; this.scene.add(stump);
      this.victims.push({ g, stump, x, z, standing: true, fall: 0, shake: 0 });
    }
    // 伐木工：灰衣、拿斧頭
    const jack = this.makeFigure(0x777777);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.04), new THREE.MeshStandardMaterial({ color: 0x5a3b2e })); handle.position.set(0, -0.2, 0.08);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.04), new THREE.MeshStandardMaterial({ color: 0x9a9a9a, metalness: 0.5, roughness: 0.4 })); head.position.set(0.06, -0.4, 0.08);
    jack.userData.arms[1].add(handle, head);
    this.scene.add(jack);
    const home = new THREE.Vector3(rival.center.x, TOP, rival.center.z + HEX * 0.6);
    jack.position.copy(home);
    const tag = this.makeLabel("tpi-jack-tag", "🪓 安可島派來的伐木工（偷偷的）");
    this.jack = { fig: jack, tag, home, state: "home", t0: 0, target: null, from: null, to: null, dur: 0 };
    this.onJack && this.onJack("home");
  }
  updateLumberjack(t, dt) {
    const j = this.jack; if (!j) return;
    const hAt = this.campusHeightAt;
    const { fig } = j;
    const legs = fig.userData.legs, arms = fig.userData.arms;
    const walkAnim = () => { const sw = Math.sin(t * 8) * 0.5; legs[0].rotation.x = sw; legs[1].rotation.x = -sw; arms[0].rotation.x = -sw * 0.6; arms[1].rotation.x = sw * 0.6; };
    const goTo = (x, z, dur, state) => { j.from = fig.position.clone(); j.to = new THREE.Vector3(x, 0, z); j.dur = dur; j.t0 = t; j.state = state; fig.rotation.y = Math.atan2(x - fig.position.x, z - fig.position.z); };
    if (j.state === "home") {
      legs[0].rotation.x = 0; legs[1].rotation.x = 0; arms[1].rotation.x = 0;
      if (t - j.t0 > 6) {
        // 樹全倒了就先長回來
        if (!this.victims.some((v) => v.standing)) { this.victims.forEach((v) => { v.standing = true; v.fall = 0; v.g.rotation.set(0, 0, 0); v.g.visible = true; v.stump.visible = false; }); }
        const v = this.victims.find((vv) => vv.standing); j.target = v;
        goTo(v.x + 0.9, v.z + 0.4, 6 + Math.hypot(v.x - fig.position.x, v.z - fig.position.z) * 0.9, "walk");
      }
    } else if (j.state === "walk" || j.state === "return") {
      const k = Math.min(1, (t - j.t0) / j.dur);
      fig.position.lerpVectors(j.from, j.to, k);
      fig.position.y = j.state === "return" && k > 0.85 ? TOP : Math.max(TOP, hAt(fig.position.x, fig.position.z)) + 0.02;
      walkAnim();
      if (k >= 1) { if (j.state === "walk") { j.state = "chop"; j.t0 = t; fig.rotation.y = Math.atan2(j.target.x - fig.position.x, j.target.z - fig.position.z); } else { j.state = "home"; j.t0 = t; } }
    } else if (j.state === "chop") {
      const v = j.target;
      arms[1].rotation.x = -1.6 + Math.abs(Math.sin(t * 9)) * 1.4; // 掄斧頭
      legs[0].rotation.x = 0; legs[1].rotation.x = 0;
      v.g.rotation.z = Math.sin(t * 30) * 0.03; // 樹被砍得發抖
      if (t - j.t0 > 3.2) { j.state = "fall"; j.t0 = t; const dx = v.x - fig.position.x, dz = v.z - fig.position.z, L = Math.hypot(dx, dz) || 1; v.g.rotation.y = Math.atan2(-dz / L, dx / L); }
    } else if (j.state === "fall") {
      const v = j.target;
      const k = Math.min(1, (t - j.t0) / 1.4);
      const ang = ease(k) * 1.5 + (k > 0.9 ? Math.sin((k - 0.9) * 60) * 0.06 * (1 - k) * 10 : 0);
      v.g.rotation.z = -ang;
      arms[1].rotation.x = -0.4;
      if (k >= 1) { v.standing = false; v.stump.visible = true; j.state = "pause"; j.t0 = t; }
    } else if (j.state === "pause") {
      if (t - j.t0 > 1.2) {
        const next = this.victims.find((vv) => vv.standing);
        if (next) { j.target = next; goTo(next.x + 0.9, next.z + 0.4, 2 + Math.hypot(next.x - fig.position.x, next.z - fig.position.z) * 0.9, "walk"); }
        else goTo(j.home.x, j.home.z, 5 + Math.hypot(j.home.x - fig.position.x, j.home.z - fig.position.z) * 0.9, "return");
      }
    }
    j.tag.position.set(fig.position.x, fig.position.y + 1.05, fig.position.z);
    this.labelsDirty = true;
    void dt;
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
    // 園區外圈步道：散步的人
    if (this.campusRp) {
      const hAt = this.campusHeightAt;
      for (let k = 0; k < (this.weak ? 4 : 8); k++) {
        const fig = this.makeFigure(shirts[(k * 3) % shirts.length], k % 3 === 0);
        this.scene.add(fig);
        this.walkers.push({ fig, cx: this.center.x, cz: this.center.z, r: this.campusRp + (k % 2 ? 0.5 : -0.5), speed: (k % 3 === 0 ? 0.22 : 0.05 + rnd() * 0.03) * (k % 2 ? -1 : 1), phase: rnd() * Math.PI * 2, bike: k % 3 === 0, hAt });
      }
    }
    this.guide = this.makeFigure(0xdb6a41); this.guide.visible = false; this.scene.add(this.guide);
  }
  updateWalkers(t) {
    for (const w of this.walkers) {
      const ang = w.phase + t * w.speed;
      const wx = w.cx + Math.cos(ang) * w.r, wz = w.cz + Math.sin(ang) * w.r;
      w.fig.position.set(wx, (w.hAt ? w.hAt(wx, wz) + 0.02 : TOP) + (w.bike ? 0.05 : 0), wz);
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
    const d = (this.sceneRadius * 1.1 * fit) / Math.tan(THREE.MathUtils.degToRad(16)) * 0.66 + 4;
    return this.center.clone().add(new THREE.Vector3(d * 0.04, d * 0.6, d * 0.8));
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
      if (this.jack) this.updateLumberjack(t, dt);
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
  try { scene = new IslandScene(container); window.__tpiScene = scene; }
  catch (err) {
    console.error("taipei-islands init failed", err); container.innerHTML = `<div style="padding:24px;text-align:center;color:#555">這台裝置開不了 3D（WebGL）。政見清單請看 <a href="${HERO.site}" target="_blank" rel="noopener">官方政見</a>。</div>`; return null; }

  const pills = document.createElement("div"); pills.className = "tpi-pills";
  const mk = (text, fn, title) => { const b = document.createElement("button"); b.type = "button"; b.textContent = text; if (title) b.title = title; b.addEventListener("click", fn); pills.appendChild(b); return b; };
  mk("↗ 全景", () => { scene.stopTour(); scene.home(); closeCard(); });
  mk("◇ 鳥瞰", () => { scene.stopTour(); scene.bird(); });
  const tourBtn = mk("🚶 導覽", () => { if (scene.tour) scene.stopTour(); else scene.startTour(); });
  const dayBtns = {};
  [["dawn", "🌅"], ["day", "☀️"], ["dusk", "🌇"], ["night", "🌙"]].forEach(([k, icon]) => { dayBtns[k] = mk(icon, () => { scene.setDay(k); Object.keys(dayBtns).forEach((j) => dayBtns[j].setAttribute("aria-pressed", j === k ? "true" : "false")); }, { dawn: "清晨", day: "白天", dusk: "黃昏", night: "夜晚" }[k]); });
  dayBtns.day.setAttribute("aria-pressed", "true");
  mk("安可島", () => { scene.stopTour(); scene.flyToIsland(RIVAL.id); showIsland(RIVAL.id); });
  // 全螢幕：能用 Fullscreen API 就用，不能（iPhone Safari）就改 fixed 蓋版；兩種都靠 ResizeObserver 重算尺寸
  const fsBtn = mk("⛶ 全螢幕", () => {
    const isFs = container.classList.contains("fs") || document.fullscreenElement === container || document.webkitFullscreenElement === container;
    if (isFs) {
      container.classList.remove("fs");
      if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      document.body.style.overflow = "";
    } else {
      container.classList.add("fs");
      document.body.style.overflow = "hidden";
      const req = container.requestFullscreen || container.webkitRequestFullscreen;
      if (req) { try { const r = req.call(container); if (r && r.catch) r.catch(() => {}); } catch (e) { /* 蓋版仍生效 */ } }
    }
  }, "全螢幕看（Esc 或再按一次離開）");
  const syncFs = () => { const on = container.classList.contains("fs") || document.fullscreenElement === container || document.webkitFullscreenElement === container; fsBtn.setAttribute("aria-pressed", on ? "true" : "false"); fsBtn.textContent = on ? "✕ 離開全螢幕" : "⛶ 全螢幕"; if (!document.fullscreenElement && !document.webkitFullscreenElement && !container.classList.contains("fs")) document.body.style.overflow = ""; scene.resize(); };
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) container.classList.remove("fs"); syncFs(); });
  document.addEventListener("webkitfullscreenchange", () => { if (!document.webkitFullscreenElement) container.classList.remove("fs"); syncFs(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && container.classList.contains("fs")) { container.classList.remove("fs"); syncFs(); } });
  const fsObs = new MutationObserver(syncFs); fsObs.observe(container, { attributes: true, attributeFilter: ["class"] });
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
