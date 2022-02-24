---
layout: "single"
title: "Study Group: 久違的讀書會~~~ 一定要來區塊一下的拉!"
permalink: "stydeGroup/kaboom-js"
tags: 讀書會 block-chain
---

# [直接快樂筆記](https://hackmd.io/@Winnie/BkW6iCmlq){:target="_back"}
 
 - [Ethereum Node 下載](https://geth.ethereum.org/downloads/){:target="_back"}


# [blockchain demo](https://guggero.github.io/blockchain-demo/#!/blockchain){:target="_back"}

- Merkle Tree

   - 一種 Binary Tree 用以紀錄交易紀錄

- Transaction
   - 1. Tx is propagated and validated by network nodes.
   - 2. Miners include the tx into next block
   - 3. Mining...  
   - 4. new block os propagated.

- Transaction
   - Tx 要成立需要有人把自己的 Tx 納入 block 裡面才行
   - 經過了幾次的 Block 迭代 才會被視為有效 (6次以上 的confirm), 因此一般交易都需要等10 分鐘以上
   - 為什麼別人要選自己的 Tx ?
      - Ethereum Gas

- Proof of Work

  - PoW 其實是一個很複雜的猜數字遊戲    

    - 給定以下參數 求出 Hash Value
    - SHA256(Version, hashPrevBlock, hashMerkleRoot, Timestamp.... Nonce) <= __Target__

- BlockChain

   - 公有鍊
      - 比特幣, 以太坊, Solan (DPoS)
      -  
   - 私有練
      - 個人中心化的鏈
   - 聯盟鏈
      - 很多人餐與的私有鏈
   - 測鏈 (SideChain)
      - Two-way Pegging

- Wallet
   
   - Hot Wallet
   - Cold Wallet       

- BlockChain Summary
   
   - 講白了就是一個分散式資料庫 改變了以往的資料存存格式 並有以下特性
     - 去中心化
     - 不可串改
     - 共識

 
## workshop 1
###### tags: `blockchain`

### 1. install geth
首先使用 Geth 來安裝 Ethereum Node

windows 安裝

https://geth.ethereum.org/downloads/

Mac 安裝

```
$ brew tap ethereum/ethereum

$ brew install ethereum
```

檢查是否安裝成功 
```
$ geth -h
```

### 2. create directory structure
建立一資料夾，隨意取名，「myPrivateChain」，cd 進資料夾

### 3. create a genesis configuration
建立創世區塊的參數用檔案，檔案取名為 `genesis.json`
```json=
{
  "config": {
    "chainID": 123456,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "nonce": "0x0000000000000042",
  "difficulty": "0x020",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "timestamp": "0x00",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x2fefd8",
  "alloc": {
    "0x0000000000000000000000000000000000000001": {
      "balance": "11111111111"
    },
    "0x0000000000000000000000000000000000000002": {
      "balance": "22222222222"
    }
  }
}
```
參數介紹


| 參數 | 介紹 | 
| -------- | -------- | 
| chainID     |  chainID 漢 networkid 一樣由 EIP 155 提供 chainid values 的建議來代稱不同的網路．只有當 networkid 及 chainID、創世區塊的配置都相同時，才是同一條鏈 | 
|nounce | 用於挖礦的 64bits 隨機數，與 pow 機制有關 |
|difficulty|定義了每次挖礦時，最終確定 nonce 的難度 |
|mixhash|與 nonce 配合用於挖礦，由上一個區塊的部分產生雜湊值|
|coinbase|預設為第一個建立挖礦的礦工|
|timestamp|創世區塊的時間戳|
|parentHash|指定了本區塊的上一個區塊 hash，因此創世區塊的parenthash 為 0|
|gasLimit|規定該區塊鏈中，交易使用的 gas 上限，某種程度上是規定區塊中能包含交易信息量的總和|
|alloc|可以從創世塊塊預設帳號及帳號內的金額，單位是 wei 不是 eth|

> gas 是合約進行交易時的手續費，當我們傳送一些指令給 Ethereum Virtual Machine(EVM) 來進行互動時就會消耗一定量的 gas

### 4. initial the genesis.json
初始化，輸入以下指令來建立初始區塊
```
$ geth --datadir data init genesis.json
```

`--datadir data`: 使區塊儲存於 data 資料夾

### 5. start your blockchain!
啟動私有鏈
```
$ geth --datadir data --networkid 123456 console
```

networkid 就是剛剛 genesis.json 中設置的 chainID

|測試網| nerwork|
|----|----|
|Oympic testnet|0|
|Ethereum Mainnet(frontier)|1|
|Ethereum's Morden testnet|2|
|Ropsten testnet|3|
|Rinkeby|4|
|Kovan|42|


### 6. Attach javascript console
在這個交互式的 javascript 的執行環境中，內置了一些用來操作以太坊的 javascript 對象，可以直接使用
|||
|-----|-----|
|eth|操作區塊鏈|
|net|查看 P2P 網路狀態|
|miner|啟動&停止挖礦|
|personal|管理帳戶|
|txpool|查看 transaction pool|
|web3|包含以上對象，以及換算單位的方法|

### 7. management the private Chain
查看所有帳號

```c
> eth.accounts
```

查看節點資訊

```c
>  admin.nodeInfo
```
建立新帳戶，其中的字串為預設密碼

```c
> personal.newAccount("6666")
```

查看帳號存款

```c
> eth.getBalance("Ox........")
// 也可以用陣列取值
> eth.getBalance(eth.accounts[0])
    
```

查看礦工帳號，系統預設礦工帳號為第一個帳號

```c
> eth.coinbase
```

### 8. Transfer Ether
解鎖帳號．每次進行交易都需要解鎖帳號
```c
> personal.unlockAccount(eth.accounts[0])
```

之後出現的 `passphrase` 就是輸入密碼

發送交易

```c
> amount = web3.toWei(1, 'ether')
"1000000000000000000"
> eth.sendTransaction({from: eth.account[0], to: eth.account[1], value: amount})
```

如果匯出的帳號沒錢就會出錯誤！
`Error: insufficient funds for transfer`

### 9. Mining Time
可以使用以下指令來更改礦工帳號，這樣挖礦就會轉到對應的帳號

```c
> miner.setEtherbase(eth.account[1])
```

開始挖礦，start 裡的數字是 cpu 使用數

```c
> miner.start(1)

> miner.stop()
```

再回來看帳戶有有多少錢

```c
> eth.getBalance(eth.accounts[1])
```

unlock 帳號 1 後再次進行交易

```c
> eth.sendTransaction({from: eth.account[1], to: eth.account[0], value: amount})
```

查看 txpool，此時可以發現有一條 pending 的交易，代表已提交但還未被處理的交易

```c
> txpool

// 或直接查看狀態
> txpool.status
{
  pending: 1,
  queued: 0
}
```
要讓交易被處理就要挖礦啦～

### 補充
直接下 geth 會同步主網的資料
```c
$ geth 
```

### Private Chain 連結其他 Node

兩個 Node 是分開的，並不知道彼此的存在
```c
Node 1 > admin.peers
[]

Node 2 > admin.peers
[]
```

查看 blockNumber：
```c
Node 1 > eth.blockNumber
16

Node 2 > eth.blockNumber
0
```
我們會發現 Node 1 有 16 個區塊了，但 Node 2 還沒有任何區塊。我們在 Node 1 取得 Node 的位址相關資訊：
```c
Node 1 > admin.nodeInfo.enode
"enode://cf2d54937d2e7ee080e69ecde67352837fd8230482fea2cc34ec756e2f36c10608d2cdbb66f7788c84a0069c162f043fa1f660a942dddf8fcdf9d74de87061b4@[::]:30303"
```
將 [::] 改成 Node 1 的 Private IP，然後在 Node 2 加入這個 Peer：

```c
Node 2 > cadmin.addPeer("enode://cf2d54937d2e7ee080e69ecde67352837fd8230482fea2cc34ec756e2f36c10608d2cdbb66f7788c84a0069c162f043fa1f660a942dddf8fcdf9d74de87061b4@172.31.22.132:30303")
```

之後我們查看：

```c
Node 1 > eth.blockNumber
16

Node 2 > eth.blockNumber
16
```


### [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnk){:target="_back"}

- 測試 & 可以玩的唷~~

### 智能合約 Contract

- Solidity

   - C++, Javascript like language
   - 高階程式語言 (非常聰明)
   - 運行在 Ethereum 上面
   - 透過 EVM 為他編譯與執行

- Contract

   - 合約上鏈以後基本上就無法再被更改
     - ByteCode 就被寫在那邊了...
     - 不可串改

   - 更版
      - 使用 Proxy Contract oooo 讓合約做更動


### [OpenZeppelin 隨便產代幣](https://docs.openzeppelin.com/contracts/4.x/wizard){:target="_back"}
   - 合約 NFT: ERC721

### [Remix IDE](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js)


### [IPFS](https://ipfs.io/){:target="_back"}
   
### [OpenSea](https://opensea.io/){:target="_back"}
   -  Discover, collect, and sell extraordinary NFTs