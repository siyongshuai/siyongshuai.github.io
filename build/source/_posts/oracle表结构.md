---
title: oracle表结构
tags:
  - oracle
  - sql
  - 表结构
date: 2016-08-22 12:12:57
categories: oracle
---
# 获取用户表结构
```sql
select dbms_metadata.get_ddl(u.object_type,u.object_name) from user_objects u where u.object_type in('TABLE','SEQUENCE','TRIGGER');
```
