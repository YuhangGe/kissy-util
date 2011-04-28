/**
 * @fileoverview 查看源码
 * @desc 很方便的查看源码功能，点击触点，会找到出触点前一个元素内包含的代码，显示在触点下方的源码框中。
 * 		 采用事件代理的方式，页面中多个触点，只要使用同一的class命名，注册一次即可。
 * @author fool2fish<fool2fish@gmail.com>
 */
 
KISSY.add('util/view-code', function(S) {

    var D = S.DOM, E = S.Event, doc = document;
	var SHOW_CODE = '显示源码', HIDE_CODE = '隐藏源码';
	
	/**
	 * 查看源码
	 * @param {String} [triggerCls = 'S_ViewCode'] 触发元素的class
	 * @param {String} [codeBoxStylse = 'width:99%;height:150px;border:1px solid #ccc;'] 源码框的style属性或者class名
	 */
	function viewCode(triggerCls,codeBoxStyle){
		
		//参数处理
		triggerCls = triggerCls || 'S_ViewCode';
		codeBoxStyle = codeBoxStyle || 'width:99%;height:150px;border:1px solid #ccc;';
		
		//dom加载完成后注册点击事件，以防取不到要doc.body
		S.ready(function(S){
			
			E.on(doc.body,'click',function(e){
				var t = e.target;
				
				if(D.hasClass(t,triggerCls)){
					e.preventDefault();
					
					if(!t['data-code-box']){
						
						//根据源码框的样式设定生成dom元素
						if(codeBoxStyle.indexOf(':')>-1){
							var codeBox = D.create('<textarea style="display:none;'+codeBoxStyle+'"></textarea>');
						}else{
							var codeBox = D.create('<textarea class="'+codeBoxStyle+'" style="display:none;"></textarea>');
						}
						D.insertAfter(codeBox,t);
						//关联触点和对应的源码框
						t['data-code-box'] = codeBox;
						
						//获取要显示的代码内容
						var code = S.UA.ie ? '请使用非ie内核刘浏览器查看。' : format(D.prev(t).innerHTML);
						codeBox.value = code;						
						
					}
					
					//切换触点和源码框的现实
					if(t['data-code-box'].style.display == 'none'){
						t.innerHTML = HIDE_CODE;
						t['data-code-box'].style.display = 'block';
					}else{
						t.innerHTML = SHOW_CODE;
						t['data-code-box'].style.display = 'none';
					}
				}
			})	
		})
	}
	
	//代码格式化
	function format(code){
		//处理前导空白字符
		code = code.replace(/^[\r\n]+|[\s\r\n]+$/g,'');
        var tabs = code.match(/^\s*/)[0];
        code = code.replace(new RegExp(tabs,'g'),'');
		//给自结束表添加结束斜杠（默认获取到的是没有的）
		code  = code.replace(/(<[img|br|hr].+?)>/g,'$1\/>')
        return code;
    }
	
	//兼容老版本kissy
    S.namespace("Util");
    S.Util.viewCode=viewCode;

    return viewCode;
});

/**
 * NOTE:
 * 		2011.04.26
 * 		-抛砖引玉，有需要改进的地方直接动手，勿客气：）
 */
