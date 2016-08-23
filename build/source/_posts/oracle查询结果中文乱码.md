---
title: oracle查询结果中文乱码
tags:
  - oracle
  - 乱码

date: 2016-08-22 12:22:00
categories: oracle
---
# 查询服务器端字符参数
```sql
select * from nls_database_parameters ;
```

```bash
SQL>  select * from nls_database_parameters ;

PARAMETER                      VALUE                                                                
------------------------------ ------------------------------                                       
NLS_LANGUAGE                   AMERICAN                                                             
NLS_TERRITORY                  AMERICA                                                              
NLS_CURRENCY                   $                                                                    
NLS_ISO_CURRENCY               AMERICA                                                              
NLS_NUMERIC_CHARACTERS         .,                                                                   
NLS_CHARACTERSET               ZHS16GBK                                                             
NLS_CALENDAR                   GREGORIAN                                                            
NLS_DATE_FORMAT                DD-MON-RR                                                            
NLS_DATE_LANGUAGE              AMERICAN                                                             
NLS_SORT                       BINARY                                                               
NLS_TIME_FORMAT                HH.MI.SSXFF AM                                                       

PARAMETER                      VALUE                                                                
------------------------------ ------------------------------                                       
NLS_TIMESTAMP_FORMAT           DD-MON-RR HH.MI.SSXFF AM                                             
NLS_TIME_TZ_FORMAT             HH.MI.SSXFF AM TZR                                                   
NLS_TIMESTAMP_TZ_FORMAT        DD-MON-RR HH.MI.SSXFF AM TZR                                         
NLS_DUAL_CURRENCY              $                                                                    
NLS_COMP                       BINARY                                                               
NLS_LENGTH_SEMANTICS           BYTE                                                                 
NLS_NCHAR_CONV_EXCP            FALSE                                                                
NLS_NCHAR_CHARACTERSET         AL16UTF16                                                            
NLS_RDBMS_VERSION              11.2.0.4.0                                                           

20 rows selected.

SQL> spool off

```
```sql
select userenv('language') from dual;
USERENV('LANGUAGE')
--------------------------------------------------------------
AMERICAN_AMERICA.ZHS16GBK
```

# 查看客户端参数
```sql
select * from nls_instance_parameters

```
```bash
PARAMETER		       VALUE
------------------------------ ------------------------------
NLS_LANGUAGE		       AMERICAN
NLS_TERRITORY		       AMERICA
NLS_SORT
NLS_DATE_LANGUAGE
NLS_DATE_FORMAT
NLS_CURRENCY
NLS_NUMERIC_CHARACTERS
NLS_ISO_CURRENCY
NLS_CALENDAR
NLS_TIME_FORMAT
NLS_TIMESTAMP_FORMAT

PARAMETER		       VALUE
------------------------------ ------------------------------
NLS_TIME_TZ_FORMAT
NLS_TIMESTAMP_TZ_FORMAT
NLS_DUAL_CURRENCY
NLS_COMP		       BINARY
NLS_LENGTH_SEMANTICS	       BYTE
NLS_NCHAR_CONV_EXCP	       FALSE

17 rows selected.

```
# NLS_LANG
影响oracle数据库字符集最重要的参数是NLS_LANG参数。

　　它的格式如下: 　　NLS_LANG = language_territory.charset

　　它有三个组成部分(语言、地域和字符集)，每个成分控制了NLS子集的特性。
其中:

　　Language 指定服务器消息的语言，territory 指定服务器的日期和数字格式，charset 指定字符集。如:AMERICAN _ AMERICA. ZHS16GBK

　　<code>从NLS_LANG的组成我们可以看出，真正影响数据库字符集的其实是第三部分。</code>

　　所以两个数据库之间的字符集只要第三部分一样就可以相互导入导出数据，前面影响的只是提示信息是中文还是英文。
# 设置oracle客户端编码

```bash
export NLS_LANG=AMERICAN_AMERICA.UTF8
```
# 字符集的包含关系
AMERICAN_AMERICA.UTF8 > AMERICAN_AMERICA.ZHS16GBK > ..

# 问题原因
客户端与服务端字符集不匹配
- oracel server端的字符集;
- 是oracle client端的字符集;
- dmp文件的字符集。
查看dmp文件的编码
```sql
select nls_charset_name(to_number('0354','xxxx')) from dual;
```
# 解决办法
客户端字符集 >= 服务端字符集
# 参考链接
[Oracle服务器和客户端字符集的查看和修改](http://soft.chinabyte.com/database/444/12618444.shtml)
