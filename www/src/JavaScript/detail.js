/**
 * Created by my on 2016/10/1.
 */
$(function(){
    var index;
    var $imgbox = $("#detailmain .pro .imgbox");
    var $bigimg = $("#detailmain .pro .bigimg");
    $.getJSON("../JavaScript/tsconfig.json",function(data){
        for(var i = 0;i < data.length;i++){
            if(data[i].id == $.cookie.get("index")){
                index = $.cookie.get("index");
                break;
            }
        }
        //设置页面的当前点击的图片
        $imgbox.children("img").attr("src",data[index -1].src);
        $bigimg.children("img").attr("src",data[index -1].src);
        $("#detailmain .pro .list img").eq(0).attr("src",data[index -1].src);
        $("#detailmain .pro .list img").eq(1).attr("src",data[index -1].list1);
        $("#detailmain .pro .list img").eq(2).attr("src",data[index -1].list2);
        $("#detailmain .pro .list img").eq(3).attr("src",data[index -1].list3);
        $("#detailmain .pro .list img").eq(4).attr("src",data[index -1].list4);
        $("#detailmain .detail .box").eq(3).children("img").eq(1).attr("src",data[index -1].src);
        $("#detailmain .detail .box").eq(3).children("img").eq(2).attr("src",data[index -1].list1);
        $("#detailmain .detail .box").eq(3).children("img").eq(3).attr("src",data[index -1].list2);
        $("#detailmain .detail .box").eq(3).children("img").eq(4).attr("src",data[index -1].list3);
        $("#detailmain .detail .box").eq(3).children("img").eq(5).attr("src",data[index -1].list4);
    });

    //放大镜和list的滚动
    var current = 1;
    $("#detailmain .pro .left .list .prev").click(function(){
        $(this).siblings("div").find("ul").stop().animate({left:-80 * current++});
        if(current >= 5){
            current = 5;
        }
    });

    $("#detailmain .pro .left .list .next").click(function(){
        current--;
        if(current <= 0){
            current = 0;
        }
        $(this).siblings("div").find("ul").stop().animate({left:-400 + 80 * (5 - current)});
    });

    /*小图的单击事件*/
    $("#detailmain .pro .left .list img").click(function(){
        $imgbox.children("img").attr("src",$(this).attr("src"));
        $bigimg.children("img").attr("src",$(this).attr("src"));
    });

    $imgbox.mouseover(function(){
        $bigimg.show();
        $imgbox.children("span").show();
    });
    $imgbox.mouseout(function(){
        $bigimg.hide();
        $imgbox.children("span").hide();
    });
    $imgbox.mousemove(function(event){
        //得到的是span相对于imgbox的左边距
         var spanleft = event.pageX - $("#detailmain .pro .left").offset().left;
         var spantop = event.pageY - $("#detailmain .pro .left").offset().top;

         var imgboxtop = $imgbox.offset().top;
         var imgboxleft = $imgbox.offset().left;

         var bigimgleft = $("#detailmain .pro .left .bigimg").offset().left;
         var bigimgtop = $("#detailmain .pro .left .bigimg").offset().top;

         $imgbox.children("span").offset({top:event.pageY-$imgbox.children("span")[0].offsetHeight/2,
             left:event.pageX-$imgbox.children("span")[0].offsetWidth/2});
         $bigimg.children("img").offset({ top:bigimgtop - (spantop-$imgbox.children("span")[0].offsetHeight/2)*2.17,
            left:bigimgleft  -(spanleft-$imgbox.children("span")[0].offsetWidth/2)*2.15});
       //边界判断
        if(event.pageY <= imgboxtop + $imgbox.children("span").innerHeight()/2){
            $imgbox.children("span").offset({top:imgboxtop});
            $bigimg.children("img").offset({ top:bigimgtop});
        }
        if(event.pageY >= imgboxtop + $imgbox.innerHeight()-$imgbox.children("span").innerHeight()/2){
            $imgbox.children("span").offset({top:imgboxtop + $imgbox.innerHeight() - $imgbox.children("span").innerHeight()});
            //$bigimg.children("img").offset({ top: bigimgtop- (spantop-$imgbox.children("span")[0].offsetHeight/2)*2.17});
            $bigimg.children("img").offset({ top: bigimgtop- ($bigimg.innerHeight() -$imgbox.children("span").innerHeight())*2.17});
        }

        if(event.pageX <= imgboxleft + $imgbox.children("span").innerWidth()/2){
            $imgbox.children("span").offset({left:imgboxleft});
            $bigimg.children("img").offset({ left:bigimgleft});
        }
        if(event.pageX >= imgboxleft + $imgbox.innerWidth()-$imgbox.children("span").innerWidth()/2){
            $imgbox.children("span").offset({left:imgboxleft + $imgbox.innerWidth() - $imgbox.children("span").innerWidth()});
            $bigimg.children("img").offset({ left:bigimgleft - ($bigimg.innerWidth() -$imgbox.children("span").innerWidth())*2.15});
        }
    });
});