---
title: EasyUI学习笔记第五天
tags:
- 分页
- datagrid
- sql
- 关联查询
categories: javascript
---

# 要解决的问题

* easyUI分页

* 根据从表来模糊查询主表中的记录

# 解决问题的思路

## easyUI分页

easyUI 分页时需要的标准数据
[total:"",rows:{}]


## 根据从表来模糊查询主表中的记录
mybatis　只能接收一个参数

前台通过输入字表中的字段来模糊查询主表中的内容

 平台客户表(ptkhb) 中存储了客户表(khb)的id

根据客户的名称来模糊查询平台客户表中的内容
 
把查询条件封装成一个复杂的json

<code>前台将查询条件封装成一个与实体模型关系匹配的json对象</code>
```javascript
var khmc = $('query_name')
var kh ={}
kh.khmc = khmc
var queryCondition  = {}
queryCondition.kh = kh
// 关联查询时模型中已经进行关联

```
<code>Mybatis　ognl表达式体现出了强大的作用</code>
```xml
<if　test="kh.getKhmc()!=null">
and b.khmc like '%' #{kh.khmc,jdbcType=VARCHAR}
```

# 代码

## 分页的实现

```javascript
function pagerFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function'){    // 判断数据是否是数组
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
//    	pageSize: 10,//每页显示的记录条数，默认为10 
        pageList: [5,10,15,20],//可以设置每页记录条数的列表 
//        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录', 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录', 
        onSelectPage:function(pageNum, pageSize){
            
        	opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}
$.ajax({
		 type:"post", 
         url:urlPrefix + '/pt/query.do', 
         dataType:"json",      
         contentType:"application/json;charset=UTF-8",               
         data:JSON.stringify(queryCondition), 
         success: function(data){

        	 $('#dg').datagrid({loadFilter:pagerFilter}).datagrid('loadData', data);
             $('#dg').datagrid(options)
         }
         error:function(){
         }
})
```