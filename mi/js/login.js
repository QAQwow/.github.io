/* $('#sub').click(function () {
  $.ajax({
    url: '../js/json/login.json',
    data: {
      username: $('#un').val(),
      password: $('#pw').val(),
    },
    dataType: 'json',
    success: function (res) {
      if (res.code == 1) {
        // 登录成功，信息添加到本地存储，方便同域名下的其他页面访问
        localStorage.setItem($('#un').val(), $('#pw').val());
        location.href = './cart.html';
      }
    },
  });
});
 */
/* $('#sub').click(function () {
  console.log($('#password').val());
}); */
/* console.log(localStorage.getItem($('#username').val())); */
$('#sub').click(function () {
  /*   console.log(localStorage.getItem($('#username').val())); */
  if (localStorage.getItem($('#username').val()) == $('#password').val()) {
    alert('登录成功');
    localStorage.setItem('name', $('#username').val());
    location.href = './Detail.html';
  } else {
    alert('用户名或密码错误');
  }
});
