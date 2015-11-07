var Maxid = 1;
var navigation =
{
    AppendTemp: function (categoryId, cls, List, temp) {
       
        $("#" + categoryId + " " + cls).append(List);
        $("#" + categoryId + " #col" + Maxid).append($(temp).html());
        $(temp).empty();
        Maxid++;
    },
    CategoryCondition: function (obj, temp, categoryId, cls, List) {
        if ($(temp + " li").length == 13 || obj.length > (13 - $(temp + " li").length) || $(temp + " dl").length == 3) {
            this.AppendTemp(categoryId, cls, List, temp);

        }
    },
    GetMenu: function (menu, categoryId) {
        var temp = ".temp";
        var temp1 = ".temp1";
        var left = ".left";
        var right = ".right";
        var types = 1;
        var flag = true;
        for (var i = 1; i <= menu.length ; i++) {
            //alert(Maxid);
            var obj = menu[i - 1];
            types = menu[i - 1][0].type;
            var List = $("<div class='col' id=col" + Maxid + "></div>");
            if (types == 1 && flag) {
                navigation.CategoryCondition(obj, temp, categoryId, left, List);
            } else if (types == 0) {
                if (flag && $(temp + " li").length > 0) {
                    navigation.AppendTemp(categoryId, left, List, temp);
                    flag = false;
                }
                navigation.CategoryCondition(obj, temp1, categoryId, right, List);
            }

            var html = "<dl>";
            var htmlR = "<dl>";
            $.each(obj, function (index, content) {
                if (content['type']) {
                    if (index == 0) {
                        if (content['address'] == "javascript:;") {
                            html += "<dt> "+ content["name"] + "<span class='navArrowRight'></span></dt>";
                        } else {
                            html += "<dt><a href='" + content['address'] + "'>" + content["name"] + "</a><span class='navArrowRight'></span></dt>";
                        }
                        html += "<dd><ul>";
                    } else {
                        html += "<li><a href='" + content['address'] + "'>" + content["name"] + "</a></li>";
                       
                    }
                } else {
                    if (index == 0) {
                        if (content['address'] == "javascript:;") {
                            htmlR += "<dt> " + content["name"] + "<span class='navArrowRight'></span></dt>";
                        } else {
                            htmlR += "<dt><a href='" + content['address'] + "'>" + content["name"] + "</a><span class='navArrowRight'></span></dt>";
                        }
                        htmlR += "<dd><ul>";
                    } else {
                        htmlR += "<li><a href='" + content['address'] + "'>" + content["name"] + "</a></li>";
                       
                    }

                }
            });
            if (types == 1) {
                html += "</ul></dd></dl>";
                $(temp).append(html);
            } else {
                htmlR += "</ul></dd></dl>";
                $(temp1).append(htmlR);
            };
            if (i == menu.length) {
                var List = $("<div class='col' id=col" + Maxid + "></div>");
                $("#" + categoryId + " .right").append(List);
                $("#" + categoryId + " #col" + Maxid).append($(temp1).html());
            };
        };
        //
        $(temp).empty();
        $(temp1).empty();
    },
    SetRight: function(obj, categoryId) {
        if (obj[0] != undefined)
            $("#" + categoryId).find(".subAG").html(obj[0].content);
    },
    fadeNav: function () {
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

        //$('#nav>dl>dt').mouseover(function () {
        //    if (!$(this).siblings('dd').is(':animated')) {
        //        $('#nav').find('.navArrowTop').addClass('hide');

        //        $(this).siblings('dd').show(50, function () {
        //            $(this).find(".submenu").animate({ opacity: 1 }, 500);
        //        });
        //        $(this).find('.navArrowTop').removeClass('hide');

        //        //鼠标经过判断位置
        //        var L = Math.ceil($(this).position().left);
        //        var R = $("#nav").width() - L;
        //        var navContemtw = parseInt($(this).next().find(".submenu").css("width"));
        //        if (navContemtw > L && navContemtw < R) {
        //            $(".submenu").css({ 'left': L, 'right': '' });
        //        } else if (navContemtw > R) {
        //            $(".submenu").css({ 'right': 0, 'left': '' });
        //        } else if (navContemtw < L && navContemtw < R) {
        //            var left = L - (navContemtw / 2);
        //            $(".submenu").css({ 'left': left });
        //        };
        //    };
        //});

        //$('#nav>dl').mouseleave(function () {
        //    $(this).children('dd').find(".submenu").animate({ opacity: 0 }, 100, function () {
        //        $(this).parent('dd').hide();
        //    });

        //    $('#nav').find('.navArrowTop').addClass('hide');
        //});
    },
    getNavigation: function (data) {
        var submenuId = 1;
        var strs = data;
        for (var k = 0; k < strs.length; k++) {
            if (strs[k].left.length > 0) {
                navigation.GetMenu(strs[k].left, "category" + submenuId);
                navigation.SetRight(strs[k].right, "category" + submenuId);
                //if ($.browser.msie && ($.browser.version == "7.0") || $.browser.msie && ($.browser.version == "8.0")) {
                   var submenu = $("#category" + submenuId);
                   var col = submenu.find(".col").length;
                   submenu.width((col * 180) + 278);
               // }

                submenuId++;
            }
        }
        navigation.fadeNav();
    
        //$.ajax({
        //    type: "POST",
        //    url: "/CustomNavigation/GetNavigationList",
        //    success: function(msg) {
        //        strs = $.parseJSON(msg);
        //        for (var k = 0; k < strs.length; k++) {
        //            if (strs[k].left.length > 0) {
        //                navigation.GetMenu(strs[k].left, "category" + submenuId);
        //                navigation.SetRight(strs[k].right, "category" + submenuId);
        //                submenuId++;
        //            }
        //        }
        //        fadeNav();
        //    }
        //});
    }
};