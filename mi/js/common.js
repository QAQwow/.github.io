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

//底部图片定时器切换

let pag_bottom_img = setInterval(function () {
  $('.pag_bottom_img>img').eq(5).css({
    display: 'block',
  });
  $('.pag_bottom_img>img').eq(6).css({
    display: 'none',
  });
}, 500);

let pag_bottom_img2 = setInterval(function () {
  if (pag_bottom_img) {
    $('.pag_bottom_img>img').eq(5).css({
      display: 'none',
    });
    $('.pag_bottom_img>img').eq(6).css({
      display: 'block',
    });
  }
}, 1000);

//下载app显示
$('.download').mouseenter(function () {
  $('.ewm').stop().slideDown();
});
$('.download').mouseleave(function () {
  $('.ewm').stop().slideUp();
});

//购物车显示
$('.header_right2').mouseenter(function () {
  $('.header_right2_box').stop().slideDown();
});
$('.header_right2').mouseleave(function () {
  $('.header_right2_box').stop().slideUp();
});
//表单显示
var nav_right = document.getElementsByTagName('.nav_right');
$('.nav_right>input').focus(function () {
  $('.nav_right>ul').css({
    display: 'block',
  });
  $('.nav_right>input').css('border-color', '#ff6700');
  $('.nav_right>a').css('border-color', '#ff6700');
});
$('.nav_right>input').blur(function () {
  $('.nav_right>ul').css({
    display: 'none',
  });
  $('.nav_right>input').css('border-color', ' #e0e0e0 ');
  $('.nav_right>a').css('border-color', ' #e0e0e0 ');
});

//小米手机 red红米 电视下拉显示
$('.bignav').mouseenter(function () {
  $(this).children('div').children('.listbox1').stop().slideDown(500, 'linear');
});
$('.bignav').mouseleave(function () {
  $(this).children('div').children('.listbox1').stop().fadeOut();
});
//侧边菜单
$('.bignav_nav_li').mouseenter(function () {
  $(this).children('div').stop().show();
});
$('.bignav_nav_li').mouseleave(function () {
  $(this).children('div').stop().hide();
});
