---
title: EasyUI学习笔记第一天
tags:
- easyui
- datagrid
- 内嵌json
- 数据渲染
categories: javascript
---


# 学习背景
前两个星期用springMVC和mybatis写运维配置管理系统的后台,

增删改查全部使用json作为数据交换的标准

现在需要用easyUI来实现前后台的对接

easyui背景知识：

同事用easyui实现了简单的样式和静态页面，我需要用datagrid来渲染后台返回的数据，

后台返回的是具有内嵌对象的json数组

比如：
<code>[{"ptId":2,"qxyId":2,"ptmc":"期货资管云４","ywzfzrId":3,"ywbgId":4,"qysj":"2016-03-16","zt":"已启用","jcpt":"阿里云","ptdz":"杭州","ptyt":null,"pttp":null,"bz":"备注２","qxy":{"qxyId":2,"mc":"经济云"},"zg":{"ryId":null,"xm":"陈磊","gw":null},"bg":{"ryId":null,"xm":"谭俊","gw":null},"ywList":[{"ywId":null,"ywmc":"恒生估值2.0","ptId":2,"bbh":null,"bz":null}]}]</code>
#  需要解决的问题
* datagrid加载远程数据


* datagrid 显示内嵌的json数据


# 解决思路和方法
## datagrid 关于数据的属性

<table class="table table-striped table-bordered">
    <tr>
        <th align="left">名称</th>
        <th align="left">类型</th>
        <th align="left">描述</th>
        <th align="left">默认值</th>
    </tr>
    <tr>
        <td>method</td>
        <td>string</td>
        <td>请求远程数据的方法（method）类型。</td>
        <td>post</td>
    </tr>
    <tr>
        <td>url</td>
        <td>string</td>
        <td>从远程站点请求数据的 URL。</td>
        <td>null</td>
    </tr>
    <tr>
        <td>queryParams</td>
        <td>object</td>
        <td>当请求远程数据时，发送的额外参数。
            <br> 代码实例： <pre class="prettyprint linenums">
$('#dg').datagrid({
	queryParams: {
		name: 'easyui',
		subject: 'datagrid'
	}
});
</pre> </td>
        <td>{}</td>
    </tr>
    <tr>
        <td>data</td>
        <td>array,object</td>
        <td>要加载的数据。该属性自版本 1.3.2 起可用。
            <br> 代码实例： <pre class="prettyprint linenums">
$('#dg').datagrid({
	data: [
		{f1:'value11', f2:'value12'},
		{f1:'value21', f2:'value22'}
	]
});
</pre> </td>
        <td>null</td>
    </tr>
    <tr>

        <td>loader</td>
        <td>function</td>
        <td>定义如何从远程服务器加载数据。返回 false 则取消该动作。该函数有下列参数：
            <br> param：要传递到远程服务器的参数对象。
            <br> success(data)：当检索数据成功时调用的回调函数。
            <br> error()：当检索数据失败时调用的回调函数。
            <br> </td>
        <td>json loader</td>
    </tr>
</table>

后台接收的类型必须是序列化后的json,而且请求方式必须是post，但是datagrid的<code>queryParams</code>的形式是一个对象，json对象，而不是字符串

不管datagrid选项中有没有<code>queryParams</code>,后面跟<code>{}</code>或者<code>JSON.stringify({})</code>

都是报415错误

[queryParams后面跟JSON.stringify({})](http://7xs1xb.com1.z0.glb.clouddn.com/2016-04-02-JSON.stringify%28%7B%7D%29.png)

[queryParams后面跟{}或者无queryParams](http://7xs1xb.com1.z0.glb.clouddn.com/2016-04-02-%7B%7D.png)

解决方法：用ajax请求数据，将请求后的数据作为datagrid的本地数据

```javascript
    $.ajax({
            type:"post", 
            url:urlPrefix + '/pt/query.do', 
            dataType:"json",      
            contentType:"application/json;charset=UTF-8",               
            data:JSON.stringify(queryCondition), 
            success: function(data){
            //  执行datagrid
            // 其中数据配置为data:data
            *****
            }
            error:function(data){
            }
        
```
@RequestBody要求必须有参数
[EasyUI中文官网文档](http://www.jeasyui.net/plugins/183.html)

## js 是如何访问嵌套的json的？下面是在node中实现的
```javascript
shuai@localhost ~ % node  
    > var a = {}
    undefined
    > a.name = 'siyongshuai'
    'siyongshuai'
    > var b = {}
    undefined
    > b.a = a
    { name: 'siyongshuai' }
    > b.a.name
    'siyongshuai'
    // 后台返回的数据是复杂的数组
    var d= [{"ptId":2,"qxyId":2,"ptmc":"期货资管云４","ywzfzrId":3,"ywbgId":4,"qysj":"2016-03-16","zt":"已启用","jcpt":"阿里云","ptdz":"杭州","ptyt":null,"pttp":null,"bz":"备注２","qxy":{"qxyId":2,"mc":"经济云"},"zg":{"ryId":null,"xm":"陈磊","gw":null},"bg":{"ryId":null,"xm":"谭俊","gw":null},"ywList":[{"ywId":null,"ywmc":"恒生估值2.0","ptId":2,"bbh":null,"bz":null}]}]
    undefined
 

    > d.zg.xm
    // TypeError: Cannot read property 'xm' of undefined
    // at repl:1:5
    // at REPLServer.defaultEval (repl.js:260:27)
    // at bound (domain.js:287:14)
    // at REPLServer.runBound [as eval] (domain.js:300:12)
    // at REPLServer.<anonymous> (repl.js:429:12)
    // at emitOne (events.js:95:20)
    // at REPLServer.emit (events.js:182:7)
    // at REPLServer.Interface._onLine (readline.js:211:10)
    // at REPLServer.Interface._line (readline.js:550:8)
    // at REPLServer.Interface._ttyWrite (readline.js:827:14)
    
    // 按照数组的方式访问是可以的
    > d[0].zg.xm
    '陈磊'
    　　　　　　　　　　　　　　
    
    > var e ={"ptId":2,"qxyId":2,"ptmc":"期货资管云４","ywzfzrId":3,"ywbgId":4,"qysj":"2016-03-16","zt":"已启用","jcpt":"阿里云","ptdz":"杭州","ptyt":null,"pttp":null,"bz":"备注２","qxy":{"qxyId":2,"mc":"经济云"},"zg":{"ryId":null,"xm":"陈磊","gw":null},"bg":{"ryId":null,"xm":"谭俊","gw":null},"ywList":[{"ywId":null,"ywmc":"恒生估值2.0","ptId":2,"bbh":null,"bz":null}]}
    undefined
    > e.ptmc
    '期货资管云４'
    > e.zg.xm
    '陈磊'
    > 

```
datagrid 操作json的方式，一级属性可通过下面的配置直接访问
```javascript
{
        field : 'ywbgId',
        title : '运维备岗',
        width : 200,
        align : 'center',
        editor : {
            type : 'validatebox',
            options : {
                required : false
            }
        }
    }
```
若把<code>filed</code>filed换成<code>bg.xm</code>
仍然什么都不显示
正确的解决方案是利用EasyUI,datagrid的formatter属性，根据formatter的参数可以看出它内部仍然是通过数组直接访问的
```javascript
 {      
     
        field : 'ywbgId',
        title : '运维备岗',
        width : 200,
        align : 'center',
        editor : {
            type : 'validatebox',
            options : {
                required : false
            }
        },

       formatter : function(value, row, index) {
        					if (row.zg) {
        						return row.zg.xm;
        					} else {
        						return value;
        					}

        				}
      }
```



贴一下平台管理模块控制层（controller）代码

```java
    package com.hundsun.acm.controller;
    import java.util.List;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestMethod;
    import org.springframework.web.bind.annotation.ResponseBody;

    import com.hundsun.acm.model.Pt;
    import com.hundsun.acm.service.impl.PtServiceImpl;
    @Controller
    @RequestMapping("manage_page")
    public class PtController {

        @Autowired
        private PtServiceImpl ptService;

        @RequestMapping(value = "/pt/get.do")
        public @ResponseBody List<Pt> get() {
            Pt pt = new Pt();
            return ptService.getPtByCondition(pt);

        }
        @RequestMapping(value = "/pt/query.do")
        public @ResponseBody List<Pt> getPtByName(@RequestBody Pt condition) {
            try {
                return ptService.getPtByCondition(condition);
            } catch (Exception e) {
                System.out.println("查询××××××××××平台信息×××××××××发生异常");
                return null;
            }

        }

        @RequestMapping(value = "/pt/update", method = RequestMethod.POST)
        public @ResponseBody String updatePt(@RequestBody Pt record) {
            try {
                int flag = ptService.updateById(record);
                if (flag == 1) {
                    return "success";
                } else {
                    return "error";
                }
            } catch (Exception e) {
                System.out.println("更新××××××××××平台信息×××××××××发生异常");
                return null;
            }

        }

        @RequestMapping(value = "/pt/add.do")
        public @ResponseBody String addPt(@RequestBody Pt record) {

            try {
                int flag = this.ptService.add(record);
                if (flag == 1) {
                    return "success";
                } else {
                    return "error";
                }
            } catch (Exception e) {
                System.out.println("增加××××××××××平台信息×××××××××发生异常");
                return null;
            }
        }

        @RequestMapping(value = "/pt/delete.do", method = RequestMethod.POST)
        public @ResponseBody String deletePtByConditon(@RequestBody Pt record) {
            try {
                int flag = this.ptService.deleteById(record);
                if (flag == 1) {
                    return "success";
                } else {
                    return "error";
                }
            } catch (Exception e) {
                System.out.println("删除××××××××××平台信息×××××××××发生异常");
                return null;
            }

        }

    }
```
