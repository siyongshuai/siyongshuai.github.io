---
title: sqlplus格式化输出
tags:
  - sqlplus
  - 格式化输出
date: 2016-08-22 12:34:08
categories: oracle
---
# 设置列宽
在sqlplus执行sql时，经常碰到显示结果，跨行输出，致使可读性很差，看起来特别乱。可通过set linesize及column命令进行调整。
set linesize 设置sqlplus输出的最大行宽
column 这个命令很好用，可使用此命修改显示字段的长度或名称，如：
```sql
     column c1 format a20           --将列c1（字符型）显示最大宽度调整为20个字符
     column c1 format 9999999  --将列c1（num型）显示最大宽度调整为7个字符
     column c1 heading c2       --将c1的列名输出为c2
```
实际操作：
```sql
--列宽前要加a或A
SQL> col parameter format a30
SQL> col value format a30
SQL> set linesize 100
SQL>  select * from nls_database_parameters ;
```
# 永久生效
可以在$ORACLE_HOME/sqlplus/admin/glogin.sql 里把常用的都设置好，这样就不用每次都设定了
