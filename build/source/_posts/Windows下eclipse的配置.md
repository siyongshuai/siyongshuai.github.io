---
title: windows 下eclipse的配置
tags:
- eclipse
- windows 
- tomcat
- java
categories: eclipse
---
# 更改文件编码为UTF-8（java，jsp,其他文件）
```bash
window --> preference --> general-->workspace (other file)
window --> preference --> general-->content types(java)
window --> preference --> web --> (html,css,jsp)
```
# 配置自己安装的JDK Maven Tomcat
```bash
installed jre(jdk)
maven --> installations 
自定义配置 maven --> user settings

##tomcat 和eclipse关联
server -- > runtime enviroments
```
# 更改Eclipse下Tomcat的部署目录
关联好tomcat后，打开servers视图，新建一个服务器，不要点击next直接点finish。

如果点next会提示你直接发布项目，一旦发布项目，这个服务器的部署目录便无法更改。

项目的默认目录会在  ....\workspace\.metadata\.plugins\org.eclipse.wst.server.core\

选中服务器，右键open,这样便可以配置tomcat部署目录，一般选择第二个.

![eclipse-tomcat部署路径配置](http://7xs1xb.com1.z0.glb.clouddn.com/20160316-eclipse-tomcat.png)
