// 1.初始化数据
var hashA = init();
var keys = hashA['keys'];
var hash = hashA['hash'];

// 2.生成键盘
// 遍历 keys，生成kbd标签
generateKeyboard(keys,hash);

// 3.监听用户动作
listenToUser(hash);

// 下面是工具函数
function init(){
    var keys = {
        '0' : {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
        '1' : {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
        '2' : {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
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
    // 取出localStorage 中的 zzz 对应的 hash
    var hashInLocalStorage = getFromLocalStorage('zzz') ;
    if(hashInLocalStorage){
        hash = hashInLocalStorage;
    }
    return {
        keys : keys,
        hash : hash
    }
}

function generateKeyboard(){
    for(var index = 0;index < keys['length'];index = index + 1){
        var div = tag('div');
        div.className = 'row';
        main.appendChild(div)

        var row = keys[index]; // 第一个数组 第二个数组 第三个数组
        for (let index2 = 0; index2 < row['length']; index2 = index2 + 1) {
            var span = createSpan(row[index2]);
            var button = createButton(row[index2]);
            var img = createImage(hash[row[index2]]);

            var kbd = tag('kbd');
            kbd.className = 'key';

            kbd.appendChild(span);
            kbd.appendChild(button);
            kbd.appendChild(img);
            
            div.appendChild(kbd);
        }
    }
}
function listenToUser(hash){
    // 监听main无效，监听document有效
    document.onkeypress = function(e){
        var key = e['key']; // q w e
        var website = hash[key];
        // location.href = '//'+ website;
        window.open('//'+ website,'_blank');
    }
}

function tag(tagName){
    return document.createElement(tagName);
}

function createSpan(textContent){
    var span = tag('span');
    span.textContent = textContent;
    span.className = "text";
    return span;
}
function createButton(id){
    var button = tag('button');
    button.textContent = '编辑';
    button.id = id;
    button.onclick = function(e){
        var button2 = e['target'];
        var img2 = button2.previousSibling;
        var key = button2['id'];   // q w e r
        var x = prompt('给我一个网址'); // qq.com
        hash[key] = x; // hash 变更
        img2.src = '//'+x+'/favicon.ico';
        img2.onerror = function(xxx){
            xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }
        localStorage.setItem('zzz',JSON.stringify(hash));
    }
    return button;
}
function createImage(domain){
    var img = tag('img');
    if(domain){
        img.src = '//'+domain+'/favicon.ico';
    }else{
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
    }
    img.onerror = function(xxx){
        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
    }
    return img;
}
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name) || 'null')
}