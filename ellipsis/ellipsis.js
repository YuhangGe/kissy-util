/**
 * @fileoverview 字符串省略号后缀
 * @desc 支持 IE6+, chrome, ff3+
 * @author 乔花<qiaohua@taobao.com>
 */

KISSY.add('util/ellipsis', function(S) {

    var D = S.DOM, E = S.Event, doc = document;

    //定义变量和常量

    /**
     * 自动生成字符串超过部分为省略号
     * @param {String} [elem = 'trigger'] 选择器
     * @return
     */
    function ellipsis(elem) {
        S.all(elem).each(function(obj) {
            _ellipsis(obj);
        });
    }
    function _ellipsis(el) {
        el.css({'white-space': 'nowrap', 'overflow': 'hidden'});
        // if browser support 'text-overflow' property, just use it
        if ('textOverflow' in doc.documentElement.style ||
            'OTextOverflow' in doc.documentElement.style) {
            el.css({
                'text-overflow': 'ellipsis',
                '-o-text-overflow': 'ellipsis'
            });
        } else { //firefox does not support the text-overflow property, so...
            var obj = el;
            if (!obj.data('text')) obj.data('text', obj.text());
            var text = obj.attr('text') || obj.text(),
                w = obj.width(),
                a = 0,
                b = text.length,
                c = b,
                t = new S.Node(obj[0].cloneNode(true)).insertAfter(obj);
            obj.text(text);
            t.text(text).css({
                    'position': 'absolute',
                    'width': 'auto',
                    'visibility': 'hidden',
                    'overflow': 'hidden'
                });
            if (t.width() > w) {
                while ((c = Math.floor((b + a) / 2)) > a) {
                    t.text(text.substr(0, c) + '…');
                    if (t.width() > w) b = c;
                    else a = c;
                }
                obj.text(text.substr(0, c) + '…');
                if (!obj.attr('title')) obj.attr('title', text);
            }
            t.remove();
        }
    }

    //私有方法

    //兼容老版本kissy
    S.namespace("Util");
    S.Util.ellipsis = ellipsis;

    return ellipsis;
});

/**
 * NOTE:
 *         2011.05.09
 *         -your note
 */
