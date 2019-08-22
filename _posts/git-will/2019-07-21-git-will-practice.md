---
layout: 'post'
title: 'git-will practice  保哥出品! 品質保證!'
permalink: 'git/git-will-practice'
tags: git
---

> 資料來自 Will 保哥 [Git 版本控管實戰：新手進階篇](https://www.accupass.com/event/1903200235282053909843){:target="_back"}

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

   - 本地端的工作區會保有完整的儲存庫
      - 每個人都擁有一份 __完整的儲存庫備份 (Full Backup)__
      - 完全不需要伺服器端的支援就可以運作版本控制 
      - 每次提交版本變更時，都僅提交到本地的儲存庫 
      - 交速度非常快，也不用網路連線，可大幅節省開發時間 
      - 可以在 __本地端__ 建立離線的版本與 __歷史紀錄__
   - 擁有非常強悍的 __合併追蹤__ 能力
      - 取得他人變更後的版本後，隨時可透過合併方式進行整合
      - 合併多人的版本只要有存取共用儲存庫的權限或管道即可


- 缺點
  - 無法採用鎖定版控策略 (僅能使用合併策略)
  - 無法針對專案進行精細的權限控管 (但可以切割成多個儲存庫)
     - 精細的權限管控 [可用sub-module](https://git-scm.com/book/en/v2/Git-Tools-Submodules){:target="_back"}


### 工作區 (Workspace) (Working Tree)

- 是一個 `頻繁異動` 的開發目錄(又稱 __工作目錄__)
- 你可以在 __工作區__ 內執行任務 Git 命令
- 內含一個 .git 隱藏資料夾 (**本地儲存庫**)
- 沒有 .git 目錄就自己用 __git init__ 建立一個
- 砍掉 .git 目錄等於刪掉所有 **版控資訊**
- 有 .git 目錄等於可以隨時恢復所有的 __歷史原始碼__


### 儲存庫 (Repository)
> 儲存版控資訊

- 開目錄
    ~~~
    start .git
    ~~~

    
1. 本地儲存庫 ( Local Repository )
   - 同時包含工作目錄與儲存庫
   - 預設位於工作目錄下的 .git 資料夾

2. 遠端儲存庫 ( Remote Repository ) 
   - 僅包含 __儲存庫__ (Bare Repository)
   - GitHub / Bitbucket / Azure Devops (VSTS)

3. 共用儲存庫 ( Shared Repository )

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
      1. blob   儲存檔案內容
      2. tree   儲存目錄內容 ( 儲存目錄下有哪些檔名 )
      3. commit 儲存版本內容 
      4. tag    儲存標籤內容

- 索引(Index)
   - 用來保存要進儲存庫之前的所有檔案狀態
   - 屬於一種 __「可變的__ (mutable) 檔案類型
   - 主要位於 .git/index 檔案 (二進位檔)
   - 介於 物件儲存區 (object storage) 與 工作目錄 (working directory)
   - 不在索引中的檔案又稱為 untracked files

- 練習實作

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

### 關於 Git 內部運作流程

> I fear not the man that has practiced 10000 kicks once, but I fear the man that has practiced one kick 10000 times.  by Bruce Lee

> 就幾招基本的練熟 就ok了!

- 建立「工作目錄」與「本地儲存庫」 
   - git init
- 先將「工作目錄」的當前狀態加入到「索引」
   - git add 
- 檢查「索引」狀態
   - git status 
- 讀取「索引」並寫入到「儲存庫」
   - git commit
- 查看「儲存庫」中的版本紀錄
   - git log


### 版控狀態、物件與索引之間的關係

![Imgur](https://i.imgur.com/QPQ5bBn.jpg)

### 雜湊演算法: 物件 id
  - HASH

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
   - 以檔案內容換算出 SHA1 Hash 當成物件檔名 
      - 相同的內容一定會產生相同的物件檔名
      - Git 物件檔絕對不可能產生檔名衝
- 歷史紀錄保護
   - 每個版本包含上一個版本的 hash 值
   - 容易檢查 Git 儲存庫的完整性 
      - git fsck
- 定期的封裝物件
   - 對於不常用的物件會自動進行壓縮處理
      - git gc

### 儲存庫、工作目錄與索引的關係圖

![Imgur](https://i.imgur.com/eUUWHAk.jpg)

### 深入了解　Reset 應用技巧

- 主要用途: 將當前分支 __復原變更__
   
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

- 看懂分支合併圖(合併前)

   ![Imgur](https://i.imgur.com/WJDMsdC.jpg)

- 看懂分支合併圖(合併後)

   ![Imgur](https://i.imgur.com/QzVGNvh.jpg)



###  分支 (Branching)

> `\.git\refs\heads` 可以看到　現在的所有　branch

- 建立分支
   - `git branch <name>`
   - `git checkout -b`
   - `git checkout --orphan`
      - [參考網站](https://ihower.tw/blog/archives/5691){:target="_back"}

- 刪除分支
   - `git branch -d`
   - `git branch -D`
   - `git branch -D -r`

- 更名分支
   - `git branch -m`
   - `git branch -M`

- 列出分支
   - `git branch`
   - `git branch --list <pattern>`
   - `git branch --merged`
   - `git branch --no-merged`
   - `git branch -r`
   - `git branch -a`

- 說明頁面
   - `git help branch`
   - `git help checkout`

- reset:
   > `soft reset` 可以直接　commit ，不用 `add.` 保留現在修改的內容


### 合併 (Merging)

- 一般合併
   - git merge
   - git merge --no-ff
   - git merge --squash
   - git merge --no-commit 
   - git merge --abort

- 正項挑戰合併 (檢櫻桃)
   - git cherry-pick
   - git cherry-pick --continue
   - git cherry-pick --quit
   - git cherry-pick --abort

- 重定基底合併
   - git rebase
   - git rebase -i
   - git rebase --continue
   - git rebase --skip
   - git rebase --abort

- 反向挑戰
   - git revert 
   - git revert --continue
   - git revert --quit
   - git revert --abort

### 關於「分支」的真正意義

- 三維空間 (3D) 外加一個 時間維度 可以稱為 四維空間 (4D)
- 分支就是一個可以讓你標記時間維度的指標
- 分支是一個會隨著時間演進的指標
- `標籤`則是一個不會隨著時間演進的指標
   - git tag [網站](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag){:target="_back"}
- 分支在 Git 中就是一個文字檔案紀載著特定版本的位置
- 「切換分支」( Checkout ) 等同於「切換到不同的時空」


### 身處「平行世界」的分支管理

- 建立分支
   - git branch `BranchName`
   - git checkout -b `BranchName`
   - git checkout --orphan `BranchName`

- 更名分支、刪除分支、重建分支
   - .git/refs/heads/NranchName
   > 不要怕!!! 驚驚不會大漢

- 切換分支
   - git checkout BranchName

- 列出分支
   - git branch -a


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
   - 透過編輯器手動合併變更
   - 透過編輯器自動合併變更 (Visual Studio Code)
   - 透過合併工具進行合併變更 (TortoiseGitMerge, Visual Studio, …)   

## 其他不同的合併方式

- 正向檢櫻桃 (Cherry Pick)
   - `git cherry-pick <commit_id>`

- 反向撿櫻桃 ( Revert )
   - `git revert <commit_id>`

- 重定基底 ( Rebase )
   - `git rebase <commit_id>`
   - `git rebase <commit_id> -i`

- 遠端分支整合
   - git pull          = git fetch + git merge
   - git pull --rebase = git fetch + git rebase


## git cherry-pick 與 git revert

- git cherry-pick
   - 挑選一個或多個 commits 重新`提交版本`
   - 影響範圍: *目前工作目錄*

- git revert
   - 挑選一個或多個 commits 重新`反向提交` 
   - 影響範圍: *目前工作目錄*
   - [Tutorial 網站](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert){:target="_back"}

- revert vs. resetting

![Imgur](https://i.imgur.com/OyDReSS.jpg)

## 重定基底 (Rebase)

- 將 __另一個分支的終點__ 當成 __目前分支的起點__
   - git checkout branch1
   - git rebase master
   - git rebase --continue
   - git rebase --abort
   - git rebase --skip

- 主要任務
   - 先找出兩個分支之間的共同起點 (Base)
   - 將目前分支的所有變更重新在另一個分支套用變更 ( commits ) 
      - 這就是所謂【重定基底】的意思 ( 也是用撿櫻桃的方式運作 )

- 注意事項
   - 不要在 git rebase 發生衝突的過程中執行 git commit 命令
   - 如果真的做了，請改執行 git rebase --skip 跳過這一版套用

## git merge 與 git rebase 的差異

![Imgur](https://i.imgur.com/xnp6rm1.jpg)

## git merge 與 git rebase 的實務情境

![Imgur](https://i.imgur.com/kg0E411.jpg)

## 保持「工作目錄」的乾淨清爽

- reset: 善用 Reset 技巧 __清空__ 工作目錄中所有「索引」中的檔案變更

   ~~~
   - git reset --hard
   ~~~

- clean: 善用 Clean 技巧 __清空__ 工作目錄中所有「非索引」的檔案變更

   ~~~
   – git clean -n (查看有哪些檔案會被清除) (Dry run)
   – git clean -f (執行清除所有不在索引中的檔案)
   – git clean -d (執行清除所有沒有索引檔案的目錄)
   – git clean -x (執行清除任務，並忽略 .gitignore 設定)
   ~~~

- stash: 善用 Stash 技巧 __暫存__ 工作目錄中所有變更
   
   ~~~
   – git stash save [message]
   – git stash pop
   ~~~ 

## 關於 Git Stash 的實務應用

- 暫存目前已經保存在「索引」中的變更檔案 
   - git stash save [message]
- 暫存所有工作目錄中的暫存檔案 ( 排除 .gitignore 的檔案 )
   - git stash save --include-untracked [message]
- 暫存所有工作目錄中的暫存檔案 ( 包含 .gitignore 的檔案 )
   - git stash save --all [message]
- 列出所有暫存的清單
   - git stash list
- 顯示特定一個暫存版本的內容 
   - git stash show stash@{0}
- 取回特定一個暫存版本 
   - git stash pop stash@{0}
   - git stash apply stash@{0}

## 深入了解 Checkout 應用技巧

- 主要用途: 從當前分支 __切換__ 到 另一分支 (時間軸)

   - 切換至 develop 分支 
      - git checkout develop
   - 建立並切換至 develop 分支
      - git checkout -b develop

   - 切換至另一個版本 (沒有分支的版本) 
      - git checkout 9ac91edf7342c14c3698f27cb4a18ea5727c3d53

- 從工作目錄找回所有曾經切換過的分支
   - git reflog
   
## 認識 detached HEAD 狀態

- 在沒有分支的地方 commit 就會進入 detached HEAD 狀態 
   - 通常 HEAD 與 branch HEAD 會緊緊相依 
   - 如果 HEAD 與 branch HEAD 不一致，就會引發 detached HEAD

- 解決方案 
  - 任意一個 commit 物件都可以給予一個分支 ( ref ) 
   <br/> __※ 分支就只是一個參考名稱而已__ 
  - 方法1 
     - `git checkout <commit_id>`
     - `git checkout -b <new_branch_name>`
  - 方法2
     - `git branch <new_branch_name> <commit_id>`

## Git 遠端儲存庫管理

- 重新認識 git pull

  - git pull
  - git pull --no-ff
  - git pull --ff-only
  - git pull --rebase

## git pull

- 等同於下列命令
   - `git fetch origin <branch>`
   - `git merge FETCH_HEAD`

- 合併衝突處理
   - `git reset --merge`

- 刪除本地端追蹤分支
   - `git fetch --pure`

## git pull --no--ff

- 等同於下列命令
   - `git fetch origin <branch>`
   - `git merge FETCH_HEAD --no--ff`

- 合併衝突處理
   - `git reset --merge`

- 預設改用 __non-fast-forward__ 進行合併
   - `git config --local pull.ff false`

## git pull --ff-only

- 等同於下列命令
   - `git fetch origin <branch>`
   - `git merge FETCH_HEAD --ff-only`

- 合併衝突處裡 
  - `git reset --merge`
- 預設改用 __fast-forward only__ 進行合併
  - `git config --local pull.ff only`
  - `git config --global pull.ff only`


## git pull --rebase

- 等同於下列命令
   - `git fetch origin <branch>`
   - `git rebase FETCH_HEAD`

- 合併衝突處裡
   - `git rebase --abort`

- 預設改用 rebase 進行合併 
   - `git config --local pull.rebase true`

> fast forward 在　遠端　pull　下就是　default

## 分支合併重要觀念

- 合併時

   - 被修改的，永遠是當下 __工作目錄!__
   - 被修改的，永遠是目前 __正在使用的分支!__

- __合併成功，不代表程式可以正常編譯!!!!!!__


## git push 

- 等同於以下動作
   - 先上傳所有「物件」
   - 再更新遠端參考 ( 遠端分支 ) ( 變更遠端分支的指標 )
   - 如果遠端儲存庫無法 Fast Forward 就必須先 git pull 才可以繼續
   - 幾乎等同於在遠端對本地端執行 git pull --ff-only 命令
   
- 推送所有分支 
   - git push --all
   
- 推送所有標籤 
   - git push --tags

- 測試推送結果 
   - git push - n


## Git 協同作業實戰

### 1. 集中式版控流程
   - 優點
       - 共用儲存庫
       - 流程較容易理解 
       - 類似 SVN 的流程

![Imgur](https://i.imgur.com/wnrD70a.jpg)

<br/>

### 2. 整合管理版控流程

- `專案維護人員` 先推送一個版本到 __主要儲存庫 (唯讀共享)__

- **專案開發成員**則各自複製(fork)該儲存庫回去開發
   - 正常流程：先 fork 再 clone
   - 注意：fork 與 clone 是完全相同的行為！
- 專案開發成員推送變更到各自的共用儲存庫
- 專案開發成員通知專案維護人員要合併成員的變更
- `專案維護人員`添加成員的 __開發儲存庫__ 為 __遠端儲存庫__，並執行 __合併與整合__ 動作
- `專案維護成員`將合併後的變更推送回 __主要儲存庫__

![Imgur](https://i.imgur.com/yCx6PSb.jpg)


<br/>

### 3. 獨裁者與副手工作流程

- __專案開發成員__ 從`獨裁者`複製(clone)儲存庫回去
- __專案開發成員__ 基於`獨裁者`的 master 建立分支並開發，有任何變更都用 rebase 的 方式整合
   - __所有的變更__ 都一定在`獨裁者`的 master 後面完成 (所以獨裁)
   
- __副手__ 負責合併 __專案開發成員__ 的功能分支到 master 分支
- `獨裁者` 負責合併 __副手__ 的 master 分支到`獨裁者`的 master 分支
- `獨裁者`負責推送合併結果到 __共用儲存庫 (blessed repo__)， 好讓所有專案開發人員都能 透過這個共用儲存庫 執行 Rebase 任務！

- 備註：
   - 每個人都 fork 一份共用儲存庫


![Imgur](https://i.imgur.com/3Agwi5U.jpg)


## GitHub Flow

- [Github Flow](https://guides.github.com/introduction/flow/index.html){:target="_back"}

## 保哥 Git 影片大全！！！

- 認識 Git 資料結構中的物件資料庫與物件之間的關係 

<iframe  src="https://www.youtube.com/embed/PZbSRy_ow0U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- 認識 Git 資料結構中的索引與檔案狀態的變化關係

<iframe  src="https://www.youtube.com/embed/5c_7v0cIFk4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- 如何在 GitHub 使用 Fork / Pull Request 功能 (以 VS2013 為例)
<iframe src="https://www.youtube.com/embed/NTLAfy6lcdQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- 透過 Visual Studio 2013 匯入方案到 Git 儲存庫的正確做法 
<iframe src="https://www.youtube.com/embed/97BVjQyK8ag" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>