---
title: linux终端图形化输出git提交历史
tags:
  - git
  - 终端
date: 2016-08-21 19:40:55
categories: git
---
# 添加别名到主shell 配置文件
```bash
alias git-graph='git log --graph --full-history --all --color \
        --pretty=format:"%x1b[31m%h%x09%x1b[32m%d%x1b[0m%x20%s"'
        ➜  haha git:(sius) ✗ git-graph
        * 1b37051        (HEAD -> sius) hehhef
        * 9c519ea        this is siys branch
        * 6f4c647        (source) source branch added
        * f0628d5        (master) master 分支添加
```
