<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8" />
 <meta name="viewport" content="width=device-width" />
 <meta name="keywords" content="窗帘,窗饰,家居饰品,沙发,地毯,灯具,装饰画,家纺,厨房用品,儿童家具" />
 <meta name="description" content="窗饰网-打造窗帘线上线下互动平台,窗帘,窗饰,家居饰品,沙发,地毯,灯具,装饰画,家纺,厨房用品,儿童家具" />
    <title>窗饰网-打造窗帘线上线下互动平台，窗帘，窗饰，家居饰品，沙发，地毯，灯具，装饰画，家纺，厨房用品，儿童家具</title>
 <!--[if IE 7]>
 <link rel="stylesheet" href="CSS/hack_IE7.css" type="text/css" />
    <![endif]-->
    <!--[if lte IE 9]>
    <script src="js/placeholders.js"></script>
    <![endif]-->
    <link href="css/style.css" rel="stylesheet"/>
    <script src="js/js.js"></script>
     <script src="js/magiczoom/magiczoom.js"></script>
    <link rel="stylesheet" type="text/css" href="js/magiczoom/magiczoom.css" />
    <script src="js/JSLINQ.js"></script>
    <script src="js/jquery.proguigeselect.js"></script>
    <script src="js/product_detail_other.js"></script>

</head>
<body>
    <?php 
    include("head.php"); 
    ?>
 <input type="hidden" id="channelorder" />
<!-- 正文开始 -->

<div class="container">
    <div class="breadCrumbs">
        <a href="/">首页</a> > <a href="index1.php">窗帘产品栏目</a> > <a href="list.php">窗帘</a> > <a href="mai.php">窗帘产品</a>       
    </div>
    <div class="detail clearfix">
        <div class="productImg fl">
            <a href="images/empty.jpg" id="SkuPhoto" class="MagicZoom" onmouseover="$.PD.methods.MagicZoomMouseOver()" rel="zoom-position:right; hint:false;zoom-width:540px; zoom-height:540px;zoom-distance:20;opacity-reverse:false;opacity:70;">
                <img src="images/empty.jpg" />
            </a>
        </div>
        <div class="Detail_base fr clearfix">
            <h3 id="h_productname" for="mainselector-Name"></h3>
            <div class="numOfPeople clearfix">
                <dl class="fl">
                    <dt class="fl">编号:</dt>
                    <dd class="fl" for="mainselector-Sku"></dd>
                </dl>
                <dl class="fl">
                    <dt class="fl">销量:</dt>
                    <dd class="fl" for="mainselector-Sales"></dd>
                </dl>
            </div>
            <div class="PriceModBox clearfix">
                <dl class="originalPrice fl">
                    <dt>原价:</dt>
                    <dd class="price" for="mainselector-Price"></dd>
                </dl>
                <dl class="PromoPrice fl">
                    <dt>促销价:</dt>
                    <dd class="salePrice" for="mainselector-PromotionPrice"></dd>
                </dl>
            </div>
            <dl class="productImg_list clearfix">
                <dt>颜色分类:</dt>
                <dd>
                    <span class="p_imgArrowLeft disabled"></span>
                    <div class="pImg_gallery">
                        <ul for="mainselector-Photos"></ul>
                    </div>
                    <span class="p_imgArrowRight hide"></span>
                </dd>
            </dl>
            <div class="product_key">
                
                <div class="p_sku clearfix" id="mainselector">

<dl class="qty_container clearfix"><dt class="fl">规格</dt><dd id="p_Material">  <a class="btn btn_s_detail btn_s_active" title="定高2.8m*宽不限" href="javascript:">定高2.8m*宽不限</a> <a class="btn btn_s_detail btn_s_active" title="拼接印花" href="javascript:">拼接印花</a> <a class="btn btn_s_detail btn_s_active" title="简约时尚" href="javascript:">简约时尚</a>  </dd></dl>
<dl class="qty_container clearfix"><dt class="fl">品牌</dt><dd id="p_Material">  <a class="btn btn_s_detail btn_s_active" title="欧居纺织" href="javascript:">欧居纺织</a>  </dd></dl>


                </div>
               
            </div>
                <div class="product_detail_btn">
                    <div class="p_action clearfix">

                        <a name="cart_add" href="#"  class="btn btn_gray btn_130">APP购买</a>
                        <a href="#" for="collect"  class="btn btn_white btn_130 ">加工定制</a>
                        <a href="#" for="collect"  class="btn btn_white btn_130 ">定制说明</a>
<!-- 
          <p class="title">定制说明: <br> 定制商品指在已有的款式和尺寸基础上上提供多种面料供顾客选择（不包括尺寸定制），通常窗帘定制周期为30-35天，物流配送时间另计。</p>   -->
                    </div>
                    <dl class="p_share clearfix">
                        <dt class="fl">分享到:</dt>
                        <dd>
                            <ul>
                                <li><a class="sinaIcon" href="javascript:;" onclick="WeiBoShare('sn','pd')" title="新浪微博"><span>新浪微博</span></a></li>
                                <li><a class="tenxunIcon" href="javascript:;" onclick="WeiBoShare('tx','pd')" title="腾讯微博"><span>腾讯微博</span></a></li>
                                <li><a class="renrenIcon" href="javascript:;" onclick="WeiBoShare('rr','pd')" title="人人"><span>人人</span></a></li>
                            </ul>
                        </dd>
                    </dl>
                </div>            
            </div>
    </div>
    <div class="main_wrap" id="detail_description">
        <div class="p_scombo_tab clearfix">
            <ul>
                <li class="active">商品详情</li>
                <li id="liKeepUp">售后保养</li>
                <li class="hide">灵感故事</li>
            </ul>
        </div>
        <div class="p_content clearfix">
            <div id="div_product_attribute" class="p_attrList clearfix">

            </div>
            <div class="p_description" id="ProductDetail" for="mainselector-ProductDetail"></div>
        </div>
        <div class="p_content hide ">
            <div class="p_description" for="mainselector-ProductKeepUpDetail">

            </div>
        </div>
        <div class="p_content hide ">
            <div class="p_description clearfix">
                
            </div>
        </div>
    </div>
            <div class="tabWrap interested clearfix" id="detail_product">
            <div class="p_scombo_tab clearfix">
                <ul>
                        <li class="active">类似风格推荐</li>
                                            <li class="">同等价位推荐</li>
                                            <li class="" >同类热销品</li>
                </ul>
            </div>
                <div class="Pwrapper p_styleWrapper tabWrap_content clearfix">
                    <ul>
                            <li class="product first_product">
                                <div class="img"><a href="#105095" target="_blank" title="拼接印花，简约时尚"><img src="images/1.jpg" title="拼接印花，简约时尚" /></a></div>
                            </li>
                            <li class="product ">
                                <div class="img"><a href="#105092" target="_blank" title="拼接印花，简约时尚"><img src="images/2-1.jpg" title="拼接印花，简约时尚" /></a></div>
                            </li>
                    </ul>
                    <span id="style_ArrowLeft" class="P_ArrowLeft disabled"></span>
                    <span id="style_ArrowRight" class="P_ArrowRight hide"></span>
                </div>
                            <div class="Pwrapper p_priceWrapper hide clearfix">
                    <ul>
                            <li class="product first_product">
                                <div class="img"><a href="#105095" target="_blank" title="拼接印花，简约时尚"><img src="images/3-1.jpg" title="拼接印花，简约时尚"></a></div>
                            </li>
                            <li class="product ">
                                <div class="img"><a href="#105089" target="_blank" title="拼接印花，简约时尚"><img src="images/4-1.jpg" title="拼接印花，简约时尚"></a></div>
                            </li>
                            <li class="product ">
                                <div class="img"><a href="#105092" target="_blank" title="拼接印花，简约时尚"><img src="images/2-1.jpg" title="拼接印花，简约时尚"></a></div>
                            </li>
                    </ul>
                    <span id="price_ArrowLeft" class="P_ArrowLeft disabled"></span>
                    <span id="price_ArrowRight" class="P_ArrowRight hide"></span>
                </div>
                            <div class="Pwrapper p_hotWrapper hide clearfix">
                    <ul>
                            <li class="product first_product">
                                <div class="img"><a href="#105090" target="_blank" title="拼接印花，简约时尚"><img src="images/3-1.jpg" title="拼接印花，简约时尚"></a></div>
                                </p>
                            </li>
                            <li class="product ">
                                <div class="img"><a href="#105095" target="_blank" title="拼接印花，简约时尚"><img src="images/2-1.jpg" title="拼接印花，简约时尚"></a></div>
                            </li>
                            <li class="product ">
                                <div class="img"><a href="#105092" target="_blank" title="拼接印花，简约时尚"><img src="images/1.jpg" title="拼接印花，简约时尚"></a></div>
                            </li>
                    </ul>
                    <span id="hot_ArrowLeft" class="P_ArrowLeft disabled"></span>
                    <span id="hot_ArrowRight" class="P_ArrowRight hide"></span>
                </div>
        </div>
    <div id="producteDescriptionInfo" style="display:none;">
            <div id="div-detail-105099">

            <p>拼接印花，简约时尚，新颖的面料组织，带着真丝般的光泽和独特的双色布面风格，突出窗帘丝般质感的材质，给人不一样的视觉感受。涤粘面料4色可选，有带褶款、罗马帘2种款式可选。</p>
</div>
           <div id="div-keepupdetail-105099"><p>窗帘要根据其本身的特点来清洗，不能用漂白剂，尽量不要脱水和烘干，要自然风干，以免破坏窗帘本身的质感。</p>

<p>常温水洗，相近色可同洗，可非氯漂洗，中温熨烫，低温烘干。</p>
</div>
          
    </div>
</div>
<input id="hidMainSelectorProductsJSON" type="hidden" value="[{&quot;Id&quot;:10001,&quot;Name&quot;:&quot;拼接印花，简约时尚&quot;,&quot;Productcategoryid&quot;:&quot;R0501&quot;,&quot;Productid&quot;:21,&quot;Function&quot;:null,&quot;FrontPhotoUrl&quot;:&quot;upload/2/105099.jpg&quot;,&quot;Specification&quot;:&quot;门幅280CM&quot;,&quot;Series&quot;:&quot;Delton&quot;,&quot;Space&quot;:&quot;客厅,卧室,书房&quot;,&quot;Style&quot;:&quot;现代简约&quot;,&quot;Color&quot;:&quot;苔藓绿&quot;,&quot;Material&quot;:&quot;棉麻拼接&quot;,&quot;New&quot;:false,&quot;Sales&quot;:1372,&quot;Price&quot;:298,&quot;Sku&quot;:&quot;105099&quot;,&quot;Productcombinationid&quot;:10001,&quot;PromotionPrice&quot;:298,&quot;Photos&quot;:[{&quot;PhotoPath&quot;:&quot;upload/2/105099.jpg&quot;,&quot;PhotoPath_220_220&quot;:null,&quot;Sort&quot;:1},{&quot;PhotoPath&quot;:&quot;upload/1/105099.jpg&quot;,&quot;PhotoPath_220_220&quot;:null,&quot;Sort&quot;:2}],&quot;ColorUrl_80_80&quot;:&quot;upload/2/80_80/105099.jpg&quot;,&quot;Shape&quot;:null,&quot;GiftNum&quot;:0,&quot;SortId&quot;:0,&quot;Salesstates&quot;:&quot;ZS&quot;}]" />
<input id="hidOtherSelectorProductJSON" type="hidden" value="[]" />
<input id="hidMainSelectorGGOptions" type="hidden" value="[]" />
<script type="text/javascript">
    $(function () {
        $.PD.initMain();
        $.PD.initOther();
    });
</script>




<!-- 正文结束 -->
<script src="js/jcarousellite_1.0.1.js"></script>
<script src="js/product_detail.js"></script>
<script src="js/Tool1.js"></script>

<script src="js/weibo_share.js"></script>

<?php 
    include("foot.php"); 
?>
</body>
</html>

