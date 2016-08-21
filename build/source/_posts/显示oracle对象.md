---
title: 显示oracle对象
tags:
  - oracle
  - display
date: 2016-08-21 20:00:09
categories: oracle
---
# dba,all,user三种级别
```sql
select view_name from dba_views
--for all accessible views (accessible by logged user)

select view_name from all_views

--for views owned by logged user

select view_name from user_views

--for views owned by current logged user

SELECT view_name, owner
FROM sys.all_views
ORDER BY owner, view_name
```
# 通过OBJECTS查找
```sql
--USER_OBJECTS:
SELECT *
  FROM USER_OBJECTS
 WHERE object_type = 'PROCEDURE'
   AND object_name = 'MY_STORED_PROCEDURE'
```
# 查找包源码
```sql
--查找包
 SELECT *
    FROM all_source
   WHERE TYPE = 'PACKAGE BODY' AND name = '<your package name>'
ORDER BY line;

--查找包源码
SELECT line, text
FROM dba_source
WHERE owner = ?
  AND name = ?
  AND type = 'PROCEDURE'
ORDER BY line


```
# 查找视图源码
```sql
--查找视图源码
SELECT view_name, text FROM user_views;
```
