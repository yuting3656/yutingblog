---
layout: 'post'
title: 'daily Programming:  AWS (EC2) + Docker'
permalink: 'daily-programming/aws-ec2-wiht-docker'
tags: daily-programming aws docker angular 讀書會
---

> 2019 最後一天 !  YA~~~ ~~發大財~~ gogo~~~

> 有夢最美，希望相隨~ 明年一定是個好年兒~~~ :heart::heart::heart::heart::heart:


## Create an AWS Account step by step 貼心如我～

#### 註冊流程

- 註冊步驟
   - setp 1. 創建帳號
   - step 2. 輸入註冊資料
     - 手機要輸入正確
   - step 3. 輸入信用卡資料
      - __一定要輸入__，不用擔心，12個月Free 帳號完全不會扣款!!! 明年到期前解除就好
   - step 4. 身分驗證

<br/>

- step 1. 創建帳號
   - 快樂前往 [AWS](https://aws.amazon.com/){:target="_back"}
   - 輸入 email, password 

   - |![Imgur](https://i.imgur.com/z1BbCBa.jpg)|
   - |![Imgur](https://i.imgur.com/lTJGVYM.jpg)|

- step 2. 註冊資料
   - Account type:
      - Personal
   - Phone Number:
      - 一定要填 __正確的__ ，註冊最後一步驟會驗證你的手機！
   - 地址　[中轉英文](https://www.post.gov.tw/post/internet/Postal/index.jsp?ID=207){:target="_back"}
      - EX: 
         - |![Imgur](https://i.imgur.com/MfEBhv2.jpg)|

   - |![Imgur](https://i.imgur.com/5JTxaFI.jpg)|![Imgur](https://i.imgur.com/n5iIWrl.jpg)|


- step 3. 信用卡資料

   - 不用擔心～　放心輸入卡號～　只是先預存，他沒跟你拿後三碼所以穩的啦！

   - ![Imgur](https://i.imgur.com/YsujbxL.jpg)
   

- step 4. 身分驗證

  - ![Imgur](https://i.imgur.com/ItIQno6.jpg)


> 好先這樣　預祝大家 2020 新年快樂～　一起 ~~~發大財~~~



## Run 一個 EC2 Instance

> 直接來看[這篇](https://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/){:target="_back"}

- 重點節錄

   - 登入 [AWS](https://aws.amazon.com/){:target="_back"}

   - Build a solutino: Launch a VM

      - |![Imgur](https://i.imgur.com/xbNUIB1.jpg)|
      
   - select Amzaon Linux AMI

      - |![Imgur](https://i.imgur.com/t6U79Jf.jpg)|

   - choose an Instance Type 
      - 唯一指名免費　`FREE`

      - |![Imgur](https://i.imgur.com/WfpLR8q.jpg)|

   - Review Instance Launch

      - |![Imgur](https://i.imgur.com/oInaR92.jpg)|

   - select: `create a new key pair`

      - 下拉選單選擇 `create a new key pair`
      - 輸入 key pair name
         - 建議打　`my-ec2-key-pair`
         - 你問我為什麼？　喔！　~~~我談的是大海，你跟我說漱口杯~~~　因為我也是抄來的 ＸＤＤ
         - 直覺跟我說一定可以自己命名，只是官方這樣寫大家都照舊ＸＤＤＤ
      - 下載到本機，等等連接要用！
         - __注意__ 要記得 __下載！！__
         - __注意__ 只能下載一次，取消的話名字要更改！

      - |![Imgur](https://i.imgur.com/A5ycdp1.jpg)|![Imgur](https://i.imgur.com/sT3qET1.jpg)|

   - 成功

      - |![Imgur](https://i.imgur.com/3lGgKSG.jpg)|

- Run .pem file
   - cd 到剛剛下載的 pem 目錄
   - cmd
      - `ssh -i <my-ec2-key-pair>.pem ec2-user@<EC2-INSTANCE-PUBLIC-IP-ADDRESS>`
      - 唯二要改的 `<EC2-INSTANCE-PUBLIC-IP-ADDRESS>`　and `<key-pair-name>` 你剛剛下載自己命名的
         - |![Imgur](https://i.imgur.com/iotaqlJ.jpg)|
      - 其他請照打
         - 沒錯你跟我想的一樣: `ec2-user@` 請打這個不要改成自己的名字！！！！！

- 成功連線到 AWS EC2

   - ![Imgur](https://i.imgur.com/a3lL7rr.jpg)

恩～　很好！　都跑成功了嗎～　鳩咪 :whale::whale::whale:

> ＸＤＤＤＤＤＤＤＤＤＤ

## 採雷研究院 :satisfied: :scream: :stuck_out_tongue_winking_eye: :flushed: :laughing:

- Windows SSh

   - [https://www.howtogeek.com/336775/how-to-enable-and-use-windows-10s-built-in-ssh-commands/](https://www.howtogeek.com/336775/how-to-enable-and-use-windows-10s-built-in-ssh-commands/){:target="_back"}


- AWS CLI version 1

   - [Linux](https://docs.aws.amazon.com/cli/latest/userguide/install-linux.html){:target="_back"}
   - [maxOS](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html){:target="_back"}
   - [Windows](https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html){:target="_back"}

- permissions are too open 

   - windows 
      - [https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open](https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open){:target="_back"}

   - 我最後本機的樣子
       
      - |![Imgur](https://i.imgur.com/jiPxtay.jpg)|

## 實作一下吧

1. Yuting Angular

   - Dokcerfile
      
      - ~~~dockerfile
        # step 1
        FROM node:latest as node
        WORKDIR /app
        COPY . .
        RUN npm install
        RUN npm run build --prod
        
        # step 2
        FROM nginx:alpine
        COPY --from=node /app/dist/angualr-docker-image1 /usr/share/nginx/html
      ~~~
   
   - 抓我精心設計的 docker ang`luar` image XDDD 
   
      - `docker container run --rm -p 80:80 tim23656/yuting-angluar`
   
   - 連到你的 AWS Public DNS 看~ 有沒有可愛小鯨魚在跳動~
   
   - 移除 `docker stop <container-id>`
      
      - 可透過 `docker container ls` 看 running container 
   
2. ROCKET.CHAT

   - 官方 [Docker Hub](https://hub.docker.com/_/rocket-chat){:target="_back"}
   
   - install 主要 __2__ 步驟
   
      - step 1:
         - `docker run --name db -d mongo:4.0 --smallfiles --replSet rs0 --oplogSize 128`
   
         - `docker exec -ti db mongo --eval "printjson(rs.initiate())"`
   
      - step 2:
   
         - `docker run --name rocketchat -p 80:3000 --link db --env ROOT_URL=http://localhost --env MONGO_OPLOG_URL=mongodb://db:27017/local -d rocket.chat`
   
   - 快樂聊天吧!