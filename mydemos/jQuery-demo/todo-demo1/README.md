# 使用jQuery实现清单应用的过程

## 进行清单应用的整体布局
1. 准备好相关的文件夹和文件`css js index.html`等等
2. 引入需要使用到的css文件和js文件 
3. 使用html实现静态布局，并没有进行界面美化
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MyToDo</title>
    <link rel="stylesheet" href="./css/jquery.datetimepicker.min.css">
    <link rel="stylesheet" href="./css/normalize.css">
    <link rel="stylesheet" href="./css/base.css">
</head>
<body>
    <div class="container">
        <h1>MyToDo</h1>
        <form class="clearfix add-task">
            <input type="text" class="content">
            <button class="addTaskSubmit">submit</button>
        </form>
        <ul class="task-list">
            <li class="task-item">
                <span><input type="checkbox"></span>
                <span class="item-content">啦啦啦啦啦啦啦啦啦啦</span>
                <span class="fr">
                    <span class="action detail">详情</span>
                    <span class="action delete">删除</span>
                </span>
            </li>
            <li class="task-item">
                <span><input type="checkbox"></span>
                <span class="item-content">啦啦啦啦啦啦啦啦啦啦</span>
                <span class="fr">
                    <span class="action detail">详情</span>
                    <span class="action delete">删除</span>
                </span>
            </li>
        </ul>
    </div>
    <div class="task-detail">
        <p>任务描述</p>
        <input type="text" class="detail-content">
        <p>任务详情</p>
        <textarea class="desc"></textarea>
        <p>设置闹钟</p>
        <input type="date" class="datetime">
        <button class="detail-submit">提交</button>
    </div>

    <script src="./js/jquery.js"></script>
    <script src="./js/jquery.datetimepicker.full.js"></script>
    <script src="./js/store.js"></script>
    <script src="./js/base.js"></script>
</body>
</html>
```


## 清单布局的界面美化
1. 使用css美化界面，根据自己的喜好调整界面面的样式
2. 同时给标签添加class
```css
*{
	box-sizing: border-box;
	outline: 0;
	transition: 0.3s;
}
ul{
	padding: 0;
	list-style: none;
}
p{
	margin: 8px;
}
.fr{
	float: right;
}
.clearfix::after{
	content: '';
	display: block;
	clear: both;
}
body{
	background-color: #00334B;
}
.container{
	max-width: 700px;
	margin: 0 auto;
}
.container h1{
	text-align: center;
	color: #fff;
}
input,button{
	padding: 10px 0;
	border: none;
	border-radius: 3px;
}
.container form{
	margin-bottom: 10px;
}
.container form input{
	float: left;
	width: 84%;
	margin-right: 1%;
	text-indent: 1em;
}
.container form button{
	width: 15%;
	background-color: #0E98DA;
	cursor: pointer;
}

.container form button:hover{
	background-color: #01547B;
}
.container .task-list .task-item{
	padding: 10px;
	background-color: #fff;
	border-radius: 3px;
	margin-bottom: 4px;
	cursor: pointer;
}
.container .task-list .task-item:hover{
	background-color: #ddd;
}
.container .task-list .task-item .item-content{
	margin-left: 10px;
}
.container .task-list .task-item .action{
	color: #888;
	font-size: 14px;
	cursor: pointer;
}
.container .task-list .task-item .action:hover{
	color: #333;
}

.task-detail{
	display: none;
	position: absolute;
	left: 50%;
	top: 134px;
	margin-left: -150px;
	width: 300px;
	height: 360px;
	padding: 10px;
	background-color: #ccc;
	border-radius: 5px;
}
.task-detail input,
.task-detail textarea{
	width: 100%;
}
.task-detail textarea{
	resize: none;
	height: 100px;
}
.task-detail button{
	padding: 10px 8px;
	background-color: #0E98DA;
	margin-top: 6px;
}
```

## 模块化编程大致的思路
1. 首先定义一个模块`var myToDoModule = (function(){})();`
2. 初始化对象`initJqVar`
3. 写页面初始化就要执行的方法`initModule`，把`initJqVar()`放到`initModule`里面
4. 最后把对象`return`出去，`return { initModule : initModule }`
注：模块化编程的好处：提高安全性
```js
var myToDoModule = (function(){
    // 初始化jquery对象
    var initJqVar = function(){

    }

    //页面初始化就要执行的方法放在initModule里面
    var initModule = function(){
        initJqVar();
    }

	return {
		initModule : initModule
	}


})();

$(function(){
	myToDoModule.initModule();
})
```

## 实现清单应用的初始化显示

如何实现初始化渲染：

1. 定义`initRenderIndex`初始化渲染的方法，把`initRenderIndex()`放到`initModule`里面
2. 丰富`initRenderIndex`方法的内容
   1. 首先你需要一个**`task_list`数组**来存储需要遍历的对象，所以要提前声明并获取好`task_list`  数组
   2. 把容器里面的内容给清空
   3. 从`store.js`中取出已经存进去的任务列表
   4. 声明一个**空字符串`taskHtmlStr`**存储遍历的字符串
   5. 遍历数组并拼接字符串，然后渲染到页面上

```js
var myToDoModule = (function(){
	// 定义变量
	var task_list = [];
	var $task_list;

	// 初始化jquery对象
    var initJqVar = function(){
		$task_list = $('.task-list');
	}
	// 页面初始化的时候，从store中取出item，并渲染
	var initRenderIndex = function(){
		$task_list.html('');
		task_list = store.get('task_list');
		var taskHtmlStr = '';
		for (var i = 0; i < task_list.length; i++) {
			var oneItem = '<li class="task-item">'+
						'<span><input type="checkbox"></span>'+
						'<span class="item-content">'+ task_list[i].content +'</span>'+
						'<span class="fr">'+
						'	<span class="action detail">详情</span>'+
						'	<span class="action delete">删除</span>'+
						'</span>'+
					'</li>';
			taskHtmlStr += oneItem;
		}
		// 把最后的结果添加到$task_list节点的里面
		// 方法1.append 方法2.appendTo
		$(taskHtmlStr).appendTo($task_list)
	}

    //页面初始化就要执行的方法放在initModule里面
    var initModule = function(){
		initJqVar();
		initRenderIndex();
    }

	return {
		initModule : initModule
	}


})();

$(function(){
	myToDoModule.initModule();
})
```

## 实现清单应用的添加任务

如何实现添加任务操作：

1. 添加 `addTask` 的方法，把`addTask()`放到**提交按钮**触发的事件里面
2. 丰富`addTask`方法的内容
   1. 声明`new_task`对象
   2. 将`input`框的值赋值给`new_task`对象的`content`，注：要提前声明并获取好`$content`  对象
   3. 更新数组操作
   4. 保存数据到`store`里面
   5. 渲染新添加的数据，注：需要弄另外一个`renderOneItem`函数去实现这个效果
   6. 声明并获取好`$addTaskSubmit`  对象，并为其添加监听事件

```js

```

## 技巧
- `ctrl+shift+C`可以取页面中的元素
- 把`script`标签放到`body`结束标签之前
- 使用js的 模块化编程（亮点）
- 这样书写`$content = $('.content');`，初始化jq对象只执行一次，可以避免重复获取
- 不管是添加操作，还是删除操作，还是更新操作--->更新`task_list`，然后`store.set('task_list',task_list);`
- 使用`debugger`打断点

学习链接：[Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

## 踩坑
### 坑一：`Uncaught TypeError: Cannot read property 'length' of undefined`

![](./image/报错一.png)

解决办法：
找到对应的报错的行，寻找原因，因为报错说不能给`undefined`设置属性`length`,其实原因是`task_list`是`undefined`，再往上找错误的源头就是`task_list = store.get('task_list');`，因此只需要把改变一小部分代码变成下面这样即可，`task_list = store.get('task_list') || [];`

### 坑二：提交form表单，页面会自动刷新，需要阻止表单自动提交

阻止表单自动提交和刷新页面的方法

办法1：

直接在`html`代码中书写这样的代码

```html
<form class="clearfix add-task"  onsubmit="return false">
    <input type="text" class="content">
    <button class="addTaskSubmit">submit</button>
</form>
```

办法2：

```js
var form = document.getElementsByTagName('form')[0];
form.addEventListener('submit',function(e){
    var event = e || window.event;
    event.preventDefault();
});
```











