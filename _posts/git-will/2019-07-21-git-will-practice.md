---
layout: 'post'
title: 'git-will practice  保哥出品! 品質保證!'
permalink: 'git/git-will-practice'
tags: git
---

### Version Control 

> 好棒棒紀錄`軟體變化`的過程 (人、事、時、地、物) 

- 紀錄版本變化而衍生出 
   - 查詢歷史紀錄
   - 復原變更
   - 比對差異
   - 標記版本 
   - 變更追蹤

- 多人版控進一步衍生出
   - 協同作業
   - 分支整併
   - 版本流程
   - 發行管理

### 分散式版本管控 (DVCS)

- 優點

- 缺點
  - 
  - 精細的權限管控 [可用sub-module](https://git-scm.com/book/en/v2/Git-Tools-Submodules){:target="_back"}


### 工作區

- 是一個頻繁異動的 開發目錄(又稱工作目錄)
- 你可以在工作區內執行任務 Git 命令
- 內含一個 .git 隱藏資料夾 (本地儲存庫)
- 沒有 .git 目錄就自己用 __git init__ 建立一個
- 砍掉 .git 目錄等於刪掉所有 **版控資訊**
- 有 .git 目錄等於可以隨時恢復所有的 __歷史原始碼__


### 儲存庫 (Repository)
> 儲存版控資訊

- 開目錄
    ~~~
    start .git
    ~~~
1. local repo
2. remote repo
3. shared repo

      - 當在不同環境下 shared repo 好用!
      - remoter repo 和 shared repo 本質上一模一樣的兒!
      - 靠邀 直接建立 [xxx.git] 資料夾來建立 __版本庫__  [**結尾要 .git**]
          - 打 git inint - -bare
          ~~~
           E:\git-practice>mkdir myproject.git
           E:\git-practice>cd myproject.git
           E:\git-practice\myproject.git>git init --bare
           Initialized empty Git repository in E:/git-practice/myproject.git/
          ~~~
          - 練習步驟
          1. 建一個 xxxx.git [bare-repository] 的資料夾
          2. clone 到 xxx.git 資料夾
          3. 在剛剛clone資料夾cd到工作目錄，[工作目錄名稱(xxx)defalut為xxx.git檔案名稱]，新增一檔案(test.txt)
          4. psuh 回 origin master
          5. 然後再做一次　2. ~ 3.
          6. 你會驚喜發現　剛剛新增的(test.txt)

---
### 隨選小筆記
`clone: 會幫你建工作目錄[目錄名稱defalut為xxx.git檔案名稱]，且幫你 cehckout 最新版本`
<br/>
`mirror:　只會幫你抓　bare-repo.git 的資料夾唷！`
<br/>

---

### 了解　Git 資料結構
![Imgur](https://i.imgur.com/xwbhs2l.jpg)
- 物件 ( Object )
   - 用來保存　__儲存庫__　中所有 **檔案** 與 **版本紀錄**
   - 屬於一種 (不可變的)　[immutable] 檔案類型
   - 區分四種物件類型
      1. blob
      2. tree
      3. commit 
      4. tag

   - add 的時候　可以看到儲存檔案內容(blob)
      ~~~
      // .git\objects
      git cat-file -p "id名稱　[資料夾名稱(兩碼)　+ 檔案名稱]"
      // EX
      E:\git-practice\empty>git cat-file -p ffc32affc2b9aa69949cec62cfc2ec34202d7738
      haahaah
      ~~~
    
    - commit 才會產生　tree　物件
      
      - commit 物件: tree

          ~~~
          E:\git-practice\empty>git cat-file -p "d046c7fad8040cd6952bdb0ab7b121e0db09158a"
          tree 3111b4b237626c480f3a89f43c9b70ad6b0dad14
          author yuting <tim23656@gmail.com> 1563678779 +0800
          committer yuting <tim23656@gmail.com> 1563678779 +0800
          
          first inint
          ~~~
      
       - 看你 blob tree 的內容： tree, blob
          
          ~~~
          E:\git-practice\empty>git cat-file -p 3111b4b237626c480f3a89f43c9b70ad6b0dad14
          100644 blob ffc32affc2b9aa69949cec62cfc2ec34202d7738  init.txt
          ~~~



### 雜湊演算法: 物件 id
  - HASH: 


- 索引 ( index )
   - 主要位於 .git/index　檔案 (binary file)
   - 不在索引中的檔案又稱為　untracked files 


### 查看物件　ID / 內容 / 類型　/ 大小

- object id 
   ~~~
   // git hash-object filename.ext

   E:\git-practice\empty>git hash-object init.txt
   ffc32affc2b9aa69949cec62cfc2ec34202d7738
   ~~~

- pretty print
   ~~~
   // git cat-file -p
   E:\git-practice\empty>git cat-file -p ffc32affc2b9aa69949cec62cfc2ec34202d7738
   haahaah
   ~~~

- type
   ~~~
   // git cat-file -t
   E:\git-practice\empty>git cat-file -t ffc32affc2b9aa69949cec62cfc2ec34202d7738
   blob
   ~~~

- size 
   ~~~
   // git cat-file -s 
   E:\git-practice\empty>git cat-file -s ffc32affc2b9aa69949cec62cfc2ec34202d7738
   9
   ~~~

## 我的範例
~~~
E:\jekyll_github_blog\yuting_blog>git log -5
commit 45834b63647ea3bd5c396ee48f16fca54b88eca3 (HEAD -> gh-pages, origin/gh-pages)
Author: yuting <tim23656@gmail.com>
Date:   Fri Jul 19 18:39:02 2019 +0800

    add line bot

commit c78ae3a9d58bc187eead3758fcdb26362943176a
Author: yuting <tim23656@gmail.com>
Date:   Fri Jul 19 18:24:55 2019 +0800

    add balloon

commit 00dadb2ae3ff25c4cbfa3be191ab105c8f3f4318
Author: yuting <tim23656@gmail.com>
Date:   Fri Jul 19 14:16:15 2019 +0800

    add daily-pg

commit d6f3fbadfa60bc7903324bb9fc9a2b5abab0eda8
Author: yuting <tim23656@gmail.com>
Date:   Thu Jul 18 17:51:49 2019 +0800

    add line bot

commit 8969b3e6cd595c939ff9e9da68c254bb8182a60e
Author: yuting <tim23656@gmail.com>
Date:   Thu Jul 18 12:05:34 2019 +0800

    add daily pg

E:\jekyll_github_blog\yuting_blog>git cat-file -p 45834b63647ea3bd5c396ee48f16fca54b88eca3
tree 03d278596f91cfbe56b57c75ba47516b8f49e40e
parent c78ae3a9d58bc187eead3758fcdb26362943176a
author yuting <tim23656@gmail.com> 1563532742 +0800
committer yuting <tim23656@gmail.com> 1563532742 +0800

add line bot

E:\jekyll_github_blog\yuting_blog>git cat-file 03d278596f91cfbe56b57c75ba47516b8f49e40e
usage: git cat-file (-t [--allow-unknown-type] | -s [--allow-unknown-type] | -e | -p | <type> | --textconv | --filters) [--path=<path>] <object>
   or: git cat-file (--batch | --batch-check) [--follow-symlinks] [--textconv | --filters]

<type> can be one of: blob, tree, commit, tag
    -t                    show object type
    -s                    show object size
    -e                    exit with zero when there's no error
    -p                    pretty-print object's content
    --textconv            for blob objects, run textconv on object's content
    --filters             for blob objects, run filters on object's content
    --path <blob>         use a specific path for --textconv/--filters
    --allow-unknown-type  allow -s and -t to work with broken/corrupt objects
    --buffer              buffer --batch output
    --batch[=<format>]    show info and content of objects fed from the standard input
    --batch-check[=<format>]
                          show info about objects fed from the standard input
    --follow-symlinks     follow in-tree symlinks (used with --batch or --batch-check)
    --batch-all-objects   show all objects with --batch or --batch-check
    --unordered           do not order --batch-all-objects output


E:\jekyll_github_blog\yuting_blog>git cat-file -p 03d278596f91cfbe56b57c75ba47516b8f49e40e
100644 blob 45c150536e5f3888554c294f27539c5d41072467    .gitignore
100644 blob c472b4ea0a781061dab1f394627222735d4215bd    404.html
100644 blob 56e4cdd38ed6f1c995b284d4468be3ced10e030b    Gemfile
100644 blob bf13b30375a49d0f0d1ad2fefb264c53005792ec    Gemfile.lock
100644 blob 5720dbe3ab5bc81a0c320e3b9773040b6b35dc93    _config.yml
040000 tree f844b2bb80291fe9564d2f70af0b3dea6dd6d054    _drafts
040000 tree c9a718ad1cd50af18b809b458e9ad45d5dc61646    _includes
040000 tree da4b3419dc78972229fbed1df97cb25643236749    _layouts
040000 tree 7fb578b8bb298a5d5e43504342eea232c82eafc5    _posts
100644 blob 71439448ad531edeb09f1d7c0ebe51f1c6d04106    about.md
040000 tree fcf673ec89ecf1f0ed047ec0dde755cedaf8be90    assets
040000 tree 01c061cd1158d284ae66d3d44758aa88b32354ce    blog
100644 blob 06715078416fe7a0f7153a3d1e9ec351217c99ad    index.md
100644 blob 136748fffb1291de15a55ec07341a87bc12b31ef    yuting-daily-seed.md

E:\jekyll_github_blog\yuting_blog>git cat-file 7fb578b8bb298a5d5e43504342eea232c82eafc5
usage: git cat-file (-t [--allow-unknown-type] | -s [--allow-unknown-type] | -e | -p | <type> | --textconv | --filters) [--path=<path>] <object>
   or: git cat-file (--batch | --batch-check) [--follow-symlinks] [--textconv | --filters]

<type> can be one of: blob, tree, commit, tag
    -t                    show object type
    -s                    show object size
    -e                    exit with zero when there's no error
    -p                    pretty-print object's content
    --textconv            for blob objects, run textconv on object's content
    --filters             for blob objects, run filters on object's content
    --path <blob>         use a specific path for --textconv/--filters
    --allow-unknown-type  allow -s and -t to work with broken/corrupt objects
    --buffer              buffer --batch output
    --batch[=<format>]    show info and content of objects fed from the standard input
    --batch-check[=<format>]
                          show info about objects fed from the standard input
    --follow-symlinks     follow in-tree symlinks (used with --batch or --batch-check)
    --batch-all-objects   show all objects with --batch or --batch-check
    --unordered           do not order --batch-all-objects output


E:\jekyll_github_blog\yuting_blog>git cat-file -p 7fb578b8bb298a5d5e43504342eea232c82eafc5
040000 tree 97bc64145ab5b0c3c8689f33c4d5a348c862c752    daily-programming
040000 tree 9552cfc7a0d5010e746ba1c2f4e90c47bf0a1728    diary
040000 tree 26190143d5980be4970f576c65a3de9d2af3b7e4    java
040000 tree 82152730b07a4ef01ba94c1a2c068e264483158a    line-bot
040000 tree 51ee1750d5eb0b0fb89bc4b3bd56cabbe3d1853a    ml
040000 tree fbd70a753292f959094b97206871769e18f3d89e    python

E:\jekyll_github_blog\yuting_blog>git cat-file -p fbd70a753292f959094b97206871769e18f3d89e
100644 blob 3628be7e9972e18c6e77d48f2e98c80aaeb4af9d    2019-06-21-python-numpy-dot.md
100644 blob fc2e2df92328cc4c7c044095a6fc91a2c83a465c    2019-06-21-python-tkinter-01.md

E:\jekyll_github_blog\yuting_blog>git cat-file -p fc2e2df92328cc4c7c044095a6fc91a2c83a465c
---
layout: 'post'
title: 'Tkinter 畫笑臉'
permalink: 'python/tkinter/smile-face'
tags: python tkinter
---
**廢話不多說  直接上程式!**
> 其實只要是測試  TAGS 的功能有沒有做好 XDD

~~~python
class DdpGUI:
    def __init__(self, master):
        self.master = master
        self._create_gui()

    def _create_gui(self):
        self.master.configure(background='bisque')
        self.style_frame_bg = ttk.Style()

        self.style_frame_bg.configure('Sample.eye.TFrame', background='black')
        self.style_frame_bg.configure('Sample.pupil.TFrame', background='#f4f4f4')
        self.style_frame_bg.configure('Sample.teeth.TFrame', background='red')

        self.master.geometry("500x400")

        # 相關連結: https://stackoverflow.com/questions/45847313/what-does-weight-do-in-tkinter
        self.master.rowconfigure(0, weight=3)
        self.master.rowconfigure(1, weight=3)
        self.master.rowconfigure(2, weight=3)
        self.master.rowconfigure(3, weight=3)
        self.master.rowconfigure(4, weight=1)
        self.master.rowconfigure(5, weight=1)

        self.master.columnconfigure(0, weight=1)
        self.master.columnconfigure(1, weight=1)
        self.master.columnconfigure(2, weight=1)
        self.master.columnconfigure(3, weight=1)
        self.master.columnconfigure(4, weight=1)
        self.master.columnconfigure(5, weight=1)
        self.master.columnconfigure(6, weight=1)
        self.master.columnconfigure(7, weight=1)

        self.frame_01 = ttk.Frame(self.master, style='Sample.eye.TFrame')
        self.frame_01.grid(row=1, column=2, sticky='nsew')
        self.pupil_frame_01 = ttk.Frame(self.frame_01, style='Sample.pupil.TFrame')
        self.pupil_frame_01.pack(fill="both", expand=True, padx=10, pady=10)

        self.frame_02 = ttk.Frame(self.master, style='Sample.eye.TFrame')
        self.frame_02.grid(row=1, column=5, sticky='nsew')
        self.pupil_frame_01 = ttk.Frame(self.frame_02, style='Sample.pupil.TFrame')
        self.pupil_frame_01.pack(fill="both", expand=True, padx=10, pady=10)

        self.frame_03 = ttk.Frame(self.master, style='Sample.teeth.TFrame')
        self.frame_03.grid(row=3, column=2, sticky='nsew')

        self.frame_04 = ttk.Frame(self.master, style='Sample.teeth.TFrame')
        self.frame_04.grid(row=4, column=3, columnspan=3, sticky='nsew')

        self.frame_04 = ttk.Frame(self.master, style='Sample.teeth.TFrame')
        self.frame_04.grid(row=3, column=6, sticky='nsew')


if __name__ == "__main__":
    root = Tk()
    DdpGUI(root)
    root.mainloop()
~~~

### Git 物件結構的優點

> 只要 object 惡意改變 ( 刪掉、減少Hash一碼 ) ，整個git就叉燒包GG了。

> 版控不要版控　binary 的檔案！(ex:圖片, etc...)

> 做好 format! 的樣式! 

- 有效率的處理大型專案
- 歷史紀錄保護
   - git fsck
- 定期的封裝物件
   - git gc

### 深入了解　Reset 應用技巧

- 主要用途: 將當前分支復原變更
   
    - 復原上次認可 ( Undo last commit ) 
       ~~~
       git reset HEAD~
       ~~~

- 字面翻譯: 將當前分之**重置**到指定版本

   - 復原至特定版本
      ~~~
      git rest id
      ~~~

- 從工作目錄找回所有失去的版本 
   > reflog 都可以看的到所有的更變唷！
   ~~~
   git reflog
   ~~~



---

## Git 分支合併技巧

###  分支 (Branching)

> `\.git\refs\heads` 可以看到　現在的所有　branch

- 建立分支
   - git branch <name>
   - git checkout -b
   - git checkout --orphan

- 刪除分支
   - git branch -d
   - git branch -D
   - git branch -D -r


- reset:
   > `soft reset` 可以直接　commit ，不用 `add.` 保留現在修改的內容


### 合併 (Merging)


### 合併不同世界的分支

- 快轉合併 ( Fast Forward ) (預設值)
   - git merge `BranchName` --ff

- 非快轉合併 ( No Fast Forward )
   - git merge `BranchName` --no-ff

- 僅快轉合併 ( Fast Forward Only )
   - git merge `BranchName` --ff-only
   ~~~
   只要不能　fast forward 就會掛掉
   ~~~

- 不提交的合併 ( No Commit )
   - git merge `BranchName` --no-commit

- 壓縮合併 ( Squash ) ( 不會有合併線圖出現　)
   - git merge `BranchName` --squash

   ~~~
   線分出去，commit 後線不會跑回到　master (穩定版) 美觀好閱讀啦!
   ~~~

### 分支合併與衝突處裡

- 正常合併
   - git merge BranchName

- 放棄衝突的合併
   - git merge --abort
   - git reset --merge

- 採用 ours 合併選項 (衝突時以我方為主) (Merge Strategies) 
   - git merge -X ours BranchName

- 採用 theirs 合併選項 (衝突時以他方為主)
   - git merge -X theirs BranchNam

- 手動處理衝突
   - 處理衝突是工程師很重要基本的技能！


## 其他不同的合併方式

- 正向檢櫻桃 (Cherry Pick)
   - git cherry-pick <commit_id>

- 反向撿櫻桃 ( Revert )
   - git revert <commit_id>

- 重定基底 ( Rebase )


## git cherry-pick 與 git revert


## 重定基底 (Rebase)

- 將另一個分支的終點當成目前分支的起點
   - git checkout branch1
   - git rebase master
   - git rebase --continue
   - git rebase --abort
   - git rebase --skip

- 

## 保持「工作目錄」的乾淨清爽

- reset: 善用 Reset 技巧清空工作目錄中所有「索引」中的檔案變更 
   ~~~
   - git reset --hard
   ~~~

- clean: 善用 Clean 技巧清空工作目錄中所有「非索引」的檔案變更
   ~~~
   – git clean -n (查看有哪些檔案會被清除) (Dry run)
   – git clean -f (執行清除所有不在索引中的檔案)
   – git clean -d (執行清除所有沒有索引檔案的目錄)
   – git clean -x (執行清除任務，並忽略 .gitignore 設定)
   ~~~

- stash: 善用 Stash 技巧暫存工作目錄中所有變更
   ~~~
   ~~~ 


## Git 遠端儲存庫管理

- pull
   ~~~
   pull = fetch + merge
   pull = fetch + rebase
   ~~~

   - git pull --p

   > fast forward 在　遠端　pull　下就是　default


## Git 協同作業實戰

1. 集中式版控流程
2. 整合管理版控流程
3. 獨裁者與副手工作流程
