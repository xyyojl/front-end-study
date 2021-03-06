// 1. 初始化数据
var hashA = init();
var keys = hashA['keys'];
var hash = hashA['hash'];
// 2. 生成键盘
generateKeyboard(keys,hash);

// 3. 监听用户动作
listenToUser(hash);
switchSearchEngin();

// 下面的是封装的函数
// 初始化数据相关的函数
function init() {
    var keys = {
        '0' : ['q','w','e','r','t','y','u','i','o','p'],
        '1' : ['a','s','d','f','g','h','j','k','l'],
        '2' : ['z','x','c','v','b','n','m'],
        'length' : 3
    }
    
    var hash = {
        q : 'qq.com',
        w : 'weibo.com',
        e : 'ele.me',
        r : 'renren.com',
        t : 'tianya.cn',
        y : 'youtube.com',
        u : 'uc.cn',
        i : 'iqiyi.com',
        o : 'opera.com',
        p : undefined,
        a : 'acfun.tv',
        s : 'sohu.com',
        z : 'zhihu.com',
        m : 'mail.163.com'
    }
    // 取出localStorage 里面的zzz对应的hash
    var hashInLocalStorage = getFromLocalStorage('zzz');
    if(hashInLocalStorage){
        hash = hashInLocalStorage;
    }
    return {
        'keys':keys,
        'hash':hash
    }
}
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem('zzz')||null);
}
// 生成键盘的相关函数
function generateKeyboard(keys,hash){
    for (let index = 0; index < keys['length']; index++) {
        var div = tag('div');
        div.className = 'row';
        main.appendChild(div);
        var row = keys[index];
        for (let index2 = 0; index2 < row.length; index2++) {
            var span = createSpan(row[index2]);
            var button = createButton(row[index2]);
            var img = createImage(hash[row[index2]]);
            
            var kbd = tag('kbd');
            kbd.className='key '+row[index2]

            kbd.appendChild(span);
            kbd.appendChild(button);
            kbd.appendChild(img);
            div.appendChild(kbd);
        }
    }
}

function tag(tagName){
    return document.createElement(tagName);
}
function createSpan(textContent) {
    var span = tag('div');
    span.className = 'text';
    span.textContent = textContent;
    return span;
} 
function createButton(id) {
    var button = tag('button');
    button.textContent = '编辑';
    button.id = id;
    button.onclick = function(e){
        // 弹出一个框 输入一个网址 改变图片
        var button2 = e.target;
        var img2 = button2.nextSibling;
        var key = e.target.id; // q w e
        var url = prompt('给我一个网址'); // qq.com
        hash[key] = url; // 哈希变更
        img2.src = img2.src='http://'+url+'/favicon.ico';
        img2.onerror = function(e){
            e.target.src='//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }
        localStorage.setItem('zzz',JSON.stringify(hash));
    }
    return button;
}
function createImage(domain) {
    var img = tag('img');
    if(domain){
        img.src = 'http://'+domain+'/favicon.ico';
    }else{
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
    }
    img.onerror = function(e){
        e.target.src='//i.loli.net/2017/11/10/5a05afbc5e183.png';
    }
    return img;
}
 
// 监听用户事件的函数
function listenToUser(hash) {
    var inputBar = document.querySelector('#keyword');
    var inputting = false;
    inputBar.addEventListener('focus',function(e){
        inputting = true;
        e.target.placeholder=''
    })
    inputBar.addEventListener('focusout',function(e){
        inputting = false;
        e.target.placeholder='点击右边图标切换搜索引擎'	
    })
    document.onkeypress = function(e){
        var key = e['key'];
        var website = hash[key];
        var currentKey=document.querySelector('.key '+key)
		currentKey.classList.add('down')
        //location.href='http://'+website
        //location代表地址栏，href代表地址
        if(!inputting){
            setTimeout(function(){
                window.open('http://'+website,'_blank')	//新窗口打开网页	
            },500)
        }
    }
    document.onkeyup = function(e){
        var key=keyup.key
        var currentKey=document.querySelector('.key '+key)
        currentKey.classList.remove('down')
    }

}
// 切换搜索引擎
function switchSearchEngin() {
    var baidu = true;
    var searchEngin = document.querySelector('#searchEngin');
    var logo = document.querySelector('#searchEngin>li:nth-child(1)');
    var searchButton = document.querySelector('#searchButton');
    var currentEngin = document.querySelector('.searchBar');
    var inputBar = document.querySelector('#keyword');
    // 添加读取输入信息功能
    var searchWhat='';
    inputBar.addEventListener('input',function(){
        searchWhat=document.getElementById('keyword').value;		
    })
    searchEngin.addEventListener('click',function(){
        console.log(baidu);
        console.log(currentEngin);
        console.log(logo)
        if(baidu){
            logo.classList.remove('active');
            logo = document.querySelector('#searchEngin>li:nth-child(2)');
            logo.classList.add('active');
            searchButton.setAttribute('value','Google');
            currentEngin.setAttribute('action','http://www.google.com/search');
            inputBar.setAttribute('name','q');
        }else{
            logo.classList.remove('active');
            logo = document.querySelector('#searchEngin>li:nth-child(1)');
            logo.classList.add('active');
            searchButton.setAttribute('value','百度一下');
            currentEngin.setAttribute('action','http://www.google.com/baidu');
            inputBar.setAttribute('name','word');
        }
        baidu != baidu;
    },false);
}