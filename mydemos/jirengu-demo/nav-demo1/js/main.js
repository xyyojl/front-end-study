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
    t : 'tianya.com',
    y : 'youtube.com',
    u : 'uc.com',
    i : 'iqiyi.com',
    o : 'opera.com',
    p : undefined,
    a : 'acfun.tv',
    s : 'sohu.com',
    z : 'zhihu.com',
    m : 'mail.163.com'
}
// 取出localStorage 中的 zzz 对应的 hash
hasIocalStorage = JSON.parse(localStorage.getItem('zzz') || 'null');
if(hasIocalStorage){
    hash = hasIocalStorage;
}


// 遍历 keys，生成kbd标签
index = 0;
while(index < keys['length']){ // 0 1 2
    div = document.createElement('div');
    main.appendChild(div);
    row = keys[index]; // 第一个数组 第二个数组 第三个数组
    index2 = 0;
    while(index2 < row['length']){ // 0-9 0-8 0-6
        kbd = document.createElement('kbd');
        kbd.textContent = row[index2];
        button = document.createElement('button');
        button.textContent = '编辑';
        button.id = row[index2];
        button.onclick = function(e){
            key = e['target']['id'];   // q w e r
            x = prompt('给我一个网址'); // qq.com
            hash[key] = x; // hash 变更
            localStorage.setItem('zzz',JSON.stringify(hash));
            console.log(hash);
        }
        kbd.appendChild(button);
        div.appendChild(kbd);
        index2 += 1;
    }
    index += 1;
}

// 监听main无效，监听document有效
document.onkeypress = function(e){
    key = e['key']; // q w e
    website = hash[key];
    // location.href = 'http://'+ website;
    window.open('http://'+ website,'_blank');
}




