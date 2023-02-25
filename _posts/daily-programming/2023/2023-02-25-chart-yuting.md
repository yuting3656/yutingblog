---
layout: "single"
title: "daily Programming: 站在風口上 連豬都會飛之我也要 ChatGPT 一下"
permalink: "daily-programming/chat-yuting-"
tags: daily-programming ChatGPT
excerpt: "站在風口上連豬都會飛!"
header:
  overlay_image: "https://i.imgur.com/MHeV1tm.png"
---

> 真的站在時代的轉捩點上 感覺很刺激也很興奮阿!!!!
>
> 今年目標就是主動發想!!!!
>
> 主要就是想要 一個 chat bot 
>
> 可以回傳使用者的相關問題
>
> 現在 domain 是工廠製端

- 我問了 [ChatGPT](https://chat.openai.com/chat){:target="_back"}

- To design a chatbot that can answer from your database, you can follow these steps:

   - Identify the questions or intents that your users may have. This will help you to create a list of possible questions that your chatbot should be able to answer.

   -  Map the intents to the corresponding database queries. For each intent, you will need to define the query that will retrieve the relevant data from your database. You can use SQL or a NoSQL query language depending on the type of database you are using.

   -  Create a chatbot API that can receive user input and return the appropriate response. You can use a web framework like Flask or Express to create the API.

   -  Use a natural language processing (NLP) engine to parse the user input and identify the intent. You can use tools like [Dialogflow](https://cloud.google.com/dialogflow/docs), [Rasa](https://rasa.com/), or [Wit.ai](https://wit.ai/) for this step.

   -  Pass the intent to the chatbot API, which will execute the corresponding database query and return the data to the user.

   -  Format the data into a message that the user can understand. This may involve extracting specific fields from the database query results and presenting them in a human-readable format.

## 我自己看了回答後想到的架構

![Imgur](https://i.imgur.com/IAbOvFu.jpg)


# 萬事起頭難!!! SIDE PROJECT 會是你人生好夥伴!

1. 先想一個情境:
   - 總統大選
    
2. 列出問題:
   - 誰會當選?
   - 藍綠候選人會是誰?
   - 藍綠立委席次預估?
   - 柯文哲的影響力?
   - 阿超出這幾個問題的話 就打哈哈 亂generate 一個政治人物的圖給user XDD

3. 先 train model 讓 model 可以知道 input 的文字 屬於上述哪些問題 **(intent)**
4. 寫 API 回傳上述 問題的 answer
   - `金孫(疑?我是不是透露甚麼了)`
   - 金孫, 阿猴
   - 挖阿災 XDD
   - 無力 XD
   - [midjourney](https://www.midjourney.com/home/?callbackUrl=%2Fapp%2F) 