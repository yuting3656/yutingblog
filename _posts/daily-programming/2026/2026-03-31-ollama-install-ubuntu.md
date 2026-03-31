---
layout: "single"
title: "Ubuntu 安裝 Ollama 與區網部署教學（地端 AI Server 實戰）"
permalink: diary/:year-:month-:day
tags: Ollama LLM Ubuntu AI 地端部署 Golang MES
---

在實際開發 MES（製造執行系統）與 AI 功能的過程中，我遇到一個很現實的需求：

客戶要求「全地端部署」，不能使用雲端 AI（例如 Azure OpenAI）。

這代表我必須找到一套可以在本地運行的 LLM（大型語言模型）方案。

於是，我開始研究並實作 Ollama + Ubuntu 的地端 AI 架構，並成功讓另一台電腦（Mac）透過網路呼叫 AI API。

這篇文章整理成可直接複製的實戰紀錄，之後要重建環境時可以快速照做。

---

## 目標架構

```text
Mac（前端 / 開發機）
	-> Golang Backend（未來）
	-> Ubuntu（Ollama AI Server）
```

---

## Step 1：在 Ubuntu 安裝 Ollama

在 Ubuntu 執行：

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

安裝完成後，系統通常會自動完成：

1. 安裝 Ollama
2. 建立 systemd service
3. 啟動服務（預設綁定 localhost）

---

## Step 2：確認服務狀態

```bash
systemctl status ollama
```

正常情況應該會看到：

```text
active (running)
```

---

## Step 3：理解預設限制（關鍵）

Ollama 預設只監聽：

```text
127.0.0.1:11434
```

這代表只有 Ubuntu 本機可以使用，其他電腦（例如 Mac）無法連線。

---

## Step 4：開放區網存取（重點）

### 4-1. 編輯 systemd override

```bash
sudo systemctl edit ollama
```

加入以下內容：

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
```

儲存並離開（nano）：

```text
Ctrl + O -> Enter
Ctrl + X
```

### 4-2. 重啟服務

```bash
sudo systemctl daemon-reexec
sudo systemctl restart ollama
```

---

## Step 5：確認是否成功對外開放

```bash
ss -ltnp | grep 11434
```

如果看到類似：

```text
*:11434
```

表示已經對外監聽成功。

---

## Step 6：從另一台電腦（Mac）測試 API

```bash
curl http://192.168.xxx.xxx:11434/api/tags
```

若回傳：

```json
{"models":[]}
```

表示：

1. 區網連線正常
2. Ollama API 正常
3. 跨機存取成功

---

## Step 7：下載並啟動模型

在 Ubuntu 執行：

```bash
ollama run qwen2.5:7b
```

第一次執行會自動下載模型（數 GB）。

下載完成後，再次測試：

```bash
curl http://192.168.xxx.xxx:11434/api/tags
```

會看到類似：

```json
{
	"models": [
		{
			"name": "qwen2.5:7b"
		}
	]
}
```

---

## Step 8：實際呼叫 AI 生成

```bash
curl http://192.168.xxx.xxx:11434/api/generate -d '{
	"model": "qwen2.5:7b",
	"prompt": "幫我分析工單效率"
}'
```

---

## 效能觀察：GPU vs CPU

這台機器沒有 NVIDIA GPU（只有 ASPEED BMC 顯示晶片），所以 Ollama 會以 CPU-only 模式運行。

實際體感：

| 模型 | 表現 |
|---|---|
| 7B | 可用，約 1~3 token/s |
| 13B | 偏慢 |
| 70B | 幾乎不可行 |

結論：在 CPU 環境下，7B 是目前最實際的選擇。

---

## 開機自動啟動確認

Ollama 安裝時通常會自動設定開機啟動：

```bash
systemctl enable ollama
```

可用以下指令驗證：

```bash
systemctl is-enabled ollama
```

若回傳：

```text
enabled
```

表示開機後會自動啟動 AI Server。

---

## 實戰心得（重要）

### 1. 不要只追求模型大小

在企業場景中，重點往往不是「最大模型」，而是「穩定可用、可維護、可部署」。

### 2. Prompt 設計往往比模型更重要

不佳寫法：

```text
幫我分析所有工單並提出建議
```

較佳寫法：

```text
列出效率最低的 3 個工單，並說明每個工單的可能原因
```

### 3. CPU 架構優化建議

1. 使用 async 流程，避免阻塞主流程
2. 做結果快取（cache）
3. 限制輸入資料量，縮短推理時間

---

##  自己開發 地端化難度分級

依照功能複雜度，我把地端化需求分成三級（含特殊項目）：

| 等級 | 功能類型 | 涉及節點 | 地端替換方案 |
|---|---|---|---|
| 🟢 低難度 | Chat Completion（純文字） | V2 ChatBot、菜單搜尋、追問問題、精實分析 | Ollama + Llama 3.1 / Qwen2.5 |
| 🟡 中難度 | Chat Completion + Function Calling | V3 ChatBot（最核心） | Llama 3.1 / Qwen2.5（支援 FC，需驗證準確率） |
| 🔴 高難度 | Chat Completion + Vision（多模態） | SPC 相片、工單相片、標籤掃描 | Llama 3.2 Vision / Qwen2.5-VL / LLaVA |
| 🔴 特殊 | Text Embedding | SFR 菜單知識庫（FAISS） | nomic-embed-text / bge-m3 |
| 🔴 特殊 | Azure Anomaly Detector | 時間序列異常偵測 | 獨立統計演算法或自架模型 |

這份分級可以作為後續規劃優先順序的依據：先從低難度功能穩定落地，再逐步往 Function Calling、多模態與專用模型推進。

---

## 未來發展方向

1. 接上 Golang Backend
2. 建立混合架構：本地模型處理常規任務，雲端模型作為高品質 fallback
3. 擴展 MES AI 功能：
	 - 工單效率分析
	 - 異常原因摘要
	 - 班別比較
	 - 設備稼動率解釋

---

## 總結

這次實作我完成了：

1. Ubuntu 地端 AI Server 建置
2. Ollama 安裝與部署
3. 區網 API 開放
4. 跨機呼叫成功

這代表我已經具備打造「地端 AI 系統」的基礎能力，也能繼續往 MES + AI 的整合方向推進。

