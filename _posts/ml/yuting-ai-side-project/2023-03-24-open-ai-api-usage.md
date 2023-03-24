---
layout: "single"
title: '使用 OpenAI API 來玩聊天機器人'
permalink: 'ai-side-project/open-ai-api-usage'
tags: ai-side-project OpenAI chatGPT
---


## 1. Get key

   - [創建 OpenAI 帳號](https://platform.openai.com/signup){:target="_back"}
   - 拿 API Keys
      - [API Keys](https://platform.openai.com/account/api-keys){:target="_back"}
  

## 2. python code

```python
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="Convert this text to a programmatic command:\n\nExample: Ask Constance if we need some bread\nOutput: send-msg `find constance` Do we need some bread?\n\nReach out to the ski store and figure out if I can get my skis fixed before I leave on Thursday",
  temperature=0,
  max_tokens=100,
  top_p=1.0,
  frequency_penalty=0.2,
  presence_penalty=0.0,
  stop=["\n"]
)
```



### [Playground](https://platform.openai.com/playground){:target="_back"}

   - 各種 model 任君挑選啊！
   - 多玩 然後範例 code 很簡單易讀

### 收費 [Tokenizer](https://platform.openai.com/tokenizer)

   - OpenAI 用你輸入的文字多寡為基準, 輸入的文字在做運算的時候會被轉換成 [token](https://yuting3656.github.io/yutingblog/coursera-tensorflow-developer-professional-certificate/nlp-in-tensorflow/week01){:target="_back"}, 讓model 來了解文字前後文的關聯, 進而理解我們在說殺洨～
   -  [Tokenizer](https://platform.openai.com/tokenizer) 讓你更能理解 輸入大約多少文字是會被轉換成多少 tokens 然後再去看 [OpenAI 價目表](https://openai.com/pricing){:target="_back"}

   > 一個月有一定的免費 token 額度  
   >
   > 把握時機 練習飯把玩吧！！！ 
   > 
   > 阿如果玩上癮 就付一點小錢
   >
   > 反正就是粉便宜！！！！ ＸＤＤＤ