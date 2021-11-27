---
layout: "single"
title: 'Study Group: 凡哥出品 品質保證 linux'
permalink: 'stydeGroup/linux-edit'
tags: 讀書會 linux
---


- docker __~靠北~ 太久沒用了!!!__

    -  `docker container run -it --name centos centos bash`

- 編輯

   - 離開: `:wq`


- 尋找

   - less 找部分

      - `find ~ | less`
      - `less file = cat file | less`


- sort 

    - ls -lh `數字變成人可讀的模式`

~~~
[root@9a29ec77125a /]# ls -lh
total 48K
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  360 Jun 11 12:55 dev
drwxr-xr-x   1 root root 4.0K Jun 11 12:55 etc
drwxr-xr-x   2 root root 4.0K May 11  2019 home
lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64
drwx------   2 root root 4.0K Sep 27  2019 lost+found
drwxr-xr-x   2 root root 4.0K May 11  2019 media
drwxr-xr-x   2 root root 4.0K May 11  2019 mnt
drwxr-xr-x   2 root root 4.0K May 11  2019 opt
dr-xr-xr-x 124 root root    0 Jun 11 12:55 proc
dr-xr-x---   2 root root 4.0K Sep 27  2019 root
drwxr-xr-x  11 root root 4.0K Sep 27  2019 run
lrwxrwxrwx   1 root root    8 May 11  2019 sbin -> usr/sbin
drwxr-xr-x   2 root root 4.0K May 11  2019 srv
dr-xr-xr-x  12 root root    0 Jun 11 12:55 sys
drwxrwxrwt   7 root root 4.0K Sep 27  2019 tmp
drwxr-xr-x  12 root root 4.0K Sep 27  2019 usr
drwxr-xr-x  20 root root 4.0K Sep 27  2019 var
~~~

- `-n` 排序

~~~
[root@9a29ec77125a /]# ls -lh | -n
bash: -n: command not found
[root@9a29ec77125a /]# ls -lh | sort -n
dr-xr-x---   2 root root 4.0K Sep 27  2019 root
dr-xr-xr-x  12 root root    0 Jun 11 12:56 sys
dr-xr-xr-x 125 root root    0 Jun 11 12:55 proc
drwx------   2 root root 4.0K Sep 27  2019 lost+found
drwxr-xr-x   1 root root 4.0K Jun 11 12:55 etc
drwxr-xr-x   2 root root 4.0K May 11  2019 home
drwxr-xr-x   2 root root 4.0K May 11  2019 media
drwxr-xr-x   2 root root 4.0K May 11  2019 mnt
drwxr-xr-x   2 root root 4.0K May 11  2019 opt
drwxr-xr-x   2 root root 4.0K May 11  2019 srv
drwxr-xr-x   5 root root  360 Jun 11 12:55 dev
drwxr-xr-x  11 root root 4.0K Sep 27  2019 run
drwxr-xr-x  12 root root 4.0K Sep 27  2019 usr
drwxr-xr-x  20 root root 4.0K Sep 27  2019 var
drwxrwxrwt   7 root root 4.0K Sep 27  2019 tmp
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
lrwxrwxrwx   1 root root    8 May 11  2019 sbin -> usr/sbin
lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64
total 48K
~~~


### GREP

- 搜尋關鍵字

   - grep 

      - -i: case insensitive
      - -c: line count
      - -v: invert match

   - ex:

       `netstat -vanp tcp | grep 3000`

   - ex:

      ~~~
      [root@9a29ec77125a /]# ls /etc | grep host
      host.conf
      hostname
      hosts
      hosts.allow
      hosts.deny
      ~~~


### 練習 

- 透過 grep 尋找 /etc 目錄下 檔名有 host 的檔案
- 透過 grep 尋找 /etc 目錄下包含 sys 的檔案與目錄
- 透過 grep 尋找 /etc 目錄下包含 sys 的檔案(不含目錄 可嘗試 LS-lF /etc 觀察)


~~~
[root@9a29ec77125a /]# ls /etc | grep host -i
host.conf
hostname
hosts
hosts.allow
hosts.deny

[root@9a29ec77125a /]# ls /etc | grep sys -i
filesystems
sysconfig
sysctl.conf
sysctl.d
system-release
system-release-cpe
systemd
~~~

- `ls -F /etc`

~~~
[root@9a29ec77125a /]# ls -F /etc
BUILDTIME                environment  krb5.conf.d/              passwd-          services
GREP_COLORS              ethertypes   ld.so.cache               pkcs11/          shadow
NetworkManager/          exports      ld.so.conf                pki/             shadow-
X11/                     filesystems  ld.so.conf.d/             pm/              shells
adjtime                  gcrypt/      libaudit.conf             popt.d/          skel/
aliases                  gnupg/       libreport/                printcap         ssl/
alternatives/            group        locale.conf               profile          subgid
bash_completion.d/       group-       localtime@                profile.d/       subuid
bashrc                   gshadow      login.defs                protocols        sysconfig/
bindresvport.blacklist   gshadow-     logrotate.d/              rc.d/            sysctl.conf
binfmt.d/                gss/         machine-id                rc.local@        sysctl.d/
centos-release           host.conf    makedumpfile.conf.sample  rc0.d@           system-release@
centos-release-upstream  hostname     modprobe.d/               rc1.d@           system-release-cpe
chkconfig.d/             hosts        modules-load.d/           rc2.d@           systemd/
crypto-policies/         hosts.allow  motd                      rc3.d@           terminfo/
crypttab                 hosts.deny   mtab@                     rc4.d@           tmpfiles.d/
csh.cshrc                init.d@      netconfig                 rc5.d@           udev/
csh.login                inittab      networks                  rc6.d@           vconsole.conf
dbus-1/                  inputrc      nsswitch.conf             redhat-release@  virc
default/                 iproute2/    nsswitch.conf.bak         resolv.conf      xattr.conf
depmod.d/                issue        openldap/                 rpc              xdg/
dhcp/                    issue.net    opt/                      rpm/             xinetd.d/
dnf/                     kdump.conf   os-release                sasl2/           yum/
dracut.conf              kernel/      pam.d/                    security/        yum.conf@
dracut.conf.d/           krb5.conf    passwd                    selinux/         yum.repos.d/
[root@9a29ec77125a /]# ls -F /etc
BUILDTIME                environment  krb5.conf.d/              passwd-          services
GREP_COLORS              ethertypes   ld.so.cache               pkcs11/          shadow
NetworkManager/          exports      ld.so.conf                pki/             shadow-
X11/                     filesystems  ld.so.conf.d/             pm/              shells
adjtime                  gcrypt/      libaudit.conf             popt.d/          skel/
aliases                  gnupg/       libreport/                printcap         ssl/
alternatives/            group        locale.conf               profile          subgid
bash_completion.d/       group-       localtime@                profile.d/       subuid
bashrc                   gshadow      login.defs                protocols        sysconfig/
bindresvport.blacklist   gshadow-     logrotate.d/              rc.d/            sysctl.conf
binfmt.d/                gss/         machine-id                rc.local@        sysctl.d/
centos-release           host.conf    makedumpfile.conf.sample  rc0.d@           system-release@
centos-release-upstream  hostname     modprobe.d/               rc1.d@           system-release-cpe
chkconfig.d/             hosts        modules-load.d/           rc2.d@           systemd/
crypto-policies/         hosts.allow  motd                      rc3.d@           terminfo/
crypttab                 hosts.deny   mtab@                     rc4.d@           tmpfiles.d/
csh.cshrc                init.d@      netconfig                 rc5.d@           udev/
csh.login                inittab      networks                  rc6.d@           vconsole.conf
dbus-1/                  inputrc      nsswitch.conf             redhat-release@  virc
default/                 iproute2/    nsswitch.conf.bak         resolv.conf      xattr.conf
depmod.d/                issue        openldap/                 rpc              xdg/
dhcp/                    issue.net    opt/                      rpm/             xinetd.d/
dnf/                     kdump.conf   os-release                sasl2/           yum/
dracut.conf              kernel/      pam.d/                    security/        yum.conf@
dracut.conf.d/           krb5.conf    passwd                    selinux/         yum.repos.d/
~~~


- ` ls -F /etc | grep /`

~~~
[root@9a29ec77125a /]# ls -F /etc | grep /
NetworkManager/
X11/
alternatives/
bash_completion.d/
binfmt.d/
chkconfig.d/
crypto-policies/
dbus-1/
default/
depmod.d/
dhcp/
dnf/
dracut.conf.d/
gcrypt/
gnupg/
gss/
iproute2/
kernel/
krb5.conf.d/
ld.so.conf.d/
libreport/
logrotate.d/
modprobe.d/
modules-load.d/
openldap/
opt/
pam.d/
pkcs11/
pki/
pm/
popt.d/
profile.d/
rc.d/
rpm/
sasl2/
security/
selinux/
skel/
ssl/
sysconfig/
sysctl.d/
systemd/
terminfo/
tmpfiles.d/
udev/
xdg/
xinetd.d/
yum/
yum.repos.d/
~~~


-  `ls -F /etc | grep / -v`


~~~
[root@9a29ec77125a /]# ls -F /etc | grep / -v
BUILDTIME
GREP_COLORS
adjtime
aliases
bashrc
bindresvport.blacklist
centos-release
centos-release-upstream
crypttab
csh.cshrc
csh.login
dracut.conf
environment
ethertypes
exports
filesystems
group
group-
gshadow
gshadow-
host.conf
hostname
hosts
hosts.allow
hosts.deny
init.d@
inittab
inputrc
issue
issue.net
kdump.conf
krb5.conf
ld.so.cache
ld.so.conf
libaudit.conf
locale.conf
localtime@
login.defs
machine-id
makedumpfile.conf.sample
motd
mtab@
netconfig
networks
nsswitch.conf
nsswitch.conf.bak
os-release
passwd
passwd-
printcap
profile
protocols
rc.local@
rc0.d@
rc1.d@
rc2.d@
rc3.d@
rc4.d@
rc5.d@
rc6.d@
redhat-release@
resolv.conf
rpc
services
shadow
shadow-
shells
subgid
subuid
sysctl.conf
system-release@
system-release-cpe
vconsole.conf
virc
xattr.conf
yum.conf@
~~~


### Archive 封裝 打包

- tar [option] archivedFile srcFiles

    - `-c: create`
    - `-x: extract`
    - `-t: list contents of an archive`
        - `tar tf tarFileaName`
    - `-v: verbosely list files processed`
    - `-f: 打包後的檔案名稱`

    - ___tar 不會壓縮檔案___


- tar 解封檔案

    - tar -xvf tarFile


### 壓縮


- gzip: faster but less compression

    - gzip tarfile
    - gunzip gzFile

- bzip2: more compression and more compression time 

    - bzip2 file
    - bunzip file


### 編輯

- gzip
   
    - `tar -cvfz file.tar.gz srcFiles`
    - `tar -xvfz file.tar.gz`

- bzip2

    - `tar -cvfj file.tar.bz2 srcFiles`
    - `tar -xvfj file.tar.bz2`
    
![Imgur](https://i.imgur.com/JapC484.jpg)


## BASH!!!!!!!!!!!!!

- which bash 
    - 可找出 此系統 run bash 的路徑

    - type 
    ~~~
       [root@9a29ec77125a tarbir]# type bash
       bash is /usr/bin/bash 
    ~~~

![Imgur](https://i.imgur.com/25K9RIW.jpg)
![Imgur](https://i.imgur.com/c5hArrv.jpg)


- bash scrip.sh

- `dd:` 可直接刪除一整行~  __感謝 學姊的支援~~~__

- 讓他有執行的權限

   - chmod 766 file 

~~~
[root@9a29ec77125a tarbir]# chmod 700 script.sh
[root@9a29ec77125a tarbir]# ls -l
total 20
-rwx------ 1 root root    29 Jun 11 13:54 script.sh
-rw-r--r-- 1 root root 10240 Jun 11 13:28 test.tar
-rw-r--r-- 1 root root    34 Jun 11 13:21 test.txt
[root@9a29ec77125a tarbir]# ./script.sh
Hello World
~~~


### 看 $PATH

~~~
[root@9a29ec77125a tarbir]# type bash
bash is hashed (/usr/bin/bash)
[root@9a29ec77125a tarbir]# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
~~~

## 新增 設定路徑

- 在 .bashrc 下

    - `alias alias_name="command_to_run"`


## CRON 

- 可定期執行指令或程式

    - crontab -e 開啟編輯畫面

    - `m h dom mon dow command`
    
    - 前五個是時間 
        - m 整點的分
        - h 小時
        - dom 每個月的哪一天 (day of month 1 ~ 31)
        - mon JAN RFB MAR...
        - dow day of week, SUN, MON, TUE...


    - 指定時間 (m)

        - `*` -> 任意時間
        - 0,15,30 -> 每0, 15, 30分執行
        - */5 -> 每五分鐘執行
        - 0/5 -> 從0開始每五分鐘執行
        - 0-15 -> 區間


### Crontab guru

- [https://crontab.guru/](https://crontab.guru/){:target="_back"}


- `*/5 5 2 * SUN`

    - “At every 5th minute past hour 5 on day-of-month 2 and on Sunday.”


![Imgur](https://i.imgur.com/rvdDsBh.jpg)
![Imgur](https://i.imgur.com/sAO6qm2.jpg)


## 懶人排程產生器

- [https://crontab-generator.org/](https://crontab-generator.org/){:target="_back"}



## Forgetting curve 

- [https://en.wikipedia.org/wiki/Forgetting_curve](https://en.wikipedia.org/wiki/Forgetting_curve){:target="_back"}