!function(){
    var keys = {
        0 : ['q','w','e','r','t','y','u','i','o','p'],
        1 : ['a','s','d','f','g','h','j','k','l'],
        2 : ['z','x','c','v','b','n','m'],
        length : 3
    }
    var hash = {
        q : 'qq.com',
        w : 'wangdoc.com',
        e : undefined,
        r : 'react-juejin.foreversnsd.cn',
        t : 'tgideas.qq.com/doc/',
        y : 'youtube.com',
        i : 'iciba.com',
        o : undefined,
        p : undefined,
        a : undefined,
        s : 'segmentfault.com',
        d : 'dribbble.com',
        f : undefined,
        g : 'github.com'
    }

    // 取出localStorage里面的zzz对应的hash
    var hashIocalStorage = JSON.parse(localStorage.getItem('zzz')||'null');
    if(hashIocalStorage){
        hash = hashInLocalStorage;
    }


    var index = 0;
    while(index < keys['length']){ // index 0 1 2 判断是第几行
        var div = document.createElement('div');
        main.appendChild(div);

        var row = keys[index];
        var index2 = 0;
        while(index2 < row.length){
            kbd = document.createElement('kbd');
            div.appendChild(kbd);
            kbd.textContent = row[index2];
            button = document.createElement('button');
            button.textContent = 'E';
            button.id = row[index2];
            button.onclick = function(whichkey){
                key = whichkey.target.id; // q w e
                url = prompt('给我一个网址'); // qq.com
                hash[key] = url;
                localStorage.setItem('zzz',JSON.stringify(hash));
                console.log(hash);
            }
            kbd.appendChild(button);
            index2 += 1;
        }
        index = index + 1;
    }
    document.onkeypress = function(keydown){
        // keydown 包含你所需的所有信息
        var key = keydown.key;
        var website = hash[key];
        console.log(website);
        // location.href = 'http://'+website
        // location 代表地址栏，href代表地址
        window.open('http://'+website);
        // 新窗口打开网页
    }
}();