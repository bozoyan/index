//jCarouselLite调用
function Carousel(obj, leftArrow, rightArrow, num) {
    $(obj).jCarouselLite({
        btnNext: rightArrow,
        btnPrev: leftArrow,
        visible: num,
        circular: false,
        vertical: false
    });
}
function Carousel2(obj, leftArrow, rightArrow, num) {
    $(obj).jCarouselLite({
        btnNext: rightArrow,
        btnPrev: leftArrow,
        visible: num,
        circular: false,
        vertical: true
    });
}
function scrollimg(obj, prev, next) {
    $(obj).mouseover(function () {
        if ($(obj).find("li").length > 5) {
            $(obj).find(next).removeClass('hide').parent().find(prev).removeClass('hide');
        }
    }).mouseout(function () {
        $(obj).find(prev).addClass('hide').parent().find(next).addClass('hide');
    });
};


/*
作者：jessica
修改时间：2014/10/15
功能：产品详情页产品颜色展示
*/
function TooltipPic() {
    $("#p_Color>a>img").mouseover(function () {       
        if ($(this).hasClass('btn_disable') == false) {
            var dataSrc = $(this).attr('data-src');
            $(this).parent().append('<div class="tooltip_pic"><span class="arrowDown_icon"></span><img width="80" height="80" src="' + dataSrc + '" /></div>');
        };
    }).mouseout(function () {
        // alert($(this).parent().html());
        $(this).next().remove();
    });
}



function detail_img() {
    $(".pImg_gallery li img").on("click", function () {
        $(".pImg_gallery li").removeClass("p_selected");
        $(this).parent().parent().addClass("p_selected");
    });
}
$(function () {
    //产品图片展示
    detail_img();



    /*
     //控制赠品列表显示或隐藏
    $(".p_gift .ArrowDown").click(function () {
        $(this).parent().parent().find(".giftwrapper").slideToggle();
    });

  //材质选择，控制默认最多显示8条，点击more显示全部
    $(".texture a:gt(7)").hide();
    if ($(".texture a").length > 8) {
      $(".texture a.more").show();
    }
    $(".texture a.more").click(function () {
       $(".texture a").show();
       $(this).hide();
    });
    */


    //tab切换+图片滚动
    function tabscroll(obj, content) {
        $(obj + " li").click(function () {
            $(obj + " li").removeClass("active");
            $(this).addClass("active");
            var i = $(this).index();
            $(content).addClass('hide');
            $(content).eq(i).removeClass('hide');
            var module_name = $(content).eq(i);
            if ($(module_name).hasClass("p_styleWrapper")) {
                Carousel(".p_styleWrapper", ".style_ArrowLeft", ".style_ArrowRight", 5);
            } else if ($(module_name).hasClass("p_priceWrapper")) {
                //product price
                Carousel(".p_priceWrapper", ".price_ArrowLeft", ".price_ArrowRight", 5);
            } else if ($(module_name).hasClass("p_hotWrapper")) {
                //product price
                Carousel(".p_hotWrapper", ".hot_ArrowLeft", ".hot_ArrowRight", 5);
            }


            //if (i == 1) {
            //    //product price
            //    Carousel(".p_priceWrapper", ".price_ArrowLeft", ".price_ArrowRight", 5);
            //} else if (i == 2) {
            //    //product hot 
            // Carousel(".p_hotWrapper", ".hot_ArrowLeft", ".hot_ArrowRight", 5);
            //} 


        })
    }
    //detail grallery
    // Carousel(".pImg_gallery", ".p_imgArrowLeft", ".p_imgArrowRight", 5);
    //product style
    Carousel(".p_styleWrapper", ".style_ArrowLeft", ".style_ArrowRight", 5);
    Carousel(".p_priceWrapper", ".style_ArrowLeft", ".style_ArrowRight", 5);
    Carousel(".p_hotWrapper", ".style_ArrowLeft", ".style_ArrowRight", 5);
    //roomideas
    Carousel2(".roomthumb_list", ".roomidea_Left", ".roomidea_right", 5);

    //函数调用
    //tabscroll("#detail_product", ".Pwrapper");
    tabscroll("#detail_product .p_scombo_tab", ".Pwrapper");
    scrollimg(".productImg_list", ".p_imgArrowLeft", ".p_imgArrowRight");
    scrollimg(".p_styleWrapper", ".style_ArrowRight", ".style_ArrowLeft");
    scrollimg(".p_hotWrapper", ".hot_ArrowRight", ".hot_ArrowLeft");
    scrollimg(".p_priceWrapper", ".price_ArrowRight", ".price_ArrowLeft");
    TooltipPic();
});
