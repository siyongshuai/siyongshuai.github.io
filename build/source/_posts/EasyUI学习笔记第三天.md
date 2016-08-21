---
title: EasyUI学习笔记第三天
tags:
- easyui
- datagrid
categories: javascript
---
# 要解决的问题
表单式增加，更改和查看详细信息
将表单序列化成json

# 遇到的问题
* 弹出表单 
* 新增和更改公用一个表单
* 编辑表单时自动填充已有字段
* 表格中未显示的字段仍然能够自动填充到表单
* 删除更改成功，增加失败(http 415)
# 解决问题的方法

[通过工具栏按钮弹出dialog](http://www.jeasyui.net/demo/352.html)

用dialog组件包裹form可为form增加dialog拥有的行为（弹出，关闭）

[表单式操作Basic CRUD Application](http://www.jeasyui.com/tutorial/app/crud/index.html)

表单数据填充是根据row的field来加载的

自动填充的原理是row 的field和表单元素中name对应，row中没有的数据是无法加载到表单的

可以设置表格中的字段隐藏，这样表单仍然会加载隐藏的数据

datagrid列属性<code>hidden</code>来控制列的显示和隐藏

<code>增加和（删除，查询，更改）的区别</code>

新增加时，row会全部复制表单字段的值

因为查询出来的数据是有id的，更改和删除时也是根据id来操作的，但是增加时有id一般会出错，

一般的主键都是数据库里自增的，若手动设置id基本会插入失败

所以增加之前必须获得的数据进行处理，删掉id属性


# 代码
## 表单序列化

因为是jqeury插件形式的代码，所有jquery对象都可用
```javascript
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}
// 一个保存函数
function savePt(){
	
	if(formMethod == undefined){return}
	
	var ptjson = $("#fm").serializeObject()
	console.log("保存之后的序列化")
	console.log(ptjson)
	if(formMethod == "add"){
		delete ptjson['ptId']
		console.log("删除ptId属性"+ptjson)
	}
	console.log(url)
	$.ajax({
		url : url,
		type : "POST",
		data : JSON.stringify(ptjson),
		dataType : "json",
		contentType : "application/json",
		success : function(data) {
			$('#dlg').dialog('close')
			alert("数据提交成功")
			query();
		},
		error : function(data){
			alert("数据提交失败")
		}
		
	})
	$('#dg').datagrid('loaded');
	$('#dg').datagrid('reload');
	
	
}


```


## 表单加载和清除
```javascript
		function loadRemote(){
			$('#ff').form('load', 'form_data1.json');
		}
		function clearForm(){
			$('#ff').form('clear');
		}
```
## 为dialog底部添加按钮
```html
<div id="dlg" class="easyui-dialog"
		style="width: 800px; height: 500px; padding: 10px 20px" closed="true"
		buttons="#dlg-buttons">
        <form></form>
        	<div id="dlg-buttons"  style="display: block">
			<a href="#" class="easyui-linkbutton" iconCls="icon-ok"
				onclick="savePt()">保存</a> <a href="#" class="easyui-linkbutton"
				iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
		</div>
        
        </div>
```
## 增加之前删除多余的属性
```javacript
    function getFmJsonWithRightFormat(moduleForm){
        var fm = $(moduleForm)
        var fmJson = fm.serializeObject()
        console.log("保存之后的序列化")
        console.log(fmJson)
        if(formMethod == "add"){
            delete fmJson['ptId']
            console.log("删除ptId属性"+fmJson)
            
        }
        return fmJson

    }
```



