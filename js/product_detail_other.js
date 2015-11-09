/// <reference path="JSLINQ.js" />
; (function ($) {
    /*
        des: 从URL中解析出SKU!
    */
    function parseSkuFromUrl() {
        var sku = location.hash.split('#', 2)[1];
        return sku == undefined ? "" : sku;
    }
    /*
        des:返回选择器默认的SKU!
            main =>从URL中获取，没有则取商品集合第一个
            other=>从商品集合中取第一个
        prm:
            sign=> main | other
            otherproducts=>商品数据JSON,当sign="main"时，可不填!
    */
    function getDefaultSku(sku, sign, otherproducts) {
        switch (sign) {
            case "main":
                if (sku == "") {
                    var items = JSLINQ($.PD.defaults.mainSelectorProductsJson).Where(function (item) { return item.Sku == sku }).items;
                    if (items.length == 0) {
                        sku = $.PD.defaults.mainSelectorProductsJson[0].Sku;
                    }
                }
                break;
            case "other":
                var items = JSLINQ(otherproducts).Where(function (item) { return item.Salesstates != "ZS" }).items;
                if (items.length == 0)
                    sku = otherproducts[0].Sku;
                else
                    sku = items[0].Sku;
                break;
        }
        return sku;
    }    
    /*
        des: 判断当前SKU是否是定制商品!
    */
    function isDingZhi(sku, sign, otherproducts) {
        var json = sign == "main" ? $.PD.defaults.mainSelectorProductsJson : otherproducts;
        var items = JSLINQ(json).Where(function (item) { return item.Sku == sku }).items;
        return items[0].Salesstates == "ZS";
    }
    /*
        des: 定制效果渲染
        prm: boolDingZhi=>是否定制
    */
    function RenderDingZhi(boolDingZhi)
    {
        if (boolDingZhi) {
            $($.PD.defaults.selectorDZSign + ' .customize').hide();
            $($.PD.defaults.selectorDZSign + ' .p_reselect').show();
            $($.PD.defaults.selectorDZSign + ' .btn_reselect').show();
            $($.PD.defaults.selectorDZSign + ' .cancel_customize').show();
            $($.PD.defaults.selectorDZSign + ' .product_key .title').show();
        }
        else {
            $($.PD.defaults.selectorDZSign + ' .customize').show();
            $($.PD.defaults.selectorDZSign + ' .p_reselect').hide();
            $($.PD.defaults.selectorDZSign + ' .cancel_customize').hide();
            $($.PD.defaults.selectorDZSign + ' .product_key .title').hide();
        }        
    }
    /*
        des: 定制处理函数
        prm: sign=> main | other
             boolDingZhi=> 是否定制
    */
    function ProcessDingZhi(sign, boolDingZhi, otherproducts)
    {
        var json = [];
        switch (sign)
        {
            case "main": json = $.PD.defaults.mainSelectorProductsJson; break;
            case "other": json = otherproducts; break;
        } 
        if (JSLINQ(json).Any(function (item) { return item.Salesstates == "ZS"; })) {
            if (boolDingZhi) {
                RenderDingZhi(true);
            }
            else {
                RenderDingZhi(false);
            }
            if (JSLINQ(json).All(function (item) { return item.Salesstates == "ZS"; })) {
                $($.PD.defaults.selectorDZSign + " .cancel_customize").hide();
            }
        }
        else {
            $($.PD.defaults.selectorDZSign + " .customize").hide();
        }
    }
    /*
        des:设置定制Selector，方便获取当前所操作的定制相关按钮.
    */
    function setSelectorDingZhi(forAttr)
    {
        $.PD.defaults.selectorDZSign = forAttr.indexOf('selector') > -1 ? "#" + forAttr : '.product_key';
    }
    /*
        des:获得规格选择器的Selector
    */
    function getSelector()
    {
       return  $.PD.defaults.selectorDZSign == ".product_key" ? "#mainselector" : $.PD.defaults.selectorDZSign;
    }
    /*
        des:初始化定制按钮触发事件
    */
    function initDingZhiButtons()
    {
        // 查看定制
        $(".more_customize").click(function () {
            setSelectorDingZhi($(this).attr('for'));           
            RenderDingZhi(true);
            $.ProGGSelect.Custom(getSelector());
            TooltipPic();
        });
        // 查看现货
        $(".cancel_customize").click(function () {
            setSelectorDingZhi($(this).attr('for'));
            RenderDingZhi(false);
            $.ProGGSelect.CancelCustom(getSelector());
            TooltipPic();
        });
        // 重新选择
        $('.btn_reselect').click(function () {
            setSelectorDingZhi($(this).attr('for'));
            $.ProGGSelect.ResetSelectedState(getSelector());
        });
    }
    /*
        des:预加载图片
    */
    function preLoadImage(urls) {
        var imgs = [];
        for (i = 0; i < urls.length; i++) {
            var img = new Image();
            img.src = urls[i];
            imgs.push(img);
        }
    }

    $.PD = {
        defaults: {
            mainSelectorProductsJson: [],
            otherSelectorProductsJson: [],
            selectorDZSign: "",
            firstload: true,
            JH_SKU: '',
            JH_ProductName: '',
            JH_ProductImgUrl: '',
            JH_ProductPrice: '',
            JH_ProductPromotionPrice: ''
        },
        methods: {
            /*
                des: 操作选择器时，若每项都有一个被选中，则触发绑定事件
            */
            BindMainProductInfos: function (selector, product) {
                document.title = product.Name + document.title.substring(document.title.indexOf('-'));
                var template = '<dl class="fl">' +
                               '    <dt class="fl">{0}</dt>    ' +
                               '    <dd title="{2}">{1}</dd> ' +
                               '</dl>';
                $('#div_product_attribute').html("");
                if (product.Series != undefined && product.Series != "")
                    $('#div_product_attribute').append(template.replace("{0}", "商品品牌").replace("{1}", product.Series).replace("{2}", product.Series));
                if (product.Name != undefined && product.Name != "")
                    $('#div_product_attribute').append(template.replace("{0}", "商品名称").replace("{1}", product.Name).replace("{2}", product.Name));
                if (product.Sku != undefined && product.Sku != "")
                    $('#div_product_attribute').append(template.replace("{0}", "商品货号").replace("{1}", product.Sku).replace("{2}", product.Sku));
                if (product.Material != undefined && product.Material != "")
                    $('#div_product_attribute').append(template.replace("{0}", "商品材质").replace("{1}", product.Material).replace("{2}", product.Material));
                if (product.Processsellingpoint != undefined && product.Processsellingpoint != "")
                    $('#div_product_attribute').append(template.replace("{0}", "工艺特点").replace("{1}", product.Processsellingpoint).replace("{2}", product.Processsellingpoint));
                if (product.Specification != undefined && product.Specification != "")
                    $('#div_product_attribute').append(template.replace("{0}", "商品规格").replace("{1}", product.Specification).replace("{2}", product.Specification));
                if (product.Style != undefined && product.Style != "")
                    $('#div_product_attribute').append(template.replace("{0}", "空间格调").replace("{1}", product.Style).replace("{2}", product.Style));
                if (product.Origin != undefined && product.Origin != "")
                    $('#div_product_attribute').append(template.replace("{0}", "产地").replace("{1}", product.Origin).replace("{2}", product.Origin));
                if (product.Season != undefined && product.Season != "")
                    $('#div_product_attribute').append(template.replace("{0}", "适用季节").replace("{1}", product.Season).replace("{2}", product.Season));
                $('[for="mainselector-Sku"]').html(product.Sku);
                $('[for="mainselector-Sales"]').html(product.Sales);
                $('[for="mainselector-Name"]').html(product.Name);
                $('[for="mainselector-ProductDetail"]').html($('#div-detail-' + product.Sku).html());

                if ($('#div-keepupdetail-' + product.Sku).length > 0 && $('#div-keepupdetail-' + product.Sku).html() != "" && $('#div-keepupdetail-' + product.Sku).html().length > 5) {
                    $('#liKeepUp').removeClass("hide");
                } else {
                    $('#liKeepUp').addClass("hide");
                }
                $('[for="mainselector-ProductKeepUpDetail"]').html($('#div-keepupdetail-' + product.Sku).html());
                $('[for="mainselector-Price"]').html("￥" + product.Price);
                if (product.Price != product.PromotionPrice) {
                    $('[for="mainselector-Price"]').addClass('line_through');
                    $('[for="mainselector-PromotionPrice"]').html("￥" + product.PromotionPrice);
                }
                else {
                    $('[for="mainselector-Price"]').removeClass('line_through');
                    $('[for="mainselector-PromotionPrice"]').html("");
                }
                var imgTemp = '<li class="{cls}">' +
                              '     <a href="{big}" rel="zoom-id:SkuPhoto" rev="{small}" class="Selector" onclick="return false;"><img src="{tiny}" /></a> ' +
                              '</li>';
                var imgHtml = "";
                if (product.Photos.length > 0) {
                    product.Photos = JSLINQ(product.Photos).OrderBy(function (c) { return c.Sort; }).items;
                    for (var i = 0; i < product.Photos.length; i++) {
                        var photo = product.Photos[i];
                        var last = photo.PhotoPath.lastIndexOf('/');
                        var bigImgSrc = photo.PhotoPath;
                        var smallImgSrc = photo.PhotoPath.substring(0, last + 1) + "618_618" + photo.PhotoPath.substring(last);
                        var tinyImgSrc = photo.PhotoPath.substring(0, last + 1) + "80_80" + photo.PhotoPath.substring(last);
                        var cls = "";
                        if (i == 0) {
                            $('.MagicZoom img').attr('src', smallImgSrc);
                            $('.MagicZoom').attr('href', bigImgSrc);
                            cls = "p_selected";
                        }
                        imgHtml += imgTemp.replace("{cls}", cls).replace("{big}", bigImgSrc).replace("{small}", smallImgSrc).replace("{tiny}", tinyImgSrc);
                    }
                    $('[for="' + selector + '-Photos"]').html(imgHtml);
                    Carousel(".pImg_gallery", ".p_imgArrowLeft", ".p_imgArrowRight", 5);
                }
                scrollimg(".productImg_list", ".p_imgArrowLeft", ".p_imgArrowRight");
                detail_img();
                if ($.PD.defaults.firstload == false) {
                    MagicZoom.refresh();
                }
                $.PD.defaults.firstload = false;
            },
            /*
                des:当规格选择器确认出SKU时，绑定同系列商品数据
            */
            BindOtherProductInfos: function (selector, product) {
                $('[for="' + selector + '-Name"]').html('<a href="/product-detail-' + product.Productid + '#' + product.Sku + '" title="' + product.Name + '" target="_blank">' + product.Name + '</a>');
                $('[for="' + selector + '-Specification"]').html(product.Specification);
                $('[for="' + selector + '-Sku"]').html(product.Sku);
                $('[for="' + selector + '-Price"]').html("￥" + product.Price);
                if (product.Price != product.PromotionPrice) {
                    $('[for="' + selector + '-Price"]').addClass('line_through');
                    $('[for="' + selector + '-PromotionPrice"]').html("￥" + product.PromotionPrice);
                }
                else {
                    $('[for="' + selector + '-Price"]').removeClass('line_through');
                    $('[for="' + selector + '-PromotionPrice"]').html("");
                }

                var photo = product.Photos[0];
                if (photo != undefined) {
                    var last = photo.PhotoPath.lastIndexOf('/');
                    var path = photo.PhotoPath.substring(0, last + 1) + "220_220" + photo.PhotoPath.substring(last);  // 注意：这里要改成150*150的.因为目前测试还没这尺寸的
                    $('[for="' + selector + '-Photo"]').html('<a href="/product-detail-' + product.Productid + '#' + product.Sku + '" title="' + product.Name + '"  target="_blank"><img src="' + path + '" title="' + product.Name + '" /></a>');
                }
            },
            /*
                des:更新价格
            */
            updateProductPrice: function (selector, products) {
                var maxPrice = JSLINQ(products).OrderByDescending(function (c) { return c.Price; }).First().Price;
                var minPrice = JSLINQ(products).OrderBy(function (c) { return c.Price; }).First().Price;
                var maxPromotionPrice = JSLINQ(products).OrderByDescending(function (c) { return c.PromotionPrice; }).First().PromotionPrice;
                var minPromotionPrice = JSLINQ(products).OrderBy(function (c) { return c.PromotionPrice; }).First().PromotionPrice;

                if (minPrice != minPromotionPrice || maxPrice != maxPromotionPrice) {
                    $('[for="' + selector + '-Price"]').addClass('line_through');
                    $('[for="' + selector + '-Price"]').html("￥" + minPrice + (minPrice != maxPrice ? (" - ￥" + maxPrice) : ""));
                    $('[for="' + selector + '-PromotionPrice"]').html("￥" + minPromotionPrice + (minPromotionPrice != maxPromotionPrice ? (" - ￥" + maxPromotionPrice) : ""));
                } else {
                    $('[for="' + selector + '-Price"]').removeClass('line_through');
                    if (minPrice != maxPrice) {
                        $('[for="' + selector + '-Price"]').html("￥" + minPrice + " - ￥" + maxPrice);
                    } else {
                        $('[for="' + selector + '-Price"]').html("￥" + minPrice);
                    }
                    $('[for="' + selector + '-PromotionPrice"]').html("");
                }
            },
            /*
                des:更新主商品价格
            */
            updateMainProductPrice: function (selector, products) {
                var minPrice = JSLINQ(products).OrderByDescending(function (c) { return c.Price; }).First().Price;
                var maxPrice = JSLINQ(products).OrderBy(function (c) { return c.Price; }).First().Price;
                var minPromotionPrice = JSLINQ(products).OrderByDescending(function (c) { return c.PromotionPrice; }).First().PromotionPrice;
                var maxPromotionPrice = JSLINQ(products).OrderBy(function (c) { return c.PromotionPrice; }).First().PromotionPrice;

                if (minPrice != minPromotionPrice || maxPrice != maxPromotionPrice) {
                    $('[for="mainselector-Price"]').addClass('line_through');
                    $('[for="mainselector-Price"]').html("￥" + minPrice + " - ￥" + maxPrice);
                    $('[for="mainselector-PromotionPrice"]').html("￥" + minPromotionPrice + " - ￥" + maxPromotionPrice);
                } else {
                    $('[for="mainselector-Price"]').removeClass('line_through');
                    if (minPrice != maxPrice) {
                        $('[for="mainselector-Price"]').html("￥" + minPrice + " - ￥" + maxPrice);
                    } else {
                        $('[for="mainselector-Price"]').html("￥" + minPrice);
                    }
                    $('[for="mainselector-PromotionPrice"]').html("");
                }
            },
            /*
                des:放大镜鼠标经过时，预加载图片
            */
            MagicZoomMouseOver: function () {
                var urls = [];
                $('[for="mainselector-Photos"] a').each(function () {
                    urls.push($(this).attr('href'));
                });
                preLoadImage(urls);
            },
            /*
                des:收藏商品
            */
            collect: function (id) {
                $.ajax({
                    url: '/CustomerCollect/CollectProductForProductDetail?id=' + id,
                    cache: false,
                    async: false,
                    success: function (data) {
                        var json = $.parseJSON(data);
                        if (json.state) {
                            $('[for="hascollected"]').removeClass("hide");
                            $('[for="collect"]').addClass("hide");
                        } else {
                            location.href = json.msg;
                        }
                    }
                });
            },
            /*
                des:收藏系列
            */
            collectSeries: function (id, target) {
                $element = $(target);
                $.ajax({
                    url: '/CustomerCollect/CollectSeries?id=' + id + '&pageurl=' + location.href,
                    cache: false,
                    async: false,
                    success: function (data) {
                        var json = $.parseJSON(data);
                        if (json.state) {
                            $element.parent().html('<a href="javascript:;" style=" cursor:default;">已收藏</a>');
                        } else {
                            location.href = json.msg;
                        }
                    }
                });
            }
        }
    };
       
    $.extend($.PD, {
        initMain: function () {
            $.PD.defaults.mainSelectorProductsJson = $.parseJSON($('#hidMainSelectorProductsJSON').val());            
            $.PD.defaults.selectorDZSign = ".product_key";
            var skuFromUrl = parseSkuFromUrl();
            var skuMain = getDefaultSku(skuFromUrl, "main");
            var dzMain = isDingZhi(skuMain,"main");
            //MAIN定制处理函数
            ProcessDingZhi("main", dzMain);
            //MAIN选择器，配置信息
            var mainSelectorOptions = {
                isTiggerAnchor: true,
                defaultSku: skuMain,
                isMain: true,
                isDingZhi: dzMain,
                whenTiggerAnchorCallBack: $.PD.methods.BindMainProductInfos,
                whenNotAllNodeSelectedCallBack: $.PD.methods.updateMainProductPrice
            };
            mainSelectorOptions.ggJson = $.parseJSON($('#hidMainSelectorGGOptions').val());
            $.ProGGSelect.Create('#mainselector', $.PD.defaults.mainSelectorProductsJson, mainSelectorOptions);

            //聚合信息初始化
            $.PD.defaults.JH_SKU = skuMain;
            var p = JSLINQ($.PD.defaults.mainSelectorProductsJson).Where(function (item) { return item.Sku == skuMain; }).items[0];
            if (p != null) {
                $.PD.defaults.JH_SKU = skuMain;
                $.PD.defaults.JH_ProductName = p.Name;
                $.PD.defaults.JH_ProductPrice = p.Price;
                $.PD.defaults.JH_ProductPromotionPrice = p.PromotionPrice;
                if (p.Photos != null && p.Photos.length > 0)
                    $.PD.defaults.JH_ProductImgUrl = p.Photos[0].PhotoPath;
            }
        },
        initOther: function ()
        {
            $.PD.defaults.otherSelectorProductsJson = $.parseJSON($('#hidOtherSelectorProductJSON').val());
            if ($.PD.defaults.otherSelectorProductsJson != null) {
                for (var i = 0; i < $.PD.defaults.otherSelectorProductsJson.length; i++) {
                    var tempProducts = $.PD.defaults.otherSelectorProductsJson[i].Products;
                    var tempSku = getDefaultSku("", "other", tempProducts);
                    var tempDZ = isDingZhi(tempSku, "other", tempProducts);
                    $.PD.defaults.selectorDZSign = '#selector' + i;
                    ProcessDingZhi("other", tempDZ, tempProducts);
                    $.ProGGSelect.Create('#selector' + i, tempProducts, {
                        whenTiggerAnchorCallBack: $.PD.methods.BindOtherProductInfos, defaultSku: tempSku, isDingZhi: tempDZ, whenNotAllNodeSelectedCallBack: $.PD.methods.updateProductPrice
                    });
                }
            }
            initDingZhiButtons();
        }
    });

})(jQuery);

var maxstocknum = 999999999;
var maxstockmsg = "";

// 加入购物车
function addCart(selector) {
    var sku = $.ProGGSelect.GetSku('#' + selector);
    if (sku != "") {
        var num = $('[for="' + selector + '-Num"]').val();
        if (sku == "" || sku == undefined)
            return;
        $.ajax({
            type: "POST",
            url: "/Shopping/AddCart",
            data: "pid=" + sku + "&quantity=" + num,
            cache: false,
            async:false,
            success: function (msg) {
                var json = jQuery.parseJSON(msg);
                if (json.status == "success") {
                    getCartInfo(true);
                    cartAdd('[name="cart_add"]');
                    //$("#cart").mouseover();
                    //alertMsg('购物提示', '已成功加入购物车!', 0);
                } else {
                    //$("#cart").mouseout();
                    $.ProGGSelect.ShowAddCartError(selector, json.msg);
                    if (json.extension != null && json.extension.maxstocknum != null) {
                        if (json.extension.maxstocknum > 0) {
                            $("[for='" + selector + "-Num']").val(json.extension.maxstocknum);
                        } else {
                            $("[for='" + selector + "-Num']").val("1");
                        }
                        maxstocknum = json.extension.maxstocknum;
                        maxstockmsg = json.msg;
                    }
                }
            }
        });
    }
};

// 加入购物车 - 优惠套餐
function addCartForGroupProduct(productcode)
{
    $.ajax({
        type: "POST",
        url: "/Shopping/AddCart",
        data: "pid=" + productcode + "&quantity=" + 1,
        cache: false,
        async: false,
        success: function (msg) {
            var json = jQuery.parseJSON(msg);
            if (json.status == "success") {
                getCartInfo(true);
                cartAdd('[name="cart_add"]');
                //$("#cart").mouseover();
                //alertMsg('购物提示', '已成功加入购物车!', 0);
            } else {
                //$("#cart").mouseout();
                Tool.alertMsg1(json.msg);
            }
        }
    });
}

// 数量更改
function NumChange(selector, value) {
    if (maxstocknum != 999999999) {
        if (parseInt(value) < maxstocknum) {
            $.ProGGSelect.HideAddCartError(selector);
        } else {
            maxstockmsg = 999999999;
        }
    }
}

function initNumChangeEvent() {
    $('.qty_val').live("input propertychange", function () {
        var selector = $(this).attr('for').split('-')[0];
        NumChange(selector,$(this).val());
    });
}

function initPlusMinusEvent() {
    $('.qty_val').blur(function () {
        if ($(this).val() == '') {
            $(this).val(1);
        };
        if ($(this).val() == '0') {
            $(this).val(1);
        };
    });
    $('.plus').click(function () {
        var newObj = $(this).parent().find('.qty_val');
        var s = newObj.val();//获得同一index的元素的值
        if (parseInt(s) < 999) {
            newObj.val(parseInt(s) + 1); //做加法
            var selector = $(this).parent().find('.qty_val').attr('for').split('-')[0];
            NumChange(selector, parseInt(s) + 1);
        }        
    });
    $('.minus').click(function () {
        var newObj = $(this).parent().find('.qty_val');
        var s = newObj.val();
        if (s > 1) {
            newObj.val(parseInt(s) - 1);
            var selector = $(this).parent().find('.qty_val').attr('for').split('-')[0];
            NumChange(selector, parseInt(s) - 1);
        };
    });
}

$(function() {
    initNumChangeEvent();
    initPlusMinusEvent();
});