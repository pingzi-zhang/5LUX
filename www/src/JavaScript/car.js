/**
 * Created by my on 2016/10/3.
 */
$(function(){
    //获取cookie中的商品信息
    //获取操作的div
    var span = false;
    var allnum = 0;
    var allprice = 0;
    var $ordermes = $("#carmain .orderMes");
    var $list = $ordermes.find(".list");
    //分割出每条cookie信息
    var allcookie = document.cookie.split(";");
    for(var i = 0;i < allcookie.length;i++){
        var key = allcookie[i].split("=");
        if(key[0].substring(0,3) == " id"){
            //当前key为id大头的
            var currentpro = $.cookie.getAll(key[0].trim());
            //将每条商品信息添加到购物车页面
            var newul = $list.find("ul:first").clone();
            span = true;
            $(newul).find("img").attr("src",currentpro.src);
            $(newul).find("p").html(currentpro.disc);
            $(newul).find(".unitPrice").html(currentpro.price);
            $(newul).find(".price").html(currentpro.price * currentpro.num);
            $list.append(newul);
        }
    }
    if(span == false){
        $ordermes.hide();
    }
    //删除用于样式拷贝的第一个ul
    $list.find("ul:first").remove();

    //删除按钮的事件
    $list.find("ul").find(".oper .del").on("click",function(){
      $(this).parent().parent().remove();
    });
    //全部删除
    $list.next().find(".clearCar").on("click",function(){
        $(this).parent().prev().remove();
    });

    $ordermes.find(".bottom").find(".pay").click(function(){
        alert("需付款" + $ordermes.find(".bottom").find(".pricebox").find(".totalprice").html().substring(1) + "元");
    });
    $ordermes.find(".bottom").find(".goshop").click(function(){
        window.open("../index.html");
    });

    //选择框的操作
    var allflag = 0;
    $ordermes.find(".title").find("input").on("click",function(){
        if(allflag == 0){
            $.each($list.find("ul").find(".checkbox"),function(index,obj){
                obj.checked = true;
                allflag = 1;
                //全选时显示价格和价钱
                //$.each($list.find(".ul1"),function(){
                //    allprice += parseInt($(this).find(".price").html());
                //    allnum += parseInt($(this).find(".number").find(".txt").val());
                //});
                //show_num_price(allnum,allprice);
            })
        }else{
            $.each($list.find("ul").find(".checkbox"),function(index,obj){
                obj.checked = false;
                allflag = 0;
            })
        }
    });

    var flag = 1;
    $list.find("ul").find(".checkbox").on("click",function(){
        flag = 1;
        for(var i = 0;i < $list.find("ul").find(".checkbox").length;i++){
            if($list.find("ul").find(".checkbox")[i].checked == false){
                flag = 0;
            }
        }
        if(flag == 0){
            $ordermes.find(".title").find("input")[0].checked = false;
            allflag = 0;
            flag = 0;
        }else{
            $ordermes.find(".title").find("input")[0].checked = true;
            flag = 1;
            allflag = 1;
        }
    });
    //选择框的结束
    //统计一共有多少个商品当checkbox被选中时才统计一共有多少件商品
     //数量的加减
    $list.find("ul").find(".checkbox").on("click",function(){
        allnum += parseInt($(this).parent().parent().find(".number").find(".txt").val());
        allprice += parseInt($(this).parent().parent().find(".price").html());
        if($(this)[0].checked == true){
            $(this).parent().parent().find(".number").find("input.sub").on("click",function(){
                var $txt = $(this).next();
                if ($txt.val() > 0) {
                    $txt.val($txt.val() - 1);
                    $txt.parent().siblings(".price").html($txt.val() * $txt.parent().siblings(".unitPrice").html());
                    allnum--;
                    allprice = allprice - $(this).parent().parent().find(".unitPrice").html();
                    show_num_price(allnum,allprice);
                }
            });
            $(this).parent().parent().find("input.add").on("click",function (){
                var $txt = $(this).prev();
                $txt.val(parseInt($txt.val()) + 1);
                $txt.parent().siblings(".price").html($txt.val() * $txt.parent().siblings(".unitPrice").html());
                allnum++;
                allprice = allprice + parseInt($(this).parent().parent().find(".unitPrice").html());
                $ordermes.find(".bottom").find(".pricebox").find("span").eq(1).html(allnum);
                $ordermes.find(".bottom").find(".pricebox").find("span").eq(0).html("¥"+allprice);
            });
        }else{
            //allnum -= $(this).parent().parent().find(".number").find("input.txt").val();
        }
        show_num_price(allnum,allprice);
    });
    //显示总数和总价钱
    function show_num_price(allnum,allprice){
        $ordermes.find(".bottom").find(".pricebox").find("span").eq(1).html(allnum);
        $ordermes.find(".bottom").find(".pricebox").find("span").eq(0).html("¥"+allprice);
    }
});

