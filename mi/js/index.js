//轮播图
var mySwiper = new Swiper('.swiper1', {
  //direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  autoplay: {
    disableOnInteraction: false,
    dalay: 1000,
    pagination: {
      el: '.swp1',
    },
  },
  speed: 1000,

  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // 如果需要滚动条
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});
//获取回到顶部元素
var li_top = $id('li_top');
/* console.log(li_top);
console.log(getScroll().top); */
document.onscroll = function () {
  if (getScroll().top > 400) {
    li_top.style.display = 'block';
  } else {
    li_top.style.display = 'none';
  }
};

li_top.onclick = function () {
  if (document.documentElement.scrollTop) {
    document.documentElement.scrollTop = 0;
  } else {
    document.body.scrollTop = 0;
  }
};
/* 轮播图2 */
var mySwiper = new Swiper('.swiper2', {
  // direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  autoplay: {
    disableOnInteraction: false,
    dalay: 1000,
  },
  slidesPerView: 4, //一行显示4个
  spaceBetween: 20,
});
/* 倒计时 */
var ms = setInterval(function () {
  var time1 = new Date().getTime(); //当前时间戳
  var time2 = new Date(2021, 1, 1);

  var difference = parseInt((time2 - time1) / 1000); //秒

  var day = parseInt(difference / (24 * 60 * 60)); //tian
  difference = difference - 24 * 60 * 60 * day;

  //小时处理
  var hour = parseInt(difference / 3600);
  /* console.log(hour); */
  if (hour < 10) {
    $('#h1').text(0);
    $('#h2').text(hour);
  } else {
    $('#h1').text(parseInt(hour / 10));
    $('#h2').text(hour % 10);
  }
  /* console.log($('#h1')); */
  //分钟处理
  difference = difference - hour * 3600;
  var minute = parseInt(difference / 60);
  if (minute < 10) {
    $('#m1').text(0);
    $('#m2').text(minute);
  } else {
    $('#m1').text(parseInt(minute / 10));
    $('#m2').text(minute % 10);
  }
  //秒处理
  var second = difference - minute * 60;
  if (second < 10) {
    $('#s1').text(0);
    $('#s2').text(second);
  } else {
    $('#s1').text(parseInt(second / 10));
    $('#s2').text(second % 10);
  }
  /*  if (time1 == time2) {
    a++;
  } */
}, 1000);

/* 到达滑入手机模块高度时ajax渲染图片 */
function ajaxGet(a) {
  $('.smallphoto2').html('');
  $.ajax({
    url: '../js/json/jd_' + a + '.json',
    dataType: 'json',
    success: function (data) {
      data.map(function (item, index) {
        if (index == 7) {
          $('.smallphoto2').append(`
          <ul class="two1">
          <li>
            <h5>${item.p}<br>
              <p>${item.sp}</p></h5>
            <img src="${item.img}">
          </li>
          <li>
              <h3>浏览更多<br>
                <span>热门</span>
              </h3>
             <i class="iconfont icon-youjiantou"></i>
          </li>`);
        } else {
          $('.smallphoto2').append(`   <li>
          <img src="${item.img}"> 
          <h5>${item.h3}</h5>
          <p>${item.p}</p>
          <p>${item.sp01}</p>
          <a></a>
        </li>`);
        }
      });
    },
  });
}
ajaxGet('hot');
/* 滑入标签加标签 */
$('.tv').mouseover(function () {
  $(this).addClass('hot').siblings().removeClass();
  ajaxGet('tv');
});
$('.hot1').mouseover(function () {
  $(this).addClass('hot').siblings().removeClass();
  ajaxGet('hot');
});

/*更改登录名 */
if (localStorage.getItem('name')) {
  /*   $('h1').html(localStorage.getItem('name') + '的购物车'); */
  $('#ne').html('您好,' + localStorage.getItem('name'));
  $('#nm').hide();
} else {
  $('#nm').show();
  $('#ne').hide();
}
