---
layout: "single"
title: "daily Programming: Python Flask before_request"
permalink: "daily-programming/python-flask-before-request"
tags: daily-programming python flask
---

> 故事是這樣的
>
> 可愛的 小夥伴
>
> 要在 服務上加上
>
> 檢查 所有 request 來源是否都是好棒棒的 機制
>
> ![Imgur](https://i.imgur.com/MP4oAQw.jpg)

## before_request

```python
import requests
import asyncio

async def async_check_auth(auth_header):
  url = 'https://你的檢查Auth有效&正確性.com'
  headers = { 'Authorization': auth_header}
  r = requests.get(url, headers=headers)
  json_text = r.json()
  if r.status_code != 200:
    return False
  elif json_text['我好健康'] is True:
    return True
  else:
    return False

@app.before_request
def auth():
  header = request.headers
  auth_header =  header['Authorization']
  is_auth = asyncio.run(async_check_auth(auth_header))
  if is_auth is not True:
    abort(400)
```

## 參考

- [Flask middleware for specific route](https://stackoverflow.com/questions/51691730/flask-middleware-for-specific-route){:target="\_back"}
