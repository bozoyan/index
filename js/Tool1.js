var Tool = {
    //获取参数值
    getParam: function (paramName) {
        paramValue = "";
        isFound = false;
        if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
            arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&");
            i = 0;
            while (i < arrSource.length && !isFound) {
                if (arrSource[i].indexOf("=") > 0) {
                    if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                        paramValue = arrSource[i].split("=")[1];
                        isFound = true;
                    }
                }
                i++;
            }
        }
        return paramValue;
    },
    //alert
    alertMsg: function (options) {
        var defaults = {
            width: '470px',
            height: '260px',
            title: '',
            content: '',
            button: false,
            sjParamter: "",
            sj: "",
            bindCancelButton: false,
            cancelsjParamter: "",
            cancelsj: "",
            btnHtml: "",
            reload: false
        };

        var opts = $.extend(defaults, options);

        var btncontent;
        if (opts.button == false) {
            btncontent = '';
        } else if (opts.button == true) {
            btncontent = '<div class="layer_footer"><button class="btn btn_gray btn_130 clause">确 定</button><button class="btn btn_white btn_130 cancel">取 消</button></div>';
            if (opts.btnHtml != "" && opts.btnHtml) {
                btncontent = opts.btnHtml;
            }

        }
        var mag_layer = '<div class="msg_tplayer"></div><div class="msg_outLayer dialog_box" style="width:' + opts.width + ';height:' + opts.height + '"><a class="layer_close" href="javascript:;">Close X</a><h3 class="layer_hd ac">' + opts.title + '</h3><div class="layer_con">' + opts.content + '</div>' + btncontent + '</div>';

        $("body").append(mag_layer);
        var w = $(window).width();
        var h = $(window).height();
        $('.msg_tplayer').css({ width: w, height: h });
        var l = (w - $('.msg_outLayer').width()) / 2;
        var t = (h - $('.msg_outLayer').height() - 100) / 2;
        $('.msg_outLayer').css({ top: t, left: l });

        if ($('.msg_tplayer').css('display') == 'none') {
            $('.msg_tplayer').show().stop().animate({ opacity: 0.7 }, 500, function () {
                $('.msg_outLayer').show().animate({ opacity: 1 }, 500);
            });
        }

        //$('.msg_tplayer').click(function () {
        //    if (!$('.msg_tplayer').is(':animated')) {
        //        $('.msg_outLayer').stop().animate({ opacity: 0 }, 500, function () {
        //            $('.msg_outLayer').remove();
        //            $('.msg_tplayer').stop().animate({ opacity: 0 }, 500, function () {
        //                $('.msg_tplayer').remove();
        //            });
        //        });
        //    }
        //});

        $('.msg_outLayer .layer_close').click(function () {
            $('.msg_outLayer').stop().animate({ opacity: 0 }, 500, function () {
                $('.msg_outLayer').remove();
                $('.msg_tplayer').stop().animate({ opacity: 0 }, 500, function () {
                    $('.msg_tplayer').remove();
                });
            });
            if (opts.reload == true) {
                window.location.reload(true);
            }
        });

        $('.cancel').click(function () {
            $('.msg_outLayer').stop().animate({ opacity: 0 }, 500, function () {
                $('.msg_outLayer').remove();
                $('.msg_tplayer').stop().animate({ opacity: 0 }, 500, function () {
                    $('.msg_tplayer').remove();
                });
            });
        });

        if (opts.button == true) {
            $('.clause').click(function () {
                opts.sj(opts.sjParamter);
            });
            //  alert(opts.bindCancelButton);
            if (opts.bindCancelButton) {
                $('.cancel').unbind("click");

                $('.cancel').click(function () {
                    opts.cancelsj(opts.cancelsjParamter);
                });

            }
        }
    },
    alertMsg1: function (content) {
        this.alertMsg({ width: "470px", height: "260px", title: "", content: content });
    },
    alertMsg2: function (content) {
        this.alertMsg({ width: "470px", height: "260px", title: "", content: content, button: true, btnHtml: '<div class="layer_footer"><button class="btn btn_gray btn_130 cancel">确 定</button></div>' });
    },
    alertMsg3: function (options) {
        var defaults = {
            width: '470px',
            height: '260px',
            title: '',
            content: '',
            button: false,
            sjParamter: "",
            sj: "",
            bindCancelButton: false,
            cancelsjParamter: "",
            cancelsj: "",
            btnHtml: ""
        };

        var opts = $.extend(defaults, options);

        var btncontent;
        if (opts.button == false) {
            btncontent = '';
        } else if (opts.button == true) {
            btncontent = '<div class="layer_footer"><button class="btn btn_gray btn_130 clause">确 定</button><button class="btn btn_white btn_130 cancel">取 消</button></div>';
            if (opts.btnHtml != "" && opts.btnHtml) {
                btncontent = opts.btnHtml;
            }

        }
        var mag_layer = '<div class="msg_tplayer"></div><div class="msg_outLayer dialog_box" style="width:' + opts.width + ';height:' + opts.height + '"><h3 class="layer_hd ac">' + opts.title + '</h3><div class="layer_con">' + opts.content + '</div>' + btncontent + '</div>';

        $("body").append(mag_layer);
        var w = $(window).width();
        var h = $(window).height();
        $('.msg_tplayer').css({ width: w, height: h });
        var l = (w - $('.msg_outLayer').width()) / 2;
        var t = (h - $('.msg_outLayer').height() - 100) / 2;
        $('.msg_outLayer').css({ top: t, left: l });

        if ($('.msg_tplayer').css('display') == 'none') {
            $('.msg_tplayer').show().stop().animate({ opacity: 0.7 }, 500, function () {
                $('.msg_outLayer').show().animate({ opacity: 1 }, 500);
            });
        }

        //$('.msg_tplayer').click(function () {
        //    if (!$('.msg_tplayer').is(':animated')) {
        //        $('.msg_outLayer').stop().animate({ opacity: 0 }, 500, function () {
        //            $('.msg_outLayer').remove();
        //            $('.msg_tplayer').stop().animate({ opacity: 0 }, 500, function () {
        //                $('.msg_tplayer').remove();
        //            });
        //        });
        //    }
        //});
        $('.msg_outLayer .layer_close').click(function () {
            $('.msg_outLayer').stop().animate({ opacity: 0 }, 500, function () {
                $('.msg_outLayer').remove();
                $('.msg_tplayer').stop().animate({ opacity: 0 }, 500, function () {
                    $('.msg_tplayer').remove();
                });
            });
        });
        $('.cancel').click(function () {
            $('.msg_outLayer').stop().animate({ opacity: 0 }, 500, function () {
                $('.msg_outLayer').remove();
                $('.msg_tplayer').stop().animate({ opacity: 0 }, 500, function () {
                    $('.msg_tplayer').remove();
                });
            });
        });

        if (opts.button == true) {
            $('.clause').click(function () {
                opts.sj(opts.sjParamter);
            });
            //  alert(opts.bindCancelButton);
            if (opts.bindCancelButton) {
                $('.cancel').unbind("click");

                $('.cancel').click(function () {
                    opts.cancelsj(opts.cancelsjParamter);
                });

            }
        }
    },
    removeMsg: function () {
        $('.msg_tplayer').remove();
        $('.msg_outLayer').remove();
    },
    //获取异步数据 没授权异步的情况下页面要跳转
    getAjaxData: function (paramter) {
        var msg = $.ajax({
            type: "POST",
            url: paramter.url,
            data: paramter.data,
            cache: false,
            async: false
        }).responseText;
        var json = jQuery.parseJSON(msg);
        if (json.status == "notauthorized") {
            window.location.href = json.loginUrl;
        }
        return json;
    },
    loding: function () {
        var w = $(window).width(),
            h = $(window).height();
        $('body').append("<div class='loading_toplayer'></div><img class='loading_img' src='../images/loading.gif'>");
        var l = (w - $('.loading_img').width()) / 2,
            t = (h - $('.loading_img').height() - 100) / 2;
        $('.loading_toplayer').css({ width: w, height: h });
        $('.loading_img').css({ top: t, left: l });
        $('.loading_toplayer').show().stop().animate({ opacity: 0.7 }, 0, function () {
            $('.loading_img').show();
        });
        $(window).resize(function () {
            var w = $(window).width();
            var h = $(window).height();
            $('.loading_toplayer').css({ width: w, height: h });
            var l = (w - $('.loading_img').width()) / 2;
            var t = (h - $('.loading_img').height() - 100) / 2;
            $('.loading_img').css({ top: t, left: l });
        });
    },
    close_loding: function () {
        $('.loading_toplayer').stop().animate({ opacity: 0 }, 500, function () {
            $('.loading_img').hide();
        });

        $('.loading_toplayer,.loading_img').remove();
    },
    loding2: function (id) {
        var w = $(window).width(),
            h = $(window).height();
        $("#" + id).append("<div class='loading_toplayer'></div><img class='loading_img' src='../images/loading.gif'>");
        var l = (w - $('.loading_img').width()) / 2,
            t = (h - $('.loading_img').height() - 100) / 2;
        $('.loading_toplayer').css({ width: w, height: h });
        $('.loading_img').css({ top: t + 50, left: l });
        $('.loading_img').show();
        $(window).resize(function () {
            var w = $(window).width();
            var h = $(window).height();
            $('.loading_toplayer').css({ width: w, height: h });
            var l = (w - $('.loading_img').width()) / 2;
            var t = (h - $('.loading_img').height() - 100) / 2;
            $('.loading_img').css({ top: t, left: l });
        });
    },
    close_loding2: function () {
        //$('.loading_toplayer').stop().animate({ opacity: 0 }, 500, function () {
        //    $('.loading_img').hide();
        //});
        $('.loading_img').hide();
        $('.loading_toplayer,.loading_img').remove();
    }
};


//$(function () {
//    $("body").bind("ajaxSend", function () {
//        Tool.loding();
//    }).bind("ajaxComplete", function () {
//        Tool.close_loding();
//    }).bind("ajaxError", function () {
//        ////$.messager.ajaxTitle("错误提示", "系统错误，请重新再试");
//        //$.messager.alert("错误提示", "系统错误，请重新再试", "error");
//    });
//});