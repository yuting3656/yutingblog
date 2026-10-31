import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { QUOTES, EPISODE } from './data.js';

// 小型錄音室，全部以幾何模型生成，與前兩篇共用同版本的 three.js。
export function mountRadio(root) {
  if (!root || root.dataset.mounted) return;
  root.dataset.mounted = 'true';
  root.innerHTML = `
    <header class="kyr-header">
      <div><div class="kyr-eyebrow">YUTING'S LITTLE RADIO · 01</div>
        <div class="kyr-title">留一點光</div>
        <div class="kyr-subtitle">王偉忠 × 蔡康永 · ${EPISODE.date} 訪談摘句</div>
      </div><a class="kyr-onair" href="${EPISODE.url}" target="_blank" rel="noopener noreferrer" aria-label="在 YouTube 開啟原始訪談">原始訪談 ↗</a>
    </header>
    <div class="kyr-question"><small>主題提問 · 編輯整理</small><p></p></div>
    <div class="kyr-hint">拖曳轉動 · 兩指縮放</div>
    <div class="kyr-stage" role="img" aria-label="暖色錄音室，王偉忠與蔡康永坐在圓桌兩側，桌上有兩支麥克風與一盞燈。"></div>
    <div class="kyr-names"><span>王偉忠</span><span>蔡康永 ✦</span></div>
    <div class="kyr-card">
      <div class="kyr-meta"><span class="kyr-topic"></span><span class="kyr-counter"></span></div>
      <div class="kyr-live" aria-live="off" aria-atomic="true"><blockquote class="kyr-quote"></blockquote><p class="kyr-note"></p></div>
      <a class="kyr-source" target="_blank" rel="noopener noreferrer"></a>
      <nav class="kyr-controls" aria-label="語錄播放控制">
        <button type="button" class="kyr-prev" aria-label="上一句語錄">← 上一句</button>
        <button type="button" class="kyr-next">下一句 →</button>
        <button type="button" class="kyr-auto" aria-pressed="true">暫停輪播</button>
        <div class="kyr-dots">${QUOTES.map((q, i) => `<button type="button" class="kyr-dot" data-index="${i}" aria-label="第 ${i + 1} 句：${q.topic}" aria-pressed="false"></button>`).join('')}</div>
      </nav>
      <div class="kyr-progress" aria-hidden="true"></div>
    </div>`;

  const $ = (selector) => root.querySelector(selector);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0, playing = !reduced, elapsed = 0, inView = true, sceneHandle;
  const interval = 12000;
  function show(next) {
    index = (next + QUOTES.length) % QUOTES.length;
    const q = QUOTES[index];
    elapsed = 0;
    root.style.setProperty('--kyr-accent', q.color);
    $('.kyr-topic').textContent = `蔡康永 / ${q.topic}`;
    $('.kyr-counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(QUOTES.length).padStart(2, '0')}`;
    $('.kyr-question p').textContent = q.prompt;
    $('.kyr-quote').textContent = q.text;
    $('.kyr-note').textContent = q.note;
    $('.kyr-source').textContent = `短句來源：${q.source} ↗`;
    $('.kyr-source').href = q.url;
    root.querySelectorAll('.kyr-dot').forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    if (sceneHandle) sceneHandle.setQuote(q, index);
  }
  function syncPlaying() {
    $('.kyr-auto').setAttribute('aria-pressed', String(playing));
    $('.kyr-auto').textContent = playing ? '暫停輪播' : '自動輪播';
    $('.kyr-live').setAttribute('aria-live', playing ? 'off' : 'polite');
  }
  function manual(next) { playing = false; syncPlaying(); show(next); }
  $('.kyr-prev').addEventListener('click', () => manual(index - 1));
  $('.kyr-next').addEventListener('click', () => manual(index + 1));
  $('.kyr-auto').addEventListener('click', () => { playing = !playing; elapsed = 0; syncPlaying(); });
  root.querySelectorAll('.kyr-dot').forEach(dot => dot.addEventListener('click', () => manual(Number(dot.dataset.index))));
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); manual(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  show(0); syncPlaying();
  const stage = $('.kyr-stage');
  try { sceneHandle = createStudio(stage, reduced); sceneHandle.setQuote(QUOTES[0], 0); }
  catch (error) {
    stage.innerHTML = '<div class="kyr-error">這台裝置暫時無法開啟 3D 錄音室。<br>語錄仍可用下方按鈕閱讀。</div>';
    console.warn('Radio 3D unavailable:', error);
  }
  const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0.05 });
  observer.observe(root);
  let last = performance.now();
  function frame(now) {
    if (!root.isConnected) { observer.disconnect(); sceneHandle?.dispose(); return; }
    const delta = Math.min(now - last, 100); last = now;
    if (inView && !document.hidden) {
      if (playing) { elapsed += delta; if (elapsed >= interval) show(index + 1); }
      $('.kyr-progress').style.width = playing ? `${elapsed / interval * 100}%` : '0%';
      sceneHandle?.render(now / 1000);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function createStudio(stage, reduced) {
  const weak = matchMedia('(max-width: 600px)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, weak ? 1.25 : 1.75));
  renderer.shadowMap.enabled = !weak;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  stage.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 70);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.25, 0);
  controls.enablePan = false;
  controls.enableDamping = !reduced;
  controls.minDistance = 8;
  controls.maxDistance = 18;
  controls.minPolarAngle = .65;
  controls.maxPolarAngle = 1.4;
  controls.minAzimuthAngle = -.75;
  controls.maxAzimuthAngle = .75;
  // 留一指上下滑頁，兩指仍可縮放場景。
  controls.touches.ONE = THREE.TOUCH.ROTATE;
  controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
  scene.add(new THREE.HemisphereLight(0xffedcf, 0x383346, 2.4));
  const key = new THREE.DirectionalLight(0xffdbb5, 3.2);
  key.position.set(-3, 7, 5); key.castShadow = !weak;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 });
  key.shadow.bias = -.001; scene.add(key);
  const fill = new THREE.DirectionalLight(0x8eaddb, 1.4); fill.position.set(4, 4, -4); scene.add(fill);
  const warm = new THREE.PointLight(0xffb66f, 9, 7, 2); warm.position.set(0, 2.4, -.1); scene.add(warm);
  const studio = new THREE.Group(); scene.add(studio);
  const material = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: .8, ...extra });
  const mats = {
    wood: material(0x8d5b3e), trim: material(0x473732), wall: material(0x6c6f67),
    black: material(0x242830), brass: material(0xb79360, { metalness: .5, roughness: .4 }),
    skin: material(0xe1b18e), paper: material(0xe1d6bd), cloth: material(0xb68155),
  };
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeo = new THREE.SphereGeometry(1, 18, 12);
  function box(parent, mat, x, y, z, w, h, d) {
    const mesh = new THREE.Mesh(boxGeo, mat); mesh.position.set(x, y, z); mesh.scale.set(w, h, d);
    mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function sphere(parent, mat, x, y, z, sx, sy = sx, sz = sx) {
    const mesh = new THREE.Mesh(sphereGeo, mat); mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz);
    mesh.castShadow = true; parent.add(mesh); return mesh;
  }
  function cylinder(parent, mat, x, y, z, radius, height, top = radius, segments = 24) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(top, radius, height, segments), mat);
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function rod(parent, mat, a, b, radius = .035) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), diff = end.clone().sub(start);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, diff.length(), 10), mat);
    mesh.position.copy(start.add(end).multiplyScalar(.5)); mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), diff.normalize());
    parent.add(mesh); return mesh;
  }
  function ring(parent, x, y, z, radius, color) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, .014, 6, 32), material(color));
    mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  }
  // 木製舞台、地毯、吸音牆：留出正面，形成可以拿在手上的小房間。
  box(studio, mats.trim, 0, -.18, 0, 7.7, .32, 4.9);
  box(studio, mats.wood, 0, 0, 0, 7.6, .08, 4.8);
  for (let x = -3.5; x <= 3.5; x += .42) box(studio, mats.trim, x, .047, 0, .012, .005, 4.7);
  const rug = cylinder(studio, material(0x8c6b63), 0, .065, .1, 2.55, .025); rug.scale.z = .68;
  box(studio, mats.wall, 0, 1.9, -2.25, 7.6, 3.8, .16);
  for (let x = -3.5; x <= 3.5; x += .25) box(studio, material(0x62655e), x, 1.85, -2.14, .08, 3.55, .09);
  // 中央聲學板及小小 ON AIR 指示。
  box(studio, mats.trim, 0, 2.35, -2.03, 2.5, 1.75, .12);
  box(studio, material(0x383b3c), 0, 2.35, -1.95, 2.35, 1.6, .08);
  for (let i = 0; i < 11; i++) box(studio, mats.brass, (i - 5) * .14, 2.35, -1.88, .035, .1 + Math.abs(Math.sin(i * 1.7)) * .65, .035);
  const signCanvas = document.createElement('canvas'); signCanvas.width = 512; signCanvas.height = 128;
  const ctx = signCanvas.getContext('2d'); ctx.fillStyle = '#27292b'; ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = '#f3b781'; ctx.font = '48px monospace'; ctx.textAlign = 'center'; ctx.fillText('ON AIR', 256, 83);
  const signTexture = new THREE.CanvasTexture(signCanvas);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.25, .31), new THREE.MeshBasicMaterial({ map: signTexture }));
  sign.position.set(0, 3.45, -2.12); studio.add(sign);
  // 夜窗、月亮與星星。
  box(studio, mats.trim, -2.65, 2.35, -2.03, 1.55, 1.9, .15);
  box(studio, material(0x273953), -2.65, 2.35, -1.94, 1.36, 1.7, .05);
  box(studio, mats.brass, -2.65, 2.35, -1.88, .035, 1.7, .04);
  box(studio, mats.brass, -2.65, 2.35, -1.88, 1.36, .035, .04);
  sphere(studio, material(0xffdca0, { emissive: 0xffc77b, emissiveIntensity: .5 }), -2.95, 2.87, -1.85, .15, .15, .025);
  for (let i = 0; i < 13; i++) sphere(studio, mats.paper, -3.2 + ((i * .347) % 1.1), 1.68 + ((i * .539) % 1.35), -1.85, .013);
  // 書架與書，旁邊留下一盆長大的植物。
  box(studio, mats.trim, 2.7, 1.9, -1.96, 1.45, 2.5, .25);
  for (const y of [.67, 1.4, 2.15, 2.9]) box(studio, mats.wood, 2.7, y, -1.7, 1.5, .07, .7);
  const bookColors = [0xb97555, 0xb4b29a, 0xd6b77e, 0x727e8d, 0x965e60];
  for (let row = 0; row < 3; row++) for (let i = 0; i < 6; i++) {
    const h = .35 + (i % 3) * .09;
    box(studio, material(bookColors[(i + row) % 5]), 2.15 + i * .2, .73 + row * .74 + h / 2, -1.63, .14, h, .33);
  }
  cylinder(studio, material(0xb7815b), 3.15, .32, .85, .3, .5, .36);
  for (let i = 0; i < 9; i++) {
    const a = i * 2.4, h = 1 + (i % 3) * .23;
    rod(studio, material(0x4c6c55), [3.15, .5, .85], [3.15 + Math.cos(a) * .35, h, .85 + Math.sin(a) * .26], .018);
    const leaf = sphere(studio, material(i % 2 ? 0x6f8a67 : 0x567356), 3.15 + Math.cos(a) * .35, h, .85 + Math.sin(a) * .26, .13, .32, .06);
    leaf.rotation.z = -Math.cos(a) * .8;
  }
  // 圓桌、兩杯茶、筆記與麥克風。
  cylinder(studio, mats.wood, 0, 1.31, .35, 1.17, .14);
  cylinder(studio, mats.black, 0, .66, .35, .095, 1.25);
  cylinder(studio, mats.black, 0, .12, .35, .6, .09);
  for (const x of [-.67, .67]) {
    cylinder(studio, mats.paper, x, 1.5, .68, .105, .22);
    cylinder(studio, material(0x624536), x, 1.614, .68, .084, .006);
    const handle = ring(studio, x + .12, 1.51, .68, .07, 0xe1d6bd); handle.scale.x = .65;
    cylinder(studio, mats.black, x * .8, 1.41, -.02, .15, .035);
    rod(studio, mats.black, [x * .8, 1.43, -.02], [x * .8, 1.92, -.02]);
    const mic = cylinder(studio, material(0x555960, { metalness: .5 }), x * .8, 2, -.02, .085, .27);
    mic.rotation.z = x < 0 ? -.45 : .45;
    for (let j = 0; j < 4; j++) ring(studio, x * .8, 1.93 + j * .04, .065, .049, 0x252832).scale.y = .45;
  }
  const notes = box(studio, mats.paper, .05, 1.397, .72, .44, .015, .28); notes.rotation.y = -.15;
  for (let i = 0; i < 4; i++) box(studio, mats.trim, .05, 1.407, .65 + i * .04, .3, .002, .005);
  // 一盞桌燈：語錄換句時，暖光也一起換色。
  cylinder(studio, mats.brass, 0, 1.41, -.38, .19, .045);
  rod(studio, mats.brass, [0, 1.44, -.38], [0, 2.07, -.38], .025);
  cylinder(studio, material(0xd7b380), 0, 2.12, -.38, .3, .3, .17);
  sphere(studio, material(0xffd7a4, { emissive: 0xffbb77, emissiveIntensity: 1 }), 0, 2, -.38, .12, .04, .12);

  function person(x, isTsai) {
    const group = new THREE.Group(); group.position.set(x, 0, .15); group.rotation.y = isTsai ? -.28 : .28; studio.add(group);
    const seat = material(isTsai ? 0x946951 : 0x5b6d68);
    box(group, seat, 0, .83, 0, .88, .17, .8);
    box(group, seat, 0, 1.23, -.32, .88, .8, .17);
    for (const dx of [-.32, .32]) for (const dz of [-.25, .25]) rod(group, mats.wood, [dx, .8, dz], [dx * 1.2, .1, dz * 1.2], .045);
    const shirt = material(isTsai ? 0x292d39 : 0x434b51);
    const pants = material(isTsai ? 0x292a31 : 0x34404a);
    box(group, shirt, 0, 1.35, .02, .64, .82, .42);
    sphere(group, shirt, 0, 1.6, .02, .34, .18, .23);
    for (const dx of [-.18, .18]) {
      rod(group, pants, [dx, .96, .04], [dx, .86, .56], .125);
      rod(group, pants, [dx, .86, .56], [dx, .18, .6], .105);
      sphere(group, mats.black, dx, .14, .69, .14, .09, .24);
    }
    const head = new THREE.Group(); head.position.set(0, 2, .03); group.add(head);
    sphere(head, mats.skin, 0, 0, .02, .26, .32, .245);
    sphere(head, mats.skin, -.26, -.015, .02, .055, .08, .05);
    sphere(head, mats.skin, .26, -.015, .02, .055, .08, .05);
    const hair = material(isTsai ? 0x22232a : 0x454342);
    if (isTsai) {
      sphere(head, hair, 0, .14, -.03, .285, .23, .255);
      const fringe = box(head, hair, -.02, .15, .21, .43, .15, .1); fringe.rotation.z = -.12;
    } else {
      for (let i = 0; i < 18; i++) {
        const a = i * 2.4;
        sphere(head, hair, Math.cos(a) * .22, .15 + (i % 3) * .06, Math.sin(a) * .19, .105);
      }
      for (const eyeX of [-.12, .12]) {
        const lens = ring(head, eyeX, .015, .257, .092, 0x272b32); lens.scale.y = .75;
      }
      rod(head, mats.black, [-.025, .02, .27], [.025, .02, .27], .012);
    }
    for (const eyeX of [-.1, .1]) sphere(head, mats.black, eyeX, .01, .25, .022, .025, .013);
    sphere(head, mats.skin, 0, -.06, .265, .04, .045, .055);
    const mouth = box(head, material(0x88574c), 0, -.15, .23, .09, .016, .012);
    // 蔡康永的圍巾與外套翻領，用暖色和幾何輪廓區分角色。
    if (isTsai) {
      const scarf = material(0xbe8853);
      box(group, scarf, -.08, 1.62, .25, .14, .45, .045);
      box(group, mats.paper, .08, 1.65, .24, .08, .19, .04);
    }
    const arms = [];
    for (const side of [-1, 1]) {
      const arm = new THREE.Group(); arm.position.set(side * .31, 1.61, .02); group.add(arm);
      rod(arm, shirt, [0, 0, 0], [side * .12, -.35, .15], .09);
      rod(arm, shirt, [side * .12, -.35, .15], [side * .05, -.32, .45], .085);
      sphere(arm, mats.skin, side * .05, -.32, .48, .08, .055, .095); arms.push(arm);
    }
    return { group, head, arms, mouth };
  }
  const wang = person(-1.65, false), tsai = person(1.65, true);
  // 空中的金色微粒，在兩人中間像留下來的幾點光。
  const particleMat = new THREE.MeshBasicMaterial({ color: 0xe7b978, transparent: true, opacity: .65 });
  const particles = [];
  for (let i = 0; i < 16; i++) {
    const p = sphere(studio, particleMat, 0, 0, 0, .018 + (i % 3) * .007); particles.push(p);
  }
  let quoteIndex = 0, lastRender = 0, dirty = true;
  controls.addEventListener('change', () => { dirty = true; });
  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height; camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    const distance = width < 500 ? 13.9 : 11.8;
    camera.position.set(0, 5.3, distance);
    controls.update(); dirty = true;
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(stage); resize();
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    const hint = document.createElement('div'); hint.className = 'kyr-error'; hint.textContent = '3D 畫面暫停了，重新整理可再試；下方語錄仍可閱讀。'; stage.appendChild(hint);
  });
  return {
    setQuote(q, i) { quoteIndex = i; particleMat.color.set(q.glow); warm.color.set(q.glow); dirty = true; },
    render(t) {
      if (reduced && !dirty) return;
      if (!reduced && t - lastRender < (weak ? 1 / 30 : 1 / 45)) return;
      lastRender = t;
      const time = reduced ? 0 : t;
      tsai.head.rotation.z = Math.sin(time * 1.5) * .035;
      tsai.head.rotation.y = -.08 + Math.sin(time * .75) * .06;
      tsai.arms[0].rotation.x = -.2 + Math.sin(time * 1.8) * .1;
      tsai.arms[0].rotation.z = .22 + Math.sin(time * 1.3) * .07;
      tsai.mouth.scale.y = 1 + Math.max(0, Math.sin(time * 9)) * .8;
      wang.head.rotation.x = Math.sin(time * 1.4) * .04;
      wang.head.rotation.y = .08;
      warm.intensity = 8 + Math.sin(time * .7) * .5 + (quoteIndex === 1 ? 3 : 0);
      particles.forEach((p, i) => {
        const y = ((time * .12 + i * .137) % 1.7);
        p.position.set(Math.sin(i * 2.4 + time * .3) * .65, 1.8 + y, -.25 + Math.cos(i * 1.7) * .4);
        p.scale.setScalar(.018 + .012 * Math.sin(i + time));
      });
      controls.update(); renderer.render(scene, camera); dirty = false;
    },
    dispose() {
      resizeObserver.disconnect(); controls.dispose();
      const geometries = new Set(), materials = new Set();
      scene.traverse(o => { if (o.geometry) geometries.add(o.geometry); if (o.material) materials.add(o.material); });
      geometries.forEach(g => g.dispose()); materials.forEach(m => { m.map?.dispose(); m.dispose(); });
      renderer.dispose();
    },
  };
}
