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
});