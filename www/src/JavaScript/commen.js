/**
 * Created by my on 2016/9/30.
 */
$(function(){
    //sidebar
    //滚动条加可视区域的高度-sidbar自身的高度
    $(window).bind("load scroll resize",function(){
        $("#sidebar").css("top",$(window).scrollTop() + document.documentElement.clientHeight - $("#sidebar").height() - 36+ "px");
    });
    $("#sidebar ul li a").mouseover(
        function(){
            $(this).prev().show();
            $(this).addClass("hover");
        }
    );
    $("#sidebar ul li a").mouseout(
        function(){
            $(this).prev().hide();
            $(this).removeClass("hover");
        }
    );
    //回到顶部
    $("#sidebar .ul2 li:last-child").click(function(event){
        $(document).scrollTop(0);
    });
    //存放当前的json对象
    $.getJSON("JavaScript/package.json",function(data){
        $("#menu .downlist li").on("mouseenter",function(){
            var currentobj;
            var livalue = $(this).find("a").html();
            //设置#twomenu的高度
            $("#menu .twomenu").offset({"top":$(this).parent().offset().top+ ($(this).index()*35)/2});
            $.each(data,function(index,obj){
                if(obj.type == livalue){
                    currentobj = obj;
                }
            });
            $("#menu .twomenu").html("");
            $.each(currentobj.list,function(index,obj){
                //创建一个ul
                var newul = document.createElement("ul");
                $("#menu .twomenu").append(newul);
                var li = document.createElement("li");
                var h4 = document.createElement("h4");
                $(h4).html(obj.title);
                $(li).append($(h4));
                $(newul).append(li);
                $.each(obj.item,function(index,obj){
                    var li = document.createElement("li");
                    $(li).html(obj);
                    $(newul).append(li);
                })
            });
            var btn ="<li><button>进入所有品牌</button></li>";
            $("#menu .twomenu").append(btn);
        });
    });
    $("#menu .wrap ul:first-child").bind("mouseenter",function(){
        $("#menu .downlist").stop().show();
    });
    $("#menu .wrap ul:first-child").bind("mouseleave",function(){
        $("#menu .downlist").stop().hide();
    });
    $("#menu .wrap .downlist").bind("mouseenter",function(){
        $("#menu .twomenu").stop().show();
    });
    $("#menu .wrap .downlist").bind("mouseleave",function(){
        $("#menu .twomenu").stop().hide();
    });
    //搜索框下的列表点击时进入list.html
    $("#autocomplete").focus(function(){
        $(this).keydown(function(event){
            if(event.keyCode == "13"){
                if($("#autocomplete").val() == "搜索 爱马仕箱包"){
                    window.open("html/list.html");
                }else{
                    alert("没有此商品信息");
                }
            }
        });
    });
});

//创建随机数
function getRandom(_min,_max){
    return Math.random() * (_max - _min) + _min;
}
//获取随机颜色
function getColor(){
    return "rgb("+parseInt(getRandom(0,256))+","+parseInt(getRandom(0,256))+","+parseInt(getRandom(0,256))+")";
}

