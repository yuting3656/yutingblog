---
layout: "single"
title: 'Azure Anomaly Detector 之 你A了嗎~?我I了唷唷唷~'
permalink: 'azure-ai/anomaly-detector'
tags: Azure anomaly-detector
---

> 機會是給準備好的人!
>
> 當初 [人工智慧學校](https://yuting3656.github.io/yutingblog/tags/#aiacademy){:target="_back"}
>
> 唸完後 就很認真問自己
>
> **我是要認真搞資料類(AI?XDD)的工作** 
> or
>  繼續 **愛情的基本功 code 網頁 前後端 APP 魔法師**
>
> 深思熟慮後 我選後者繼續深蹲 + 自己熱愛的  **Domain**!

>> 然後 
>> 兩年後的現在 
>> 真如我當初 
>> 在人工智慧學校跟其他同學
>> 喇低賽的狀況
>>
>> 我希望我可以前後端都自己搞 
>>
>> 然後無聊串一些 `AI`**(騙錢用)**
>> 可以自己一路實作出來 真的是很爽快的!!!
>>
>> 感謝團隊的信任與幫助讓我可以恣意的灑脫XDDD 快樂地做自己~~~


> 廢話不多說! GOGO

# 我自己的前言

- Azure 微軟富爸爸 94矯情 所以搞了一推有的沒的 
- 搞到後來東西太多 沒人知道重點是啥 XDDD
- 聽說 AI 正夯 就來搞一下
- 也是搞了一堆 其中一個就是 [Anomaly Detector](https://docs.microsoft.com/en-us/azure/cognitive-services/anomaly-detector/quickstarts/client-libraries?pivots=programming-language-python&tabs=windows){:target="_back"}
- 我自己這樣想 就比較不會煩惱到底是哪 J 個東西到底是歸類哪裡 XDD

# 前置作業

- 創建[Azure 帳號](https://azure.microsoft.com/en-us/free/cognitive-services/){:target="_back"} 現在(2022-04-01`沒有唬爛你唷`) 有免費方案
  - 申請完後: create a resource 
     - ![Imgur](https://i.imgur.com/lmUrgjX.png) 
  - 輸入 anomaly detect
     - ![Imgur](https://i.imgur.com/CWuJmuc.png)
  - create

  - 創建完畢後 拿 
     - keys & endpoint
        - ![Imgur](https://i.imgur.com/fZE2BmV.png)


# [Anomaly Detector](https://docs.microsoft.com/en-us/azure/cognitive-services/anomaly-detector/quickstarts/client-libraries?pivots=programming-language-python&tabs=windows){:target="_back"}


### 安裝

- [azure-ai-anomalydetector](https://pypi.org/project/azure-ai-anomalydetector/){:target="_back"}

   ```py
   pip install azure-ai-anomalydetector
   ```

- 官方的寫法

   - import 

      ```py
      import os
      from azure.ai.anomalydetector import AnomalyDetectorClient
      from azure.ai.anomalydetector.models import DetectRequest, TimeSeriesPoint, TimeGranularity, \
          AnomalyDetectorError
      from azure.core.credentials import AzureKeyCredential
      import pandas as pd
      ```

   - Auth 

      ```py
       # 上面你 Azure 帳號拿到的 Key 
       SUBSCRIPTION_KEY="xxxxxxxxx"
       # 上面你 Azure 帳號拿到的 EndPoint
       ANOMALY_DETECTOR_ENDPOINT="xxxxxxxxx"
      ```

      ```py
       client = AnomalyDetectorClient(AzureKeyCredential(SUBSCRIPTION_KEY), ANOMALY_DETECTOR_ENDPOINT)
      ```

    - 官方 [Github](https://github.com/Azure-Samples/AnomalyDetector/blob/master/example-data/request-data.csv){:target="_back"} 範例檔案
       - 其實看過資料後 有一點感覺的人 就知道 富爸爸在玩甚麼把戲了  XDDD


    - 組資料

       ```py
       series = []
       data_file = pd.read_csv("你資料的來源", header=None, encoding='utf-8', parse_dates=[0])
       for index, row in data_file.iterrows():
           series.append(TimeSeriesPoint(timestamp=row[0], value=row[1]))
       ```

    - 組合 request

       ```py
       request = DetectRequest(series=series, granularity=TimeGranularity.daily)
       ```       

    - 送出了拉!!

       ```py
       print('Detecting anomalies in the entire time series.')
       
       try:
           response = client.detect_entire_series(request)
       except AnomalyDetectorError as e:
           print('Error code: {}'.format(e.error.code), 'Error message: {}'.format(e.error.message))
       except Exception as e:
           print(e)
       
       if any(response.is_anomaly):
           print('An anomaly was detected at index:')
           for i, value in enumerate(response.is_anomaly):
               if value:
                   print(i)
       else:
           print('No anomalies were detected in the time series.')
       ```

### 是不是超級簡單的兒~~~~ 😊😊😊😊

> 下一篇 我來寫 
>
> 用 [J 個](https://westus2.dev.cognitive.microsoft.com/docs/services/AnomalyDetector/operations/post-timeseries-entire-detect){:target="_back"}
>
> 然後玩 [CDC](https://www.cdc.gov.tw/en/Disease/SubIndex/){:target="_back"} 
> 
> 資料 出圖 看有那些可愛的畫面!
>
> [https://covid19dashboard.cdc.gov.tw/dash7](https://covid19dashboard.cdc.gov.tw/dash7)

