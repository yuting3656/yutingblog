---
layout: "post"
title: "Study Group: 一姐出品 品質保證 hello-git"
permalink: "stydeGroup/hello-git-firstSister"
tags: 讀書會 git
---

> 廢話不多說 先給傳送們!

# [Shan | 日常筆記 Hello, Git](https://pengpon.github.io/git/2021/03/21/Git-magic.html){:target="\_back"}

- 好跑步去

# 使用者設定

```bash
// 先查看目前設定
$ git config --list

// 設定信箱,名稱
$ git config --global user.name "pengpon"
$ git config --global user.email "xxxx@gmail.com"
```

# 看紀錄

```bash
$ git log
commit 4a28350f1ec538b833d44feb2efd0133b18128ea (HEAD -> master)
Author: pengpon <pengpon214@gmail.com>
Date:   Sun Mar 21 14:06:10 2021 +0800

    空的

commit 76d880eae294f30e7fe6f9a8b26454c81fd5c7ca
Author: pengpon <pengpon214@gmail.com>
Date:   Sun Mar 21 14:06:08 2021 +0800

    空的

commit 196ce5e96fd50a0d6c6881022dde1f5abf3d96a2
Author: pengpon <pengpon214@gmail.com>
Date:   Sun Mar 21 14:05:54 2021 +0800

    空的

commit 54bad65aa0211a96d55798eca2f9fbd24cfb001e
Author: pengpon <pengpon214@gmail.com>
Date:   Sun Mar 21 14:04:03 2021 +0800

    init commit
```

# 修改 commit 紀錄

- 有三招

  1. [`git commit --amend`](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History){:target="\_back"}

     - changing the last commit

       ```bash
          $ git log --oneline // 先檢視目前log
          0263340 (HEAD -> master) waaaaaaa
          4a28350 空的
          76d880e 空的
          196ce5e 空的
          54bad65 init commit

          $ git commit --amend -m "add title"
          [master 2e9b57c] add tittle
           Date: Sun Mar 21 14:20:20 2021 +0800
           1 file changed, 1 insertion(+), 1 deletion(-)

          $ git log --oneline
          2e9b57c (HEAD -> master) add tittle
          4a28350 空的
          76d880e 空的
          196ce5e 空的
          54bad65 init commit
       ```

  2. [`git rebase`](https://git-scm.com/docs/git-rebase){:target="\_back"}

     - reapply commits ontop of another base tip

  3. [`git reset`](https://git-scm.com/docs/git-reset){:target="\_back"}

     - reset current `HEAD` to the specified state

### 2. git rebase

```bash
PS E:\git-practice\git-reset> git log --oneline
27fc0d5 (HEAD -> master) test before git rm -rf
704cc55 add new text_01
42921a4 init commit
PS E:\git-practice\git-reset> git rebase -i 704cc55
```

|![Imgur](https://i.imgur.com/FVE26c5.png)|

```bash
pick 27fc0d5 test before git rm -rf

# Rebase 704cc55..27fc0d5 onto 704cc55 (1 command)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out

```

目標: 拿掉 `27fc0d5`

- 步驟:

  - `i`: 開始編輯
  - drop 27fc0d5 test before git rm -rf
  - `Esc` :wq

```bash
Successfully rebased and updated refs/heads/master.
PS E:\git-practice\git-reset> git log --oneline
704cc55 (HEAD -> master) add new text_01
42921a4 init commit
```

### 3. git reset

- git rest 有三種模式

  1.  mixed `(丟回工作目錄)`

      - 預設參數
      - 將 Staging Area 檔案丟掉
      - 不動 Working Directory 的檔案
      - commit 拆出來的檔案留在 Working Directory

  2.  soft `(丟回暫存)`

      - Working Directory 和 Staging Area 都留著
      - commit 拆出來的檔案留在 Staging Area

  3.  hard `(直接掰掰)`
      - Working Directory 和 Staging Area 都丟

目標 把剛剛 rebase 之前的樣子 拿回來

- 步驟:

  - `git reflog -15` 看過去 15 筆所有紀錄
  - `git reset --hard <commitID>` 直接來了啦!!!

```bash
PS E:\git-practice\git-reset> git log --oneline
704cc55 (HEAD -> master) add new text_01
42921a4 init commit
```

```bash
PS E:\git-practice\git-reset> git reflog -15
704cc55 (HEAD -> master) HEAD@{0}: rebase -i (finish): returning to refs/heads/master
704cc55 (HEAD -> master) HEAD@{1}: rebase -i (start): checkout 704cc55
27fc0d5 HEAD@{2}: reset: moving to 27fc0d5
42921a4 HEAD@{3}: rebase -i (finish): returning to refs/heads/master
42921a4 HEAD@{4}: rebase -i (start): checkout 42921a4
704cc55 (HEAD -> master) HEAD@{5}: rebase -i (finish): returning to refs/heads/master
704cc55 (HEAD -> master) HEAD@{6}: rebase -i (start): checkout 42921a4
704cc55 (HEAD -> master) HEAD@{7}: rebase -i (finish): returning to refs/heads/master
704cc55 (HEAD -> master) HEAD@{8}: rebase -i (start): checkout 704cc55
27fc0d5 HEAD@{9}: rebase -i (finish): returning to refs/heads/master
27fc0d5 HEAD@{10}: rebase -i (start): checkout 704cc55
27fc0d5 HEAD@{11}: rebase -i (finish): returning to refs/heads/master
27fc0d5 HEAD@{12}: rebase -i (start): checkout 704cc55
27fc0d5 HEAD@{13}: rebase -i (finish): returning to refs/heads/master
27fc0d5 HEAD@{14}: rebase -i (start): checkout 704cc55
```

```bash
PS E:\git-practice\git-reset> git reset --hard 27fc0d5
HEAD is now at 27fc0d5 test before git rm -rf
PS E:\git-practice\git-reset> git log --oneline
27fc0d5 (HEAD -> master) test before git rm -rf
704cc55 add new text_01
42921a4 init commit
PS E:\git-practice\git-reset>
```

# Branch

```bash
// 開新分支 feature1 feature2
$ git branch feature1
$ git branch feature2

// 切到分支feature2
$ git checkout feature2
Switched to branch 'feature2'
M       index.html

// 查看.git/HEAD
$ cat .git/HEAD
ref: refs/heads/feature2

// 切至master
$ git checkout master
$ cat .git/HEAD
ref: refs/heads/master
```

```bash
// 列出目前專案有哪些分支
$ git branch
  feature1
  feature2
* master

// 新增分支
$ git branch feature4

// 分支改名 feature4改為feature3
$ git branch -m feature4 feature3

// 刪除分支
$ git branch -d feature3
Deleted branch feature3 (was f8fe91b).

// 切換分支
$ git checkout feature2
```

# [Git Revert](https://git-scm.com/docs/git-revert){:target="\_back"}

> Revert some existing commits

```bash
$ git log --oneline
e8bf6eb (HEAD -> master) modify text
a130319 feature4 function
5979365 conflict fixed
d0f8be1 (feature2) more function
ae6b919 add line
f8fe91b add tittle
4a28350 (feature1) 空的
76d880e 空的
196ce5e 空的
54bad65 init commit
```

- 打算取消最後的 commit (e8bf6eb)

```bash
$ git revert HEAD --no-edit
[master 9c8f87b] Revert "modify text"
 Date: Sun Mar 21 22:46:42 2021 +0800
 1 file changed, 1 deletion(-)

 $ git log --oneline
9c8f87b (HEAD -> master) Revert "modify text"
e8bf6eb modify text
a130319 feature4 function
5979365 conflict fixed
d0f8be1 (feature2) more function
ae6b919 add line
f8fe91b add tittle
4a28350 (feature1) 空的
76d880e 空的
196ce5e 空的
54bad65 init commit
```
