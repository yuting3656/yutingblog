---
layout: single
title: "daily Programming：Mac mini 跑本地 AI，從聊天模型到照片動畫與 ComfyUI"
permalink: /daily-programming/mac-mini-local-ai-video-comfyui
date: 2026-11-01 00:00:00 +0800
last_modified_at: 2026-11-01
tags: daily-programming AI LLM MLX LTX ComfyUI Apple-Silicon
classes: wide
author_profile: false
excerpt: "用 Android 遠端指揮 Mac mini，跑通本地聊天與照片轉影片。整理 Codex、Qwen、Gemma、LTX 和 ComfyUI 的分工，也記下六根手指與整段重跑的教訓。"
---

這次想做的事情很生活：**給 AI 一張照片，讓它自然動起來。** 船開過去、洋流流動，照片中的朋友開心互動，最後一起比個 OK。

我透過 Android 上的對話遠端操作 Mac，請 Codex 協助安裝、寫控制程式和排錯。最後真的產出影片了，但也得到一堂很有畫面的課：**多打一段「正確五根手指」，不等於模型就會正確畫出五根手指。** 🤣

這篇記錄截至 2026 年 11 月 1 日的實機結果。模型版本與官方支援會變；成功生成、介面啟動和精準修補，是三個不同的驗證階段。

<link rel="stylesheet" href="{{ '/assets/css/local-ai-architecture.css' | relative_url }}">

## 先認識這台 Mac

| 項目 | 實機讀到的資訊 |
| --- | --- |
| 電腦 | Mac mini |
| 晶片 | Apple M5 Pro |
| CPU／GPU | 18 核 CPU／20 核 GPU |
| 統一記憶體 | 64 GB |
| macOS | 27.0 |
| 開始實驗時的可用磁碟 | 約 782 GiB |

實驗環境獨立放在 `~/Desktop/ai-lab`。模型與安裝檔都沒有塞進部落格 repository；本篇文章是另外整理進來的紀錄。

## 整體架構：誰理解需求，誰畫出影片？

<figure class="lai-flow" aria-labelledby="lai-flow-caption">
  <figcaption id="lai-flow-caption">從一句中文需求，到 Mac 本地產出的 MP4</figcaption>
  <ol class="lai-steps">
    <li><span>01 · 需求</span><strong>照片＋中文描述</strong><small>我描述船、洋流、人物與手勢。</small></li>
    <li><span>02 · 規劃與開發</span><strong>ChatGPT／Codex</strong><small>理解需求、看圖、撰寫提示詞與 Python，協助排錯。</small></li>
    <li><span>03 · 控制程式</span><strong>Mac 上的 Python</strong><small>傳入照片、提示詞、秒數、尺寸與 seed，保存輸出和日誌。</small></li>
    <li><span>04 · 文字條件</span><strong>LTX 專用 Gemma 編碼器</strong><small>把提示詞轉換成影片模型使用的數值表示。</small></li>
    <li><span>05 · 畫面生成</span><strong>LTX-2.5 Fast</strong><small>結合照片條件與文字，先生成較小畫面，再放大細化。</small></li>
    <li><span>06 · 輸出與檢查</span><strong>VAE 解碼 → MP4 → 抽幀檢查</strong><small>確認檔案能播放，再看人物、手部、船與文字是否合理。</small></li>
  </ol>
  <p class="lai-boundary">第 3～6 步在 Mac 執行；這次的對話理解與開發指揮仍在 ChatGPT／Codex 端。</p>
</figure>

**本地生成，不代表這次所有事情都離線。** 照片與中文需求先交給對話端；模型安裝也要連網下載。真正的影片推論則使用 Mac 的 GPU，沒有呼叫雲端影片生成 API。

## 模型與工具，不是同一件事

| 名稱 | 類型 | 這次的工作 |
| --- | --- | --- |
| ChatGPT／Codex | 對話與開發協作工具 | 整理需求、寫提示詞與控制程式、檢查畫面 |
| MLX-LM | Apple Silicon 本地 LLM 推論工具 | 執行 Qwen 聊天測試 |
| Qwen3.5 9B 四位元版 | 本地語言模型 | 中文聊天、分鏡與計算測試；沒有接入這次照片動畫流程 |
| LTX Desktop | 官方應用程式 | 下載和管理 LTX 模型，提供操作介面與本機後端 |
| LTX 專用 Gemma 4 12B | 文字編碼模型 | 將影片提示詞轉成生成模型能使用的條件 |
| LTX-2.5 Fast／22B distilled | 影片生成模型 | 真正產生連續畫面與動作 |
| Spatial upscaler／Video VAE | 放大與解碼模型 | 細化生成結果，還原成可以編碼的影格 |
| ComfyUI | 節點式操作介面與執行引擎 | 將模型、影片、遮罩及輸出組成可重複的工作流程 |

所以 **ComfyUI 不是另一顆影片模型**。可以在 ComfyUI 裡繼續使用 LTX，也能選其他模型。換介面與換模型，要分開討論。

## 第一階段：先讓本地聊天跑起來

先用約 335 MB 的 `mlx-community/Qwen3-0.6B-4bit` 測試 MLX 與 GPU，再升級到 `mlx-community/Qwen3.5-9B-4bit`。

| 測試 | 結果 |
| --- | --- |
| Qwen3 0.6B 小模型 | 短篇中文分鏡測試約 470 tokens／秒 |
| Qwen3.5 9B | 約 59 tokens／秒，尖峰 MLX 記憶體約 5.35 GB |
| 中文分鏡 | 能列出三個鏡頭，總長安排為 5 秒 |
| 計算與格式 | 199＋299＋499，打八折再加 60，正確輸出 JSON 與總額 857.6 |

這些是基本功能測試，不是完整能力評測；不同模型、提示詞長度與輸出長度，不能只看 tokens／秒就比較品質。

本地聊天的啟動方式：

```sh
~/Desktop/ai-lab/.venv/bin/python ~/Desktop/ai-lab/chat.py
```

模型下載完成後，這支聊天程式設定為從本機快取離線載入。輸入 `/clear` 清除對話，`/quit` 結束。

## 第二階段：照片轉影片

### 輸入與設定

第一張測試圖是橘、黑、米白三色的海報風格合照。需求包含：

- 底部小船有航行、駛離的感覺。
- 洋流飄帶自然流動。
- 三個人物微笑、互看、自然互動。
- 最後一起比出 OK 手勢。

控制程式把需求寫成英文提示詞，配合照片路徑與設定送進 LTX。以下是主要參數，省略完整提示詞：

```json
{
  "resolution": "540p",
  "model": "fast",
  "duration": 8,
  "fps": 24,
  "aspectRatio": "1:1",
  "seed": 42,
  "imagePath": "本機照片路徑"
}
```

這裡的 `fast` 是當時本地介面的管線名稱；實際載入的是 LTX-2.5 蒸餾權重。不能把 API 的模型名稱、介面標籤與權重檔名直接互換。

輸出尺寸因模型格點限制落在 **576 × 576**，影片長約 **8.04 秒、24 fps**。

### 實際生成流程

1. 將照片調整到模型需要的尺寸，作為圖片條件。
2. 使用 LTX 專用 Gemma 編碼提示詞。
3. LTX 先在較低解析度的壓縮表示中生成動態內容。
4. 透過放大模型與第二階段生成，細化畫面。
5. Video VAE 解碼出影格，再由媒體編碼工具寫成 MP4。
6. 抽出不同時間點的畫面，檢查動作與瑕疵。

成功的第一版推論約 **239 秒**。後兩版約 **235 秒、238 秒**。這是這台 Mac、這組設定的結果，不代表所有秒數或解析度都能維持相同速度。

模型使用 streaming／磁碟 offload，並非把所有權重一次常駐 GPU。這也解釋了「權重檔很大」與「執行時 GPU 記憶體」不會完全相同。

## 排錯：從卡住到真的出片

### 本機 API 停在 starting

最初以 Python 呼叫 LTX Desktop 的本機 API，任務停在準備階段。重啟後仍重現。最後改成由 Python **直接呼叫已安裝的 LTX 後端程式**，才完成生成。

這是本次實測的可行替代路徑；還沒有定位、修正 Desktop API 卡住的根本原因。

### GPU 記憶體暴增

獨立執行時，一開始沒有帶上 Desktop 原本設定的預編譯 MPS 擴充路徑，attention 回退到另一條路徑，記憶體持續上升，最後 MPS 記憶體不足。

補上 `LTX_MPS_EXT_PREBUILT_DIR`，啟用套件隨附的 `mpsgraph_zc` 後，同一組設定成功完成。日誌中的 GPU driver 記憶體，在第一階段約 7～8 GiB，細化時約 10.67 GiB；這不是整台電腦的總記憶體，也不是所有情境的上限。

這次沒有用解除記憶體上限來硬跑，也沒有修改官方模型權重。

## 最有感的教訓：只想修一隻手，為什麼整張都壞了？

第一版的船、洋流與整體氣氛不錯，但中間人物最後的手多了一根手指。接著加強提示詞、整段重跑，反而出現大手擋臉、額外手臂，連原本比較好的左右人物都被改掉。

第三版也不能當成精準修好的成果。最終判斷要以仔細檢視的影片為準，不能把「生成完成」或「手指好像扣成圈」當成驗收。

問題在於：**當時的輸入仍是整張照片與整段文字，沒有指定只允許改哪個區域。**

```text
需求：只修中間人物最後那隻手
當時的操作：重新生成整段影片
結果：手、人物與其他動作全部有機會變動
```

同一個 seed 也不是局部鎖定。提示詞改了，生成條件就改了；「請保留其他部分」是一個引導，不是影格層級的強制規則。

## 為什麼加入 ComfyUI？

下一階段需要的能力是：載入原本喜歡的影片，沿著時間標記手部區域，只重畫那個區域，再與原片混合。

<figure class="lai-flow lai-next" aria-labelledby="lai-next-caption">
  <figcaption id="lai-next-caption">後續規劃：影片局部修補，不再整段重新抽</figcaption>
  <ol class="lai-steps">
    <li><span>保留基底</span><strong>第一版影片</strong><small>保留喜歡的人物互動、船與洋流。</small></li>
    <li><span>指定範圍</span><strong>逐幀手部遮罩</strong><small>白色區域重畫，黑色區域保留；遮罩要跟著手移動。</small></li>
    <li><span>局部生成</span><strong>LTX Inpainting IC-LoRA</strong><small>透過官方 ComfyUI 工作流程，生成遮罩區域並混合輸出。</small></li>
  </ol>
  <p class="lai-boundary">這是後續流程規劃；本篇沒有宣稱已完成手部局部修補。</p>
</figure>

LTX 官方已有影片 Inpainting／Outpainting 範例，使用額外的 IC-LoRA 與區域遮罩。先前的限制是我們使用的 Desktop 呼叫介面沒有接上這項能力，不能擴大成「LTX 本身做不到」。

本次 ComfyUI 採用官方原始碼、獨立 Python 環境，介面由瀏覽器開啟。既有 LTX 權重透過檔案連結共用，避免重複存放。

已驗證 **ComfyUI 0.43.0／前端 1.57.6** 的操作畫面可載入，系統 API 回報 `mps` 裝置，LTX-2.5 生成權重也已出現在模型清單。這是介面、GPU 辨識與檔案連結的驗證，還不是 ComfyUI 影片生成或局部修補的驗收。

```text
~/Desktop/ai-lab/
├── .venv/                    # MLX-LM 聊天環境
├── chat.py
├── direct_photo.py           # 已成功的 LTX 直接呼叫方式
├── ComfyUI/
│   ├── .venv/                # ComfyUI 專用環境
│   └── models/               # 部分權重連結至既有 LTX 檔案
├── Start ComfyUI.command     # 雙擊啟動
├── models/ltx/               # LTX 原始權重
├── inputs/
├── outputs/
└── logs/
```

啟動後，Mac 本機操作網址是 `http://127.0.0.1:8188`。這不是 Android 可以直接連線的網址；手機遠端操作與區網服務暴露是另外的設定。

**權重出現在選單，也不等於局部修補已經能跑。** 官方範例還需要對應的 In-Outpainting IC-LoRA、標準 Video VAE，以及相容節點與工作流程；目前既有解碼器是 convolutional 版本。這些相容性、額外檔案與 Mac 上的執行成本，要分開驗證。

## 這次有用中國模型嗎？

就這三支照片動畫的實際推論紀錄，載入的是 **LTX-2.5 與 LTX 專用 Gemma 編碼器**。LTX 來自 Lightricks／LTX 團隊，Gemma 以 Google 模型為基礎。

阿里巴巴的 **Qwen 確實有安裝，也做過聊天與分鏡測試，但沒有接入這三支照片動畫的生成流程**。不能把「影片沒有用到 Qwen」寫成「整個實驗完全沒用過中國模型」。

這裡說的是實際載入的模型及其發布者，不是對全部訓練資料、程式依賴做來源稽核。ComfyUI 本身也不是特定國家的生成模型；使用哪些模型，要看工作流程實際載入什麼。

## 參考資料

- [MLX-LM 官方專案](https://github.com/ml-explore/mlx-lm)
- [Qwen3.5 官方模型卡](https://huggingface.co/Qwen/Qwen3.5-9B)
- [LTX Desktop：功能與 Mac 硬體需求](https://github.com/Lightricks/LTX-Desktop)
- [LTX-Core：Gemma 文字編碼器與模型架構](https://github.com/Lightricks/LTX-2/blob/main/packages/ltx-core/README.md)
- [LTX 官方影片區域修補指南](https://docs.ltx.io/open-source-model/feature-guides/editing-effects/in-outpainting)
- [ComfyUI 官方專案與手動安裝方式](https://github.com/Comfy-Org/ComfyUI)
- [ComfyUI 的 Apple Silicon 支援](https://docs.comfy.org/installation/desktop/macos)

本篇的秒數、尺寸與記憶體來自這次實機日誌；功能說明依上述官方資料整理。下一個驗證目標，是在保留第一版其餘畫面的前提下，真正完成一隻手的局部修補。
