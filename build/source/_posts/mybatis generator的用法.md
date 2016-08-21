---
title: mybatis generator 的使用和问题
tags:
- mybatis
- generator
- SSM
categories: mybatis
---


# mybatis generator 自动生成代码

需要准备的jar包
```bash
        ├── generatorConfig.xml
        ├── mybatis-3.2.7.jar
        ├── mybatis-generator-core-1.3.2.jar
        ├── mysql-connector-java-5.1.30.jar
        └── src

```
配置文件如下：
```xml
    <?xml version="1.0" encoding="UTF-8"?>  
    <!DOCTYPE generatorConfiguration  
    PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"  
    "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">  
    <generatorConfiguration>  
    <!-- 数据库驱动-->  
        <classPathEntry  location="mysql-connector-java-5.1.30.jar"/>  
        <context id="DB2Tables"  targetRuntime="MyBatis3">  
            <commentGenerator>  
                <property name="suppressDate" value="true"/>  
                <!-- 是否去除自动生成的注释 true：是 ： false:否 -->  
                <property name="suppressAllComments" value="true"/>  
            </commentGenerator>  
            <!--数据库链接URL，用户名、密码 -->  
            <jdbcConnection driverClass="com.mysql.jdbc.Driver" connectionURL="jdbc:mysql://127.0.0.1/db_icp" userId="root" password="xxxx">  
            </jdbcConnection>  
            <javaTypeResolver>  
                <property name="forceBigDecimals" value="false"/>  
            </javaTypeResolver>  
            <!-- 生成模型的包名和位置-->  
            <javaModelGenerator targetPackage="com.hundsun.acm.model" targetProject="src">  
                <property name="enableSubPackages" value="true"/>  
                <property name="trimStrings" value="true"/>  
            </javaModelGenerator>  
            <!-- 生成映射文件的包名和位置-->  
            <sqlMapGenerator targetPackage="main.resources.mapping" targetProject="src">  
                <property name="enableSubPackages" value="true"/>  
            </sqlMapGenerator>  
            <!-- 生成DAO的包名和位置-->  
            <javaClientGenerator type="XMLMAPPER" targetPackage="com.hundsun.acm.dao" targetProject="src">  
                <property name="enableSubPackages" value="true"/>  
            </javaClientGenerator>  
            <!-- 要生成的表 tableName是数据库中的表名或视图名 domainObjectName是实体类名--> 
            <!--想要生成几个表，就写几个table标签-->
            <table tableName="zxxxb" domainObjectName="Zxxx" enableCountByExample="false" enableUpdateByExample="false" enableDeleteByExample="false" enableSelectByExample="false" selectByExampleQueryId="false"></table>
    </context>
    </generatorConfiguration>  
```
```bash
    #＃ -overwrite 是覆盖选项，如果第一次生成没必要加
    $java -jar mybatis-generator-core-1.3.2.jar -configfile generatorConfig.xml -overwrite
```

生成之后的目录结构
```bash

        ├── generatorConfig.xml
        ├── mybatis-3.2.7.jar
        ├── mybatis-generator-core-1.3.2.jar
        ├── mysql-connector-java-5.1.30.jar
        └── src
            ├── com
            │   └── hundsun
            │       └── acm
            │           ├── dao
            │           │   └── ZxxxMapper.java
            │           └── model
            │               ├── Zxxx.java
            │               └── ZxxxWithBLOBs.java
            └── main
                └── resources
                    └── mapping
                        └── ZxxxMapper.xml
```

# date类型映射错误

应该映射成　java.sql.Date
但是却映射成　java.util.Date

# jdbc type 和 javaType的映射关系

[apache官方链接](https://db.apache.org/ojb/docu/guides/jdbc-types.html)

JDBC是直接和数据库打交道的，因此类型基本与数据库类型一致


