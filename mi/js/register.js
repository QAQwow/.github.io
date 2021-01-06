var span = document.querySelector('span');

function checkUsername() {
  var reg = /^[a-z]\w{4,7}$/i;
  var username = document.querySelector('#username').value;
  if (reg.test(username)) {
    span.innerHTML = '用户名可以注册';
    $('span').removeClass('eer').addClass('hot');
    return true;
  } else {
    span.innerHTML = '用户名必须是字母开头,5-8位的字母数字';
    $('span').removeClass('hot').addClass('eer');
  }
}

/* $('#btn').click(function () {}); */

var form = document.querySelector('form');
$('#btn').click(function () {
  //点击提交,再次监测用户和密码是否合格,如果有一个不合格,就不跳转
  if (!checkUsername()) {
    //阻止表单的默认提交
    e = window.event || e;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  } else {
    alert('注册成功');
    $.ajax({
      url: '../js/json/login.json',
      data: {
        username: $('#username').val(),
        password: $('#password').val(),
      },
      dataType: 'json',
      success: function (res) {
        if (res.code == 1) {
          // 注册成功，信息添加到本地存储，方便同域名下的其他页面访问
          localStorage.setItem($('#username').val(), $('#password').val());
          location.href = './login.html';
        }
      },
    });
  }
});
