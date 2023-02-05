---
layout: "single"
title: "daily Programming: 我們終究會老 該記住 還是要筆記一下啊~ jekyll gcp cmd  XDDD"
permalink: "daily-programming/i-have-zero-brain"
tags: daily-programming jekyll gcp 
---

> 有陣子沒寫部落個 跟 更新 side project 結果 真的 悲劇~~~
>
> 一堆指令要重查 LOL.......
>
> 加油啊! 幹這行就是不怕學習  一職當一張白紙吧 ~~~ XD

## Jekyll

- local run serve with baseurl
   - [doc](https://jekyllrb.com/docs/configuration/options/){:target="_back"}

   - `bundle exec jekyll serve --baseurl 'your_base_url' `


## GCP

- sync bucket resource into cloud

  - [doc](https://cloud.google.com/sdk/gcloud/reference/app/deploy){:target="_back"}

  - `gsutil -m rsync -r gs://bucket_name .`
  - `gcloud app deploy`


> 這偏要拿出來當 我自己的開發小筆記好了  XDD