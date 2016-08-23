---
title: vim删除匹配行
tags:
  - vim
  - 匹配行
date: 2016-08-22 14:13:10
categories: vim
---
# 删除包含特定字符的行
```bash
:g/pattern/d   
 ```

# 删除不包含指定字符的行
```sql

:v/pattern/d
:g!/pattern/d
 ```


# 删除指定行
:x,.d #从ｘ行删除到当前行；
:.,xd #从当前行删除到x行；
:x,.+3d #从x行删除到当前行后第三行；
:x,.-1d #从x行删除到当前行前一行。
