---
layout: "single"
title: '一次 QPS 風暴的復盤：從 API 變慢到建立防禦層'
permalink: 'diary/:year-:month-:day'
tags: qps, rate-limit, middleware, observability
---

<style>
  .note-box{
    border: 1px solid rgba(0,0,0,.12);
    border-radius: 12px;
    padding: 14px 16px;
    margin: 16px 0;
    background: rgba(0,0,0,.03);
  }
  .ok { color: #0a7; font-weight: 600; }
  .warn { color: #c60; font-weight: 600; }
  .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
  .flow{
    border-left: 4px solid rgba(0,0,0,.12);
    padding-left: 14px;
    margin: 14px 0;
  }
  .chip{
    display:inline-block;
    padding:2px 10px;
    border-radius:999px;
    font-size:12px;
    background: rgba(0,0,0,.06);
    margin-right: 6px;
  }
</style>

## 背景：從「API 變慢」開始的三天

> 客戶反應畫面變慢！！！
>
> 虫合 ～
>
> 只要開啟某個頁面，畫面反應就開始變慢 <--- 我一開始以為偶發 太陽風暴 中共又雞歪切電纜
>
> 後來同事截圖 錄影 我才覺得 有毛病！！！

- 前端看起來像「系統掛了」，但其實是後端資源被耗盡

後來發現這個問題定義為：**QPS（請求頻率）失控造成的系統壓力問題**，而不只是單純的 SQL / 程式碼慢。

# 很明顯了 上面這句話完全不是我會說的，對！ 我請ＧＰＴ幫我寫，嘿嘿嘿！！！

---

## 症狀：壓測一跑就爆，還不確定有沒有擋到

我用簡單的壓測工具（或自寫腳本）模擬：

- Concurrency：數十
- Duration：數十秒
- 目標：同一支「查詢型 API」

結果是：

- QPS 大約落在 70～80 左右（依環境不同略有浮動）
- 大量 request 失敗
- 我一開始甚至不確定：後端到底是因為慢而失敗，還是我有成功回 429（Too Many Requests）

<div class="note-box">
  <div class="ok">我那時候做對的一件事</div>
  <p>不是立刻開始狂優化 SQL，而是先把問題拆成兩個：</p>
  <ol>
    <li><b>系統能不能「正確拒絕」</b>（回 429 / 回應可預期）</li>
    <li><b>系統在拒絕之前</b>，是不是已經被 DB / CPU / Connection 拖垮</li>
  </ol>
</div>

---

## 釐清：這不是「效能」而是「缺少防禦層」

一開始我的直覺是 SQL 或 DB index，因為查詢型 API 通常容易慢。

但觀察後發現：

- 即便單次查詢可以優化
- 只要短時間被無上限地打
- 依然會把 DB / 應用程式執行緒 / 連線池拖垮

所以我把解法順序改成：

1) 先補「防禦層」讓系統穩定  
2) 再做效能優化讓平均體感更好

---

## 解法一：加上全域 Rate Limit（先讓系統會拒絕）

我先加上一層「全域」的 Rate Limit Middleware（概念如下）：

- 超過上限：直接回 <span class="mono">429 Too Many Requests</span>
- 保留 burst（短時間允許一些尖峰）
- 優先保護整個系統，不要讓 DB 先被打爆

<div class="flow">
  <div><span class="chip">Request</span> → <span class="chip">Rate Limit</span> → <span class="chip">Handler</span></div>
</div>

### 我怎麼驗證「真的有擋到」？

我做了兩件事：

1. 壓測結果除了成功/失敗，我會特別統計 status code 分布（429 有沒有出現）
2. 在 middleware 內加上可觀測性（log 或告警），確保每次拒絕都能追到

---

## 解法二：發現來源異常 → 加上 Origin / Tenant 驗證

在觀察 log 時，我注意到有一部分請求的來源不太正常。

我不想直接假設是攻擊或爬蟲，但我知道一件事：

> 如果某些租戶只能從指定的前端網域呼叫 API，  
> 那就應該在 server 端做一層「Tenant + Origin」驗證。

於是我加上第二層 middleware（概念如下）：

- 從驗證過的 token/context 取得租戶識別（已匿名化）
- 該租戶有設定白名單 origin（已匿名化）
- 若來源不在白名單：
  - 阻擋 request
  - 回應明確的 HTTP status（常見做法：403 / 401 / 400，依你的語意而定）
  - 發告警到內部通知管道（已匿名化）

<div class="flow">
  <div>
    <span class="chip">Request</span> →
    <span class="chip">Auth</span> →
    <span class="chip">Tenant+Origin Check</span> →
    <span class="chip">Rate Limit</span> →
    <span class="chip">Handler</span>
  </div>
</div>

### 細節：我特別處理了 CORS Preflight

瀏覽器會送 <span class="mono">OPTIONS</span>（preflight），這種通常要直接放行，不然你會把合法前端也擋掉。

---

## 現在的整體流程（匿名化版本）

下面是我最後整理的 API 防禦層順序（只保留概念）：

<div class="note-box">
  <div class="mono">
    Request<br/>
    &nbsp;&nbsp;↓<br/>
    Auth / Token Validation<br/>
    &nbsp;&nbsp;↓<br/>
    Tenant + Origin Allowlist Check (skip OPTIONS)<br/>
    &nbsp;&nbsp;↓<br/>
    Global Rate Limit (429 on limit exceeded)<br/>
    &nbsp;&nbsp;↓<br/>
    Business Handler (DB / Logic)<br/>
    &nbsp;&nbsp;↓<br/>
    Response
  </div>
</div>

---

## 這次我學到的事：效能不是第一步，穩定性才是

以前我遇到 API 慢，很容易直覺「去救 SQL」。

但這次經驗讓我更確定：

- 沒有防禦層：再快的 SQL 也會被打爆
- 沒有可觀測性：你甚至不知道自己有沒有擋到
- 先讓系統可預期地拒絕，才有空間做真正的效能改善

---

## 後續可以做的優化方向（我給自己留的 TODO）

<ul>
  <li><b>分層限流</b>：全域 + per-tenant + per-endpoint（視需求）</li>
  <li><b>更完整的指標</b>：429 次數、來源分布、延遲分位數、DB 連線池使用量</li>
  <li><b>前端降載</b>：debounce、request 合併、快取、避免重複請求</li>
  <li><b>DB 層優化</b>：在系統穩定後再回頭做 index / query 改寫</li>
</ul>

---

<div class="note-box">
  <div class="ok">結語</div>
  <p>
    這三天我最大的收穫是：<b>「系統工程」的順序很重要</b>。
    先讓系統會拒絕、會告警、會被觀測，才能談效能與體感。
  </p>
</div>



<div class="note-box">
  <div class="ok">靠杯</div>
  <p>
    這文章感覺幹話一堆 ＸＤＤＤ，根本農場文章！但是大概就是我這幾天的樣貌拉！ ＸＤＤＤ
    <p>笑💩</p> 以後都給 AI 寫文章就好拉！ ＸＤＤＤ
  </p>
</div>


