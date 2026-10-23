// 台北未來島：純 three.js 群島引擎（無模型檔）。資料在 data.js。
// 效能原則：靜態零件 InstancedMesh、需要時才 render、名牌用 HTML 自行投影。
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { HERO, ISLANDS, RIVAL, SRC } from "./data.js?v=1";

const TOP = 0.6;
const WATER_Y = -0.18;
const CELL = 1.6;
const DAY = { sky: 0x9fd0ea, horizon: 0xe9f3f6, water: 0x7fc4cf, fog: 0xdfeef2, sun: 0xfff2d8 };

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mulberry = (a) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hexShape = (r) => {
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y); else s.lineTo(x, y);
  }
  s.closePath();
  return s;
};

// ---- 零件工具箱：同幾何合併成 InstancedMesh ----
function createKit() {
  const geos = {
    box: new THREE.BoxGeometry(1, 1, 1),
    rbox: new RoundedBoxGeometry(1, 1, 1, 2, 0.08),
    cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 10),
    cone: new THREE.ConeGeometry(0.5, 1, 7),
    sphere: new THREE.SphereGeometry(0.5, 10, 8),
    leaf: new THREE.IcosahedronGeometry(0.5, 1),
  };
  const parts = {};
  const part = (kind, pos, scale, color, rot, owner) => {
    if (!parts[kind]) parts[kind] = [];
    parts[kind].push({ pos, scale, color, rot: rot || [0, 0, 0], owner: owner || null });
    return { kind, index: parts[kind].length - 1 };
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
      m.userData.owners = list.map((p) => p.owner);
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
    this.buildings = new Map(); // id → { pos, isl, p, tag }
    this.reducedMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const weak = (navigator.hardwareConcurrency || 8) <= 4 || /Mobi|Android/i.test(navigator.userAgent);
    this.shadows = !weak;

    const renderer = new THREE.WebGLRenderer({ antialias: !weak, powerPreference: "high-performance" });
    renderer.setPixelRatio(weak ? 1 : dpr);
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
    this.scene.background = new THREE.Color(DAY.sky);
    this.scene.fog = new THREE.Fog(DAY.fog, 55, 160);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.3, 400);
    const controls = new OrbitControls(this.camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.maxPolarAngle = THREE.MathUtils.degToRad(78);
    controls.minDistance = 4; controls.maxDistance = 80;
    controls.addEventListener("change", () => this.requestRender());
    controls.addEventListener("start", () => this.stopTour());
    this.controls = controls;

    this.buildEnvironment();
    this.buildWorld();
    this.bindPointer();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    this.resize();
    this.home(true);
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  // ---------- 環境 ----------
  buildEnvironment() {
    const { scene } = this;
    scene.add(new THREE.HemisphereLight(0xdff3ff, 0x7a8f6a, 0.9));
    const sun = new THREE.DirectionalLight(DAY.sun, 2.2);
    sun.position.set(18, 28, 12);
    sun.castShadow = this.shadows;
    if (this.shadows) {
      sun.shadow.mapSize.set(2048, 2048);
      Object.assign(sun.shadow.camera, { left: -40, right: 40, top: 40, bottom: -40, near: 1, far: 120 });
      sun.shadow.bias = -0.0005;
    }
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xbcd6ff, 0.5);
    fill.position.set(-20, 14, -20);
    scene.add(fill);
    // 水面：大平面，微透明
    const water = new THREE.Mesh(
      new THREE.CircleGeometry(220, 48),
      new THREE.MeshStandardMaterial({ color: DAY.water, roughness: 0.35, metalness: 0.05, transparent: true, opacity: 0.96 }),
    );
    water.rotation.x = -Math.PI / 2; water.position.y = WATER_Y; water.receiveShadow = this.shadows;
    scene.add(water);
    // 外圍山丘
    const rnd = mulberry(7);
    const hillMat = new THREE.MeshStandardMaterial({ color: 0x8fb37a, roughness: 0.95, flatShading: true });
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + rnd() * 0.2;
      const r = 70 + rnd() * 30;
      const h = 6 + rnd() * 10;
      const hill = new THREE.Mesh(new THREE.ConeGeometry(10 + rnd() * 12, h, 7), hillMat);
      hill.position.set(Math.cos(a) * r, WATER_Y + h / 2 - 1.5, Math.sin(a) * r);
      hill.rotation.y = rnd() * Math.PI;
      scene.add(hill);
    }
  }

  // ---------- 世界：心形五島＋中央廣場＋對岸安可島 ----------
  buildWorld() {
    const kit = createKit();
    const shadows = this.shadows;
    const solid = (color, extra) => new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, ...(extra || {}) });
    const islands = [];
    // 心形曲線取 5 點（上兩瓣、左右、下尖）
    const heart = (t) => [16 * Math.pow(Math.sin(t), 3), 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)];
    const ts = [0.75, 2.1, Math.PI, 2 * Math.PI - 2.1, 2 * Math.PI - 0.75];
    const S = 1.0;
    ISLANDS.forEach((isl, i) => {
      const [hx, hy] = heart(ts[i]);
      const n = isl.policies.length;
      const cols = Math.ceil(Math.sqrt(n * 1.3));
      const rows = Math.ceil(n / cols);
      const R = Math.max(3.4, (Math.hypot(cols, rows) * CELL) / 2 + 1.3);
      islands.push({ ...isl, idx: i, center: new THREE.Vector3(hx * S, TOP, -hy * S + 1.5), R, cols, rows, rival: false });
    });
    // 中央廣場（心的中心）
    const plaza = { key: "♥", name: HERO.slogan, center: new THREE.Vector3(0, TOP, 2.5), R: 3.4, plaza: true };
    // 安可島：心形右側對岸
    const rn = RIVAL.policies.length;
    islands.push({ ...RIVAL, key: "安", idx: islands.length, center: new THREE.Vector3(27, TOP, 7), R: 3.6, cols: rn, rows: 1, rival: true });
    this.islands = islands;
    this.plaza = plaza;

    const addIslandBody = (isl, colorTop, colorCliff) => {
      const geo = new THREE.CylinderGeometry(isl.R, isl.R - 0.15, TOP - (WATER_Y - 0.6), 6, 1);
      geo.rotateY(Math.PI / 6);
      const body = new THREE.Mesh(geo, [solid(colorCliff, { flatShading: true }), solid(colorTop), solid(colorCliff)]);
      body.position.set(isl.center.x, (TOP + WATER_Y - 0.6) / 2, isl.center.z);
      body.castShadow = shadows; body.receiveShadow = shadows;
      body.userData.island = isl.key;
      this.scene.add(body);
      // 淺水暈
      const halo = new THREE.Mesh(new THREE.ShapeGeometry(hexShape(isl.R + 0.6)), new THREE.MeshBasicMaterial({ color: 0xcfe9ea, transparent: true, opacity: 0.45, depthWrite: false }));
      halo.rotation.x = -Math.PI / 2; halo.position.set(isl.center.x, WATER_Y + 0.01, isl.center.z);
      this.scene.add(halo);
      // 沙灘環
      const ring = new THREE.Mesh(new THREE.ShapeGeometry(hexShape(isl.R * 0.98)), solid(0xe8dcc3));
      ring.rotation.x = -Math.PI / 2; ring.position.set(isl.center.x, TOP + 0.005, isl.center.z);
      this.scene.add(ring);
      const inner = new THREE.Mesh(new THREE.ShapeGeometry(hexShape(isl.R * 0.84)), solid(colorTop, { roughness: 0.95 }));
      inner.rotation.x = -Math.PI / 2; inner.position.set(isl.center.x, TOP + 0.012, isl.center.z);
      inner.receiveShadow = shadows;
      this.scene.add(inner);
    };

    islands.forEach((isl) => {
      addIslandBody(isl, isl.rival ? 0xdedede : isl.color, isl.rival ? 0x9c9c9c : 0xa8865f);
      const c = isl.center;
      // 島名牌
      const tag = this.makeLabel(`tpi-island-tag${isl.rival ? " rival" : ""}`, `<i>${esc(isl.key)}</i>${esc(isl.name)}`);
      tag.position.set(c.x, TOP + 0.1, c.z + isl.R * 0.95);
      tag.data = { island: isl.key };
      // 樓：每條政見一棟
      const rnd = mulberry(isl.idx * 17 + 3);
      isl.policies.forEach((p, k) => {
        const gx = k % isl.cols, gy = Math.floor(k / isl.cols);
        const x = c.x + (gx + 0.5 - isl.cols / 2) * CELL;
        const z = c.z + (gy + 0.5 - isl.rows / 2) * CELL * 1.05;
        const h = 0.7 + p.scale * 0.55 + (p.number ? 0.35 : 0);
        const w = 0.95 + rnd() * 0.15;
        const bodyColor = isl.rival ? 0xcfcfcf : [0xfaf6ee, 0xf3ece0, 0xfbf3e3][k % 3];
        const id = `${isl.key}-${k}`;
        kit.part("rbox", [x, TOP + h / 2, z], [w, h, w], bodyColor, null, id);
        kit.part("box", [x, TOP + h + 0.06, z], [w + 0.08, 0.12, w + 0.08], isl.roof, null, id);
        // 窗：兩條深色帶
        for (let f = 0; f < Math.max(1, Math.round(h / 0.5)); f++) {
          kit.part("box", [x, TOP + 0.35 + f * 0.5, z + w / 2 + 0.005], [w * 0.7, 0.16, 0.01], 0x3b4a5a, null, id);
        }
        if (p.number && !isl.rival) {
          // 有數字：旗桿＋亮燈
          kit.part("cyl", [x + w / 2 - 0.1, TOP + h + 0.45, z - w / 2 + 0.1], [0.05, 0.7, 0.05], 0x444444, null, id);
          kit.part("sphere", [x + w / 2 - 0.1, TOP + h + 0.85, z - w / 2 + 0.1], [0.22, 0.22, 0.22], 0xffd666, null, id);
        }
        if (isl.rival) {
          // 安可島：樓上插「重播」喇叭
          kit.part("cone", [x, TOP + h + 0.35, z], [0.3, 0.4, 0.3], 0x666666, [Math.PI, 0, 0], id);
        }
        const btag = this.makeLabel("tpi-bld-tag", `${esc(p.title)}${p.number ? `<b>${esc(p.number)}</b>` : ""}`);
        // 名牌高度交錯，密集的島比較不會疊在一起
        btag.position.set(x, TOP + h + (p.number ? 1.15 : 0.5) + (gx % 2 ? 0.45 : 0), z);
        btag.data = { building: id };
        btag.near = true;
        this.buildings.set(id, { pos: new THREE.Vector3(x, TOP + h / 2, z), isl, p, tag: btag, h });
      });
      // 樹與長椅（角落）
      for (let t = 0; t < (isl.rival ? 1 : 4); t++) {
        const a = Math.PI / 2 + (t * Math.PI) / 2 + 0.4;
        const tx = c.x + Math.cos(a) * isl.R * 0.78, tz = c.z + Math.sin(a) * isl.R * 0.78;
        const s = 0.8 + rnd() * 0.3;
        kit.part("cyl", [tx, TOP + 0.25 * s, tz], [0.14 * s, 0.5 * s, 0.14 * s], 0x8a6a4e);
        kit.part("leaf", [tx, TOP + 0.75 * s, tz], [0.9 * s, 0.85 * s, 0.9 * s], isl.rival ? 0x9aa58f : [0x7fb36a, 0x9fc77a, 0x6f8a62][t % 3]);
      }
      if (isl.rival) {
        // 告示牌 ＋ 跑馬燈
        const sign = this.makeLabel("tpi-rival-sign", `🚧 ${esc(RIVAL.sign)}`);
        sign.position.set(c.x, TOP + 0.3, c.z + isl.R * 0.55);
        this.loopLabel = this.makeLabel("tpi-loop", "");
        this.loopLabel.position.set(c.x, TOP + 5.4, c.z);
      }
    });

    // 中央廣場
    addIslandBody(plaza, 0xf2e6d2, 0xa8865f);
    kit.part("cyl", [plaza.center.x, TOP + 0.9, plaza.center.z], [0.18, 1.8, 0.18], 0xd9627a);
    kit.part("sphere", [plaza.center.x, TOP + 1.95, plaza.center.z], [0.6, 0.6, 0.6], 0xe8553f);
    const ptag = this.makeLabel("tpi-island-tag", `<i>♥</i>${esc(HERO.name)}・${esc(HERO.slogan)}`);
    ptag.position.set(plaza.center.x, TOP + 0.1, plaza.center.z + plaza.R * 0.9);
    ptag.data = { island: "♥" };
    // 橋：五島接廣場；安可島不接（隔海相望）
    islands.filter((i) => !i.rival).forEach((isl) => this.addBridge(kit, plaza.center, plaza.R, isl.center, isl.R));

    const meshes = kit.build(this.scene, new THREE.MeshStandardMaterial({ roughness: 0.8 }), shadows);
    this.kitMeshes = meshes;
    // 點選代理：每棟樓一個隱形盒
    const proxy = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial(), this.buildings.size);
    const d = new THREE.Object3D();
    const owners = [];
    let n = 0;
    this.buildings.forEach((b, id) => {
      d.position.copy(b.pos); d.scale.set(1.1, b.h, 1.1); d.updateMatrix();
      proxy.setMatrixAt(n, d.matrix); owners[n] = id; n += 1;
    });
    proxy.instanceMatrix.needsUpdate = true; proxy.visible = false; proxy.userData.owners = owners;
    this.scene.add(proxy);
    this.pick = proxy;
    this.buildWalkers();
    // 全景要塞得下五島＋廣場＋對岸安可島
    const bbox = new THREE.Box3();
    [...islands, plaza].forEach((i) => { bbox.expandByPoint(new THREE.Vector3(i.center.x - i.R, 0, i.center.z - i.R)); bbox.expandByPoint(new THREE.Vector3(i.center.x + i.R, 0, i.center.z + i.R)); });
    this.center = bbox.getCenter(new THREE.Vector3()).setY(0);
    this.sceneRadius = bbox.getSize(new THREE.Vector3()).length() / 2;
    this.islandMeshes = this.scene.children.filter((o) => o.userData && o.userData.island);
  }

  addBridge(kit, a, ra, b, rb) {
    const dist = a.distanceTo(b);
    const len = Math.max(0.6, dist - (ra + rb) * Math.cos(Math.PI / 6) + 0.9);
    const t = (ra * Math.cos(Math.PI / 6) - 0.45 + len / 2) / dist;
    const mid = a.clone().lerp(b, t);
    const ry = Math.atan2(b.x - a.x, b.z - a.z);
    kit.part("box", [mid.x, TOP + 0.02, mid.z], [1.1, 0.12, len], 0xc9a27a, [0, ry, 0]);
    for (const s of [-1, 1]) {
      const off = new THREE.Vector3(0.5 * s, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
      kit.part("box", [mid.x + off.x, TOP + 0.3, mid.z + off.z], [0.06, 0.44, len], 0x8a6a4e, [0, ry, 0]);
    }
  }

  // ---------- 走動的人 ----------
  makeFigure(shirt) {
    const g = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({ color: 0xf3cfae, roughness: 0.7 });
    const pants = new THREE.MeshStandardMaterial({ color: 0x3b3a42, roughness: 0.7 });
    const top = new THREE.MeshStandardMaterial({ color: shirt, roughness: 0.7 });
    const legL = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.16, 0.09, 2, 0.03), pants);
    legL.geometry.translate(0, -0.08, 0); legL.position.set(-0.06, 0.16, 0);
    const legR = legL.clone(); legR.position.x = 0.06;
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.14, 3, 8), top); body.position.y = 0.3;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), skin); head.position.y = 0.54;
    const armL = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.18, 0.06, 2, 0.025), top);
    armL.geometry.translate(0, -0.09, 0); armL.position.set(-0.16, 0.4, 0);
    const armR = armL.clone(); armR.position.x = 0.16;
    [legL, legR, body, head, armL, armR].forEach((m) => { m.castShadow = this.shadows; g.add(m); });
    g.userData.legs = [legL, legR]; g.userData.arms = [armL, armR];
    return g;
  }
  buildWalkers() {
    this.walkers = [];
    if (this.reducedMotion) return;
    const shirts = [0x6f7fb5, 0x58a6a6, 0xe8c547, 0xf2a1a1, 0x8fb37a, 0xb58fd0];
    const rnd = mulberry(99);
    this.islands.forEach((isl, i) => {
      const n = isl.rival ? 1 : 2;
      for (let k = 0; k < n; k++) {
        const fig = this.makeFigure(shirts[(i + k) % shirts.length]);
        this.scene.add(fig);
        this.walkers.push({ fig, cx: isl.center.x, cz: isl.center.z, r: isl.R * 0.9, speed: (0.12 + rnd() * 0.08) * (k % 2 ? -1 : 1), phase: rnd() * Math.PI * 2 });
      }
    });
    // 導覽員：紅衣
    this.guide = this.makeFigure(0xe8553f);
    this.guide.visible = false;
    this.scene.add(this.guide);
  }
  updateWalkers(t) {
    for (const w of this.walkers) {
      const ang = w.phase + t * w.speed;
      w.fig.position.set(w.cx + Math.cos(ang) * w.r, TOP, w.cz + Math.sin(ang) * w.r);
      w.fig.rotation.y = -ang + (w.speed > 0 ? Math.PI : 0);
      const sw = Math.sin(t * 7 + w.phase) * 0.5;
      w.fig.userData.legs[0].rotation.x = sw; w.fig.userData.legs[1].rotation.x = -sw;
      w.fig.userData.arms[0].rotation.x = -sw * 0.6; w.fig.userData.arms[1].rotation.x = sw * 0.6;
    }
  }

  // ---------- 名牌（HTML 自行投影） ----------
  makeLabel(cls, html) {
    const el = document.createElement("div");
    el.className = cls; el.innerHTML = html; el.style.display = "none";
    this.labelEl.appendChild(el);
    const o = { el, position: new THREE.Vector3(), shown: false, near: false, data: {} };
    this.labels.push(o);
    return o;
  }
  renderLabels() {
    const cam = this.camera;
    const w = this.labelW, h = this.labelH;
    const v = new THREE.Vector3();
    const camDist = cam.position.distanceTo(this.controls.target);
    const showNear = camDist < 26;
    for (const o of this.labels) {
      const visible = !o.near || showNear;
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
    const d = (this.sceneRadius * 1.1 * fit) / Math.tan(THREE.MathUtils.degToRad(16)) * 0.72 + 4;
    return this.center.clone().add(new THREE.Vector3(d * 0.06, d * 0.6, d * 0.8));
  }
  flyTo(pos, target, instant) {
    if (instant) { this.camera.position.copy(pos); this.controls.target.copy(target); this.fly = null; }
    else this.fly = { t0: performance.now(), from: this.camera.position.clone(), to: pos, old: this.controls.target.clone(), target, dur: 1100 };
    this.requestRender();
  }
  home(instant) { this.flyTo(this.overviewPosition(), this.center.clone(), instant); }
  bird() { this.flyTo(this.center.clone().add(new THREE.Vector3(0.01, 60, 0.5)), this.center.clone()); }
  flyToIsland(key) {
    const isl = key === "♥" ? this.plaza : this.islands.find((i) => i.key === key);
    if (!isl) return;
    const c = isl.center;
    this.flyTo(c.clone().add(new THREE.Vector3(0.5, isl.R * 2.3 + 3, isl.R * 2.6 + 3)), c.clone().setY(TOP + 0.5));
  }
  flyToBuilding(id) {
    const b = this.buildings.get(id);
    if (!b) return;
    const t = b.pos.clone().setY(TOP + 0.8);
    this.flyTo(t.clone().add(new THREE.Vector3(3.2, 4.8, 8.4)), t);
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
      if (hit && hit.building) { this.flyToBuilding(hit.building); this.onSelect && this.onSelect(hit.building); }
      else if (hit && hit.island) { this.flyToIsland(hit.island); this.onSelect && this.onSelect(null); }
      else this.onSelect && this.onSelect(null);
    });
    this.labelEl.addEventListener("click", (e) => {
      const t = e.target.closest(".tpi-island-tag, .tpi-bld-tag");
      if (!t) return;
      const o = this.labels.find((l) => l.el === t);
      if (!o) return;
      this.stopTour();
      if (o.data.island) { this.flyToIsland(o.data.island); this.onSelect && this.onSelect(null); }
      if (o.data.building) { this.flyToBuilding(o.data.building); this.onSelect && this.onSelect(o.data.building); }
    });
  }

  // ---------- 導覽：紅衣小人逐島走，停在每棟樓前 ----------
  startTour() {
    const order = [];
    this.islands.forEach((isl) => isl.policies.forEach((p, k) => order.push(`${isl.key}-${k}`)));
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
    tr.i = (tr.i + 1) % tr.order.length;
    tr.t0 = t;
    const id = tr.order[tr.i];
    const b = this.buildings.get(id);
    if (this.guide) { this.guide.position.set(b.pos.x, TOP, b.pos.z + 0.9); this.guide.rotation.y = 0; }
    this.flyToBuilding(id);
    this.onSelect && this.onSelect(id, true);
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
    let animating = false;
    if (this.fly) {
      const v = ease(Math.min(1, (now - this.fly.t0) / this.fly.dur));
      this.camera.position.lerpVectors(this.fly.from, this.fly.to, v);
      this.controls.target.lerpVectors(this.fly.old, this.fly.target, v);
      if (v >= 1) this.fly = null;
      animating = true;
    }
    if (this.controls.update()) animating = true;
    if (this.walkers && this.walkers.length) { this.updateWalkers(t); animating = true; }
    if (this.tour && t - this.tour.t0 > 5.5) this.tourNext(t);
    if (this.loopLabel && Math.floor(t * 1.2) !== this.loopTick) {
      this.loopTick = Math.floor(t * 1.2);
      this.loopLabel.el.textContent = `📢 ${RIVAL.loop[this.loopTick % RIVAL.loop.length]}…`;
    }
    if (!this.dirty && !animating) return;
    this.dirty = false;
    this.renderer.render(this.scene, this.camera);
    this.renderLabels();
  }
  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
  }
}

// ---------- 掛到頁面：按鈕列、政見卡 ----------
export function mountTaipeiIslands(container) {
  if (!container) return null;
  let scene;
  try {
    scene = new IslandScene(container);
  } catch (err) {
    container.innerHTML = `<div style="padding:24px;text-align:center;color:#555">這台裝置開不了 3D（WebGL）。政見清單請看下方文字版。</div>`;
    return null;
  }
  const pills = document.createElement("div");
  pills.className = "tpi-pills";
  const mk = (text, fn) => { const b = document.createElement("button"); b.type = "button"; b.textContent = text; b.addEventListener("click", fn); pills.appendChild(b); return b; };
  mk("↗ 全景", () => { scene.stopTour(); scene.home(); card.classList.remove("show"); });
  mk("◇ 鳥瞰", () => { scene.stopTour(); scene.bird(); });
  const tourBtn = mk("🚶 導覽", () => { if (scene.tour) scene.stopTour(); else scene.startTour(); });
  ISLANDS.forEach((isl) => mk(isl.key, () => { scene.stopTour(); scene.flyToIsland(isl.key); card.classList.remove("show"); }));
  mk("安可島", () => { scene.stopTour(); scene.flyToIsland("安"); card.classList.remove("show"); });
  container.appendChild(pills);

  const card = document.createElement("div");
  card.className = "tpi-card";
  container.appendChild(card);
  const caption = document.createElement("div");
  caption.className = "tpi-caption";
  container.appendChild(caption);

  scene.onTour = (on) => { tourBtn.setAttribute("aria-pressed", on ? "true" : "false"); caption.classList.toggle("show", on); if (on) caption.textContent = `${HERO.name} 帶你逛台北：逐島走一圈，碰畫面就停`; };
  scene.onSelect = (id) => {
    if (!id) { card.classList.remove("show"); return; }
    const b = scene.buildings.get(id);
    const src = SRC[b.p.src];
    const isl = b.isl;
    card.innerHTML = `
      <button type="button" class="tpi-close" aria-label="關閉">×</button>
      <div class="tpi-axis">${esc(isl.rival ? `${RIVAL.owner}・${RIVAL.subtitle}` : isl.name)}</div>
      <h4>${esc(b.p.title)}</h4>
      ${b.p.number ? `<div class="tpi-num">${esc(b.p.number)}</div>` : ""}
      <div>${esc(b.p.desc)}</div>
      <div class="tpi-who">對誰有好處：${esc(b.p.who)}</div>
      ${isl.rival ? `<div class="tpi-who" style="margin-top:6px">${esc(RIVAL.footnote)}</div>` : ""}
      ${src ? `<div style="margin-top:6px"><a href="${esc(src.url)}" target="_blank" rel="noopener">來源：${esc(src.name)}</a></div>` : ""}
    `;
    card.querySelector(".tpi-close").addEventListener("click", () => { card.classList.remove("show"); scene.stopTour(); });
    card.classList.add("show");
  };
  return scene;
}
