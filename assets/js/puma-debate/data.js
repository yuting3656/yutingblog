// 2026-10-31 首場台北市長辯論。quote 為報導引述短句；summary 為編輯整理。
// 不將記者轉述或政策摘要偽裝成逐字發言；所有提問與旁註均為編輯文字。
export const EPISODE = {
  date: '2026.10.31',
  url: 'https://news.pts.org.tw/live/105',
};
const sources = {
  close: ['中央社｜結辯與市民主義', 'https://www.cna.com.tw/news/aloc/202610310113.aspx'],
  opening: ['中央社｜開場申論與百日工作', 'https://www.cna.com.tw/news/aloc/202610310083.aspx'],
  trees: ['TVBS｜上任百日三要務', 'https://news.tvbs.com.tw/politics/4043859'],
  renewal: ['中央社｜都更與陪伴機制', 'https://www.cna.com.tw/news/aloc/202610310088.aspx'],
  positive: ['TVBS｜結辯與正面選戰', 'https://news.tvbs.com.tw/politics/4043910'],
  ai: ['TVBS｜AI 與市民大道討論', 'https://news.tvbs.com.tw/politics/4043871'],
  connect: ['中央社｜產業與城市縫合', 'https://www.cna.com.tw/news/aloc/202610310099.aspx'],
  live: ['公視新聞｜辯論即時紀錄', 'https://news.pts.org.tw/live/105'],
};
const themes = {
  '市民主義': ['#db6a41', 0xdb6a41],
  '綠意與照顧': ['#dc8443', 0xdc8443],
  '都更與日常': ['#cf603a', 0xcf603a],
  '未來與專業': ['#d87b54', 0xd87b54],
  '正面選擇': ['#e47945', 0xe47945],
};
const entries = [
  {
    category: '市民主義', topic: '先有市民', phase: '結辯', cite: 'close',
    text: '先有市民，才有市長。',
    prompt: '這座城市的主角，應該是誰？',
    note: '他用這句話定義市民主義：從市民的需要開始，決定市長應該做什麼。',
  },
  {
    category: '市民主義', topic: '你說，我做', phase: '申論', cite: 'opening',
    text: '你說，我做',
    prompt: '聽見問題之後，治理要怎麼往前一步？',
    note: '他談聆聽與市政 DeBug 松，希望把市民的回饋帶進實際解題的過程。',
  },
  {
    category: '市民主義', topic: '不讓人孤獨', phase: '申論', cite: 'live',
    text: '沒有人可以感到孤獨',
    prompt: '什麼樣的台北，才算是讓人安心的城市？',
    note: '這是公視紀錄中他描述的城市願景：讓照顧、工作與生活中的人，都能得到支持。',
  },
  {
    category: '市民主義', topic: '市長，聽好了', phase: '申論', cite: 'opening',
    text: '市長，你給我聽好',
    prompt: '市民的聲音，怎麼進到市政裡？',
    note: '這是他在辯論中提及的意見系統名稱；他也談到街頭肥皂箱與整理 1999 回饋。',
  },
  {
    category: '綠意與照顧', topic: '把樹種回來', phase: '申論', cite: 'trees',
    text: '把樹種回來',
    prompt: '上任後最先想處理的事情是什麼？',
    note: '他列出的百日優先工作之一，連結都市綠意與市民對政府的信任；這是競選承諾。',
  },
  {
    category: '綠意與照顧', topic: '留給後來的人', phase: '申論', cite: 'opening',
    text: '前人種樹，後人乘涼',
    prompt: '城市的樹，不只是今天看起來漂亮而已？',
    note: '他以這句成語說明都市微森林的方向，主張透過制度、預算、專業與參與推動。',
  },
  {
    category: '綠意與照顧', topic: '家庭的求助入口', phase: '媒體提問', cite: 'live',
    text: '家庭1999',
    prompt: '育兒有疑問時，家長可以找誰？',
    note: '這是他提出的服務名稱，盼讓育兒家庭隨時有人解惑，降低獨自面對問題的焦慮。',
  },
  {
    category: '綠意與照顧', topic: '接住照顧者', phase: '申論', cite: 'trees', kind: 'summary',
    text: '接住孩子，也支持第一線的照顧者。',
    prompt: '兒少安全，不能只等到出事之後才處理？',
    note: '依他的申論整理：處理違規機構、支持受害者，也不讓社工與幼保人員孤軍奮戰。',
  },
  {
    category: '都更與日常', topic: '入口與出口', phase: '交叉詰問', cite: 'renewal',
    text: '不能把入口開得那麼寬，出口卻那麼窄',
    prompt: '都更的數字變多，為什麼有人仍然等不到？',
    note: '他用入口與出口比喻都更卡關，強調公部門應陪住戶走完整個過程。',
  },
  {
    category: '都更與日常', topic: '縫合這座城', phase: '交叉詰問', cite: 'ai',
    text: '為何我講縫合就是問題？',
    prompt: '市民大道兩側，如何讓人更願意走過去？',
    note: '這是他回應藝文廊帶質疑時的反問，主張討論空間、人流與心理距離的串接。',
  },
  {
    category: '都更與日常', topic: '陪到真正落地', phase: '交叉詰問', cite: 'renewal', kind: 'summary',
    text: '都更不只看核定，更要陪到動工與完工。',
    prompt: '從文件通過，到真正改善居住，還差什麼？',
    note: '依他的回應整理：主張增加陪伴人力、提高整宅基金，協助處理程序與卡關問題。',
  },
  {
    category: '都更與日常', topic: '把時間還回來', phase: '媒體提問', cite: 'live', kind: 'summary',
    text: '讓交通更順，把空出來的時間還給生活。',
    prompt: '四年後的一個早晨，日常能有什麼不同？',
    note: '他談捷運總體檢、公車重規劃，重點是讓市民少花時間在移動上，生活更悠閒。',
  },
  {
    category: '未來與專業', topic: '回到市政本身', phase: '交叉詰問', cite: 'ai',
    text: '我長得像卓榮泰嗎？',
    prompt: '面對不同層級的政策，怎麼把討論說清楚？',
    note: '他用這句反問開頭，接著區分跨縣市廊帶與台北市內的產業策略，談 AI 的不同層次。',
  },
  {
    category: '未來與專業', topic: '人才與居民共榮', phase: '交叉詰問', cite: 'connect', kind: 'summary',
    text: '把 AI 人才留下，也讓園區與居民一起受益。',
    prompt: '談 AI 城市，除了企業落腳，還需要什麼？',
    note: '依他的回應整理：透過台北研究院、軟體與應用層發展，連結人才、國際合作與在地生活。',
  },
  {
    category: '未來與專業', topic: '有感的進步', phase: '結辯', cite: 'positive', kind: 'summary',
    text: '城市的進步，要讓生活中的人真正有感。',
    prompt: '漂亮的數據，和每天的生活感受一樣嗎？',
    note: '他以溫度計與體感溫度的差別為比喻，提醒治理仍要回應等待服務的市民。',
  },
  {
    category: '未來與專業', topic: '提出自己的做法', phase: '結辯', cite: 'positive',
    text: '沈伯洋會怎麼做',
    prompt: '辯論除了反駁，更要讓市民知道什麼？',
    note: '他在結辯中把重點拉回自己的治理方式，讓市民判斷他提出的路線與選擇。',
  },
  {
    category: '正面選擇', topic: '想留下的選舉文化', phase: '結辯', cite: 'positive',
    text: '我完全不做負面的攻擊',
    prompt: '一場選舉，可以留下什麼樣的文化？',
    note: '這是他在結辯中的自述與主張，強調以正面文化表達自己的價值。',
  },
  {
    category: '正面選擇', topic: '再談一場也可以', phase: '交叉詰問', cite: 'live',
    text: '晚一點加LINE也可以',
    prompt: '還有問題想繼續問，怎麼把對話延續下去？',
    note: '他邀約下一次辯論，並表示若當下無法決定，可以再加 LINE 聯繫。',
  },
  {
    category: '正面選擇', topic: '讓眼睛重新有光', phase: '結辯', cite: 'close', kind: 'summary',
    text: '讓每個人，重新對這座城市的明天有期待。',
    prompt: '你希望台北市民重新找回什麼？',
    note: '他以女兒對未來的期待談城市願景，希望市民安心，也能想像更好的生活。',
  },
  {
    category: '正面選擇', topic: '我的心之所向', phase: '結辯', cite: 'close',
    text: '我是沈伯洋，請讓我成為你的市長。',
    prompt: '最後，想對這座城市說什麼？',
    note: '這是他的結辯收尾，連結故鄉、城市的未來與自己的參選心意。',
  },
];
export const QUOTES = entries.map(entry => ({
  ...entry, kind: entry.kind || 'quote',
  color: themes[entry.category][0], glow: themes[entry.category][1],
  source: sources[entry.cite][0], url: sources[entry.cite][1],
}));
