function WeiBoShare(tag, from) {
    var pic = "";
    switch (from)
    {
        case "pd":
            pic = $('#SkuPhoto>img').attr('src')
            break;
        case "sd":
            pic = $($('.slides>li').get(0)).attr('data-src');
            break;
    }
    switch (tag)
    {
        case "sn": snWeiBoShare(pic); break;
        case "tx": txWeiBoShare(pic);break;
        case "rr": rrWeiBoShare(pic); break;
    }
}

function snWeiBoShare(pic) {
    var _url = encodeURIComponent(document.location);
    var _appkey = "";
    var _title = encodeURI(document.title);
    var _ralateUid = "";
    var _pic = pic;
    var _language = "zh_cn";
    var _u = "http://service.weibo.com/share/share.php?url=" + _url + "&appkey=" + _appkey + "&title=" + _title + "&pic=" + _pic + "&ralateUid=" + _ralateUid + "&language=" + _language + "";
    window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}

function txWeiBoShare(pic) {
        var _t = encodeURI(document.title);
        var _url = encodeURIComponent(document.location);
        var _appkey = ""; //encodeURI('bc4cdb3027304d94b339bd027543837c');//从腾讯获得的appkey这个可以不填，如果有自己的appkey则可以显示自己的来源显示
        var _pic = encodeURI(pic);//
        var _site = '';//你的网站地址，可以留空
        var _u = 'http://v.t.qq.com/share/share.php?url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic + '&title=' + _t;
        window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
    }

function rrWeiBoShare(pic) {
        var resourceUrl = encodeURIComponent(document.location);
        var api_key = '';
        var srcUrl = '';
        var pic = pic;
        var title = encodeURI(document.title);
        var description = "";
        var submitUrl = 'http://widget.renren.com/dialog/share' + "?" + 'api_key=' + api_key + "&resourceUrl=" + resourceUrl + "&pic=" + pic + "&title=" + title + "&description=" + description;
        window.open(submitUrl, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
    }