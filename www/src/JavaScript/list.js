/**
 * Created by my on 2016/10/1.
 */

$(function(){
    //在页面添加24个图片信息本身还有一个
    for(var i = 0; i < 23 ;i++){
        $("#listmain .list").append($("#listmain .list dl").eq(0).clone());
    }
    //获取后台信息添加到页面中
    $.getJSON("../JavaScript/tsconfig.json",function(data){
        var length = data.length > 24 ? 24 : data.length;
        $.each(data,function(index,obj){
            var img = document.createElement("img");
            $(img).attr("src",data[index].src);
            $("#listmain .list dl dt").eq(index).append(img);
            $("#listmain .list dl").eq(index).children("dd").eq(0).html(data[index].name);
            $("#listmain .list dl").eq(index).children("dd").eq(1).html(data[index].disc);
            $("#listmain .list dl").eq(index).children("dd").eq(2).html("¥" + data[index].price);
            $("#listmain .list dl").eq(index).children("dd").eq(2).append("&nbsp;<del>¥"+data[index].outdate+"</del>");
        });
        /*$("#listmain .page ul li").find(".num").bind("click",function(){
            if($(this).html()==2){
                console.log(data[25]);
                for(var i = 1;i <= 24;i++){
                    var img = document.createElement("img");
                    var index = $(this).html() * i;
                    $(img).attr("src",data[index].src);
                    $("#listmain .list dl dt").eq(index).append(img);
                    $("#listmain .list dl").eq(index).children("dd").eq(0).html(data[index].name);
                    $("#listmain .list dl").eq(index).children("dd").eq(1).html(data[index].disc);
                    $("#listmain .list dl").eq(index).children("dd").eq(2).html("¥" + data[index].price);
                    $("#listmain .list dl").eq(index).children("dd").eq(2).append("&nbsp;<del>¥"+data[index].outdate+"</del>");
                }
            }
        });*/
    });

    $("#listmain .list dl").click(function(){
        $.cookie.set("index",$(this).index());
        window.open("../html/detail.html");
    });

});
