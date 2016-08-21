---
title: linux wireshark 权限问题
tags:
- wireshark
- archLinux
- linux
- 权限问题
categories: http
---
# 背景知识
最近需要分析一些http 报文里面的一些细节问题，比如post是如何携带数据传递给后台的

需要安装wireshark 来分析报文

```bash
    sudo pacman -S wireshark-gtk
```
# 遇到的问题　

## 无法显示网卡列表　/usr/bin/dumpcap子进程启动失败

更改当前执行用户的权限即可

可以更改用户的用户组

```bash
sudo usermod -aG wireshark currentUserName
```
也可以直接用chmod更改程序的权限

```bash
 sudo chmod u+x  /usr/bin/dumpcap
```


## 选中相应网卡后提示没有权限

第一种解决办法
```bash
 setcap 'CAP_NET_RAW+eip CAP_NET_ADMIN+eip' /usr/sbin/dumpcap
```
### 参数简要解释

eip是将chown的能力以cap_effective(e),cap_inheritable(i),cap_permitted(p)三种位图的方式授权给相关的程序文件.

CAP_NET_RAW 13 (允许使用原始(raw)套接字)
   
CAP_NET_ADMIN 12 允许执行网络管理任务：接口、防火墙和路由等.

普通用户不能创建新的网络接口(interface),不能更改ip地址,而CAP_NET_ADMIN可以帮助普通用户完成这项工作
   
   
原始套接字编程可以接收到本机网卡上的数据帧或者数据包,对监控网络流量和分析是很有作用的.



[wireshark 官方wiki 权限问题](https://wiki.wireshark.org/CaptureSetup/CapturePrivileges)

[ Linux的capability深入分析](http://blog.csdn.net/wangpengqi/article/details/9821231)

第二种解决办法
```bash
 chown root /usr/bin/dumpcap
 
 chmod u+s /usr/bin/dumpcap
 
 ```