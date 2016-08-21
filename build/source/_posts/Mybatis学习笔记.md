---
title: Mybatis学习笔记
tags: 
- mybatis 
- 学习笔记
categories: java
---

# mybatis 的基本组织方式
核心配置文件
sqlxml文件

# mybatis新颖的地方
- 将sql独立成xml文件，将这种方式作为唯一处理sql的方式，将sql作为独立的一部分。
- 支持接口编程，dao层无需实现（但不许遵循mybatis接口编程的规范）

# sql语句支持ognl表达式
- 可直接调用java对象的方法
- where set sql ... 极大的增加了sql的灵活性和功能性
- 灵活的日志框架
# 控制台调试Mybatis
[mybatis中文文档-日志说明](http://www.mybatis.org/mybatis-3/zh/logging.html)

- 独立mybatis的话，核心配置文件，配置日志的接口
```xml
    <configuration>
    <settings>
        ...
        <setting name="logImpl" value="LOG4J"/>
        ...
    </settings>
    </configuration>
```
log4j.properties文件的配置
```java
    log4j.rootLogger=DEBUG,Console
    log4j.appender.Console=org.apache.log4j.ConsoleAppender
    log4j.appender.Console.layout=org.apache.log4j.PatternLayout
    log4j.appender.Console.layout.ConversionPattern=%d [%t] %-5p [%c] - %m%n
    log4j.logger.org.apache=INFO
```


- 如果要跟spring结合的话,在web.xml添加log4j的相关参数
```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="http://java.sun.com/xml/ns/javaee" xmlns:web="http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
        xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
        id="WebApp_ID" version="2.5">
        <!--log4j参数部分-->
        <context-param>
            <param-name>log4jConfigLocation</param-name>
            <param-value>classpath:log4j.properties</param-value>
        </context-param>
        <context-param>
            <param-name>log4jExposeWebAppRoot</param-name>
            <param-value>true</param-value>
        </context-param>
        <context-param>
            <param-name>log4jRefreshInterval</param-name>
            <param-value>10000</param-value>
        </context-param>
        <!--log4j监听器-->
        <listener>
		<listener-class>
			org.springframework.web.util.Log4jConfigListener
		</listener-class>
	</listener>
   </web-app>
```
