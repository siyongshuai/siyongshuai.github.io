---
title: EasyUI学习笔记第六天
tags:
- 代码整合
- 模块化
categories: javascript
---

# 遇到的问题
* datagrid变量化

jquery　的选择器可以是变量
```javascript
var moduleDatagrid = '#pt_dg'
function reject(moduleDatagrid) {
    // 最重要的一步
	var dg = $(moduleDatagrid)
	dg.datagrid('rejectChanges');
//	撤销之后清空全局信号量
	editIndex = undefined;
	editLength = 0;
	submitNum = 0;
}

```
datagrid option中的data 依赖于ajax成功后返回的数据,不知道怎么提取

可以将其他部分代码先抽出来封装成一个对象,在ajax返回成功后,在<code>success函数中</code>

进行data属性的拼接

```javascript

var options = {}
$.ajax({
    // ****
    success:function(data){
    var dg_data = data
    options.data = dg_data
    $('#dg').datagrid(options)
    
    
    }
    
    // ***
})


```

# 代码

## 表格缓存式编辑
```javascript
/**
 * 
 */
var editIndex;
var editLength;
var submitNum = 0;
//表单操作时，更改和保存表单共用一个保存函数，增加一个formMethod变量来区分
var urlPrefix = 'http://localhost:8080/ACM/manage_page';

//
//模块专属变量


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

function submitToDB(moduleDatagrid,moduleName) {

	var dg = $(moduleDatagrid)
	if(editIndex != undefined){alert("请先保存更改的内容")
		return 	
		}
	dg.datagrid('loaded');
	
	
	if (submitNum > 0) {
		var submittedNum
		var updateRows = dg.datagrid('getChanges', 'updated');
		
		
		if (updateRows.length > 0) {
//			submitNum += updateRows.length;
			subSave(dg,moduleName,"update", updateRows);
			alert('成功更新了' + updateRows.length + '行');
			submitNum -= updateRows.length;
			query(moduleDatagrid,moduleName);
			
			
		}
		var deleteRows = dg.datagrid('getChanges', 'deleted');
		if (deleteRows.length > 0) {
//			submitNum += deleteRows.length;
			subSave(dg,moduleName,"delete", deleteRows);
			alert('成功删除了' + deleteRows.length + '行');
			submitNum -= deleteRows.length;
			query(moduleDatagrid,moduleName);
		}
		var insertRows = dg.datagrid('getChanges', 'inserted');
//		增加时调用的数据是处理之后的数据，处理代码在各自模块的js文件中，统一用getAddRowsWithRightFormat()来处理数据
		if (insertRows.length > 0){
			var rightFormatRows = getAddRowsWithRightFormat(moduleDatagrid)
			subSave(moduleDatagrid,moduleName,"add", rightFormatRows);
			alert('成功增加了' + insertRows.length + '行');
			submitNum -= insertRows.length;
			query(moduleDatagrid,moduleName);
		}
	
	}
}



//删除和更改向后台提交
function subSave(moduleDatagrid,moduleName,method, rows) {
	var dg = $(moduleDatagrid)
	var msg;
	$.each(rows, function(i, o) { // i：遍历的序号 o：当前遍历到的对象
		o = rows[i]
		var url = urlPrefix + moduleName + method + '.do';
		$.ajax({
			url : url,
			type : "POST",
			data : JSON.stringify(o),
			success : function(data) {
				if (msg) {
					$.messager.alert('错误', '操作失败:' + msg, 'error');
					dg.datagrid('loaded');
				}
			},
			error:function(data){
				alert("操作失败")
			},
			dataType : "json",
			contentType : "application/json"
		});
		dg.datagrid('acceptChanges');
		dg.datagrid('loaded');
		dg.datagrid('reload');
	});
}
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

//缓存操作添加一条记录
function insertRow(moduleDatagrid){
	var dg= $(moduleDatagrid)
	if(editIndex != undefined ){
		dg.datagrid("endEdit",editIndex)
	}
	if(editIndex == undefined){
		dg.datagrid("insertRow",{
			index : 0,
			row : {}
		})
		dg.datagrid("beginEdit",0)
		editIndex = 0
	}
	
}
//缓存操作移除行
function removeRows(moduleDatagrid){
	var dg = $(moduleDatagrid)
	var removeRows = dg.datagrid('getChecked')
	if(removeRows.length>0){
		$.each(removeRows,function(index,row){
			index = dg.datagrid('getRowIndex', row)
			dg.datagrid('deleteRow', index)
		})
		editIndex = undefined;
//		向外部传送移除的行数
		submitNum += removeRows.length
	}
	else{
		editIndex = undefined;
	}
	
}
//保存编辑
function saveEditing(moduleDatagrid) {
	var dg = $(moduleDatagrid)
	if (editIndex != undefined) {
		dg.datagrid('endEdit', editIndex);
		editIndex = undefined;
		dg.datagrid('reload')
	}
	var updateRows = dg.datagrid('getChanges', 'updated')
	var insertRows = dg.datagrid('getChanges', 'inserted')
	submitNum += updateRows.length
	submitNum += insertRows.length
}
function getChanges() {
	if (editIndex == undefined) {
		alert(submitNum + '行被改变了!');
	} else {
		alert("请先保存编辑的行")
	}
}
//撤销更改的内容
function reject(moduleDatagrid) {
	var dg = $(moduleDatagrid)
	dg.datagrid('rejectChanges');
//	撤销之后清空全局信号量
	editIndex = undefined;
	editLength = 0;
	submitNum = 0;
}
function editRow(moduleDatagrid) {
	var dg = $(moduleDatagrid)
	if (editIndex != undefined)
		return;
	var row = dg.datagrid('getSelected');
	if (row == undefined) {
		$.messager.alert('提示', "请先单击选中要编辑的行", 'info');
		return;
	}
	var index = dg.datagrid('getRowIndex', row);
	dg.datagrid('beginEdit', index);
	var editors = dg.datagrid('getEditors', index);
	editIndex = index;
	editLength = 1;
}
```
## 表单式操作

```javascript
/**
 * 
 */
//表单操作只有一个公用的信号量
var formMethod
var url
var urlPrefix = 'http://localhost:8080/ACM/manage_page';
//自定义jqeury 插件，将表单序列化成json
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


	
//直接删除记录
function deleteObjects(moduleDatagrid,moduleName) {
    var  dg = $(moduleDatagrid)
	var rows = dg.datagrid('getChecked');
	console.info(rows)

	$.each(rows, function(index, object) {
		object = rows[index]
		$.ajax({

			url : urlPrefix + moduleName+'delete.do',
			type : "POST",
			data : JSON.stringify(object),
			success : function(data) {
				alert("删除成功")
				query(moduleDatagrid,moduleName);

			},
			error : function() {
				alert("删除失败");
			},
			dataType : "json",
			contentType : "application/json;charset=UTF-8"

		});
		$('#dg').datagrid('loaded');
		$('#dg').datagrid('reload');
	})

}

//增加表单

function newObjectForm(moduleDialog,moduleForm,moduleName){
	var dlg = $(moduleDialog)
	var fm = $(moduleForm)
	dlg.dialog('open').dialog('setTitle','新增记录')
	dlg.form('clear')
//	每个模块的form的外键初始化不一样，应该放在模块的js中
	initFormCombobox()
	url = urlPrefix + moduleName+'add.do'
	formMethod = "add"
}
//编辑表单

function editObjectForm(moduleDatagrid,moduleDialog,moduleForm,moduleDialogButtons,moduleName){
	var dg = $(moduleDatagrid)
	var dlg = $(moduleDialog)
	var fm = $(moduleForm)
	var dlg_buttons = $(moduleDialogButtons)
	var row = dg.datagrid('getSelected');
	
	if (row){
		dlg.dialog('open').dialog('setTitle','编辑记录');
//		initFormCombobox函数放在表单加载之前，要不然无法读取关联关系，因为关联关系一栏被重设了
		initFormCombobox()
		dlg_buttons.attr('style','display : block')
		fm.form('load',row);
		url = urlPrefix + moduleName+'update.do'
		console.log("保存之前的序列化")
		var ptjson = fm.serializeObject()
		console.log(ptjson)
		console.log(url)
		formMethod ="update"
	}
}

function saveObjectForm(moduleForm){
	var fm = $(moduleForm)
	if(formMethod == undefined){return}
	
	var fmJson = fm.serializeObject()
	console.log("保存之后的序列化")
	console.log(fmJson)
	if(formMethod == "add"){
//		调用正确的json格式,每个模块的json格式处理是不一样的
		fmJson = getFmJsonWithRightFormat(moduleForm)
	}
	console.log(url)
	$.ajax({
		url : url,
		type : "POST",
		data : JSON.stringify(fmJson),
		dataType : "json",
		contentType : "application/json",
		success : function(data) {
			$('#dlg').dialog('close')
			alert("数据提交成功")
//			操作成功或者失败都要清空清空全局信号量，以免其他模块用
			url = undefined
			formMethod = undefined
			
			query(moduleDatagrid,moduleName);
		},
		error : function(data){
			alert("数据提交失败")
			url = undefined
			formMethod = undefined
		}
		
	})
	$('#dg').datagrid('loaded');
	$('#dg').datagrid('reload');
	
	
}

function viewObjectForm(moduleDatagrid,moduleDialog,moduleForm){
	
	var dg = $(moduleDatagrid)
	var dlg = $(moduleDialog)
	var fm = $(moduleForm)
	var dlg_buttons = $(moduleDialogButtons)
	var row = dg.datagrid('getSelected');
	if (row){
		dlg.dialog('open').dialog('setTitle','查看详细信息');
			dlg_buttons.attr('style','display : none')
			initFormCombobox()
		fm.form('load',row);
	}
}

function cancelOprateObejctForm(moduleDialog){
	var dlg =$(moduleDialog)
	var fm = $(moduleForm)
	dlg.form('clear')
	dlg.dialog('close')
	url = undefined
	formMethod = undefined
//	清空信号量
}

```


