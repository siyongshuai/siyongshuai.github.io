---
title: 数据库执行sql脚本
tags: 
- sql
- 数据库
- MySQL
categories: 数据库
---
# mysql终端执行sql脚本
```bash
mysql -u root -p 
mysql> use test;
source d:\test.sql;
```
# oracle 终端执行sql脚本
```bash
sqlplus test_username/test_password@orcl
@d:\test.sql
```

