import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mountRadio } from '../kangyong-radio/radio.js?v=3';
import { QUOTES, EPISODE } from './data.js?v=3';

export function mountDebate(root) {
  mountRadio(root, {
    quotes: QUOTES, episode: EPISODE, createScene: createDebateStage,
    title: '台北順起來', eyebrow: 'THE TAIPEI CURRENT → FUTURE SOON',
    subtitle: '你說，我做 · 官方申論與結辯筆記',
    sourceLabel: '官方整理', showKind: true,
    names: ['沈伯洋 · 台北順起來'],
    sceneLabel: '沈伯洋站在陽光橘色講台前，洋流飄帶在風中飄動；周圍有台北城市、樹木、住宅與公車模型，切換主題會點亮城市區塊。',
  });
}

function createDebateStage(stage, reduced) {
  const weak = matchMedia('(max-width: 600px)').matches;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, weak ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.shadowMap.enabled = !weak;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  stage.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff6e6, 0x7d6255, 2.4));
  const key = new THREE.DirectionalLight(0xffe4bb, 3.5); key.position.set(-3, 7, 5);
  key.castShadow = !weak; key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -.001;
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 }); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffbb83, 1.8); rim.position.set(4, 4, -3); scene.add(rim);
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 60);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.2, 0); controls.enablePan = false; controls.enableDamping = !reduced;
  controls.minDistance = 9; controls.maxDistance = 22;
  controls.minPolarAngle = .75; controls.maxPolarAngle = 1.4;
  controls.minAzimuthAngle = -.7; controls.maxAzimuthAngle = .7;
  const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: .75, ...extra });
  const colors = { jade: mat(0xdb6a41), dark: mat(0x211d1d), gold: mat(0xf0b56e, { metalness: .3 }), white: mat(0xfff7e9), skin: mat(0xd8ab8a), black: mat(0x292b30), gray: mat(0xb4b7b3), hair: mat(0x34302d) };
  const boxGeo = new THREE.BoxGeometry(1, 1, 1), ballGeo = new THREE.SphereGeometry(1, 16, 12);
  function box(parent, material, position, scale) {
    const m = new THREE.Mesh(boxGeo, material); m.position.set(...position); m.scale.set(...scale);
    m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
  }
  function ball(parent, material, position, scale) {
    const m = new THREE.Mesh(ballGeo, material); m.position.set(...position); m.scale.set(...scale); m.castShadow = true; parent.add(m); return m;
  }
  function cylinder(parent, material, position, radius, height, top = radius) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(top, radius, height, 32), material); m.position.set(...position); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
  }
  function rod(parent, material, a, b, radius = .025) {
    const av = new THREE.Vector3(...a), bv = new THREE.Vector3(...b), d = bv.clone().sub(av);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, d.length(), 8), material);
    m.position.copy(av.add(bv).multiplyScalar(.5)); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); parent.add(m); return m;
  }
  function sign(parent, text, x, y, z, width, height, background = '#db6a41', foreground = '#211d1d') {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 256;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = background; ctx.fillRect(0, 0, 1024, 256);
    ctx.fillStyle = foreground; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    let size = 156; do { ctx.font = `900 ${size--}px "PingFang TC", sans-serif`; } while (ctx.measureText(text).width > 940 && size > 30);
    ctx.fillText(text, 512, 132);
    const texture = new THREE.CanvasTexture(canvas);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: texture }));
    m.position.set(x, y, z); parent.add(m); return m;
  }
  const world = new THREE.Group(); scene.add(world);
  cylinder(world, colors.jade, [0, -.16, 0], 3.7, .32);
  cylinder(world, mat(0xf4dfc6), [0, .02, 0], 3.62, .08);
  cylinder(world, colors.gold, [0, .072, 0], 2.5, .02);
  cylinder(world, mat(0xf3d1ae), [0, .09, 0], 2.47, .025);
  // 城市天際線：101 與街屋皆為示意模型。
  const city = new THREE.Group(); city.position.z = -1.7; world.add(city);
  const buildingMats = [mat(0xc2ad9a), mat(0xe0c8aa), mat(0xbab7ac)];
  for (let i = 0; i < 11; i++) {
    const x = -3 + i * .59, h = .6 + ((i * 7) % 6) * .18;
    box(city, buildingMats[i % 3], [x, h / 2 + .1, -.25 - (i % 2) * .22], [.39, h, .4]);
    for (let row = 0; row < 3; row++) for (const dx of [-.1, .1]) box(city, colors.gold, [x + dx, .3 + row * .23, -.035 - (i % 2) * .22], [.045, .075, .008]);
  }
  for (let i = 0; i < 7; i++) {
    const w = .45 - (i % 2) * .09;
    box(city, mat(0x629f91), [1.98, 1.05 + i * .19, -.8], [w, .18, w]);
  }
  rod(city, colors.gold, [1.98, 2.3, -.8], [1.98, 2.72, -.8], .015);
  const haloMat = new THREE.MeshBasicMaterial({ color: 0xdb6a41, transparent: true, opacity: .55 });
  const halo = new THREE.Mesh(new THREE.TorusGeometry(2.25, .018, 6, 64), haloMat); halo.position.set(0, 1.45, -2.3); world.add(halo);
  sign(world, 'FUTURE SOON', 0, 3.2, -2.1, 2.7, .42, '#fff7e9');
  // 沈伯洋：捲髮、眼鏡、灰西裝與藍領帶。
  const person = new THREE.Group(); person.position.set(0, .12, .28); world.add(person);
  for (const x of [-.18, .18]) {
    box(person, mat(0x4e5a5b), [x, .53, 0], [.23, .9, .28]);
    ball(person, colors.black, [x, .12, .1], [.16, .1, .26]);
  }
  box(person, colors.gray, [0, 1.37, 0], [.78, .9, .45]);
  box(person, colors.white, [0, 1.47, .24], [.3, .62, .025]);
  const tie = box(person, mat(0x719caf), [0, 1.43, .26], [.075, .47, .02]); tie.rotation.z = .04;
  for (let i = 0; i < 5; i++) box(person, colors.white, [0, 1.25 + i * .075, .274], [.072, .008, .006]);
  rod(person, colors.skin, [0, 1.78, 0], [0, 1.96, 0], .11);
  const head = new THREE.Group(); head.position.set(0, 2.12, .015); person.add(head);
  ball(head, colors.skin, [0, 0, 0], [.29, .35, .26]);
  for (const x of [-.29, .29]) ball(head, colors.skin, [x, -.025, 0], [.055, .085, .05]);
  for (let i = 0; i < 26; i++) {
    const a = i * 2.4;
    ball(head, colors.hair, [Math.cos(a) * .255, .16 + (i % 4) * .055, Math.sin(a) * .22 - .025], [.11, .12, .105]);
  }
  for (const x of [-.13, .13]) {
    const lens = new THREE.Mesh(new THREE.TorusGeometry(.105, .016, 6, 24), colors.black); lens.position.set(x, .015, .27); lens.scale.y = .8; head.add(lens);
    ball(head, colors.black, [x, .015, .276], [.023, .027, .012]);
  }
  rod(head, colors.black, [-.03, .02, .28], [.03, .02, .28], .013);
  ball(head, colors.skin, [0, -.07, .275], [.04, .045, .05]);
  const mouth = box(head, mat(0x8d5b4c), [0, -.16, .235], [.1, .014, .012]);
  const hand = new THREE.Group(); hand.position.set(-.38, 1.7, 0); person.add(hand);
  rod(hand, colors.gray, [0, 0, 0], [-.12, -.27, .16], .11);
  rod(hand, colors.gray, [-.12, -.27, .16], [-.05, -.15, .44], .095);
  ball(hand, colors.skin, [-.05, -.15, .48], [.09, .065, .11]);
  rod(person, colors.gray, [.38, 1.67, 0], [.46, 1.28, .18], .105);
  ball(person, colors.skin, [.46, 1.28, .26], [.09, .065, .12]);
  // 講台、麥克風與暖光邊線。
  cylinder(world, colors.dark, [0, .16, .92], .77, .12);
  box(world, colors.jade, [0, .85, .92], [.88, 1.3, .38]);
  const desk = box(world, mat(0xf5cba3), [0, 1.52, .86], [1.25, .09, .7]); desk.rotation.x = .08;
  sign(world, '台北順起來', 0, 1.06, 1.12, .76, .21);
  sign(world, '沈伯洋', 0, .72, 1.12, .58, .15);
  for (const x of [-.34, .34]) {
    rod(world, colors.black, [x, 1.57, .84], [x * .6, 1.94, .52], .02);
    ball(world, colors.black, [x * .6, 1.94, .52], [.045, .055, .085]);
  }
  // 每一個主題是一小塊市民日常，切換時點亮對應區塊。
  const neighborhoods = [];
  const names = ['申論與承諾', '把市府打開', '從日常開始', '城市接住你', '先有市民'];
  const locations = [[-2.5, .55], [-1.6, 1.85], [1.65, 1.82], [2.6, .3], [-2.3, -1.15]];
  for (let i = 0; i < names.length; i++) {
    const group = new THREE.Group(); const [x, z] = locations[i]; group.position.set(x, .11, z); world.add(group);
    const lightMat = mat(0xddaa7d, { emissive: 0x7d3d1f, emissiveIntensity: .3 });
    const base = cylinder(group, lightMat, [0, .02, 0], .56, .05); neighborhoods.push({ group, base, material: lightMat, category: names[i] });
    if (i === 1 || i === 4) {
      for (let j = 0; j < 3; j++) {
        const tx = (j - 1) * .27, tz = (j % 2) * .2;
        cylinder(group, mat(0x8e7655), [tx, .26, tz], .035, .45);
        ball(group, mat(j % 2 ? 0x82ad73 : 0x5d9774), [tx, .58, tz], [.2, .32, .19]);
      }
    } else if (i === 2) {
      for (const tx of [-.22, .22]) {
        box(group, mat(0xdbc5a0), [tx, .32, 0], [.32, .55, .4]);
        box(group, colors.jade, [tx, .64, 0], [.36, .07, .44]);
        box(group, colors.gold, [tx, .37, .205], [.12, .14, .01]);
      }
    } else if (i === 3) {
      box(group, mat(0x87acbd), [0, .4, 0], [.56, .7, .44]);
      for (let r = 0; r < 3; r++) box(group, colors.white, [0, .22 + r * .18, .23], [.42, .05, .01]);
      rod(group, colors.gold, [0, .76, 0], [0, .99, 0], .02);
    } else {
      box(group, mat(0xd7a572), [0, .22, 0], [.7, .3, .35]);
      box(group, mat(0x92bbc2), [0, .39, -.01], [.62, .16, .29]);
      for (const tx of [-.23, .23]) for (const tz of [-.19, .19]) ball(group, colors.black, [tx, .12, tz], [.08, .08, .035]);
    }
  }
  // 以實物的橘、白、黑重複字樣與長條比例，程式繪製洋流飄帶示意。
  const ribbonCanvas = document.createElement('canvas'); ribbonCanvas.width = 3072; ribbonCanvas.height = 256;
  const ribbonCtx = ribbonCanvas.getContext('2d');
  ribbonCtx.fillStyle = '#ed6c2f'; ribbonCtx.fillRect(0, 0, 3072, 256);
  for (let i = 0; i < 6; i++) {
    const x = i * 512;
    ribbonCtx.fillStyle = '#fff6e8'; ribbonCtx.beginPath(); ribbonCtx.moveTo(x + 145, 0); ribbonCtx.lineTo(x + 340, 0); ribbonCtx.lineTo(x + 250, 256); ribbonCtx.lineTo(x + 55, 256); ribbonCtx.fill();
    ribbonCtx.fillStyle = '#211d1d'; ribbonCtx.font = '900 214px "PingFang TC", sans-serif'; ribbonCtx.textAlign = 'center'; ribbonCtx.textBaseline = 'middle'; ribbonCtx.fillText('洋流', x + 256, 137);
    ribbonCtx.fillStyle = '#211d1d'; ribbonCtx.fillRect(x + 8, 5, 112, 22); ribbonCtx.fillStyle = '#fff6e8'; ribbonCtx.font = 'bold 15px sans-serif'; ribbonCtx.fillText('TAIPEI 2026', x + 64, 17);
  }
  const ribbonTexture = new THREE.CanvasTexture(ribbonCanvas); ribbonTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const ribbons = [];
  function ribbon(width, height, position, rotation, phase) {
    const geometry = new THREE.PlaneGeometry(width, height, 42, 3);
    const base = new Float32Array(geometry.attributes.position.array);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: ribbonTexture, side: THREE.DoubleSide, toneMapped: false }));
    mesh.position.set(...position); mesh.rotation.z = rotation; world.add(mesh); ribbons.push({mesh, geometry, base, width, phase});
  }
  ribbon(4.15, .35, [-1.45, 2.48, -.85], .24, 0);
  ribbon(3.8, .32, [1.35, .65, 2.2], -.2, 2);
  // 兩條窄尾巴從講台旁垂下，呼應實物打結後的飄帶。
  ribbon(1.15, .13, [.72, 1.04, 1.2], -1.25, 1);
  ribbon(1.1, .13, [.9, 1.06, 1.18], -1.6, 3);
  ball(world, colors.jade, [.6, 1.55, 1.2], [.09, .075, .065]);
  const glow = new THREE.PointLight(0xdb6a41, 4, 8); glow.position.set(0, 2.9, 1.5); scene.add(glow);
  let dirty = true, last = 0, active = '';
  controls.addEventListener('change', () => { dirty = true; });
  function resize() {
    const {width, height} = stage.getBoundingClientRect(); if (!width || !height) return;
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
    camera.position.set(0, 4.8, width < 350 ? 18 : width < 500 ? 14.4 : 12.8);
    controls.update(); dirty = true;
  }
  const observer = new ResizeObserver(resize); observer.observe(stage); resize();
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault(); const message = document.createElement('div'); message.className = 'kyr-error'; message.textContent = '3D 舞台暫停了，重新整理可重試；語錄仍可閱讀。'; stage.appendChild(message);
  });
  return {
    setQuote(q) {
      active = q.category; haloMat.color.set(q.glow); glow.color.set(q.glow);
      neighborhoods.forEach(n => { n.material.color.set(n.category === active ? q.glow : 0xddaa7d); n.material.emissiveIntensity = n.category === active ? .7 : .15; });
      dirty = true;
    },
    render(t) {
      if (reduced && !dirty) return;
      if (!reduced && t - last < 1 / 30) return; last = t;
      const time = reduced ? 0 : t;
      head.rotation.y = Math.sin(time * .6) * .09; head.rotation.z = Math.sin(time) * .02;
      hand.rotation.x = -.08 + Math.sin(time * 1.4) * .09;
      mouth.scale.y = 1 + Math.max(0, Math.sin(time * 8)) * .7;
      neighborhoods.forEach(n => { n.group.position.y = .11 + (n.category === active ? Math.sin(time * 1.6) * .035 : 0); });
      ribbons.forEach(({geometry, base, width, phase}) => {
        const pos = geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = base[i * 3], u = (x + width / 2) / width;
          pos.setXYZ(i, x, base[i * 3 + 1] + Math.sin(u * 7 - time * 2 + phase) * .085 * u, Math.sin(u * 9 - time * 1.6 + phase) * .13 * u);
        }
        pos.needsUpdate = true; geometry.computeVertexNormals();
      });
      controls.update(); renderer.render(scene, camera); dirty = false;
    },
    dispose() {
      observer.disconnect(); controls.dispose(); const geometries = new Set(), materials = new Set();
      scene.traverse(o => { if (o.geometry) geometries.add(o.geometry); if (o.material) materials.add(o.material); });
      geometries.forEach(g => g.dispose()); materials.forEach(m => { m.map?.dispose(); m.dispose(); }); renderer.dispose();
    },
  };
}
