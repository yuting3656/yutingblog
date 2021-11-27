---
layout: "single"
title: 'Study Group: 一姊出品 品質保證 網際網路' 
permalink: 'stydeGroup/pon-what-is-internet'
tags: 讀書會
---


## Wires, cables, and WiFi | Internet 101 | 

<iframe src="https://www.youtube.com/embed/iV-YqG70wbQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 網路基礎篇

[一姊出品](https://pengpon.github.io/web/2020/03/10/what-is-the-Internet.html){:target="_back"}

## 甚麼是網路?

- 把世界各地的電腦串聯再一起 
- 1970 冷戰開始，建立通訊系統


## 訊息傳輸

8 bits = 1 Bytes

1024 Bytes = 1 KB

1024 KB = 1 MB

## 訊號: 類比 & 數位訊號

- 類比: 大自然一切的訊號

## 頻寬 [Bandwidth](https://www.webopedia.com/TERM/B/bandwidth.html){:target="_back"}

- Bandwidth: 可以傳遞訊號的頻率範圍 / 訊號佔據的頻帶寬度

- For 類比訊號: 頻寬以Hz為單位 EX:3100Hz~3500Hz

- For 數位訊號: 頻寬指傳輸裝置最大的傳輸資料量(bitrate)，單位時間內可以傳送的二進位數據量,通常以秒為單位(bit per second, bps)

- 另一個測量速度單位是延遲時間(latecncy),傳送一位元所花的時間

- ex:

   - 下載一首3MB的歌花3秒鐘，或是8Mbps，每秒鐘可以傳送800萬個位元資料!

![img](https://i.imgur.com/kQUmow0.jpg)

## 靠甚麼傳送訊息

- 電力

   - 實體網路線 (約1000m, 訊號就會遺失或被干擾)

- 光

   - 光速(~300,000,000 m/s)前進
   - [海底電纜](https://www.storm.mg/article/1524745){:target="_back"}


- wireless 無線電波來傳遞

   - 必須把一堆0,1訊號傳成無線電波的不同頻率
   - [sound](https://en.wikipedia.org/wiki/Sound){:target="_back"}

- 傳輸比較

![img](https://i.imgur.com/4kG4FKD.jpg)


## 網路通訊協定

- 讓各個 `傳輸/接收` 方 可以順利的傳輸訊號


## [Open Systems Interconnection - OSI](https://www.webopedia.com/quick_ref/OSI_Layers.asp){:target="_back"}

![img](https://www.webopedia.com/imagesvr_ce/8023/7-layers-of-osi-icon.jpg)

![img](https://i.imgur.com/aZGg0RF.jpg)

|Layer | 內容|
|Physical Layer|網路最終需要透過媒體傳遞訊號，例如: 規範的內容包含了纜線的規格、傳輸速度，以及資料傳輸的電壓值，用來確保訊號可以在多種物理媒介上傳輸|
|Data Link Layer|	資料連結層將實體層的數位訊號封裝成一組符合邏輯傳輸資料，這組訊號稱為資料訊框（Data Frame）。訊框內包含媒體存取控制（Media Access Control，MAC）位址。而資料在傳輸時，這項位址資訊可讓對方主機辨識資料來源。|
|Network Layer|	這一層中最主要的通訊協定是網際網路協定（Internet Protocol，IP），資料在傳輸時，該協定將IP位址加入傳輸資料內，並把資料組成封包（Packet）。在網路上傳輸時，封包裡面的IP位址會告訴網路設備這筆資料的來源及目的地。|
|Transport Layer|	可以將一個較大的資料切割成多個適合傳輸的資料，替模型頂端的第五、六、七等三個通訊層提供流量管制及錯誤控制傳輸控制協定（Transmission Control Protocol，TCP）是我們常接觸具有傳輸層功能的協定，它在傳輸資料內加入驗證碼，當對方收到後，就會依這個驗證碼，回傳對應的確認訊息（ACK），若對方未及時傳回確認訊息，資料就會重新傳遞一次，以確保資料傳輸的完整性。|
|Session Layer|	負責建立網路連線，等到資料傳輸結束時，再將連線中斷|
|Presentation Layer|應用層收到的資料後，透過展示層可轉換表達方式，例如將ASCII編碼轉成應用層可以使用的資料，或是處理圖片及其他多媒體檔案，如JPGE圖片檔或MIDI音效檔除了轉檔，有時候當資料透過網路傳輸時，需要將內容予以加密或解密，而這個工作就是在展示層中處理|
|Application Layer|	使用者常見的通訊協定，有DHCP（Dynamic Host Configuration Protocol）、FTP（File Transfer Protocol）、HTTP（HyperText Transfer Protocol）及POP3（Post Office Protocol-Version 3）等，依據不同的網路服務方式，這些協定能定義各自的功能及使用規範等細部規則。|



---
---
---

## TCP & UDP

- [Transmission Control Protocol (TCP):](https://en.wikipedia.org/wiki/Transmission_Control_Protocol){:target="_back"} The Transmission Control Protocol (TCP) is one of the main protocols of the Internet protocol suite. It originated in the initial network implementation in which it complemented the Internet Protocol (IP). Therefore, the entire suite is commonly referred to as TCP/IP. TCP provides reliable, ordered, and error-checked delivery of a stream of octets (bytes) between applications running on hosts communicating via an IP network. Major internet applications such as the World Wide Web, email, remote administration, and file transfer rely on TCP, which is part of the Transport Layer of the TCP/IP suite. SSL/TLS often runs on top of TCP.

- [User Datagram Protocol (UDP):](https://en.wikipedia.org/wiki/User_Datagram_Protocol){:target="_back"} In computer networking, the User Datagram Protocol (UDP) is one of the core members of the Internet protocol suite. The protocol was designed by David P. Reed in 1980 and formally defined in RFC 768. With UDP, computer applications can send messages, in this case referred to as datagrams, to other hosts on an Internet Protocol (IP) network. Prior communications are not required in order to set up communication channels or data paths.

## [About UDP and TCP protocl between simotion and PLC?](https://support.industry.siemens.com/tf//WW/en/posts/about-udp-and-tcp-protocl-between-simotion-and-plc/17305?page=0&pageSize=10){:target="_back"}



## 不同的 Model

![img](https://i.imgur.com/8mtJ5Hs.jpg)

## DSL, Cable, Fiber

  - ADSL,用一般銅質傳統電話線來進行高速上網
  - 光纖(optical fiber)用光線在導線內反射傳送訊號 可以大量 衰減較慢 訊號穩定 不受電磁波干擾只要機房到家裡/公司中有一段是使用光纖就稱為光纖上網, 其他段用比ADSL快的VDSL電話線傳輸
  - CABLE是使用有線電視的纜線作為傳輸的載體 價格便宜適中

## IP 位址組成

- 0.0.0.0 ~ 255.255.255.255

- IP 位置是以 32 Bits 的二進位數字來表示
   
   - ~~~
       11001011   01001010   11001101    01101111
           |          |          |          |
        8 Bits     8 Bits      8 Bits      8 Bits
   ~~~

- `203.74.205.111`


- IPv4 and IPv6

   - IPv4 的 IP 位址由 32 Bits 組成，約有 2^32 = 4294967296 (約 43 億個) 雖然大，但[一定會有被使用光的一天](https://technews.tw/2019/11/27/the-ripe-ncc-has-run-out-of-ipv4-addresses/){:target="_back"}

   - IPv6 (第6版的IP)，由 128 Bits 組成， 2^128 = 3.4028237e+38 恩！　很好慢慢用吧　ＸＤＤＤ


- IP 位址的結構

   - IP: __Network ID__ +  __Host ID__

      - ex:
   　　　
         ~~~
            11001011     01001010     11001101        01101111
            <---------  Network ID  --------->    <--- Host ID --->
                          網路位址　　　　　　　　　　　　主機位址
         ~~~

   - 網路位址 (Network ID)
      - 網路位址位於 IP 位址的前端，可用來辨識所屬的網路。當組成或企業申請 __IP__ 位址時，所分配到的通常並非零散的 __IP__ 位址，而是取得一個獨一獨二，用來識別的網路位址。同一個網路上的所有裝置，都會有相同的網路位址。 __IP__ 路由便是依據 __IP__ 位址的網路位址，決定要將 __IP__ 封包送至哪一個網路。

   - 主機位址 ( Host ID)
      - 主機位址位於 __IP__ 位址的後段，可用來識別網路上個別的裝置。同一個網路上的裝置都會有相同的網路位址，而各裝置之間則是以主機位址來區別。

   - ex: 

      ~~~
       ex1:
         網路位址: 24 Bits
         主機位址: 8 Bits
         在此網路位址下有 2^8 = 256 主機位址可運用，可分配給 256 裝置使用。
       ==========================================
       ex2:
         網路位址: 16 Bits
         主機位址: 16 Bits
         在此網路位址下有 2^16 = 65536 主機位址可運用，可分配給 65536 裝置使用。
      ~~~

   - 3 種常見的位址等級
      - Class A、B、C

         - Class A: ![Imgur](https://i.imgur.com/eX9ze8u.jpg)

         - Class B: ![Imgur](https://i.imgur.com/e9kB9Km.jpg)

         - Class C: ![Imgur](https://i.imgur.com/vvJem0i.jpg)

    
      - ![Imgur](https://i.imgur.com/uRwhOWw.jpg)


   - Subnet

      - ... 恩自己看書好了　ＸＤＤＤ　掰～


- 資料來源: 

   - [最新網路概論2012 旗標-施威銘研究室](https://goods.ruten.com.tw/item/show?21309236642783){:target="_back"}