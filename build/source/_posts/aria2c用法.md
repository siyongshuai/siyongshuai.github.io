---
title: aria2c用法
tags:
  - aria2c
  - linux
  - 多线程下载
date: 2016-08-21 19:48:09
categories: linux
---
# 安装aria2c
```bash
sudo apt-get install aria2 # aria2c是aria2里面的一个子程序
```

# aria2c 下载实例

```bash

aria2c http://AAA.BBB.CCC/file.zip   #普通下载
aria2c -s 8 http://AAA.BBB.CCC/file.zip  #开8个线程下载
aria2c http://AAA.BBB.CCC/file.zip ftp://DDD.EEE.FFF/GGG/file.zip  #从不同的地址下载同一文件
aria2c http://AAA.BBB.CCC/file.zip ftp://DDD.EEE.FFF/GGG/file.zip  #支持不同的协议下载同一文件
aria2c -o test.torrent http://AAA.BBB.CCC/file.torrent  #下载BT种子
aria2c --max-upload-limit 40K -T file.torrent  #设定BT最大上传速度
aria2c http://AAA.BBB.CCC/file.metalink   #从metalink下载文件


#注：https下载依赖于安装gnu tls或openssl
#    bt下载依赖于安装gnu tls+libgcrypt或openssl
#    metalink下载依赖于安装libxml2
```
