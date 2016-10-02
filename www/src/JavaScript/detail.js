/**
 * Created by my on 2016/10/1.
 */
$(function(){
    var index;
    $.getJSON("../JavaScript/tsconfig.json",function(data){
        for(var i = 0;i < data.length;i++){
            if(data[i].id == $.cookie.get("index")){
                index = $.cookie.get("index");
                break;
            }
        }
        //设置页面的当前点击的图片
        $("#detailmain .pro .imgbox").attr("src",data[index -1].src);
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
});