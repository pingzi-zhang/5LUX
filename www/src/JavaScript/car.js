/**
 * Created by my on 2016/10/3.
 */
$(function(){
    function _getDate(num) {
        var d = new Date();
        d.setDate(d.getDate() + num);
        return d;
    }
    //获取cookie中的商品信息
    //获取操作的div
    var space = false;
    var allnum = 0;
    var allprice = 0;
    var $ordermes = $("#carmain .orderMes");
    var $list = $ordermes.find(".list");
    //$.cookie.setAll(_id,{disc: _disc, src: _img, price: _price,
    //    num:$pro.find(".right").find(".mes").find(".txt").val()});
    //分割出每条cookie信息显示在页面的信息
    function show(){
        var allcookie = document.cookie.split(";");
        for(var i = 0;i < allcookie.length;i++){
            var key = allcookie[i].split("=");
            if(/id/.test(key[0])){
                //当前key为id大头的
                var currentpro = $.cookie.getAll(key[0].trim());
                //将每条商品信息添加到购物车页面
                var newul = $list.find("ul:first").clone();
                space = true;
                $(newul).find(".all input").attr("id",currentpro.id);
                $(newul).find("img").attr("src",currentpro.src);
                $(newul).find("p").html(currentpro.disc);
                $(newul).find(".unitPrice").html(currentpro.price);
                $(newul).find(".number .txt").val(currentpro.num);
                $(newul).find(".price").html(currentpro.price * currentpro.num);
                $list.append(newul);
            }
        }
    }
    show();
    //删除用于样式拷贝的第一个ul
    $list.find("ul:first").remove();
    if(space == false){
        $list.remove();
        $ordermes.find(".bottom").remove();
        $ordermes.append("<h2 class='space'>当前还没有商品哦！！</h2>");
        $ordermes.append("<button class='gotoindex' onclick=goto()>去首页看看>></button>");
        $ordermes.find(".gotoindex").on("click",function(){
            window.open("../index.html","_self");
        });
    }
    //删除按钮的事件
    $list.find("ul").find(".oper .del").on("click",function(){
        save($(this).parent().parent().find(".all .checkbox").attr("id"),"2",-3);
        window.location.reload();
    });
    //全部删除
    $list.next().find(".clearCar").on("click",function(){
        $(this).parent().prev().find("ul .all .checkbox").each(function(index){
            save($(this).attr("id"),"2",-3);
        });
        window.location.reload();
    });

    $ordermes.find(".bottom").find(".pay").click(function(){
        alert("需付款" + $ordermes.find(".bottom").find(".pricebox").find(".totalprice").html().substring(1) + "元");
    });
    $ordermes.find(".bottom").find(".goshop").click(function(){
        window.open("../index.html");
    });


    //存入cookie
    function save(_id,num,expr){
        var allcookie = document.cookie.split(";");
        for(var i = 0;i < allcookie.length;i++){
            var key = allcookie[i].split("=");
            if(_id == key[0].trim()){
                var currentpro = $.cookie.getAll(key[0].trim());
                var _id = key[0].trim();
                var _disc = currentpro.disc;
                var _src = currentpro.src;
                var _price = currentpro.price;
                var _num = num;
                $.cookie.setAll(_id,{id:_id,disc: _disc, src: _src, price: _price,
                    num:_num},_getDate(expr));
            }
        }
    }
    //刷新数据的函数
    function refreshTotal(){
        var checkedbox = $list.find(".all").find("input:checked");
        var total = 0;
        var numall = 0;
        checkedbox.each(function(i, value){
            var num = $.cookie.getSub($(this).attr("id"),"num") || 0;
            var price = $.cookie.getSub($(this).attr("id"),"price") || 0;
            numall += parseInt(num);
            total += num *price;
        })
        show_num_price(numall,total);
    }
    //根据加减操作 obj $id0是要操作的那一条cookie记录 type是加是减
    function oprNum(obj, type){
        var id = $list.find(".all").find("#" + obj);
        var num = $.cookie.getSub(id.attr("id"),"num") || 0;
        if (type == "+") {
            save(id.attr("id"),++num,7);
            id.parent().parent().find(".number .txt").val(num);
        }
        if (type == "-") {
            if (num > 1) {
                save(id.attr("id"),--num,7);
                id.parent().parent().find(".number .txt").val(num);
            }
        }
        var unitprice =parseInt($list.find("ul").find("#"+obj).parent().parent().find(".unitPrice").html()) ;
        $list.find("ul").find("#"+obj).parent().parent().find(".price").html( unitprice * num);
        refreshTotal();
    }

    //选择框的操作全选
    var allflag = 0;
    $ordermes.find(".title").find("input").on("change",function(){
        if(allflag == 0){
            $.each($list.find("ul").find(".checkbox"),function(index,obj){
                obj.checked = true;
                allflag = 1;
            })
        }else{
            $.each($list.find("ul").find(".checkbox"),function(index,obj){
                obj.checked = false;
                allflag = 0;
            })
        }
        refreshTotal();
    });

    //单个选择框的操作全选
    $("#carmain .list ul .checkbox").bind("change", function(){
        refreshTotal();
        //console.log($("#carmain .list ul .checkbox:checked").length);
        if($("#carmain .list ul .checkbox").length == $("#carmain .list ul .checkbox:checked").length){
            $ordermes.find(".title").find("input")[0].checked = true;
        }else{
            $ordermes.find(".title").find("input")[0].checked = false;
        }
    })

    //显示总数和总价钱
    function show_num_price(allnum,allprice){
        $ordermes.find(".bottom").find(".pricebox").find("span").eq(1).html(allnum);
        $ordermes.find(".bottom").find(".pricebox").find("span").eq(0).html("¥"+allprice);
    }

    $list.find("input.add").on("click",function (){
        oprNum($(this).parent().parent().find(".all input").attr("id"), "+");
    });

    $list.find(".number").find("input.sub").on("click",function(){
        oprNum($(this).parent().parent().find(".all input").attr("id"), "-");
    });

});

