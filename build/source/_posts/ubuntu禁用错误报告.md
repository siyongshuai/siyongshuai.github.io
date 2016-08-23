---
title: ubuntu禁用错误报告
tags:
  - linux
  - ubuntu
date: 2016-08-22 13:57:20
categories: ubuntu
---
# 16.04
sudo gedit /etc/default/apport

或者

sudo systemctl stop apport.service

# 14.04
sudo gedit /etc/default/apport

或者

sudo service apport stop
