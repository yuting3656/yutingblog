---
layout: "single"
title: "RTSP 攝影機參數最完整科普（工程師 × 商用系統）"
permalink: 'diary/:year-:month-:day'
tags: RTSP mediamtx WebRTC 影像 串流 AI
---

> 這篇我叫 codex 幫我科普的，記錄一下還在工作的樣貌，😊笑💩 現在工作跟寫部落格都出一張嘴啦！！！

- 本文重點

   1. 每個參數的人話版解釋
   2. 設錯的後果（你會看到的現象）
   3. 商用即時串流（mediamtx 架構）實戰建議

---

## 一、核心影像參數（畫面卡、殘影，全都在這）

### 1) Framerate（FPS，幀率）

**是什麼？** 每秒幾張畫面。

- 10 fps = 每秒 10 張
- 30 fps = 每秒 30 張

**直覺理解**

- fps 越高 → 越順
- fps 越低 → 越省頻寬 / 算力

**常見誤解**

- ❌ AI 辨識一定要 30 fps
- ✅ 其實 AI 吃的是「關鍵畫面品質」，不是 fps

**商用建議**

| 使用情境 | FPS | 備註 |
| --- | --- | --- |
| 即時監看 / WebRTC | 12–15 | 穩定順暢 + 帶寬可控 |
| AI 辨識 | 8–12 | 夠用，重點是關鍵幀品質 |
| 純錄影 | 15–25 | 視儲存空間調整 |

👉 你現在 10 fps 是 OK 的。

---

### 2) Bitrate（位元率）

**是什麼？** 每秒影像資料量。

- 單位：kbps / Mbps
- 3000 kbps = 3 Mbps

**直覺理解**

- Bitrate 高 → 畫質好 → 頻寬吃很兇
- Bitrate 低 → 省流量 → 馬賽克

**超多人踩雷的點**

- Bitrate 不是越高越好
- 低 fps + 高 bitrate = 每一幀肥到爆炸

**商用建議（1080p）**

| FPS | Bitrate (kbps) | 備註 |
| --- | --- | --- |
| 10–12 | 1200–1800 | 多數情況夠用 |
| 15 | 1800–2500 | 平衡畫質與頻寬 |
| 20 | 2500–3500 | 順但流量吃很快 |

👉 你 10 fps 用 3000 kbps 是過肥。

---

### 3) GOP（關鍵畫面間隔）⭐ 超級重要

**是什麼？** I-frame（完整畫面）之間的距離。

- GOP = 15 → 每 15 張 1 張 I-frame

**幀的種類（超重要）**

| 類型 | 說人話 | 特性 |
| --- | --- | --- |
| I-frame | 完整照片 | 任何時間加入都能看懂 |
| P-frame | 跟前一張差異 | 需要前面一張才能解 | 
| B-frame | 跟前後差異 | 最省但延遲高 |

**為什麼 GOP 會影響殘影 / lag？**

如果：

- fps = 10
- GOP = 100

👉 10 秒才 1 張完整畫面

一旦：

- 丟封包
- WebRTC 重連
- 前端剛加入

就只能等下一張 I-frame
➡️ 畫面卡、拖影、殘影

**商用黃金法則**

> GOP ≈ FPS（1 秒 1 張 I-frame）

| FPS | GOP | 備註 |
| --- | --- | --- |
| 10 | 10 | 低延遲穩定 |
| 12 | 12 | 經典組合 |
| 15 | 15 | 即時系統常用 |

---

## 二、編碼相關（你攝影機後面通常藏這些）

### 4) Codec（編碼格式）

**常見選項**

- H.264（必選）
- H.265（HEVC）
- MJPEG（❌ 不要）

**商用建議**

👉 H.264 Baseline / Main

**原因**

- 瀏覽器相容性最好
- WebRTC 原生支援
- AI pipeline 最穩

**H.265 注意**

- 延遲高
- WebRTC 支援差
- 很多瀏覽器不能播

---

### 5) Profile（編碼層級）

| 情境 | Profile | 備註 |
| --- | --- | --- |
| 即時串流 | Baseline | 低延遲第一優先 |
| 串流 + AI | Main | 最平衡 |
| 錄影 | High | 畫質優先 |

---

### 6) B-frames（雙向預測幀）

**是什麼？** 幫你省 bitrate，但會增加延遲。

**商用建議**

- B-frame = 0
- 即時系統一律關掉

---

## 三、RTSP / 網路層（mediamtx 非常在意）

### 7) RTSP Transport（TCP / UDP）

| 模式 | 特性 | 適合場景 |
| --- | --- | --- |
| TCP | 穩定但延遲高 | 錄影或長距離 | 
| UDP | 低延遲但可能丟包 | 即時串流 | 

**商用建議**

- 攝影機 → mediamtx：UDP
- mediamtx → WebRTC：UDP

---

### 8) Resolution（解析度）

**不要迷信 4K**

| 用途 | 建議解析度 | 備註 |
| --- | --- | --- |
| AI + 串流 | 1080p | 平衡畫質與算力 |
| 純監控 | 720p | 省頻寬省儲存 |

**小提醒**

很多 AI 其實會 resize 成 640x640。

---

## 四、整組「你可以直接照抄」的設定

### ✅ 即時串流 + mediamtx（推薦）

| 參數 | 建議值 |
| --- | --- |
| Resolution | 1920x1080 |
| FPS | 15 |
| Bitrate | 2000 kbps |
| GOP | 15 |
| Codec | H.264 |
| Profile | Baseline |
| B-frame | 0 |
| RTSP | UDP |

---

### ✅ AI 辨識友善版本

| 參數 | 建議值 |
| --- | --- |
| Resolution | 1280x720 |
| FPS | 10 |
| Bitrate | 1200 kbps |
| GOP | 10 |
| Codec | H.264 |
| Profile | Main |
| B-frame | 0 |

---

## 六、目前系統流程圖（實際架構版）

<div style="max-width: 960px; margin: 0 auto;">
  <img src="{{ site.baseurl }}/assets/images/rtsp-flow.svg" alt="RTSP 串流實際架構流程圖" style="width: 100%; height: auto;" />
</div>
