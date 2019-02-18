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

index = 0;
while(index < keys['length']){ // 0 1 2
    div = document.createElement('div');
    main.appendChild(div);
    index2 = 0;
    row = keys[index]; // 第一个数组 第二个数组 第三个数组
    while(index2 < row['length']){ // 0-9 0-8 0-6
        kbd = document.createElement('kbd');
        kbd.textContent = row[index2];
        div.appendChild(kbd);
        index2 += 1;
    }
    // while(index2 < )
    index += 1;
}



