---
title: EasyUI学习笔记第二天
tags:
- easyui
- datagrid
- 增删改查
- 缓存式编辑
categories: javascript
---

# 待解决问题
* datagrid缓存式增删改问题
# 收获
缓存式编辑是datagrid的一个核心特点

允许用户有一个更改和撤销的机会，而不是频繁地与数据库交互

缓存式编辑的行为核心是编辑状态

正在编辑　editIndex !=undefined

不在编辑状态　　editIndex == undefined

增加和（删除，查询，更改）的区别

新增加时，row会全部复制表单字段的值

因为查询出来的数据是有id的，更改和删除时也是根据id来操作的，但是增加时有id一般会出错，

一般的主键都是数据库里自增的，若手动设置id基本会插入失败

所以增加之前必须获得的数据进行处理，删掉id属性

<code>delete obj['id']</code>


# 代码

[Row editing In datagrid 官网demo](http://www.jeasyui.net/demo/340.html)

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


