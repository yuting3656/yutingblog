---
layout: "single"
title: "什麼? 刪光光 LOL!"
permalink: 'diary/:year-:month-:day/git-rm-r'
tags: 今日隨意 git
---

> 其實也沒甚麼
>
> 就工作習慣不一樣
>
> XDDDD

# git 移除 remote repo 全部都不想要了啦!

- 你先在 local 端

   ~~~git 
   git rm -r *
   git add .
   git commit -m "[update] clean all"
   ~~~

- 推上雲端

~~~git
git push origin master
~~~

> 這樣 remote 端的 repo 就很乾淨了唷~
> 
> 不用把 本地專案&remote rpo 移除
>
> 然後又再開 LOL ..... :kissing_heart::kissing_heart::kissing_heart:

### Reference

- [git](https://git-scm.com/docs/git-rm){:target="_back"}