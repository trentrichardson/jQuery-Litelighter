/*
 * jQuery Litelighter
 * By: Trent Richardson [http://trentrichardson.com]
 * 
 * Copyright 2012 Trent Richardson
 * Dual licensed under the MIT or GPL licenses.
 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 */
(function($){
	$.litelighter = function($this, options){
		this.settings = $.extend({},{ clone: false, style: 'light', language: 'generic' },options);
		this.code = $this;
		this.enable();
	};

	$.extend($.litelighter.prototype, {
		enable: function(){
				this.codelite = this.code.data('llcode', this.code.text());
				if(this.settings.clone == true)
					this.codelite = $('<pre />').text(this.code.text()).addClass('litelighter').insertAfter(this.code.css('display','none'));
			
				if(this.code.data('lllanguage'))
					this.settings.language = this.code.data('lllanguage');
				if(this.code.data('llstyle'))
					this.settings.style = this.code.data('llstyle');

				var txt = this.codelite.html(),
					style = $.litelighter.styles[this.settings.style],
					lang = $.litelighter.languages[this.settings.language];

				for(var i in lang)
					txt = txt.replace(lang[i].re, "___"+ i +"___$1___end"+ i +"___");
				
				var lvls = [];
				txt = txt.replace(/___\w+?___/g, function($0){
					var end = ($0.substr(3,3)=='end')? true:false,
						tag = (!end? $0.substr(3):$0.substr(6)).replace(/_/g,''),
						lastTag = lvls.length>0? lvls[lvls.length-1] : null;

					if(!end && (lastTag == null || tag == lastTag || (lastTag != null && lang[lastTag].embed != undefined && $.inArray(tag,lang[lastTag].embed)>=0 ))){
						lvls.push(tag);
						return $0;
					}
					else if(end && tag == lastTag){
						lvls.pop();
						return $0;
					}
					return "";
				});
				for(var i in lang)
					txt = txt.replace(new RegExp("___end"+ i +"___","g"), "</span>").replace(new RegExp("___"+ i +"___","g"), "<span class='litelighterstyle' style='"+ style[lang[i].style] +"'>");

				this.codelite.attr('style', style.code).html(txt);
				return this.code;
			},
		disable: function(){
				if(this.settings.clone){
					this.codelite.remove();
					return this.code.css('display','block');
				}
				return this.code.html('').text(this.code.data('llcode'));
			},
		destroy: function(){
				this.disable();
				return this.code.removeData('litelighter');
			},
		option: function(key, val){
				if(val !== undefined){
					this.code.data('ll'+key, val);
					this.settings[key] = val;
					this.disable();
					return this.enable();
				}
				return this[key];
			}
	});

	$.fn.extend({
		litelighter: function(o) {
			o = o || {};
			var tmp_args = Array.prototype.slice.call(arguments);

			if (typeof(o) == 'string') return this.each(function() {
					var inst = $(this).data('litelighter');
					inst[o].apply(inst, tmp_args.slice(1));
				});
			else return this.each(function() {
					var $t = $(this);
					$t.data('litelighter', new $.litelighter($t, o) );
				});
		}
	});

	$.litelighter.styles = {
		light: {
			code: 'background-color:#ffffff;color:#555;',
			comment: 'color:#999',
			string: 'color:#8F9657',
			number: 'color:#CF6745;',
			keyword: 'color:#6F87A8;'
		},
		dark: {
			code: 'background-color:#141414;color:#ffffff;',
			comment: 'color:#999',
			string: 'color:#8F9657',
			number: 'color:#CF6745;',
			keyword: 'color:#6F87A8;'
		}
	};
	$.litelighter.languages = {
		generic: {
			comment: { re: /(\/\/.*|\#.*|\/\*([\s\S]*?)\*\/)/g, style: 'comment' },
			string: { re: /((\'.*?\')|(\".*?\"))/g, style: 'string' },
			numbers: { re: /(\-?(\d+|\d+\.\d+|\.\d+))/g, style: 'number' }
		},
		js: {
			comment: { re: /(\/\/.*|\/\*([\s\S]*?)\*\/)/g, style: 'comment' },
			string: { re: /((\'.*?\')|(\".*?\"))/g, style: 'string' },
			numbers: { re: /(\-?(\d+|\d+\.\d+|\.\d+))/g, style: 'number' },
			regex: { re: /([^\/]\/[^\/].+\/(g|i|m)*)/g, style: 'number' },
			keywords: { re: /(var\s|false|true|null|undefined)/g, style: 'keyword' }
		},
		css: {
			comment: { re: /(\/\*([\s\S]*?)\*\/)/g, style: 'comment' },
			string: { re: /((\'.*?\')|(\".*?\"))/g, style: 'string' },
			numbers: { re: /((\-?(\d+|\d+\.\d+|\.\d+)(\%|px|em|pt|in)?)|\#[0-9a-fA-F]{3}[0-9a-fA-F]{3})/g, style: 'number' },
			keywords: { re: /(\@\w+|\:?\:\w+)/g, style: 'keyword' }
		},
		html: {
			comment: { re: /(\&lt\;\!\-\-([\s\S]*?)\-\-\&gt\;)/g, style: 'comment' },
			tag: { re: /(\&lt\;\/?\w(.|\n)*?\/?\&gt\;)/g, style: 'keyword', embed: ['string'] },
			string: { re: /((\'.*?\')|(\".*?\"))/g, style: 'string' }
		}
	};
})(jQuery);