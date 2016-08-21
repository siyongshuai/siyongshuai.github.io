---
title: hexo 遇到的问题
tags: 
- FAQ 
- hexo
categories: hexo
---

# 参考文档

[github+hexo搭建独立博客](http://wsgzao.github.io/post/hexo-guide/)
#＃　淘宝的npm源无法安装成功，标准的可以
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
$ npm install hexo-cli -g
$ npm install hexo --save
```
本想加快速度,但却安装失败

# hexo 常用插件汇总
```bash
$ npm install hexo-generator-index --save
$ npm install hexo-generator-archive --save
$ npm install hexo-generator-category --save
$ npm install hexo-generator-tag --save
$ npm install hexo-server --save
$ npm install hexo-deployer-git --save
$ npm install hexo-deployer-heroku --save
$ npm install hexo-deployer-rsync --save
$ npm install hexo-deployer-openshift --save
$ npm install hexo-renderer-marked@0.2 --save
$ npm install hexo-renderer-stylus@0.2 --save
$ npm install hexo-generator-feed@1 --save
$ npm install hexo-generator-sitemap@1 --save
```
# markdown 语法基本问题
## 如何使用标签和目录
标准写法参照本文档开头部分

## 空格是重要的分隔符
tags 后'-'之后要有空格，否则无法识别标签
_config.yml 每一个配置项后面要有空格
# 如何为hexo的常用变量赋值
title: 标题名
# hexo 是如何解析变量的？

```bash
---
变量名： 值
title： 文章名
categories: 目录名
tags: tag4
tags:
- tag1
- tag2
- tag3

---
```


