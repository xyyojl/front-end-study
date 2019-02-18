

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
var hashInLocalStorage = JSON.parse(localStorage.getItem('zzz')||null);
if(hashInLocalStorage){
    hash = hashInLocalStorage;
}


var index = 0;
while(index < keys['length']){ // index 0 1 2
    // 生成三個div
    var div = document.createElement('div');
    main.appendChild(div);
    var index2 = 0;
    var row = keys[index]; // 第一個數組 第二個數組 第三個數組
    while (index2 < row['length']) {
        var kbd = document.createElement('kbd');
        kbd.textContent = row[index2];
        div.appendChild(kbd);
        var button = document.createElement('button');
        button.textContent = 'E';
        button.id = row[index2];
        button.onclick = function(e){
            key = e['target'].id; // q w e
            url = prompt('给我一个网址'); // qq.com
            hash[key] = url; // hash 变更
            localStorage.setItem('zzz',JSON.stringify(hash));
        }
        kbd.appendChild(button);
        index2 += 1;
    }
    index += 1;
}


document.onkeypress = function(e){
    var key = e['key'];
    var website = hash[key];
    //location.href='http://'+website
    //location代表地址栏，href代表地址
    window.open('http://'+website,'_blank');
    //新窗口打开网页
}