// 随机产生一个min到max之间的随机整数
function rand(min, max) {
  return parseInt(Math.random() * (max - min + 1)) + min;
}

// 根据id返回给id对应的元素标签
function $id(id) {
  return document.getElementById(id);
}

//通过类名获取元素
function getElements(className) {
  //先获取所有标签
  var all = document.getElementsByTagName('*');
  //然后从中筛选出符合指定类名的元素,放在一个数组里面返回
  //就需要一个存放元素的空数组
  var result = [];
  //循环判断每一个元素的className是否等于传入的className;
  for (var i = 0; i < all.length; i++) {
    if (all[i].className == className) {
      //这就是符合条件的元素,放到数组中
      result[result.length] = all[i];
    }
    //如果类名不同,就什么都不干
  }
  //把数组通过return返回出去
  return result;
}

//写一个函数,返回一个十六进制的颜色,例如#FFFFFF
function getColor() {
  var str = '#';
  for (var i = 1; i <= 6; i++) {
    str += rand(0, 15).toString(16);
  }
  return str;
}

// 封装一个方法用来获取页面滚动的距离
function getScroll() {
  if (window.pageYOffset) {
    return {
      top: window.pageYOffset,
      left: window.pageXOffset,
    };
  } else if (document.documentElement.scrollTop) {
    return {
      top: document.documentElement.scrollTop,
      left: document.documentElement.scrollLeft,
    };
  } else {
    return {
      top: document.body.scrollTop,
      left: document.body.scrollLeft,
    };
  }
}

// 封装一个函数来返回指定元素的指定样式
function getStyle(dom, attr) {
  if (window.getComputedStyle) {
    // 如果能进这里，非IE，说明window.getComputedStyle存在
    return window.getComputedStyle(dom, null)[attr];
  } else {
    // 如果进这里，IE浏览器
    return dom.currentStyle[attr];
  }
}

// 判断arr里面是否含有num
function has(arr, num) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == num) {
      return true;
    }
  }
  return false;
}

// 随机产生一个包含n个字母或数字的字符串
function randChar(n) {
  var str = ''; //用来记录随机字符串集合
  for (var i = 0; i < n; i++) {
    // 所以先随机产生一个48-122之间的随机整数
    var code = rand(48, 122);
    if ((code > 57 && code < 65) || (code > 90 && code < 97)) {
      // 如果产生的编码不是数字或字符，本次作废
      i--;
    } else {
      // 如果产生的编码是数字或字符，可以
      var char = String.fromCharCode(code);
      str += char;
    }
  }
  return str;
}

//事件监听
function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    //说明dom 上有addEventListener这个属性
    dom.addEventListener(type, fn);
  } else {
    //说明是IE678
    dom.attachEvent('on' + type, fn);
  }
}

//封装一个函数,返回鼠标按键,要求:左0  中1  右2
function getButton(e) {
  //普通的函数
  if (e) {
    //如果接到的e确实有值,说明e不是undefined,说明当前浏览器不是IE678
    return e.button;
  } else {
    //就是IE678
    switch (window.event.button) {
      case 1:
        return 0;
      case 4:
        return 1;
      case 2:
        return 2;
    }
  }
}

//去除str前后空格
function trim(str) {
  return str.replace(/(^\s+)|(\s+$)/g, '');
}

//运动函数封装
function move(dom, attr, target) {
  // var dom = $id('box');
  // var attr = "width";
  // var target  = 500;
  clearInterval(dom.timer);
  // 每隔20毫秒运动一段距离
  dom.timer = setInterval(function () {
    // 1 获取元素当前位置
    if (attr == 'opacity') {
      // 如果属性是透明度，要放大100倍
      var current = parseInt(getStyle(dom, 'opacity') * 100);
    } else {
      var current = parseInt(getStyle(dom, attr));
    }
    // 2 计算速度
    var speed = (target - current) / 10;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    // 3 计算下一个位置
    // 特例：如果是zIndex，一步到位
    if (attr == 'zIndex') {
      var next = target;
    } else {
      var next = current + speed;
    }
    // 4 有条件的定位元素
    if (next == target) {
      clearInterval(dom.timer);
    }
    // 如果属性是透明度，要除以100
    if (attr == 'opacity') {
      dom.style.opacity = next / 100;
      dom.style.filter = 'alpha(opacity=' + next + ')';
    } else if (attr == 'zIndex') {
      dom.style[attr] = next;
    } else {
      dom.style[attr] = next + 'px';
    }
  }, 20);
}

//   封装一个函数animate，能够实现多属性同时缓动
function animate(dom, json, fn) {
  clearInterval(dom.timer);
  dom.timer = setInterval(function () {
    var flag = true;
    for (var attr in json) {
      if (attr == 'opacity') {
        var current = parseInt(getStyle(dom, 'opacity') * 100);
      } else {
        var current = parseInt(getStyle(dom, attr));
      }
      var speed = (json[attr] - current) / 10;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

      if (attr == 'zIndex') {
        var next = json.zIndex;
      } else {
        var next = current + speed;
      }
      if (next != json[attr]) {
        flag = false;
      }
      //5 定位元素
      if (attr == 'zIndex') {
        dom.style.zIndex = next;
      } else if (attr == 'opacity') {
        dom.style.opacity = next / 100;
        dom.style.filter = "alpha(opacity='+ next +')";
      } else {
        dom.style[attr] = next + 'px';
      }
    }
    if (flag == true) {
      clearInterval(dom.timer);
      if (fn) {
        fn();
      }
    }
  }, 20);
}

//测算元素距离页面的距离
function getDistance(dom) {
  var totalLeft = 0;
  var totalTop = 0;
  do {
    totalLeft += dom.offsetLeft;
    totalTop += dom.offsetTop;
    //下一次的dom节点就是本次dom节点的最近的有定位的父元素
    dom = dom.offsetParent;
  } while (dom.nodeName != 'BODY');

  return {
    left: totalLeft,
    top: totalTop,
  };
}
