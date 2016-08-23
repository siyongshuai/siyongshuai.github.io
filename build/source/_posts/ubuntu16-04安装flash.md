---
title: ubuntu16.04安装flash
tags:
  - ubuntu
  - flash
date: 2016-08-22 14:02:29
categories: ubuntu
---
# 启用第三方软件源

![开启第三方软件源](http://7xs1xb.com1.z0.glb.clouddn.com/2016-08-22%E5%90%AF%E7%94%A8%E7%AC%AC%E4%B8%89%E6%96%B9%E8%BD%AF%E4%BB%B6%E6%BA%90.png)
# 安装插件
```bash
sudo apt-get install adobe-flashplugin
sudo apt-get install pepperflashplugin-nonfree
```
# 配置chromium
sudo update-pepperflashplugin-nonfree --install
If this doesn’t work you may need to manually configure it. With Chromium fully closed/exited, run the following command in a Terminal to launch the appropriate file in a text editor:
```bash
sudo gedit /etc/chromium-browser/default
#Add the following line at the end on a new line:
. /usr/lib/pepflashplugin-installer/pepflashplayer.sh
# Save — it’s easy to forget to do that — and then close. Re-open this page in Chromium an
```
