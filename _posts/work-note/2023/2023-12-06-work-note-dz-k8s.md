---
layout: "single"
title: "工作筆記:  想要開發然後開不了 結果亂開 亂關不熟的 K8S XDDD"
permalink: "work-note/dz-k8s-im-sorry"
tags: 工作筆記 k8s
---


> 故事是這樣的
>
> 我想晚上認真寫 CODE 
>
> 結果 staging 關掉沒法度測＆開發新的東西
>
> （本單位想認真節流ＸＤ）
>
> 啊我就自己 ＧＯＯＧＬＥ + GPT ＆ 看公司大神殘留的體味筆跡
>
> 然後我 自己 用 ＧＵＩ 開了 1 個 ｎｏｄｅ
>
> 成功後 看到原本 workloads 裏面死掉的 pods 一個一個活過來很興奮！
>
> 一瞬間的又心虛 lol...
>
> 就又把 node 設成 0

> 結果一直等 都沒顯示沒成功
>
> 去看 workload
>  
> 發現 [istiod](https://istio.io/latest/docs/ops/deployment/architecture/){:target="_back"} 有一隻 pod 還活著 
>
> 就狠狠的 砍掉他
>
> node 就成功設為 0 了 lol...
>
> 但不知道明天 staging 會不會時間到 正常開啟
>
> 就先來寫這篇 懺悔文 讓自己心安 
>
> 也列些 自己查到的東西 
>
> 以防被年尾砍掉後 警惕自己 學無止境 終身學習 啊悶


## 如何 cmd 到目標 cluster

1. 登入 gcp console
2. kubernetes engine
3. clusters
4. 點選你目標 cluster 
5. GUI 上面有 connect 點下去 權限夠就可以看到了

   - `gcloud container clusters get-credentials <<CLUSTER NAME>> --zone <<ZONE>> --project <<PROJECT ID>>`

## K8s 愛情小指令

- check pod and nod status

   - `kubectl get nodes`
   - `kubectl get pods`

- check all pod by namespaces
    
   - `kubectl get pods --all-namespaces`

- check Kubernetes Control Plane Components:
   
   - `kubectl get componentstatuses`
    
- get my current gcp cluster 

   - `gcloud container clusters describe <<cluster-name>> --zone <<ZONE>>`

- list gcp gke jobs

   - `gcloud scheduler jobs list --location=<<ZONE>>`
   
## 怎麼讓 cluster 睡著？ 我猜應該是用這個？ 明天問大神 或著等著被罵 ＸＤ
   
- [using a Cloud Scheduler to resize k8s nodes to ZERO!](https://cloud.google.com/scheduler/docs/schedule-run-cron-job)

- [Is there a way to resize a GKE cluster to 0 nodes after a certain amount of idle time?](https://stackoverflow.com/questions/58135974/is-there-a-way-to-resize-a-gke-cluster-to-0-nodes-after-a-certain-amount-of-idle)


> 明天太陽依舊東邊升起 晚安兒 !

