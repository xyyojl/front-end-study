# 6小时 jQuery开发一个清单应用

## 1-1课程简介

实用技术点：

- 定时提醒功能的实现
- 最大限度地重用数据
- 实现更强大的自定义`alert()`
- `position`属性的特殊用法

开发思路：

- 清单应用的整体布局

- 清单应用的细节完善

- 清单应用的需求及逻辑梳理

- 清单应用的架构方法

- 清单应用的数据存储方式

- 清单应用的数据组织方式

- 模板的实现及应用

- 清单应用定时功能的实现

- 清单应用响铃提醒的实现

第三方插件：

- `store.js`实现`LocalStorage`读取与存储

- `jQuery`插件，`datetimepicker`

`jQuery API`：

- `jQuery deferred`的概念及使用方式
- `jQuery`选择器在真实项目中的使用

##1-2 基本环境的部署

操作思路：

- 使用编辑器`VScode`或其他编辑器来新建文件夹css，js，image和文件
- 下载`jquery.min.js`，介绍下载方式或在线引用
- 使用`http-server`，不要使用直接双击文件打开的方式
- 检查是否能够使用`jquery`

### 新建文件夹和文件

新建文件夹

- css
- js
- image
- lib「存放第三方库」

新建文件

- index.html
- style.css
- main.js

注：对应的文件放到对应的文件夹，如`style.css`放到`css`文件夹

### 下载`jquery.min.js`

方法：

1. 使用`npm`下载`jquery`「`npm`是随同`nodeJS`一起安装的包管理工具」
2. 从 [jq官网](http://jquery.com/download/) 下载` jQuery` 库
3. 从 `CDN` 中载入` jQuery`， 如从 `Google` 中加载 `jQuery`。如果您不希望下载并存放` jQuery`，那么也可以通过 `CDN`（内容分发网络） 引用它。

#### 方法1操作过程

1. 在`gitBash`上操作，`cd`到项目目录下 

2. 使用命令`npm init` 
3. 使用命令`npm install jquery` 
4. 把`jquery.min.js`放到lib文件夹里面「不懂就照做吧」

```js
cd jquery-todo //进入自己想要进入的文件夹
npm init //运行构建新项目的向导，可以不用管什么它什么，直接回车
npm install jquery  //npm install jquery -save 能实现一样的效果 安装包的同时会把依赖包名称放到 package.json 里面的 dependencies
```

### 使用`http-server`

- 安装`http-server`，使用命令`npm install http-server -g`
- `http-server`的使用
  - 输入 `hs 文件路径 参数` 启用，默认localhost:8080
  - 如果直接 `hs -c-1` 就是在当前目录启用,禁止缓存,自动打开浏览器
  - `ctrl + C`退出`http-server`
- `http-server`的参数
  - -o 启动服务器后打开浏览器窗口
  - -c 设置缓存控制max-age头的缓存时间（以秒为单位），例如-c10 10秒（默认为’3600’）
  - -p 要使用的端口（默认为8080）
  - -a 要使用的地址（默认为0.0.0.0）
  - -d 显示目录列表（默认为“True”）

注：如果想改变端口和地址采用这个方式：`http-server <文件路径> -a hostip -p 端口号`。

简单来说就是

```js
// 安装http-server
npm install http-server -g

//在git Bash 进入到项目目录，然后开启服务器
hs -c-1

// 退出服务器
ctrl+C
```

### 在`main.js`书写下面的代码

```js
// 记得要在index.html中引入mian.js文件和jquery.min.js文件
<script src="./lib/jquery.min.js"></script>
<script src="./js/main.js"></script>
;(function(){
    'use strict'; // 使用严格模式
    alert(1);
    // 检查jQuery 是否可用
    console.log($);
})();
```

上面代码使用到自执行函数，想了解自执行函数「不会污染全局变量」，请点击[自执行函数](https://javascript.ruanyifeng.com/grammar/function.html#toc23)

上面代码里的前头的分号的作用是什么？

结束之前，你引入的库的一个东西，有可能他之前写的一些内容，后头没有加分号，忘了去结束那个语句，然而有时候在你把代码压缩混淆过之后，前头没有分号，再加上你引入的文件后面没有用分号结束语句，可能就会报错。这样写的话，就可以避免这个问题。

## 2-1 整体布局

其实就是用`html`实现整体布局，下面是代码展示：

注：下面的代码只是暂时写好，之后可能会做出修改

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MyToDo</title>
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <div class="container"><!-- 总容器开始 -->
        <h1>MyToDo</h1>
        <form action="" class="add-task">
            <input type="text">
            <button>submit</button>
        </form>
        <div class="task-list"><!-- 清单列表开始 -->
            <div class="task-item"><!-- 任务开始 -->
                <span><input type="checkbox"></span>
                <span class="task-content">item content 1</span>
                <span class="action delete">delete</span>
                <span class="action detail">detail</span>
            </div><!-- 任务结束 -->
            <div class="task-item"><!-- 任务开始 -->
                <span><input type="checkbox"></span>
                <span class="task-content">item content 1</span>
                <span class="action delete">delete</span>
                <span class="action detail">detail</span>
            </div><!-- 任务结束 -->
            <div class="task-item"><!-- 任务开始 -->
                <span><input type="checkbox"></span>
                <span class="task-content">item content 1</span>
                <span class="action delete">delete</span>
                <span class="action detail">detail</span>
            </div><!-- 任务结束 -->
        </div><!-- 清单列表结束 -->
        <div class="task-detail"><!-- 任务详情开始 -->
            <div class="content"></div><!-- 任务标题 -->
            <div><!-- 任务描述开始 -->
                <div class="desc"></div>
            </div><!-- 任务描述结束 -->
            <div class="remind"><!-- 任务定时提醒时间开始 -->
                <input type="date">
                <button type="submit">submit</button>
            </div><!-- 任务定时提醒时间结束 -->
        </div><!-- 任务详情结束 -->
    </div><!-- 总容器结束 -->

    <script src="./lib/jquery.min.js"></script>
    <script src="./js/main.js"></script>
</body>
</html>
```

## 3-1 细节完善

涉及到样式表之前，需要重置浏览器的默认样式，比如`body`的`margin: 8px`，如果一个一个针对重置样式，只需要用别人做的东西即可

### “reset” 和 “normalize” CSS 之间的区别？你会如何选择，为什么？

normalize 相对「平和」，注重通用的方案，重置掉该重置的样式，保留有用的 user agent 样式，同时进行一些 bug 的修复，这点是 reset 所缺乏的。 

Reset 相对「暴力」，不管你有没有用，统统重置成一样的效果，且影响的范围很大，讲求跨浏览器的一致性。 [来，让我们谈一谈 normalize.css](http://jerryzou.com/posts/aboutnormalizeCss/)

normalize.css是一种CSS reset的替代方案。它们的区别有：

- normalize.css 保护了有价值的默认值，Reset通过为几乎所有的元素施加默认样式，强行使得元素有相同的视觉效果。相比之下，normalize.css保持了许多默认的浏览器样式。这就意味着你不用再为所有公共的排版元素重新设置样式。当一个元素在不同的浏览器中有不同的默认值时，normalize.css会力求让这些样式保持一致并尽可能与现代标准相符合。
- normalize.css 修复了浏览器的bug，它修复了常见的桌面端和移动端浏览器的bug。这往往超出了Reset所能做到的范畴。关于这一点，normalize.css修复的问题包含了HTML5元素的显示设置、预格式化文字的font-size问题、在IE9中SVG的溢出、许多出现在各浏览器和操作系统中的与表单相关的bug。
- normalize.css 不会让你的调试工具变的杂乱
- normalize.css 是模块化的
- normalize.css 拥有详细的文档

选择normalize.css ，主要是reset.css为几乎所有的元素施加默认样式，所以需要对所有公共的排版元素重新设置样式，这是一件很麻烦的工作。

### 上[bootcdn](https://www.bootcdn.cn/normalize/)，下载normalize.css，或者在线引用都可以。

注：引用normalize.css的时候一定要卸载自己写的css之前。

其实就是用`css`实现界面美化，下面是代码展示：

注：下面的代码只是暂时写好，之后可能会做出修改

```css
*{
    box-sizing: border-box;
    transition: background 0.2s;
    outline: 0;
}
body{
    background-color: #00334b;
    color: #fff;
    padding:0 10px;
}

/* 先用html布局，然后再用css美化界面 */
.container{
    max-width: 700px; /* max-width 比较灵活，不会写死 */
    margin: 0 auto;
    position: relative;
}
h1{
    text-align: center;
}
input,
.task-item,
.task-detail-mask,
button,
textarea{
    padding: 10px;
    border-radius: 3px;
}
textarea,
input[type=text],
input[type=date],
button{
    border: 0;
}
input[type=text],
input[type=date],
textarea{
    width: 100%;
    display: block;
    background: #ddd;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.3);
}
input[type=text]:hover,
input[type=date]:hover,
input[type=text]:focus,
input[type=date]:focus{
    background: #fff;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.2);
}
button{
    display: inline-block;
    border: 0;
    cursor: pointer;
    color: #333;
}
.add-task input[type=text]{
    float: left;
    width: 84%;
    margin-right: 1%;
}
.add-task [type=submit]{
    width: 15%;
    background: #46b1e4;
}
.add-task [type=submit]:hover{
    background: #5FB9E4;
}
.add-task [type=submit],
.task-item{
    box-shadow: 0 2px 3px rgba(0,0,0,.4);
}
.task-list{
    margin: 10px 0;
}
.task-item{
    background-color: #fff;
    color: #333;
    margin-bottom: 2px;
    cursor: pointer;
}
.task-item:hover{
    background: #ddd;
}
.task-detail-mask,.task-detail{
    position: absolute;
    display: none;
}
.task-detail{
    top: 0;
    right: 0;
    padding: 10px;
    background: #fff;
    width: 50%;
    height: 320px;
    color: #333;
}
.task-detail .content{
    padding: 10px;
    font-weight: 900;
    cursor: pointer;
}
.task-detail *{
    margin-bottom: 10px;
}
.task-detail textarea{
    min-height: 100px;
    resize: none;
}
.task-detail-mask{
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(30,30,30,.6);
}
.action {
	color:#888;
	font-size:90%;
}

.action:hover {
	color:#333;
}

.task-content {
	margin-left:10px;
}

.fr {
	float:right;
}  

```

















