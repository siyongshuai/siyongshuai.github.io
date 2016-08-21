---
title: git无父分支
tags:
  - git
  - 无父分支
  - linux
date: 2016-08-21 18:16:55
categories: git
---
# 创建无父分支
```bash
  git checkout --orphan version2 #创建分支时会继承父分支已经commit过里面的文件
```
# 删除继承过来的东西
```bash
  git rm -rf . #删除继承过来的对象
```
# 添加新的对象
```bash
  git add .
```
# 提交新的对象
```bash
  git commit -m "version2 commit "
```
# 应用场景
## 每个分支管理不同的产品
## 一个分支管理博客静态代码，一个分支管理源码
