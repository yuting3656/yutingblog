// 台北未來島：象徵性的政見小模型（純零件堆疊，不是建築設計也不是地點）。
// 每種模型在 1×1 的地盤內畫，ctx = { part, x, z, y, s, owner, color, rnd }。
// part(kind, [x,y,z], [sx,sy,sz], color, rot, owner) 的 kind：box / rbox / cyl / cone / sphere / leaf / ring

const C = {
  wall: 0xfaf6ee, wall2: 0xf3ece0, wall3: 0xfff1dc, win: 0x3b4a5a, wood: 0x8a6a4e, dark: 0x3a3a3a,
  red: 0xd9534f, coral: 0xdb6a41, yellow: 0xfcea8b, blue: 0x4a7fb5, green: 0x6fae5c, leaf: 0x7fb36a,
  leaf2: 0x9fc77a, pine: 0x4e7d57, grey: 0x9a9a9a, white: 0xffffff, pink: 0xf2a1a1, sky: 0x8fd3ff, ink: 0x211d1d,
};

// 由政見名稱猜模型種類（找不到就 generic）
export function kindOf(id, name) {
  const n = `${id} ${name}`;
  const rules = [
    [/鐘塔|彈性上下班|工時/, "clocktower"], [/辦公|職場|EAP|健檢|獎勵|AI 支援|支援小隊/, "office"],
    [/研究院|中心|研究|治理|規劃/, "lab"], [/通學|小班|雙導師|教室|校園|特教|教師|公幼|行政|USR|教學/, "school"],
    [/公車|巴士|DRTS/, "bus"], [/自行車橋|橋/, "bridge"], [/YouBike|自行車|河濱|車道/, "bike"], [/機車|TPASS|夜間/, "scooter"],
    [/午餐|小農|食農|餐費|補差/, "farm"], [/家庭|一站|喘息|托育|育兒|親職/, "house"], [/親子|同行|博物|場館|票/, "playground"],
    [/醫|衛|診|照顧|長照|失智|居家|護理|日照|小時/, "clinic"], [/長者|祖孫|銀髮|老人/, "elder"], [/運動|健身|球|泳|田徑|驛站/, "field"],
    [/文化徑|山林徑|步道|登山|古道|徑/, "trail"], [/廟|信仰|祭|客家|桐花|燈/, "lantern"], [/森林|樹|公園|綠|微森/, "trees"],
    [/青年|創業|共享|基地|咖啡/, "cafe"], [/外交|姊妹市|國際|港|船/, "pier"], [/圖書|閱讀/, "library"], [/安全|反毒|警/, "kiosk"],
  ];
  for (const [re, kind] of rules) if (re.test(n)) return kind;
  return "generic";
}

const windows = (p, x, y, z, w, h, d, floors, owner) => {
  for (let f = 0; f < floors; f++) {
    p("box", [x, y + 0.28 + f * 0.42, z + d / 2 + 0.004], [w * 0.7, 0.14, 0.01], C.win, null, owner);
  }
};
const tree = (p, x, z, y, s, owner, round = true) => {
  p("cyl", [x, y + 0.22 * s, z], [0.12 * s, 0.44 * s, 0.12 * s], C.wood, null, owner);
  if (round) p("leaf", [x, y + 0.65 * s, z], [0.7 * s, 0.65 * s, 0.7 * s], [C.leaf, C.leaf2][Math.round(s * 10) % 2], null, owner);
  else p("cone", [x, y + 0.7 * s, z], [0.55 * s, 0.9 * s, 0.55 * s], C.pine, null, owner);
};
const roofHouse = (p, x, z, y, w, d, h, wall, roof, owner) => {
  p("box", [x, y + h / 2, z], [w, h, d], wall, null, owner);
  p("cone", [x, y + h + 0.22, z], [w * 1.25, 0.44, d * 1.25], roof, [0, Math.PI / 4, 0], owner);
  p("box", [x + w * 0.2, y + 0.14, z + d / 2 + 0.004], [0.16, 0.28, 0.01], C.wood, null, owner); // 門
};

export const MODELS = {
  generic({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.45 * s, z], [0.8 * s, 0.9 * s, 0.8 * s], C.wall, null, owner);
    p("box", [x, y + 0.95 * s, z], [0.88 * s, 0.1 * s, 0.88 * s], color, null, owner);
    windows(p, x, y, z, 0.8 * s, 0, 0.8 * s, 2, owner);
  },
  office({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.7 * s, z], [0.75 * s, 1.4 * s, 0.75 * s], C.wall2, null, owner);
    p("box", [x, y + 1.45 * s, z], [0.82 * s, 0.1 * s, 0.82 * s], color, null, owner);
    windows(p, x, y, z, 0.75 * s, 0, 0.75 * s, 3, owner);
    p("box", [x + 0.5 * s, y + 0.1, z + 0.2 * s], [0.4 * s, 0.06, 0.2 * s], C.wood, null, owner); // 戶外休息桌
    p("sphere", [x + 0.55 * s, y + 0.3, z + 0.2 * s], [0.18, 0.18, 0.18], C.leaf, null, owner); // 盆栽
  },
  clocktower({ part: p, x, z, y, s, owner, color }) {
    p("box", [x, y + 0.9 * s, z], [0.5 * s, 1.8 * s, 0.5 * s], C.wall3, null, owner);
    p("cone", [x, y + 2.0 * s, z], [0.7 * s, 0.5 * s, 0.7 * s], color, [0, Math.PI / 4, 0], owner);
    p("cyl", [x, y + 1.5 * s, z + 0.26 * s], [0.3 * s, 0.04, 0.3 * s], C.white, [Math.PI / 2, 0, 0], owner); // 鐘面
    p("box", [x, y + 1.55 * s, z + 0.29 * s], [0.03, 0.12 * s, 0.01], C.ink, null, owner);
    p("box", [x + 0.05 * s, y + 1.5 * s, z + 0.29 * s], [0.1 * s, 0.03, 0.01], C.ink, null, owner);
  },
  lab({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.5 * s, z], [1.0 * s, 1.0 * s, 0.8 * s], C.wall, null, owner);
    p("sphere", [x, y + 1.1 * s, z], [0.6 * s, 0.5 * s, 0.6 * s], color, null, owner); // 圓頂
    windows(p, x, y, z, 1.0 * s, 0, 0.8 * s, 2, owner);
    p("cyl", [x + 0.4 * s, y + 1.3 * s, z - 0.2 * s], [0.03, 0.6 * s, 0.03], C.dark, null, owner); // 天線
  },
  school({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.4 * s, z], [1.1 * s, 0.8 * s, 0.6 * s], C.wall3, null, owner);
    p("box", [x, y + 0.85 * s, z], [1.18 * s, 0.1 * s, 0.68 * s], color, null, owner);
    windows(p, x, y, z, 1.1 * s, 0, 0.6 * s, 2, owner);
    // 斑馬線＋旗桿
    for (let i = 0; i < 4; i++) p("box", [x - 0.35 * s + i * 0.23 * s, y + 0.005, z + 0.6 * s], [0.12 * s, 0.01, 0.3 * s], C.white, null, owner);
    p("cyl", [x - 0.6 * s, y + 0.6 * s, z + 0.4 * s], [0.03, 1.2 * s, 0.03], C.grey, null, owner);
    p("box", [x - 0.5 * s, y + 1.1 * s, z + 0.4 * s], [0.2 * s, 0.14 * s, 0.01], C.red, null, owner);
  },
  bus({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.32 * s, z], [1.1 * s, 0.5 * s, 0.5 * s], color, null, owner);
    p("box", [x, y + 0.42 * s, z + 0.26 * s], [0.9 * s, 0.2 * s, 0.01], C.sky, null, owner);
    for (const dx of [-0.35, 0.35]) for (const dz of [-0.25, 0.25]) p("cyl", [x + dx * s, y + 0.1 * s, z + dz * s], [0.2 * s, 0.08 * s, 0.2 * s], C.dark, [Math.PI / 2, 0, 0], owner);
    p("box", [x, y + 0.75 * s, z - 0.5 * s], [0.5 * s, 0.4 * s, 0.05], C.white, null, owner); // 站牌
    p("cyl", [x, y + 0.3 * s, z - 0.5 * s], [0.03, 0.6 * s, 0.03], C.grey, null, owner);
  },
  bridge({ part: p, x, z, y, s, owner, color }) {
    p("box", [x, y + 0.5 * s, z], [1.3 * s, 0.08, 0.4 * s], C.grey, [0, 0, 0], owner);
    for (const dx of [-0.5, 0.5]) p("box", [x + dx * s, y + 0.25 * s, z], [0.1 * s, 0.5 * s, 0.4 * s], C.grey, null, owner);
    for (const dx of [-0.5, 0, 0.5]) p("box", [x + dx * s, y + 0.7 * s, z + 0.2 * s], [0.04, 0.4 * s, 0.04], color, null, owner);
    p("box", [x, y + 0.88 * s, z + 0.2 * s], [1.3 * s, 0.03, 0.03], color, null, owner);
    p("box", [x, y + 0.08, z], [1.5 * s, 0.03, 0.2 * s], C.sky, null, owner); // 水
  },
  bike({ part: p, x, z, y, s, owner, color }) {
    for (let i = 0; i < 3; i++) {
      const bx = x - 0.35 * s + i * 0.35 * s;
      p("ring", [bx - 0.12 * s, y + 0.12 * s, z], [0.24 * s, 0.24 * s, 0.24 * s], C.dark, null, owner);
      p("ring", [bx + 0.12 * s, y + 0.12 * s, z], [0.24 * s, 0.24 * s, 0.24 * s], C.dark, null, owner);
      p("box", [bx, y + 0.2 * s, z], [0.26 * s, 0.03, 0.03], i === 1 ? C.red : color, null, owner);
    }
    p("box", [x, y + 0.55 * s, z - 0.3 * s], [0.9 * s, 0.05, 0.3 * s], C.wood, null, owner); // 棚
    for (const dx of [-0.4, 0.4]) p("cyl", [x + dx * s, y + 0.27 * s, z - 0.3 * s], [0.03, 0.55 * s, 0.03], C.wood, null, owner);
  },
  scooter({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.25 * s, z], [0.7 * s, 0.14 * s, 0.26 * s], color, null, owner);
    for (const dx of [-0.25, 0.25]) p("cyl", [x + dx * s, y + 0.12 * s, z], [0.22 * s, 0.1 * s, 0.22 * s], C.dark, [Math.PI / 2, 0, 0], owner);
    p("box", [x - 0.3 * s, y + 0.5 * s, z], [0.04, 0.5 * s, 0.3 * s], C.dark, null, owner); // 把手
    p("box", [x + 0.5 * s, y + 0.6 * s, z - 0.2 * s], [0.3 * s, 0.6 * s, 0.05], C.white, null, owner); // TPASS 牌
  },
  farm({ part: p, x, z, y, s, owner, color }) {
    for (let r = 0; r < 3; r++) p("box", [x - 0.3 * s, y + 0.04, z - 0.3 * s + r * 0.3 * s], [0.6 * s, 0.08, 0.18 * s], 0x7a5a3a, null, owner);
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) p("sphere", [x - 0.5 * s + k * 0.2 * s, y + 0.14, z - 0.3 * s + r * 0.3 * s], [0.12, 0.12, 0.12], C.leaf2, null, owner);
    roofHouse(p, x + 0.4 * s, z, y, 0.5 * s, 0.5 * s, 0.4 * s, C.wall, color, owner); // 小廚房
  },
  house({ part: p, x, z, y, s, owner, color }) {
    roofHouse(p, x, z, y, 0.8 * s, 0.7 * s, 0.6 * s, C.wall, color, owner);
    p("box", [x + 0.55 * s, y + 0.35 * s, z + 0.3 * s], [0.3 * s, 0.2 * s, 0.03], C.white, null, owner); // 招牌
    p("cyl", [x + 0.55 * s, y + 0.15 * s, z + 0.3 * s], [0.03, 0.3 * s, 0.03], C.grey, null, owner);
    tree(p, x - 0.55 * s, z + 0.2 * s, y, 0.6 * s, owner);
  },
  playground({ part: p, x, z, y, s, owner, color }) {
    // 溜滑梯＋鞦韆
    p("box", [x - 0.3 * s, y + 0.3 * s, z], [0.3 * s, 0.6 * s, 0.3 * s], color, null, owner);
    p("box", [x + 0.05 * s, y + 0.3 * s, z], [0.55 * s, 0.05, 0.25 * s], C.yellow, [0, 0, -0.6], owner);
    for (const dz of [-0.25, 0.25]) p("cyl", [x + 0.5 * s, y + 0.3 * s, z + dz * s], [0.03, 0.6 * s, 0.03], C.wood, null, owner);
    p("box", [x + 0.5 * s, y + 0.6 * s, z], [0.03, 0.03, 0.55 * s], C.wood, null, owner);
    p("box", [x + 0.5 * s, y + 0.2 * s, z], [0.14 * s, 0.03, 0.1 * s], C.red, null, owner);
  },
  clinic({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.45 * s, z], [0.9 * s, 0.9 * s, 0.7 * s], C.white, null, owner);
    p("box", [x, y + 0.95 * s, z], [0.98 * s, 0.1 * s, 0.78 * s], color, null, owner);
    p("box", [x, y + 0.6 * s, z + 0.36 * s], [0.3 * s, 0.08 * s, 0.01], C.red, null, owner);
    p("box", [x, y + 0.6 * s, z + 0.36 * s], [0.08 * s, 0.3 * s, 0.01], C.red, null, owner);
    windows(p, x, y, z, 0.9 * s, 0, 0.7 * s, 1, owner);
  },
  elder({ part: p, x, z, y, s, owner, color }) {
    roofHouse(p, x, z, y, 0.9 * s, 0.7 * s, 0.55 * s, C.wall3, color, owner);
    p("box", [x + 0.2 * s, y + 0.12, z + 0.6 * s], [0.5 * s, 0.05, 0.2 * s], C.wood, null, owner); // 長椅
    p("box", [x + 0.2 * s, y + 0.25, z + 0.68 * s], [0.5 * s, 0.2, 0.04], C.wood, null, owner);
    p("sphere", [x - 0.5 * s, y + 0.3, z + 0.5 * s], [0.3, 0.3, 0.3], C.pink, null, owner); // 花叢
  },
  field({ part: p, x, z, y, s, owner, color }) {
    p("box", [x, y + 0.02, z], [1.1 * s, 0.04, 0.8 * s], C.green, null, owner);
    p("box", [x, y + 0.045, z], [1.0 * s, 0.01, 0.02], C.white, null, owner);
    p("ring", [x, y + 0.05, z], [0.3 * s, 0.3 * s, 0.3 * s], C.white, [Math.PI / 2, 0, 0], owner);
    for (const dx of [-0.5, 0.5]) { p("box", [x + dx * s, y + 0.15, z], [0.03, 0.3, 0.3 * s], C.white, null, owner); }
    p("cyl", [x + 0.45 * s, y + 0.5 * s, z - 0.5 * s], [0.03, 1.0 * s, 0.03], C.grey, null, owner);
    p("box", [x + 0.45 * s, y + 1.0 * s, z - 0.5 * s], [0.25 * s, 0.1, 0.1], C.yellow, null, owner); // 照明
  },
  trail({ part: p, x, z, y, s, owner, color }) {
    p("cone", [x, y + 0.35 * s, z], [1.1 * s, 0.7 * s, 1.0 * s], 0x8fb37a, null, owner);
    for (let i = 0; i < 5; i++) p("box", [x - 0.45 * s + i * 0.22 * s, y + 0.1 + i * 0.09 * s, z + 0.1 * s - i * 0.05 * s], [0.14 * s, 0.03, 0.1 * s], 0xd9c9a8, null, owner);
    tree(p, x + 0.4 * s, z - 0.2 * s, y + 0.1, 0.5 * s, owner, false);
    tree(p, x - 0.4 * s, z + 0.35 * s, y, 0.45 * s, owner, false);
    p("box", [x + 0.1 * s, y + 0.95 * s, z - 0.1 * s], [0.18 * s, 0.1, 0.02], C.wood, null, owner); // 指示牌
    p("cyl", [x + 0.1 * s, y + 0.8 * s, z - 0.1 * s], [0.03, 0.3 * s, 0.03], C.wood, null, owner);
  },
  lantern({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.35 * s, z], [0.9 * s, 0.7 * s, 0.7 * s], 0xf4e2c6, null, owner);
    p("box", [x, y + 0.8 * s, z], [1.1 * s, 0.12, 0.9 * s], 0x7a3b2e, null, owner); // 翹屋脊
    p("box", [x, y + 0.9 * s, z], [0.7 * s, 0.08, 0.5 * s], 0x7a3b2e, null, owner);
    for (const dx of [-0.35, 0.35]) p("sphere", [x + dx * s, y + 0.62 * s, z + 0.4 * s], [0.18, 0.2, 0.18], C.red, null, owner); // 燈籠
    p("sphere", [x + 0.6 * s, y + 0.3, z - 0.3 * s], [0.35, 0.3, 0.35], 0xfff3f8, null, owner); // 桐花
  },
  trees({ part: p, x, z, y, s, owner, rnd }) {
    const n = 5;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 0.3 * s + (i % 2) * 0.15 * s;
      tree(p, x + Math.cos(a) * r, z + Math.sin(a) * r, y, 0.45 * s + (i % 3) * 0.12 * s, owner, i % 2 === 0);
    }
    p("box", [x, y + 0.1, z], [0.45 * s, 0.05, 0.16 * s], C.wood, null, owner); // 長椅
  },
  cafe({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.4 * s, z], [0.9 * s, 0.8 * s, 0.7 * s], C.wall2, null, owner);
    p("box", [x, y + 0.85 * s, z], [0.98 * s, 0.1 * s, 0.78 * s], color, null, owner);
    p("box", [x, y + 0.55 * s, z + 0.45 * s], [0.95 * s, 0.03, 0.3 * s], C.coral, null, owner); // 遮陽棚
    p("box", [x - 0.2 * s, y + 0.12, z + 0.6 * s], [0.25 * s, 0.03, 0.25 * s], C.wood, null, owner); // 戶外桌
    p("cyl", [x - 0.2 * s, y + 0.06, z + 0.6 * s], [0.04, 0.12, 0.04], C.wood, null, owner);
    windows(p, x, y, z, 0.9 * s, 0, 0.7 * s, 1, owner);
  },
  pier({ part: p, x, z, y, s, owner, color }) {
    p("box", [x, y + 0.08, z + 0.3 * s], [0.5 * s, 0.06, 0.9 * s], C.wood, null, owner); // 碼頭
    p("box", [x, y + 0.2 * s, z + 0.9 * s], [0.7 * s, 0.25 * s, 0.35 * s], C.white, null, owner); // 船
    p("box", [x, y + 0.4 * s, z + 0.9 * s], [0.3 * s, 0.2 * s, 0.25 * s], color, null, owner);
    p("cyl", [x, y + 0.7 * s, z + 0.9 * s], [0.04, 0.5 * s, 0.04], C.grey, null, owner);
    for (let i = 0; i < 3; i++) { p("cyl", [x - 0.4 * s + i * 0.4 * s, y + 0.5 * s, z - 0.3 * s], [0.03, 1.0 * s, 0.03], C.grey, null, owner); p("box", [x - 0.33 * s + i * 0.4 * s, y + 0.9 * s, z - 0.3 * s], [0.16 * s, 0.1 * s, 0.01], [C.red, C.blue, C.yellow][i], null, owner); }
  },
  library({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.5 * s, z], [1.0 * s, 1.0 * s, 0.7 * s], C.wall3, null, owner);
    p("box", [x, y + 1.05 * s, z], [1.08 * s, 0.1 * s, 0.78 * s], color, null, owner);
    for (let i = 0; i < 4; i++) p("box", [x - 0.3 * s + i * 0.2 * s, y + 0.5 * s, z + 0.36 * s], [0.08 * s, 0.6 * s, 0.01], [C.red, C.blue, C.yellow, C.green][i], null, owner); // 書背
  },
  kiosk({ part: p, x, z, y, s, owner, color }) {
    p("rbox", [x, y + 0.35 * s, z], [0.55 * s, 0.7 * s, 0.55 * s], C.white, null, owner);
    p("cone", [x, y + 0.85 * s, z], [0.75 * s, 0.3 * s, 0.75 * s], color, [0, Math.PI / 4, 0], owner);
    p("sphere", [x, y + 1.1 * s, z], [0.16, 0.16, 0.16], C.red, null, owner); // 警示燈
  },
  gym: null, // alias 由 kindOf 處理成 field
  // 安可島專用
  milk({ part: p, x, z, y, s, owner }) {
    p("box", [x, y + 0.55 * s, z], [0.6 * s, 1.1 * s, 0.6 * s], C.white, null, owner);
    p("cone", [x, y + 1.25 * s, z], [0.7 * s, 0.3 * s, 0.7 * s], 0xe9eef5, [0, Math.PI / 4, 0], owner);
    p("box", [x, y + 0.6 * s, z + 0.31 * s], [0.4 * s, 0.4 * s, 0.01], 0x4a7fb5, null, owner); // 標籤
  },
  gpu({ part: p, x, z, y, s, owner }) {
    p("box", [x, y + 0.6 * s, z], [0.5 * s, 1.2 * s, 0.9 * s], 0x2b2b2b, null, owner);
    for (let i = 0; i < 6; i++) p("box", [x + 0.26 * s, y + 0.2 * s + i * 0.17 * s, z], [0.01, 0.06, 0.8 * s], i % 2 ? 0x76b900 : 0x3f3f3f, null, owner);
    p("sphere", [x, y + 1.35 * s, z], [0.2, 0.2, 0.2], 0x76b900, null, owner);
  },
  dome({ part: p, x, z, y, s, owner }) {
    p("cyl", [x, y + 0.25 * s, z], [1.2 * s, 0.5 * s, 1.2 * s], C.grey, null, owner);
    p("sphere", [x, y + 0.5 * s, z], [1.15 * s, 0.7 * s, 1.15 * s], 0xd9d4c7, null, owner);
    p("box", [x, y + 0.92 * s, z], [0.2 * s, 0.1, 0.2 * s], C.red, null, owner);
  },
};

export function drawModel(kind, ctx) {
  const fn = MODELS[kind] || MODELS.generic;
  fn(ctx);
}
