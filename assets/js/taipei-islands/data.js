// 台北未來島：資料層。改這裡就會長出新的島／新的樓，引擎不用動。
// 每條政見：title 短名（名牌用）、desc 白話一句、number 有數字才會長高、who 受益的人、src 來源。
// 來源整理自 2026-10 的公開報導（見各條 src）。數字以報導為準，有新政見請補來源。

export const HERO = {
  name: "沈伯洋",
  slogan: "台北順起來",
  intro: "HEART 五大主軸，五座島，每一棟樓都是一條有來源的政見。",
};

export const SRC = {
  bnext: { name: "數位時代｜沈伯洋、蔣萬安政見比較", url: "https://www.bnext.com.tw/article/92509/taipei-mayor-2026-shen-chiang-tech-policy" },
  setn: { name: "三立｜HEART 五大主軸", url: "https://www.setn.com/news/1887550" },
  ettoday: { name: "ETtoday｜夜間市長專訪", url: "https://www.ettoday.net/news/20260816/3218461.htm" },
  today: { name: "今周刊｜HEART 評論", url: "https://www.businesstoday.com.tw/article/category/183027/post/202608240037/" },
  cna: { name: "中央社｜台北市選戰", url: "https://www.cna.com.tw/news/aipl/202609215003.aspx" },
  rti: { name: "央廣｜蔣萬安打政績牌", url: "https://rti.org.tw/news?pid=230440&uid=3" },
  newtalk: { name: "Newtalk｜蔣萬安細數四年政績", url: "https://newtalk.tw/news/view/2026-09-03/1057562" },
};

// 五座島：HEART。color 是島頂色，roof 是樓頂色。
export const ISLANDS = [
  {
    key: "H",
    name: "Habitat 空間",
    tagline: "住得起、走得到、呼吸得到",
    color: 0xd9ead3,
    roof: 0x4f9d69,
    policies: [
      { title: "老宅延壽", desc: "30 年以上沒電梯的老公寓，先加電梯、補結構，讓長輩不用再爬五樓。", number: "8 萬多棟", who: "住老公寓的家庭", scale: 3, src: "bnext" },
      { title: "婚育宅・青年宅", desc: "結婚、生小孩、剛出社會，各有一種租得起的家。", number: null, who: "新婚、年輕家庭", scale: 2, src: "bnext" },
      { title: "內湖科技宅", desc: "在內湖蓋給科技園區上班族的住宅，不用再每天跨河通勤。", number: null, who: "內科上班族", scale: 2, src: "bnext" },
      { title: "跨基隆河自行車橋", desc: "一座專給自行車的橋，內湖、南港、松山騎車直接過河。", number: "約 9.5 億", who: "通勤騎士", scale: 2, src: "bnext" },
      { title: "兩河流域・台北山徑", desc: "把基隆河、淡水河岸和環山步道串成一條能走一整天的綠帶。", number: null, who: "全體市民", scale: 1, src: "today" },
    ],
  },
  {
    key: "E",
    name: "Empower 培力",
    tagline: "把機會直接放到年輕人手上",
    color: 0xfde9c9,
    roof: 0xe08a3c,
    policies: [
      { title: "青年 AI 支持方案", desc: "18 到 25 歲大學與碩士生，每月有 AI 工具的基礎額度，先學會用再說。", number: "兩期共 9 億・每月 300 元", who: "大學生、研究生", scale: 3, src: "bnext" },
      { title: "城市青年基金", desc: "18 到 22 歲青年每月提撥一筆錢，弱勢加倍，拿去學東西、試東西。", number: "每月 1,500 元（弱勢 3,000）・年約 18～20 億", who: "18～22 歲青年", scale: 3, src: "bnext" },
      { title: "青年圓夢計畫", desc: "長期的青年創業與實作補助，不是一次性煙火。", number: "8 年 20 億", who: "想做點什麼的年輕人", scale: 3, src: "bnext" },
      { title: "45+ 轉職陪跑", desc: "AI 時代被影響最大的不是年輕人，是 45 歲以上的中年人，市府陪你轉。", number: null, who: "45 歲以上市民", scale: 2, src: "bnext" },
      { title: "新創採購保障", desc: "市府採購留固定比例給新創，讓新創有第一個客戶。", number: "固定參與比例", who: "新創團隊", scale: 1, src: "bnext" },
      { title: "北士科都市研究院", desc: "網羅博士級人才，用資料做城市決策，不靠拍腦袋。", number: "70～80 位博士", who: "整座城市", scale: 2, src: "bnext" },
    ],
  },
  {
    key: "A",
    name: "Accompany 陪伴",
    tagline: "從育兒到長照，市府陪在旁邊",
    color: 0xfbe0e6,
    roof: 0xd9627a,
    policies: [
      { title: "12 區家庭教育中心", desc: "每個行政區一個，教養、親子、家庭關係，走路就到。", number: "12 個行政區", who: "爸媽、照顧者", scale: 2, src: "bnext" },
      { title: "長照陪伴", desc: "HEART 的 A 把長照納進主軸，讓照顧者不是一個人撐。", number: null, who: "長輩與照顧者", scale: 1, src: "setn" },
      { title: "運動驛站", desc: "社區裡的小型運動據點，不用跑大運動中心。", number: null, who: "想動一動的人", scale: 1, src: "bnext" },
      { title: "健身小巴", desc: "把健身器材載到巷口，長輩在家門口就能練。", number: null, who: "社區長輩", scale: 1, src: "bnext" },
    ],
  },
  {
    key: "R",
    name: "Resilience 韌性",
    tagline: "安心，來自看不見的基礎建設",
    color: 0xdbe9f6,
    roof: 0x4a7fb5,
    policies: [
      { title: "變電所複合設施", desc: "北士科變電所結合無人公車充電站和 24 小時圖書館，基礎設施也能親近。", number: "24 小時", who: "北士科居民", scale: 2, src: "bnext" },
      { title: "首都 2.0", desc: "把台北當首都來規劃韌性：能源、防災、治理一起升級。", number: null, who: "全體市民", scale: 2, src: "today" },
      { title: "設計長", desc: "市府設一位設計長，公共空間與服務先想使用者。", number: null, who: "每天用市政服務的人", scale: 1, src: "today" },
      { title: "城市基金", desc: "用基金的方式長期投資城市建設，不被年度預算綁死。", number: null, who: "下一個十年的台北", scale: 1, src: "today" },
    ],
  },
  {
    key: "T",
    name: "Time 時間",
    tagline: "把塞在路上的時間還給你",
    color: 0xece3f6,
    roof: 0x8a63b8,
    policies: [
      { title: "內湖錯峰上下班", desc: "彈性工時加錯峰，內湖不用每天早上一起卡在堤頂大道。", number: "交通五項主張", who: "內科上班族", scale: 2, src: "bnext" },
      { title: "電動小巴最後一哩", desc: "從捷運站到辦公室那一段，電動小巴接起來。", number: null, who: "通勤族", scale: 2, src: "bnext" },
      { title: "TPASS 納共享機車", desc: "月票也能騎共享機車，最後一哩不用再掏錢。", number: null, who: "TPASS 用戶", scale: 2, src: "setn" },
      { title: "捷運站換衣沖洗", desc: "騎車、跑步通勤的人，到站有地方沖洗換衣。", number: null, who: "運動通勤族", scale: 1, src: "setn" },
      { title: "夜間市長", desc: "夜市、八大、酒吧納入規範與輔導，夜間經濟有人管、也有人挺。", number: null, who: "夜間工作者與夜貓子", scale: 2, src: "ettoday" },
    ],
  },
];

// 對岸的小島：幽默但有憑有據。三樣他最常講的政績各一棟，其餘用告示牌講清楚。
export const RIVAL = {
  name: "安可島",
  owner: "蔣萬安",
  subtitle: "現任市長・連任政見施工中",
  sign: "連任政見 施工中…（連任辦公室 2026/09/29 成立）",
  loop: ["🥛 生生喝鮮奶", "🖥 輝達來了", "🏟 大巨蛋", "🥛 鮮奶", "🖥 輝達", "🏟 巨蛋"],
  color: 0xe6e6e6,
  roof: 0x9a9a9a,
  policies: [
    { title: "🥛 生生喝鮮奶", desc: "全國首創，學生每週喝鮮奶。好事，但四年來講了不知道幾次。", number: "政績", who: "學生", scale: 2, src: "newtalk" },
    { title: "🖥 輝達北士科", desc: "輝達台灣總部落腳北士科 T17、T18，50 年地上權。好事，也是每場都要講一次。", number: "權利金 122 億", who: "北士科", scale: 3, src: "bnext" },
    { title: "🏟 大巨蛋啟用", desc: "上任第一年啟用大巨蛋。好事，蛋是前幾任蓋的，但剪綵是他剪的。", number: "政績", who: "球迷", scale: 2, src: "newtalk" },
  ],
  footnote: "公平起見：捷運六線齊發、自駕公車三階段、AI 教育 4 年 92 億也在他的清單上，只是沒有鮮奶、輝達、巨蛋那麼常出現。",
  footnoteSrc: "bnext",
};
