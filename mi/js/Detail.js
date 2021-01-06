// 防抖实例（滚动监听）
/* var scrollHandler = () => {
  // 函数A
  var timer = null;

  return () => {
    // 函数B
       var height = getScroll().top;
    if (height > $('div.menu').offset().top) {
      console.log(1);
      $('div.menu').addClass('fixed').slideDown();
    } else {
      $('div.menu').removeClass('fixed');
    } 
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('执行滚动事件');
    }, 1000);
  };
};
window.addEventListener('scroll', scrollHandler()); */
var scrollHandler = () => {
  // 函数A
  var timer = null;
  return () => {
    // 函数B
    clearTimeout(timer);
    timer = setTimeout(() => {
      var height = getScroll().top;
      if (height > $('div.menu').offset().top) {
        console.log(1);
        $('div.menu').addClass('fixed').slideDown();
      } else {
        $('div.menu').removeClass('fixed');
      }
    }, 600);
  };
};
window.addEventListener('scroll', scrollHandler());
/* 轮播图3 */
var mySwiper = new Swiper('.swiper3', {
  //direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  autoplay: {
    disableOnInteraction: false,
    dalay: 500,
    pagination: {
      el: '.swp3',
    },
  },
  speed: 500,

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
/* 点击a标签加类名 */
/* $('.box5>a')
  .nextAll()
  .mouseover(function () {
    $(this).addClass('cor');
  });
$('.box5>a')
  .nextAll()
  .mouseleave(function () {
    $(this).toggleClass('cor');
  }); 
$('.box6>a')
  .nextAll()
  .mouseover(function () {
    $(this).addClass('cor');
  });
$('.box6>a')
  .nextAll()
  .mouseleave(function () {
    $(this).toggleClass('cor');
  }); */
$('.box5 a').click(function () {
  $(this).addClass('cor').siblings().removeClass('cor');
  $('.b1').text($(this).text());
});
$('.box6 a').click(function () {
  $(this).addClass('cor').siblings().removeClass('cor');
  $('.span1').text($(this).text());
});
/* 添加购物车 */
function getCart() {
  var list = localStorage.getItem('cart') || '[]'; //字符串
  return JSON.parse(list);
}
function setCart(arr) {
  localStorage.setItem('cart', JSON.stringify(arr));
}
// 点击加入购物车
$('#add').click(function () {
  var newProduct = {
    product_id: $('#add').data('id'),
    product_name: $('#add').data('name'),
    product_img: $('#add').data('img'),
    product_price: $('#add').data('price'),
    product_num: $('#add').data('num'),
  };
  // 先获取原来的商品列表数组
  var productList = getCart();
  // 把新商品添加进去
  productList.push(newProduct); //如果有同id商品，不能直接push，要把num增加
  // 存回本地存储
  setCart(productList);

  /* 添加购物车显示数量 */
  $('#sp1').html(productList.length);
  $('#sp2').text(productList.length);
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
