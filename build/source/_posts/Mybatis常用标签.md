---
title: Mybatis 常用标签
tags:
- mybatis
- SSM
- sql
categories: mybatis
---
```
<selelct id="" resultMap="" parameterType="">
selelct * from MESSAGE
    <where>
        <if test="">
        and COMMAND =#{commonad}
        </if>
        <if test="">
        and DESCRIPTION
        </if>
    </where>
</selelct>
```
where 标签的作用：
如果条件都不满足的话可执行空条件查询
![Mybatis-tags](http://7xs1xb.com1.z0.glb.clouddn.com/20160316-Mybatis-tags.png)