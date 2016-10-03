/**
 * Created by my on 2016/9/29.
 */
$(function(){
    var clearTime = null;
    var $index = 0;
    var $qiandex = 0;
    $("#banner .btn span").mouseover(function() {
        clearInterval(clearTime);
        $index = $(this).index(); //获取序列号
        scrollPlay();
        $qiandex = $index; //把当前的值赋给下一次的前一个序列号
    }).mouseout(function(){
        autoPlay();
    });
    $("#banner .next").click(function() {
        $index++;
        if ($index > 5) {
            $index = 0;
            $qiandex = 5;
        }
        scrollPlay()
        $qiandex = $index;
        clearInterval(clearTime);
        autoPlay();
    });
    $("#banner .prev").click(function() {
        $index--;
        if ($index < 0) {
            $index = 5;
            $qiandex = 0;
        }
        scrollPlay()
        $qiandex = $index;
        clearInterval(clearTime);
        autoPlay();
    });


    autoPlay();

    function autoPlay() {
        clearTime = setInterval(function() {
            $index++;
            if ($index > 5) {
                $index = 0;
                $qiandex = 5;
            }
            scrollPlay();
            $qiandex = $index;
        }, 2000);

    }

    function scrollPlay() {
        $("#banner .btn span").eq($index).addClass("hover").siblings().removeClass("hover");
        if ($index == 0 && $qiandex == 5) {
            $("#banner .scroll img").eq($qiandex).stop(true, true).animate({
                "left": "-1440px"
            });
            $("#banner .scroll img").eq($index).css("left", "1440px").stop(true, true).animate({
                "left": "0"
            });
        } else if ($index == 5 && $qiandex == 0) {
            $("#banner .scroll img").eq($qiandex).stop(true, true).animate({
                "left": "1440px"
            });
            $("#banner .scroll img").eq($index).css("left", "-1440px").stop(true, true).animate({
                "left": "0"
            });
        } else if ($index > $qiandex) { //左移
            $("#banner .scroll img").eq($qiandex).stop(true, true).animate({
                "left": "-1440px"
            });
            $("#banner .scroll img").eq($index).css("left", "1440px").stop(true, true).animate({
                "left": "0"
            });
        } else if ($index < $qiandex) { //右移
            $("#banner .scroll img").eq($qiandex).stop(true, true).animate({
                "left": "1440px"
            });
            $("#banner .scroll img").eq($index).css("left", "-1440px").stop(true, true).animate({
                "left": "0"
            });
        }
    }
    $(".banner").hover(function(){

        $(" .prev,.next").stop().fadeIn(500);

    },function(){
        $(" .prev,.next").stop().fadeOut(500);
    });
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
            console.log($(this).parent().offset().top);
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
});