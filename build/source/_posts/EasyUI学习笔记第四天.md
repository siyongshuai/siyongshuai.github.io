---
title: EasyUI学习笔记第四天
tags:
- 表单下拉
- 表格编辑时下拉
- 查询条件下拉
- datagrid
categories: javascript
---

# 要解决的问题

* 表格编辑时下拉

* 表单编辑时下拉

* 查询条件下拉

* 下拉的数据都来自于服务器

* 下拉的数据都来自于本地

* 表单加载时无法自动获取那些下拉框值

# 解决问题的办法
combobox组件

[combobox组件属性](http://www.jeasyui.net/plugins/169.html)

加载表单<code>之前</code>进行下拉框的初始化而不是<code>之后</code>再进行初始化

表单加载之后再进行下拉框的初始化，这时的下拉框是无值的

# 代码

## combobox远程数据
```javascript
$("#query_qxyId").combobox({
	    url: urlPrefix + '/qxy/get.do',
	    valueField:'qxyId',
	    textField:'mc'
	})
```
## combobox加载本地数据
```javascript
<input class="easyui-combobox" data-options="
		valueField: 'label',
		textField: 'value',
		data: [{
			label: 'java',
			value: 'Java'
		},{
			label: 'perl',
			value: 'Perl'
		},{
			label: 'ruby',
			value: 'Ruby'
		}]" />
```
## 表格编辑时下拉
```javascript
 {
    field : 'qxyId',
    title : '权限域',
    width : 100,
    align : 'left',
    editor : {
        type : 'combobox',
        options : {
            required : false,
            valueField: 'qxyId',
            textField:'mc',
            method:'get',
            url: urlPrefix + '/qxy/get.do',
            required:true
        }
    }
```
## 查询条件下来
```javascript
function getQueryCondition() {
    // 获取输入框的值只能通过name而不是id
	var query_qxyId = $("input[name='query_qxyId']").val()
	console.log("query_qxyId -------" + query_qxyId)
	var query_ptmc = $('#query_ptmc').val()
	var queryCondition = {}
	queryCondition.qxyId = query_qxyId
	queryCondition.ptmc = query_ptmc
	console.log(queryCondition)
	return queryCondition
}
```