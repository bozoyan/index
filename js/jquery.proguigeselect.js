/// <reference path="Scripts/JSLINQ.js" />


; (function ($) {
    /*Description : 商品规格选择器*/

    
    var inAutoSelectedMode = false; // 进入自动选择模式
    var autoSelectedStep = 0;       // 自动选择步数
    var autoSelectedHref = [];      // 自动选择链接集合
    var inSelectedMode = false;     // 是否是选中模式

    // 1. 页面渲染, 根据JSON初始化规格代码
    function parseHtml($element) {
        var data = getProductJson($element);
        var options = $element.data('options');
        if (data == undefined) {
            console.error('data not init!');
            return;
        }
        initHtml($element, data, options);
        initNodesState($element, options, data);

        // 默认SKU，初始化选中!
        if (options.defaultSku != "") {
            var defaultRecord = JSLINQ(data).Where(function (c) { return c.Sku == options.defaultSku; }).Select(function (c) { return c; }).First();
            $.each(options.ggJson, function (index, item) {
                var nodes = $element.find("#p_" + item.type + " a");
                if (!nodes.hasClass("btn_s_active")) {
                    nodes.each(function () {
                        if ($(this).attr('title') == eval("defaultRecord." + item.type)) {
                            clickEvent($(this), $element);
                        }
                    });
                }
            });
        }
    }

    //  1.1 初始化HTML
    function initHtml($element, data, options) {
        var result = "";
        $.each(options.ggJson, function (index, item) {
            var tempData = JSLINQ(data).Select(function (i) { return eval("i." + item.type); }).Distinct(function (i) { return i; }).items;
            var html = "";
            var nodeHtml = "";
            $.each(tempData, function (i, d) {
                if (item.isImg) {
                    var url = JSLINQ(data).Where(function (j) { return eval("j." + item.type + "=='" + d + "'"); })
                                          .Select(function (j) { return eval("j." + item.imgField); })
                                          .Distinct(function (j) { return j; }).items;
                    var url_80_80 = JSLINQ(data).Where(function (j) { return eval("j." + item.type + "=='" + d + "'"); })
                                           .Select(function (j) { return j.ColorUrl_80_80; })
                                           .Distinct(function (j) { return j; }).items;
                    nodeHtml += options.tp_img_node.replace('{0}', d).replace('{1}', url[0]).replace("{2}", url_80_80[0]);
                } else {
                    nodeHtml += options.tp_font_node.replace('{0}', d).replace('{1}', d);
                }
            });

            if (nodeHtml != "") {
                if (item.isImg) {
                    html = options.tp_img.replace('{0}', item.cnName).replace('{1}', item.type).replace('{2}', nodeHtml);
                } else {
                    html = options.tp_font.replace('{0}', item.cnName).replace('{1}', item.type).replace('{2}', nodeHtml);
                }
            }
            result += html;
        });
        if (options.forGift) {
            $($element.find('.gift_info_name').get(0)).after(result);
        } else {
            $element.find("dl:not('.qty_container,.ldz')").each(function () { $(this).remove(); });
            $element.prepend(result);
        }
    }

    //    1.4 初始化节点状态
    function initNodesState($element, options, data) {
        var isEventTypeOneNode = 0;
        $.each(options.ggJson, function (index, item) {
            var nodes = $element.find('#p_' + item.type + ' a');
            
            nodes.each(function () {
               // console.log(nodes.length);
                if (nodes.length > 1) {
                    $(this).live('click', function () {
                        clickEvent($(this), $element);
                    });
                } else {
                    $(this).addClass('btn_s_active');
                    isEventTypeOneNode++;
                }
            });
        });
        if (isEventTypeOneNode == options.ggJson.length) {
            if (!options.isMain) {
                $.each(options.ggJson, function (index, item) {
                    var nodes = $element.find('#p_' + item.type + ' a');
                    nodes.each(function () {
                        $(this).css({ "border-color": "#d1d3d4", "box-shadow": "1px 1px 1px rgba(0, 0, 0, 0)" });
                    });
                });
            }
            var defaultRecord = JSLINQ(data).Where(function (c) { return c.Sku == options.defaultSku }).Select(function (c) { return c; }).First();
            options.whenTiggerAnchorCallBack($element.attr('id'), defaultRecord);
            if (options.isMain)
            {
                if (options.isTiggerAnchor && defaultRecord.Sku != "") {
                    // 锚标记处理
                    $('body').append('<a id="md"></a>').find('#md').live('click', function () { location.href = '#' + defaultRecord.Sku; });
                    $('body').find('#md').click();
                    $('body').find('#md').remove();
                }
                $('#btn_reselect').hide();
            }
        }
    }

    // 2. 点击事件
    function clickEvent($a, $element) {
        var sourceJson = getProductJson($element);
        var options = $element.data('options');

        // 如果是禁用状态? 不执行
        if ($a.hasClass('btn_disable')) return;

        // 触发规格的选中不选中功能
        $a.parent().find('a').each(function () {
            if ($(this).attr('title') != $a.attr('title')) {
                $(this).removeClass('btn_s_active');
            }
        });
        $a.toggleClass("btn_s_active");

        // 触发锚点事件
        tiggerAnchor($element);

        // 判断选中的节点是否
        inSelectedMode = $a.hasClass('btn_s_active');

        if (inSelectedMode == false) {
            options.whenNotAllNodeSelectedCallBack($element.attr('id'), sourceJson);
        }

        // 计算步骤索引器
        setStepIndexContainer($a, $element);

        // 找出所有选中的节点.
        var $seletedElements = $element.find(".btn_s_active");

        // 根据所有选中的节点，过滤数据
        var newJson = search($seletedElements, sourceJson, options);

        // 规格区块的ID, p_size,p_color
        var tag = "";
        if (inSelectedMode) {
            tag = $a.parent().attr('id');
        } else {
            var stepIndexContainer = $element.data('step');
            if (stepIndexContainer.length > 0) {
                tag = JSLINQ(stepIndexContainer).OrderByDescending(function (item) { return item.sort }).First().type;
            }
        }

        // 改变节点状态
        changeNodeState(tag, $element, $seletedElements, newJson, inSelectedMode, options);
    }

    //  2.1 步骤索引器计算
    function setStepIndexContainer($a, $element) {
        var stepIndexContainer = $element.data('step');
        // 索引器排序最大值
        var max = 0;
        // 如果索引器不为NULL，取索引器重最大的sort值.
        if (stepIndexContainer.length > 0)
            max = JSLINQ(stepIndexContainer).OrderByDescending(function (item) { return item.sort }).First(function (item) { return item; }).sort + 1
        if ($a.hasClass('btn_s_active')) {
            // 节点是选中状态, 加入索引器
            var isExistSameType = JSLINQ(stepIndexContainer).Any(function (item) { return item.type == $a.parent().attr('id'); });
            for (var i = 0; i < stepIndexContainer.length; i++) {
                if (stepIndexContainer[i].type == $a.parent().attr('id')) {
                    stepIndexContainer.splice(i, 1);
                    break;
                }
            }
            stepIndexContainer.push({ type: $a.parent().attr('id'), data: $a.attr('title'), sort: max });
        } else {
            // 节点是非选中状态, 从索引器中移除
            for (var i = 0; i < stepIndexContainer.length; i++) {
                if (stepIndexContainer[i].type == $a.parent().attr('id')) {
                    stepIndexContainer.splice(i, 1);
                    break;
                }
            }
        }
    }

    //  2.2 根据选中的条件，获取查询结果
    function search($seletedElements, sourceJson, options) {
        var query = JSLINQ(sourceJson);
        $seletedElements.each(function () {
            var value = $(this).attr('title');
            var tag = $(this).parent().attr('id');
            $.each(options.ggJson, function (index, item) {
                if ("p_" + item.type == tag) {
                    query = query.Where(function (c) { return eval("c." + item.type + "=='" + value + "'") || value == ""; });
                }
            });
        });
        return query.Select(function (item) { return item; }).items;
    }

    //  2.3 更新节点状态
    function changeNodeState(tag, $element, $seletedElements, newJson, isNodeSelected, options) {
        // 找出每个区块的节点对象.
        // 根据过滤后的JSON，获取每个区块对应的JSON
        // 设置每个区块的节点状态
        $.each(options.ggJson, function (index, item) {
            var i = 0;
            var nodes = $element.find('#p_' + item.type + ' a');
            var nodeJson = JSLINQ(newJson).Select(function (c) { return eval("c." + item.type); }).Distinct(function (c) { return c; }).items;
            changeNodes(nodes, nodeJson, $element);
        });

        // PS:此块功能是为了实现，当前操作块的特殊逻辑
        var stepcontainer = $element.data('step');
        var sourceJson = getProductJson($element);
        $.each(stepcontainer, function (index, item) {
            var query = JSLINQ(sourceJson);
            $.each(stepcontainer, function (index2, item2) {
                if (item.type != item2.type) {
                    query = query.Where(function (c) { return eval("c." + item2.type.replace("p_", "") + "=='" + item2.data + "'") || item2.data == ""; });
                }
            });
            $.each(stepcontainer, function (index2, item2) {
                if (item.type == item2.type) {
                    var enableData = query.Select(function (c) { return eval("c." + item2.type.replace("p_", "")); }).items;
                    $.each(options.ggJson, function (index3, item3) {
                        if (("p_" + item3.type) == item2.type) {
                            var nodes = $element.find('#p_' + item3.type + ' a');
                            nodes.each(function () {
                                var title = $(this).attr('title');
                                for (var i = 0; i < enableData.length; i++) {
                                    if (enableData[i] == title) {
                                        $(this).removeClass('btn_disable').removeClass('btn_s_active');
                                        $(this).find('img').removeClass('btn_disable');
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
        $seletedElements.each(function () { $(this).addClass('btn_s_active'); });
        if (inSelectedMode) {
            if (inAutoSelectedMode == false) {
                var autoIndex = 0;
                autoSelectedHref = [];
                $.each(options.ggJson, function (index, item) {
                    var i = 0;
                    var nodes = $element.find('#p_' + item.type + ' a');
                    var nodeJson = JSLINQ(newJson).Select(function (c) { return eval("c." + item.type); }).Distinct(function (c) { return c; }).items;
                    if (nodeJson.length == 1 && !nodes.hasClass("btn_s_active")) {
                        autoIndex++;
                        nodes.each(function () {
                            if (!$(this).hasClass("btn_s_active") && !$(this).hasClass("btn_disable")) {
                                autoSelectedHref.push($(this));
                            }
                        });
                    }
                });
                if (autoIndex > 0) {
                    inAutoSelectedMode = true;
                    autoSelectedStep = autoIndex;
                    clickEvent(autoSelectedHref.pop(), $element);
                };
            } else {
                if (inAutoSelectedMode) {
                    autoSelectedStep--;
                    if (autoSelectedStep == 0) inAutoSelectedMode = false;
                }
            }
        }
    }

    // 2.4 根据选中的条件， 排除本身点击的节点，获取查询结果
    function searchWithOutCurrentNode(curFor, $seletedElements, isNodeSelected, $element, options) {
        var sourceJson = getProductJson($element);
        var query = JSLINQ(sourceJson);
        var tag = "";
        $seletedElements.each(function () {
            var value = $(this).attr('title');
            if (isNodeSelected) {
                tag = $(this).parent().attr('id');
            } else {
                var stepIndexContainer = $element.data('step');
                if (stepIndexContainer.length > 0)
                    tag = JSLINQ(stepIndexContainer).OrderByDescending(function (item) { return item.sort }).Select(function (item) { return item.type; }).First();
            }
            $.each(options.ggJson, function (index, item) {
                if (("p_" + item.type) == tag) {
                    query = query.Where(function (c) {
                        var r = true;
                        if (curFor != tag) {
                            r = eval("c." + item.type + "=='" + value + "'") || value == "";
                        }
                        return r;
                    });
                }
            });
        });
        return query.Select(function (item) {
            for (var i = 0; i < options.ggJson.length; i++) {
                if ("p_" + options.ggJson[i].type == curFor) {
                    return eval("item." + options.ggJson[i].type);
                }
            }
        }).items;
    }

    //  2.3 正常更新节点状态
    function changeNodes(nodes, json, element) {
        if (nodes == undefined) return;
        if (nodes.length == 1) return;
        nodes.each(function () {
            $(this).removeClass('btn_s_active').addClass('btn_disable');
            $(this).find('img').addClass('btn_disable');
        });
        $.each(json, function (index, item) {
            nodes.each(function () {               
                if ($(this).attr('title') == item) {
                    $(this).find('img').removeClass('btn_disable');
                    $(this).removeClass('btn_disable');
                }
            });
        });
    }

    // 2.5 返回Sku
    function getSku($element) {
        var data = getProductJson($element);
        var options = $element.data('options');
        var ggCount = $element.find('.p_prop').length;
        var $selectEmelements = $element.find('.btn_s_active');
        if (ggCount == $selectEmelements.length) {
            var query = JSLINQ(data);
            $selectEmelements.each(function () {
                var id = $(this).parent().attr("id");
                var value = $(this).attr('title');
                $.each(options.ggJson, function (index, item) {
                    if ("p_" + item.type == id) {
                        query = query.Where(function (c) { return eval("c." + item.type + "=='" + value + "'"); });
                    }
                });
            });
            return query.Select(function (item) { return item.Sku; }).First();
        }
        return "";
    }

    // 2.6 触发锚点事件
    function tiggerAnchor($element) {
        // debugger;
        var options = $element.data('options');
        var data = getProductJson($element);
        var sku = getSku($element);

        if (options.isTiggerAnchor && sku != "") {
            // 锚标记处理
            $('body').append('<a id="md"></a>').find('#md').live('click', function () { location.href = '#' + sku; });
            $('body').find('#md').click();
            $('body').find('#md').remove();
        }
        if (sku != "") {
            var selector = $element.attr('id');
            $('[for="' + selector.replace("#", "") + '-notselected"]').addClass('hide');
            var defaultRecord = JSLINQ(data).Where(function (c) { return c.Sku == sku }).Select(function (c) { return c; }).First();            
            options.whenTiggerAnchorCallBack(selector, defaultRecord);
        }
    }

    // 2.7 返回Product
    function getProduct($element)
    {
        var data = getProductJson($element);
        var options = $element.data('options');
        var ggCount = $element.find('.p_prop').length;
        var $selectEmelements = $element.find('.btn_s_active');
        if (ggCount == $selectEmelements.length) {
            var query = JSLINQ(data);
            $selectEmelements.each(function () {
                var id = $(this).parent().attr("id");
                var value = $(this).attr('title');
                $.each(options.ggJson, function (index, item) {
                    if ("p_" + item.type == id) {
                        query = query.Where(function (c) { return eval("c." + item.type + "=='" + value + "'"); });
                    }
                });
            });
            return query.Select(function (item) { return item; }).First();
        }
        return null;
    }

    // 为何要以这种方式来获取Default数据呢？ 因为涉及到js对象的深拷贝与前拷贝问题，目前未找到好方案.
    function getDefaluts() {
        var defaults = {};
        defaults = {
            tp_font: '<dl class="p_prop texture clearfix"><dt class="fl">{0}</dt><dd id="p_{1}"> {2} </dd></dl>',
            tp_font_node: ' <a class="btn btn_s_detail" title="{0}" href="javascript:">{1}</a> ',
            tp_img: '<dl class="p_prop texture p_img clearfix"><dt class="fl lineHeight36">{0}</dt><dd id="p_{1}">{2}</dd></dl>',
            tp_img_node: ' <a title="{0}" class="btn btn_s_detail btn_img" href="javascript:"><img src="{1}" width="30" height="30" data-src="{2}"></a> ',
            //tp_img_empty_node: ' <a title="{0}" class="btn btn_s_detail btn_img Prl5" href="javascript:">{1}</a> ',
            isTiggerAnchor: false, // 是否触发锚点.
            defaultSku: '',    // 默认选中记录.
            ggJson: [
                { type: "Material", cnName: '材质', isImg: false, imgField: '' },
                { type: "Color", cnName: '颜色', isImg: true, imgField: 'ColorUrl' },
                { type: "Specification", cnName: '规格', isImg: false, imgField: '' }],
            whenTiggerAnchorCallBack: function (selector, product) { }, // 确认选中SKU后，触发回调函数
            whenNotAllNodeSelectedCallBack: function (selector, products) { },
            forGift: false,
            isMain: false,      
            isDingZhi: false    //是否定制
        };
        return defaults;
    }

    function getProductJson($element) {
        var options = $element.data('options');
        var data = $element.data('data');

        //if (options.isMain) {
        if (options.isDingZhi == false) {
            var tempData = JSLINQ(data).Where(function (item) { return item.Salesstates != "ZS"; }).Select(function (item) { return item; }).items;
            //if (tempData.length == 0) return data;
            return tempData;
        } else {
            var tempData = JSLINQ(data).Where(function (item) { return item.Salesstates == "ZS"; }).Select(function (item) { return item; }).items;
            return tempData;
        }
        //}
        //else {
        //    return data;
        //}
    }

    function judgeIsNeddReSelect($element, data, options)
    {
        $.each(options.ggJson, function (index, item) {

        });
    }

    $.ProGGSelect = {};

    // 实例化
    $.ProGGSelect.Create = function (selector, data, options) {
        $element = $(selector);
        data = JSLINQ(data).OrderBy(function (item) { return item.Sku }).items;
        $element.data('options', $.extend(getDefaluts(), options));  //保存配置信息
        $element.data('data', data);    // 保存原始的JSON数据
        $element.data('step', []);      // 保存步骤索引器
        parseHtml($element);            // 解析生成页面HTML代码                
    };

    // 获取Sku
    $.ProGGSelect.GetSku = function (selector) {        
        var sku = getSku($(selector));
        if (sku == "") {
            $('[for="' + selector.replace("#", "") + '-notselected"]').removeClass('hide');
            $('[for="' + selector.replace("#", "") + '-notselected"]').html("请选择您想要的商品信息！");
        }
        return sku;
    };

    // 获取对象
    $.ProGGSelect.GetProduct = function (selector) {
        var product = getProduct($(selector));
        if (product == null)
        {
            $('[for="' + selector.replace("#", "") + '-notselected"]').removeClass('hide');
            $('[for="' + selector.replace("#", "") + '-notselected"]').html("请选择您想要的商品信息！");
        } 
        return product;
    }

    $.ProGGSelect.ShowAddCartError = function (selector,error)
    {        
        $('[for="' + selector.replace("#", "") + '-notselected"]').removeClass('hide');
        $('[for="' + selector.replace("#", "") + '-notselected"]').html(error);
    }

    $.ProGGSelect.HideAddCartError = function (selector) {
        $('[for="' + selector.replace("#", "") + '-notselected"]').html("");
        $('[for="' + selector.replace("#", "") + '-notselected"]').addClass('hide');
    }

    // 重置规格的选中状态
    $.ProGGSelect.ResetSelectedState = function (selector)
    {
        $element = $(selector);
        var options = $element.data('options');  //保存配置信息
        var data = getProductJson($element);    // 保存原始的JSON数据
        $.each(options.ggJson, function (index, item) {
            var nodes = $element.find('#p_' + item.type + ' a');
            if (nodes.length > 1)
            {
                nodes.each(function () {
                    $(this).removeClass("btn_s_active").removeClass("btn_disable");
                    $(this).find('img').each(function () { $(this).removeClass('btn_disable'); });
                });
            }
        });
    }

    $.ProGGSelect.CancelCustom = function (selector) {
        $element = $(selector);
        var options = $element.data('options');
        options.isDingZhi = false;
        var data = getProductJson($element)
        options.defaultSku = data[0].Sku;
        parseHtml($element);
    }

    $.ProGGSelect.Custom = function (selector) {
        $element = $(selector);
        var options = $element.data('options');
        options.isDingZhi = true;
        var data = getProductJson($element)
        options.defaultSku = data[0].Sku;
        parseHtml($element);
    }
})(jQuery);