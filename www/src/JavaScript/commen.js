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
});