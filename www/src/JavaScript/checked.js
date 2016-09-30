/**
 * Created by my on 2016/9/30.
 */
<!--注册验证-->
$(function(){
    //获取4位的随机码
    function randomCode(){
        var i = 0;
        var str = "";
        while(i < 4){
            var num = getRandom(48,122);
            if(num > 48 && num < 57 || num > 65 && num < 90 || num > 97 && num < 122){
                str += String.fromCharCode(parseInt(num));
                i++;
            }
        }
        return str;
    }
    function isEmail() {
        var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var currentInput = $(".email .acount").eq(0);

        if (currentInput.val() == "") {
            $(".email p").eq(0).removeClass("hidden");
            $(".email p").eq(0).html("注册邮箱不能为空");
        } else if (!regEmail.test(currentInput.val())) {
            $(".email p").eq(0).removeClass("hidden");
            $(".email p").eq(0).html("邮箱格式不正确！");
            currentInput.val("");
            return false;
        } else {
                $(".email p").eq(0).addClass("hidden");
                return true;
        }
    }
    //验证密码
    function isPsw(){
        var regpsw = /^[a-zA-Z]\w{5,17}$/;
        var currentInput = $(".email .psw");

        if (currentInput.val() == "") {
            $(".email p").eq(1).removeClass("hidden");
            $(".email p").eq(1).html("密码不能为空");
        } else if (!regpsw.test(currentInput.val())) {
            $(".email p").eq(1).removeClass("hidden");
            $(".email p").eq(1).html("密码级别较低,重新输入");
            currentInput.val("");
            return false;
        } else {
            $(".email p").eq(1).addClass("hidden");
            return true;
        }
    }
    //验证确认密码
    function istwoPsw(){
        var currentInput = $(".email .twopsw");

        if (currentInput.val() == "") {
            $(".email p").eq(2).removeClass("hidden");
            $(".email p").eq(2).html("确认密码不能为空");
        } else if (currentInput.val() != $(".email .psw").val()) {
            $(".email p").eq(2).removeClass("hidden");
            $(".email p").eq(2).html("两次密码输入不一致");
            currentInput.val("");
            return false;
        } else {
            $(".email p").eq(2).addClass("hidden");
            return true;
        }
    }
    $(".email .acount").blur(function(){
        isEmail();
    });
    $(".email .psw").blur(function(){
        isPsw();
    });
    $(".email .twopsw").blur(function(){
        istwoPsw();
    });

   if($(".email .check").click(function(){
        if(isEmail() && isPsw() && istwoPsw()){
            $(".email .btn").removeClass("disable");
        }
    }));

    //存入Cookie
    function _getDate(num){
        var d = new Date();
        d.setDate(d.getDate() + num);
        return d;
    }

    $(".email .btn").click(function(){
       var username = $(".email .acount").val();
        //当存入@cookie时会出现乱码
        username = username.substring(0,username.search("@"));
        if($.cookie.getAll(username).psw != null){
            alert("用户名已经存在，请重新输入");
        }else{
            $.cookie.setAll(username,{psw:$(".email .psw").val()},_getDate(7));
            window.open("../index.html","_self");
        }
    });
});
