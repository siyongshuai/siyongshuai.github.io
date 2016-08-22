---
title: oracle统计表的行数
tags:
  - oracle
  - pl/sql
  - sql
date: 2016-08-22 12:02:41
categories: oracle
---

# num_rows 统计每张表的行数
```sql
select
   table_name,
   num_rows counter
from
   user_tables
-- 从object 统计
   select
   object_name,
   num_rows counter
from
   USER_OBJECTS where object_type in ('TABLE','VIEW')

```
# pl/sql存储过程
```sql
DECLARE
val NUMBER;
BEGIN
FOR I IN (SELECT TABLE_NAME FROM USER_TABLES) LOOP
EXECUTE IMMEDIATE 'SELECT count(*) FROM ' || i.table_name INTO val;
DBMS_OUTPUT.PUT_LINE(i.table_name || ' ==> ' || val );
END LOOP;
END;
/

```

# 找出非空表
```sql
--找出空表/非空表
select table_name, NUM_ROWS from user_tables t where t.NUM_ROWS > 0
```
