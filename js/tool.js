//function shopping_cart() {
//    $("#cart").mouseover(function () {
//        $(".shopping_cart_top").show();
//    }).mouseout(function () {
//        $(".shopping_cart_top").hide();
//    });
//}
function cartHide() {
    $(".shopping_cart_top").fadeOut();
}

function cartAdd(obj) {
    //$(obj).click(function () {
    //$('body,html').stop().animate({ scrollTop: 0 }, 500, function () {
        //$('body,html').stop();
      
        // })
       
    //});
    $(".shopping_cart_top").fadeIn();
    var settime = setTimeout("cartHide()", 2000);
    $(".shopping_cart_top").mouseover(function () {
        clearTimeout(settime);
    });
}




function searchAnimate() {
    $("#searchtext").focus(function () {
        $("#searchtext").animate({ width: "140" });
    }).blur(function () {
        $("#searchtext").animate({ width: '90px' });
    })
}




function sidebar() {
    $("#side dl").click(function () {
        if ($(this).hasClass('open') == false) {
            $("#side dl").removeClass('open').find("dd").slideUp();
            var i = $("#side dl").index(this);
            $("#side dl").eq(i).addClass('open').find("dd").slideDown();
        };
    });
};

function slide_UpDown(slide_tit, slide_con) {
    $(slide_tit).click(function () {
        if ($(this).hasClass('open') == false) {
            $(slide_tit).removeClass('open').next(slide_con).slideUp();
            //alert(12)
            var i = $(slide_tit).index(this);
            $(slide_tit).eq(i).addClass('open').next(slide_con).slideDown();

        };
    });
}


function delLayOut() {
    $(".del").click(function () {
        $(this).find(".item_del").fadeIn();
        $(this).find(".item_del .btn").click(function () {
            $(this).parent().parent().parent().find(".item_del").fadeOut();
            return false;
        });
    });
}

function coupon() {
    $(".coupon").click(function () {
        $(".coupon_list").removeClass("hide");
        $(this).parent().parent().addClass('hide');
    });
    $(".number").click(function () {
        $(this).parent().parent().parent().hide();
        $(".coupon_input").fadeIn();
    });
    $(".Single").click(function () {
        $(this).parent().parent().parent().hide();
        $(".coupon_list").fadeIn();
    });

}

function goTop() {
    var gotop = "<a class='p_ScrollTopBtn' title='Go to Top'></a>";
    if ($('.p_ScrollTopBtn').length == 0) {
        $('body').append(gotop);
    }
    //var w = (($(window).width() - 950) / 2)-55;
    //$(".gotop").css({ right: w }).hide();
    $(".p_ScrollTopBtn").hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".p_ScrollTopBtn").show();
        }
        else {
            $(".p_ScrollTopBtn").hide();
        }
    });
    $(".p_ScrollTopBtn").click(function () {
        $('body,html').stop().animate({ scrollTop: 0 }, 1000, function () {
            $('body,html').stop();
        });
        var bh = $(window).height() - 186;
        $(".p_ScrollTopBtn").hide();

    });
}

function topNav_shadow() {

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $('.topnav').addClass('topNav_shadow');
        } else {
            $('.topnav').removeClass('topNav_shadow');
        }
    });


}

function inputTips() {
    $(".password").focus(function () {
        $(this).nextAll(".signIn_item_del").show()
    }).blur(function () {
        $(this).nextAll(".signIn_item_del").hide()
    });

    if ($(".password_way").length > 0) {
        $(".password_way").change(function () {
            window.open($(this).val());
        })
    }
}


function productGallery() {
    $(".product_gallery li").click(function () {
        var newSrc = $(this).find("img").attr("data-src");
        var panoramaSrc = $(this).find("img").attr("data-panorama");
        var url = $(this).find("img").attr("data-url");
        var title = $(this).find("img").attr("data-title");
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(this).closest(".product").find(".img").find("img").first().attr("src", newSrc);
        $(this).closest(".product").find(".img").find("img").last().attr("src", panoramaSrc);
        $(this).closest(".product").find(".img").find("a").attr({ "href": url, 'title': title });
        $(this).closest(".product").find('h4 a').attr({ 'href': url, 'title': title }).html(title);
    });

    //$(".img").mouseover(function () {
    //    var newNum = $(this).find("img").length;
    //    var obj = $(this);
    //    if (newNum == 2) {
    //        //alert(111);
    //        obj.find("img").first().hide();
    //        obj.find("img").last().show();
    //    }
    //}).mouseout(function () {
    //    var obj = $(this);
    //    obj.find("img").last().hide();
    //    obj.find("img").first().show();
    //});
}


function sortBy() {
    $(".condition dt").click(function () {
        $(".dropDown").hide();
        //$(this).nextAll(".dropDown").slideToggle(100);
        var classname = $(this).nextAll(".dropDown").attr("class");

        if (classname == "dropDown hide") {
            $(this).nextAll(".dropDown").slideToggle(100).removeClass("hide");
            // alert(123);
        } else if (classname == "dropDown") {
            $(this).nextAll(".dropDown").show().addClass("hide");
        };
    });


    $(".dropDown li").click(function () {
        var con = $(this).find("ins").html();
        $(this).parents(".dropDown").hide().addClass("hide");
        if ($(".s_category").hasClass('hide')) {
            $(".s_category").removeClass('hide');
        }
        var appcon = ' <span><i class="close"></i>' + con + '</span>';
        $("#category_type").append(appcon);
        $("#category_del").show();
    });
    $(".close").live("click", function () {
        //$(this).parents("span").remove();
        //if ($("#category_type span").length == 0) {
        //    $("#category_del").hide();
        //    $(".s_category").addClass('hide');
        //}
    })
    $("#category_del").live("click", function () {
        $("#category_type").html("");
        $("#category_del").hide();
        $(".s_category").addClass('hide');
    })
}





function select(obj, content) {
    $(obj).click(function () {
        var con = $(this).find("a").html();
        $(this).parents(content).hide().addClass("hide");
        var appcon = con + '<span class="select_arrow"></span>'
        $(this).parents(content).prevAll("dt").html(appcon);
    });
};

//function qty(plus, minus, obj) {
//    $(obj).blur(function () {
//        if ($(obj).val() == '') {
//            $(obj).val(1);
//        };
//        if ($(obj).val() == '0') {
//            $(obj).val(1);
//        };
//    });
//    $(plus).click(function () {
//        var newObj = $(this).parent().find(obj)
//        var s = newObj.val();//获得同一index的元素的值
//        newObj.val(parseInt(s) + 1);  //做加法
//    });
//    $(minus).click(function () {
//        var newObj = $(this).parent().find(obj)
//        var s = newObj.val();
//        if (s > 1) {
//            newObj.val(parseInt(s) - 1);
//        };
//    });
//};


//tab切换.控制tab菜单当前选中状态
function tab(obj, content) {
    $(obj + " li").click(function () {
        $(obj + " li").removeClass("active");
        $(this).addClass("active");
        var i = $(this).index();
        $(content).addClass('hide');
        $(content).eq(i).removeClass('hide');
    });
};

function addressAdd() {
    $(".add_list input[name='address']").click(function () {
        if ($("input[type='radio']:checked").val() == "address") {
            $("#new_add").removeClass('hide');
            $("#shipping_btn").hide();
        } else {
            $("#new_add").addClass('hide');
            $("#shipping_btn").show();
        }
    });

}
function article() {
    var article_len = $(".articles_list li").length;

    //for (i = 1; i < article_len; i++)
    //{
    //    if (i % 2 == 1)
    //    {
    //        $(".articles_list li").eq(i).css("padding-left","34px");
    //    }
    //}

    if (article_len % 2 == 1) {
        $(".articles_list li").eq(article_len - 1).width(940);
    }

}

function share(obj, content) {
    $(obj).click(function () {
        $(this).parents().find(content).slideToggle(200);
    });
};


function fadeNav() {
    $('#nav>dl>dt').mouseover(function () {
        if (!$(this).siblings('dd').is(':animated')) {
            $('#nav').find('.navArrowTop').addClass('hide');
            var ww = $(this).next().find(".submenu").css("width");
            $(this).next().width(ww);
            $(this).siblings('dd').show(300, function () {
                $(this).find(".submenu").animate({ opacity: 1 }, 200);
            });

            $(this).find('.navArrowTop').animate({ opacity: 1 }, 500);


            //鼠标经过判断位置
            var L = Math.ceil($(this).position().left);
            var R = $("#nav").width() - L;
            var navContemtw = parseInt($(this).next().find(".submenu").css("width"));
            if (navContemtw > L && navContemtw < R) {
                $(this).next().css({ 'left': L, 'right': '' });
            } else if (navContemtw > R) {
                $(this).next().css({ 'right': 0, 'left': '' });
            } else if (navContemtw < L && navContemtw < R) {
                var left = L - (navContemtw / 2);
                $(this).next().css({ 'left': left });
            };
        };
    });

    $('#nav>dl').mouseleave(function () {
        $(this).children('dd').find(".submenu").animate({ opacity: 0 }, 100, function () {
            $(this).parent('dd').hide();
        });

        $('#nav').find('.navArrowTop').animate({ opacity: 0 }, 100);
    });
}


//OutLayer
function OutLayer(obj, position) {
    var w = $(window).width();
    var h = $(window).height();

    $('.tplayer').css({ width: w, height: h });



    $(obj).click(function () {
        var s = $(window).scrollTop();
        var l = (w - $('.out_layer').width()) / 2;
        var t = (h - $('.out_layer').height() - 100) / 2;
        $('.out_layer').css({ top: t, left: l });

        if ($('.tplayer').css('display') == 'none') {
            $('.tplayer').show().stop().animate({ opacity: 0.7 }, 500, function () {
                $('.out_layer').show().animate({ opacity: 1 }, 500);
            });
        }
        if (position == 'absolute') {
            $('.out_layer').css({ top: (s + t), left: l });
        }
    })
    $('.tplayer').click(function () {
        if (!$('.tplayer').is(':animated')) {
            $('.out_layer').stop().animate({ opacity: 0 }, 500, function () {
                $('.movielayer_content').empty();
                $('.out_layer').hide();
                $('.tplayer').stop().animate({ opacity: 0 }, 500, function () {
                    $('.tplayer').hide();
                });
            });
        }

    });
    $('.out_layer .layer_close , .cancel').click(function () {
        $('.out_layer').stop().animate({ opacity: 0 }, 500, function () {
            $('.out_layer').hide();
            $('.tplayer').stop().animate({ opacity: 0 }, 500, function () {
                $('.tplayer').hide();
            });
        });

    });

    $(window).resize(function () {
        var w = $(window).width();
        var h = $(window).height();
        $('.tplayer').css({ width: w, height: h });
        var l = (w - $('.out_layer').width()) / 2;
        var t = (h - $('.out_layer').height() - 100) / 2;
        $('.out_layer').css({ top: t, left: l });
        var s = $(window).scrollTop();
        if (position == 'absolute') {
            $('.out_layer').css({ top: (s + t), left: l });
        }
    });
}

function zoomImg() {
    $(".zoomIcon").click(function () {
        var newSrc = $(this).parents(".item_img").find("img").attr("data-src");
        var largerMap = $(".largerMap_layer").find("img");
        $(largerMap).attr('src', newSrc);
    });

}

function Refer_Movie(obj) {
    var w = $(window).width();
    var h = $(window).height();
    $('.tplayer').css({ width: w, height: h });
    var l = (w - $('.out_layer').width()) / 2;
    var t = (h - $('.out_layer').height() - 100) / 2;
    $('.out_layer').css({ top: t, left: l });

    $(obj).live("click", function () {
        var id = $(this).attr("data-id");
        var collect = $(this).attr("data-store");
        $(".moviestore a").attr("data-mid", id);
        var datasrc = $(this).find("img").attr("data-src");

        //$('.movielayer_content').append('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="780" height="480"><param name="movie" value="/Resources/prodcut/vcastr.swf?vcastr_file=' + datasrc + '&IsAutoPlay=1"><param name="quality" value="high"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><embed src="/Resources/prodcut/vcastr.swf?vcastr_file=' + datasrc + '&IsAutoPlay=1" allowfullscreen="true" wmode="transparent" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="780" height="480"></object>');
        var so = new SWFObject("/Resources/prodcut/harborhouse.swf", "CuPlayerV4", "780", "480", "9", "#000000");
        so.addParam("allowfullscreen", "true");
        so.addParam("allowscriptaccess", "always");
        so.addParam("wmode", "opaque");
        so.addParam("quality", "high");
        so.addParam("salign", "lt");
        so.addVariable("CuPlayerSetFile", "/Resources/prodcut/harborhouseflv.xml");
        so.addVariable("CuPlayerWidth", "780");
        so.addVariable("CuPlayerHeight", "480");
        so.addVariable("CuPlayerAutoPlay", "yes");
        so.addVariable("CuPlayerImage", "/Resources/images/harborhouseflvbg.jpg");
        so.addVariable("CuPlayerPosition", "bottom-right");
        so.addVariable("CuPlayerFile", datasrc);
        so.write("harborhouseflv");
        if ($('.tplayer').css('display') == 'none') {
            $('.tplayer').show().stop().animate({ opacity: 0.7 }, 500, function () {
                $('.out_layer').show().animate({ opacity: 1 }, 500);
            });
        }
        if (collect == "false") {
            $(".movie_layer a").find("img").attr("src", "../Resources/prodcut/movie_store.png")
            $(".movie_layer").addClass('active');
        } else {
            $(".movie_layer a").find("img").attr("src", "../Resources/prodcut/movie_stored.png")
            $(".movie_layer").addClass('active');
        }

    });

    //$(".HHLife_liststore li a").live("click", function () {
    //    var i = $(this).attr("data-index");
    //    var datasrc = $(".HHLife_liststore li").eq(i).find("img").attr("data-src");
    //    $('.movielayer_content').append('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="780" height="480"><param name="movie" value="/Resources/prodcut/vcastr.swf?vcastr_file=' + datasrc + '&IsAutoPlay=1"><param name="quality" value="high"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><embed src="/Resources/prodcut/vcastr.swf?vcastr_file=' + datasrc + '&IsAutoPlay=1" allowfullscreen="true" wmode="transparent" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="780" height="480"></object>');
    //    if ($('.tplayer').css('display') == 'none') {
    //        $('.tplayer').show().stop().animate({ opacity: 0.7 }, 500, function () {
    //            $('.out_layer').show().animate({ opacity: 1 }, 500);
    //        });
    //    }

    //});

    $(".moviestore").click(function() {
        if ($(this).find("img").attr("src") == "../Resources/prodcut/movie_store.png") {
            $(this).find("img").attr("src", "../Resources/prodcut/movie_stored.png");
            var i = $(this).find("a").attr("data-mid");
            $(".HHLife_list li").eq(i - 1).find("a").attr("data-store", "true");
        }
    });


    $('.movieclose').click(function () {
        $('.movie_layer').stop().animate({ opacity: 0 }, 500, function () {
            $('.movielayer_content').empty();
            $('.movie_layer').hide();
            $(".movie_layer").removeClass('active');
            $('.tplayer').stop().animate({ opacity: 0 }, 500, function () {
                $('.tplayer').hide();
                $(".movie_layer").removeClass('active');
            });
        });
    });
    //$("#videolayer").click(function () {
    //  $('.movie_layer').stop().animate({ opacity: 0 }, 500, function () {
    //    $('.movielayer_content').empty();
    //    $('.movie_layer').hide();
    //    $(".movie_layer").removeClass('active');
    //    $('.tplayer').stop().animate({ opacity: 0 }, 500, function () {
    //      $('.tplayer').hide();
    //      $(".movie_layer").removeClass('active');
    //    });
    //  });
    //});
    $(window).resize(function () {
        var w = $(window).width();
        var h = $(window).height();
        $('.tplayer').css({ width: w, height: h });
        var l = (w - $('.out_layer').width()) / 2;
        var t = (h - $('.out_layer').height() - 100) / 2;
        $('.out_layer').css({ top: t, left: l });
    });

}


/*
名称：修改一排显示单个的宽度
作者：jessica
时间：2014-09-28
*/
function ChangeWidth(contents, number) {
    for (i = 0; i < $(contents).length; i++) {
        $(contents).eq(i).attr(number + (i + 1));
        var len = $(number + (i + 1) + " li").length;
        if (len % 2 == 1) {
            $(number + (i + 1) + " li").eq(len - 1).width(830);
        }
    }
}
/*
名称：锚点滚动跳转
作者：jessica
时间：2014-09-28
*/
function anchorScroll(obj, title) {
    $(obj).click(function () {
        var i = $(this).index();
        var h = $(title).eq(i).offset().top;
        $('body,html').animate({ scrollTop: h }, 1000);
        //$(".shopcity").eq(i).ScrollTo(800);
    });
    $(obj).last().find("span").empty();

}

function faq() {
    $(".question").click(function () {
        $(this).next(".answer").slideToggle();
        if ($(this).hasClass("open") == false) {
            $(this).addClass("open");
        } else {
            $(this).removeClass("open");
        }
    });
}

function shopaddressline() {
    for (i = 0; i < $(".shopaddresslist").length; i++) {
        var li_len = $(".shopaddresslist").eq(i).find("li").length;
        if (li_len % 2 == 1) {
            $(".shopaddresslist").eq(i).find("li:last").css("width", "930px");
        }
    }
}
function guideSide() {
    $(".guideSide h3").click(function () {
        if ($(this).next("ul").css("display") == "none") {
            $(".subnav").slideUp();
            $(this).next("ul").slideDown();
        }
    })
}
function manipulate() {

    $(".manipulate").find("a:first").click(function () {
        $(".manipulate").find("a").removeClass("active");
        $(this).html("默认地址");
        $(this).parent().parent().siblings().find("a:first").html("设为默认");
        $(".manipulate").find("a").next().removeClass("none");
        $(this).addClass("active");
        $(this).next().addClass("hide");
        $(this).parent().prev().find("input:radio").attr("checked", "checked");
    })

    if ($(".add_list").length > 4) {
        $(".add_list:gt(2)").addClass("hide");
        $(".showalladd").show();
    }
    $(".showalladd").click(function () {
        $(".add_list:gt(2)").removeClass("hide");
        $(".showalladd").hide();
    })
}
function checkgiftsize() {
    for (i = 0; i < $(".gift_content").length; i++) {
        if (($(".gift_content").eq(i).find(".gift_product").length) % 2 == 1) {

            if ($(".gift_content").eq(i).find(".gift_product:last").height() < $(".gift_content").eq(i).find(".gift_product").eq($(".gift_content").eq(i).find(".gift_product").length - 2).height()) {
                var h1 = $(".gift_content").eq(i).find(".gift_product:last").height();
                $(".gift_content").eq(i).find(".gift_product:last").height(h1);
                $(".gift_content").eq(i).find(".gift_product:last").removeClass("fl");
            }

        }
        for (j = 0; j < $(".gift_content").eq(i).find(".gift_product").length; j += 2) {

            if ($(".gift_content").eq(i).find(".gift_product").eq(j).height() > $(".gift_content").eq(i).find(".gift_product").eq(j + 1).height()) {
                $(".gift_content").eq(i).find(".gift_product").eq(j + 1).height($(".gift_content").eq(i).find(".gift_product").eq(j).height());
            }
            else {
                $(".gift_content").eq(i).find(".gift_product").eq(j).height($(".gift_content").eq(i).find(".gift_product").eq(j + 1).height());
            }

        }
    }
}

function roomidealstore() {
    $(".favorites").find("a").click(function () {
        var $element = $(this);
        var id = $(this).attr("data-id");
        var room = $(this).attr("data-room");
        var index = $(this).attr("data-index");
        var target = $(this).attr("data-target");
        var href = location.href;
        $.ajax({
            url: '/CustomerCollect/CollectAfflatusRoom',
            data: { id: target, room: room, index: index, pageurl: href },
            cache: false,
            async: false,
            success: function (data) {
                var json = $.parseJSON(data);
                if (json.state) {
                    $element.html("已收藏");
                    $element.css("color", "#C2B59B");
                    $($(".roomthumb_list li").get(id - 1)).attr('data-store', "true");
                } else {
                    location.href = json.msg;
                }
            }
        });
    })
}

for (i = 0; i < $(".HHLife_liststore li").length; i += 6) {
    $(".HHLife_liststore li").eq(i).css("margin-left", "0");
}

function freegiftlayer(layer, obj, closes, floatLeft) {
    var w = $(window).width();
    var h = $(window).height();
    $(layer).css({ width: w, height: h });
    var l = (w - $(obj).outerWidth()) / 2;
    var l2 = (w - 1200) / 2;
    var t = (h - $(obj).height() - 100) / 2;
    if (floatLeft) {
        $(obj).css({ top: t, left: l2 });
    } else {
        $(obj).css({ top: t, left: l });
    }
    if ($(layer).css('display') == 'none') {
        $(layer).show().stop().animate({ opacity: 0.7 }, 400, function () {
            $(obj).show().animate({ opacity: 1 }, 400);
        });
    }


    $(layer).click(function () {
        $(obj).stop().animate({ opacity: 0 }, 400, function () {
            $(obj).hide();
            $(layer).stop().animate({ opacity: 0 }, 400, function () {
                $(layer).hide();
            });
        });

    });
    $(closes).click(function () {
        $(obj).stop().animate({ opacity: 0 }, 400, function () {
            $(obj).hide();
            $(layer).stop().animate({ opacity: 0 }, 400, function () {
                $(layer).hide();
            });
        });

    });
    $(window).resize(function () {
        var w = $(window).width();
        var h = $(window).height();
        $(layer).css({ width: w, height: h });
        var l = (w - $(obj).outerWidth()) / 2;
        var l2 = (w - 1200) / 2;
        var t = (h - $(obj).height() - 100) / 2;
        if (floatLeft) {
            $(obj).css({ top: t, left: l2 });
        } else {
            $(obj).css({ top: t, left: l });
        }
    });

}
function cookiefun() {
    if ($.cookie("isClose") != "yes") {
        freegiftlayer(".bgLayer", ".activityLayer", ".layer_close");
    }
    $(".activityLayer .layer_close").click(function () {
        if ($('.onlyOnce').is(':checked')) {
            var cookietime = new Date();
            cookietime.setTime(cookietime.getTime() + (30 * 24 * 60 * 60 * 1000));
            $.cookie("isClose", "yes", { expires: cookietime });
        }
    });
}

function findstyle() {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 244) {
            $('.findstyle-menu').addClass('findstyle-fixed');
        } else {
            $('.findstyle-menu').removeClass('findstyle-fixed');
        }
    });
}

$(function () {
    $("#allclad_movie").click(function () {
        $("#moviediv").show();
        $("#nasp_content").append("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='900' height='500'><param name='movie' value='http://img.harborhousehome.com/images/defaultpage/201404/vcastr.swf?vcastr_file=http://img.harborhousehome.com/images/defaultpage/201410/900X500all.flv&IsAutoPlay=1'><param name='quality' value='high'><param name='allowFullScreen' value='true' /><param name='wmode' value='transparent' /><embed src='http://img.harborhousehome.com/images/defaultpage/201404/vcastr.swf?vcastr_file=http://img.harborhousehome.com/images/defaultpage/201410/900X500all.flv&IsAutoPlay=1' allowFullScreen='true' wmode='transparent' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='900' height='500'></embed></object>");
    })

    $("#usapan_movie").click(function () {
        $("#moviediv").show();
        $("#nasp_content").append("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='900' height='500'><param name='movie' value='http://img.harborhousehome.com/images/defaultpage/201404/vcastr.swf?vcastr_file=http://img.harborhousehome.com/images/defaultpage/201410/usa900500.flv&IsAutoPlay=1'><param name='quality' value='high'><param name='allowFullScreen' value='true' /><param name='wmode' value='transparent' /><embed src='http://img.harborhousehome.com/images/defaultpage/201404/vcastr.swf?vcastr_file=http://img.harborhousehome.com/images/defaultpage/201410/usa900500.flv&IsAutoPlay=1' allowFullScreen='true' wmode='transparent' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='900' height='500'></embed></object>");
    })

    $(".sp_close").click(function () {
        $("#moviediv").hide();
        $("#nasp_content").empty();
    });
    //$(".create_menu li").last().css("margin-right", "0");
    $(".create_menu li").click(function () {
        var i = $(this).index();
        $(".create_menu li").removeClass("active");
        $(this).addClass("active");
        $(".newcontent").hide();
        $(".newcontent").eq(i).show();
    })
    //shopping cart heaer
    //shopping_cart();
    //
    //cartAdd("#cart_add");
    //cartAdd("#cart_add1");
    // addressAdd();
    //product list sidebar 
    sidebar();
    //delete alert shopping cart page
    delLayOut();
    //coupon  shopping cart page
    //coupon();
    //gotop all
    goTop();
    //input tips all
    inputTips();
    //productGallery product detail page
    //productGallery();
    //sort by prodcut list page
    sortBy();
    $(document).bind("click", function (e) {
        var tagName = $(e.target).parent().parent();
        var tag_arrow = $(e.target).parent().parent().parent();
        if ($(tag_arrow).hasClass('condition') == true) {
            $(this).parent().nextAll(".dropDown").slideToggle(100).removeClass("hide");
        } else if ($(tagName).hasClass('condition') == false) {
            $(".dropDown").hide();
        }
    });
    //qty all
    //qty(".plus", ".minus", ".qty_val");
    //prodct detail page
    tab("#detail_Coupon", ".p_combo_body");//优惠信息
    tab("#detail_description", ".p_content");//优惠菜单
    tab(".menber_tab", ".menber_content");
    article();
    share(".share_on", ".p_share");
    share(".house_info_tit a", ".house_info");
    OutLayer(".clause");
    OutLayer(".zoomIcon");
    OutLayer(".addressBtn");
    OutLayer(".change_info", "absolute");
    OutLayer(".msgDerail");
    // OutLayer(".msgDerail"); 

    //zoomImg();
    //shopaddress();
    slide_UpDown(".slide_menu h3", ".subnav");
    ChangeWidth(".shopaddresslist", "#shopaddresslist"); //全国门店修改li宽度
    anchorScroll(".shopaddressmenu li", ".shopcity"); //全国门店锚点跳转
    select(".order_condition li", ".order_condition dd");
    faq();
    checkgiftsize();
    guideSide();
    fadeNav();
    shopaddressline();
    //manipulate();
    searchAnimate();
    roomidealstore();
    topNav_shadow();// topNav 添加阴影效果
    Refer_Movie(".HHLife_list li a");
    Refer_Movie(".HHLife_liststore li a");
    Refer_Movie(".video_icon");
    findstyle();
});
