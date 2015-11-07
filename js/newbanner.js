;(function ($, document, window, undefined) {//闭包开始
    $.fn.gallery_scroll = function (options) {
        var defaults = {
            'navlist': '',
            'imglist': '',
            'regionalobj': '',
            'leftprevobj': '',
            'rightnextobj': ''
        }
        var settings = $.extend(defaults, options);
        //图像切换
        var aPage = $(settings.navlist);
        var aImg = $(settings.imglist);
        var regional = $(settings.regionalobj);
        var leftprev = $(settings.leftprevobj);
        var rightnext = $(settings.rightnextobj);
        var iSize = aImg.length - 1; //图像个数
        var index = 0; //切换索引
        
        if (!aImg.eq(0).hasClass("current")) {
            aImg.eq(0).addClass("current");
        }

        aImg.first().css({ 'z-index': 2, 'opacity': 1 });
        aImg.not(".current").css({ 'z-index': 0, 'opacity': 0 });

        //切换过程
        function change() {
            aImg.removeClass("current");
            aImg.eq(index).addClass("current").stop().animate({ 'z-index': 2, 'opacity': 1 }, 1000);
            aImg.not(".current").stop().animate({ 'z-index': 0, 'opacity': 0 }, 1000);
            aPage.removeClass('active');
            aPage.eq(index).addClass('active');
        }

        function imgtime() {
            index++;
            if (index > iSize) {
                index = 0
            }
            change();
        }

        if (aImg.length == 1) {
            aPage.parent().hide();
            leftprev.hide();
            rightnext.hide();
        }

        if (leftprev.hasClass("hide") && rightnext.hasClass("hide")) {
            regional.mouseover(function() {
                leftprev.removeClass("hide");
                rightnext.removeClass("hide");
            }).mouseleave(function() {
                leftprev.addClass("hide");
                rightnext.addClass("hide");
            })
        }


//分页按钮点击
        aPage.mouseover(function() {
            index = $(this).index();
            change();
        });

        //prev按钮
        leftprev.click(function() {
            index = $(".current").index() - 1;
            if (index < 0) {
                index = iSize
            }
            change();
        });

        //next按钮
        rightnext.click(function() {
            index = $(".current").index() + 1;
            if (index > iSize) {
                index = 0
            }
            change();
        });

        //自动轮播
        var srcollimg = setInterval(imgtime, 5000);
        regional.mouseover(function() {
            clearInterval(srcollimg);
        }).mouseleave(function() {
            srcollimg = setInterval(imgtime, 5000);
        });

    };
})(jQuery, document, window);//闭包结束
$(function() {
    if ($(".newbanner").length > 0) {
        $(".newbanner").gallery_scroll({
            'navlist': '.newbannerlist>li',
            'imglist': '.newbannerpic>li',
            'regionalobj': '.newbanner',
            'leftprevobj': '.newbanner_prev',
            'rightnextobj': '.newbanner_next'
        });
    }

    if ($(".homebanner").length > 0) {
        $(".homebanner").gallery_scroll({
            'navlist': '.homebannernav>li',
            'imglist': '.homebannerlist>li',
            'regionalobj': '.homebanner',
            'leftprevobj': '.newbanner_prev',
            'rightnextobj': '.newbanner_next'
        });
    }

    if ($(".guide_tabPic").length > 0) {
        $(".guide_tabPic").gallery_scroll({
            'navlist': '.tabPic_list>li',
            'imglist': '.tabPic_wrapper>li',
            'regionalobj': '.guide_tabPic'
        });
    }

    if ($(".shopbanner").length > 0) {
        $(".shopbanner").gallery_scroll({
            'navlist': '.shopnavlist>li',
            'imglist': '.shopbannerpic>li',
            'regionalobj': '.shopbanner'
        });
    }

    if ($(".SeriesBanner").length > 0) {
        $(".SeriesBanner").gallery_scroll({
            'navlist': '.SeriesBannerNav>li',
            'imglist': '.SeriesList>li',
            'regionalobj': '.SeriesBanner_directionnav',
            'leftprevobj': '.newbanner_prev',
            'rightnextobj': '.newbanner_next'
        });
    }


});
