---
layout: "single"
title: '自架 JupyterHub 安裝 helm & 透過 helm 安裝 JupyterHub'
permalink: 'ai-side-project/jupyter-hub-install'
tags: ai-side-project jupyter-hub k8s helm
---

>  我都是抄 [Zero to JupyterHub with Kubernetes](https://zero-to-jupyterhub.readthedocs.io/en/latest/){:target="_back"}　ＸＤＤ


## [Setup k8s & helm](https://zero-to-jupyterhub.readthedocs.io/en/latest/kubernetes/index.html){:target="_back"}

   - k8s 
      - [docker desktop](https://www.docker.com/products/docker-desktop){:target="_back"} 解決
   - [helm](https://helm.sh/docs/intro/install/#from-homebrew-macos){:target="_back"}
      - [mac](https://helm.sh/docs/intro/install/#from-homebrew-macos){:target="_back"}
         - `brew install helm`
      - [windows](https://helm.sh/docs/intro/install/#from-chocolatey-windows){:target="_back"}
         - [choco](https://chocolatey.org/){:target="_back"}
            - install choco
               
                 ```
                  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
                 ```
            - `choco install kubernetes-helm`
        

## [Set JupyterHub](https://zero-to-jupyterhub.readthedocs.io/en/latest/jupyterhub/index.html){:target="_back"}

> 看 jupyterhub helm chart version: **[JupyterHub's Helm chart repository](https://jupyterhub.github.io/helm-chart/)**

   - [Initialize a Helm chart configuration file](https://zero-to-jupyterhub.readthedocs.io/en/latest/jupyterhub/installation.html#initialize-a-helm-chart-configuration-file){:target="_back"}

      - *1. 讓 你電腦的 helm 知道你要安裝 [JupyterHub Helm chart repository](https://jupyterhub.github.io/helm-chart/)  
         ```
           helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
           helm repo update
         ```

      - *2. 安裝 helm 的 chart install jupyterhub/jupyterhub

          - 官方這樣寫
             
             ~~~xml
                helm upgrade --cleanup-on-fail \
                 --install <helm-release-name> jupyterhub/jupyterhub \
                 --namespace <k8s-namespace> \
                 --create-namespace \
                 --version=<chart-version> \
                 --values config.yaml
             ~~~

             - `<helm-release-name>` 你自己可以亂取 helm release name

             - `<k8s-namespace>` 你自己可以亂取 k8s namespace

             - `<chart-version>` [Helm chart](https://jupyterhub.github.io/helm-chart/){:target="_back"} 版本,不是 jupyterHub 的唷!
        

        ```
          helm upgrade --cleanup-on-fail --install jub1 jupyterhub/jupyterhub --namespace jhub --create-namespace --version=1.2.0 --values config.yaml
        ```

         ~~~

          PS E:\yuting-project\ai-side-project\yuting-jupyter-hub> helm upgrade --cleanup-on-fail --install jub1 jupyterhub/jupyterhub --namespace jhub --create-namespace --version=1.2.0 --values config.yaml
          Release "jub1" does not exist. Installing it now.
          NAME: jub1
          LAST DEPLOYED: Fri Jan 14 09:53:25 2022
          NAMESPACE: jhub
          STATUS: deployed
          REVISION: 1
          TEST SUITE: None
          NOTES:
          Thank you for installing JupyterHub!
          
          Your release is named "jub1" and installed into the namespace "jhub".
          
          You can check whether the hub and proxy are ready by running:
          
           kubectl --namespace=jhub get pod
          
          and watching for both those pods to be in status 'Running'.
          
          You can find the public (load-balancer) IP of JupyterHub by running:
          
            kubectl -n jhub get svc proxy-public -o jsonpath='{.status.loadBalancer.ingress[].ip}'
          
          It might take a few minutes for it to appear!
          
          To get full information about the JupyterHub proxy service run:
          
            kubectl --namespace=jhub get svc proxy-public
          
          If you have questions, please:
          
            1. Read the guide at https://z2jh.jupyter.org
            2. Ask for help or chat to us on https://discourse.jupyter.org/
            3. If you find a bug please report it at https://github.com/jupyterhub/zero-to-jupyterhub-k8s/issues

         ~~~

      - *3 看有沒有成功跑起來

        - `kubectl get service --namespace <<k8s-namespace>>`

         ![Imgur](https://i.imgur.com/iqyRCSz.png)

        - 看 proxy-public 那項 打 EXTERNAL-IP 那個項目 看看有愛情的登入畫面~~ 有的畫就成功拉

         ![Imgur](https://i.imgur.com/zCT2P2Q.png)


## 學習後記

1. 搞懂 整個 jupyterhub 在 k8s 裡面的機制和樣子
    - service 
    - pod
    - 玩了一堆 [要砍 pod](https://www.codegrepper.com/code-examples/whatever/kubectl+delete+all+from+namespace){:target="_back"}
      - `kubectl delete all --all -n {namespace}`
2. 畫出來 :) 更有學習的感覺!
3. 好爽~~



## Reference

- [Installing JupyterHub¶
](https://zero-to-jupyterhub.readthedocs.io/en/latest/jupyterhub/installation.html#initialize-a-helm-chart-configuration-file)