/*
 * jQuery Litelighter
 * By: Trent Richardson [http://trentrichardson.com]
 * 
 * Copyright 2013 Trent Richardson
 * Dual licensed under the MIT or GPL licenses.
 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 */
(function($){

	/* jQuery Litelighter syntax definition for SQL */
	$.litelighter.languages.sql = {
		comment: { re: /(\-\-.*|\#.*)/g, style: 'comment' },
		string: $.litelighter.languages.generic.string,
		numbers: $.litelighter.languages.generic.numbers,
		keywords: { re: /(?:\b)(select|insert|update|delete|where|from|set|create|alter|drop|values|and|or|order|by|group|having|view|table|function|procedure|return|begin|end|with|as|into|false|true|null)(?:\b)/gi, style: 'keyword' },
		operators: $.litelighter.languages.generic.operators
	};


	/* jQuery Litelighter syntax definition for CFML */
	$.litelighter.languages.cfml = {
		comment: { re: /(\&lt\;\!\-\-\-([\s\S]*?)\-\-\-\&gt\;)/g, style: 'comment' },
		cftag: { re: /(\&lt\;\/?cf\w(.|\n)*?\/?\&gt\;)/gi, style: 'number', embed: ['string','numbers','keywords'] },
		tag: { re: /(\&lt\;\/?(?!cf)\w(.|\n)*?\/?\&gt\;)/g, style: 'keyword', embed: ['string'] },
		string: $.litelighter.languages.generic.string,
		keywords: { re: /(?:\b)(false|true|null)(?:\b)/g, style: 'keyword' },
		css: $.litelighter.languages.html.css,
		script: $.litelighter.languages.html.script,
		cfscript: { re: /(?:\&lt;cfscript.*?\&gt;)([\s\S]+?)(?:\&lt;\/cfscript\&gt;)/gi, language: 'generic'},
		sql: { re: /(?:\&lt;cfquery.*?\&gt;)([\s\S]+?)(?:\&lt;\/cfquery\&gt;)/gi, language: 'cfsql'}
	};
	$.litelighter.languages.cfsql = {
		comment: { re: /(\-\-.*|\#.*|\&lt\;\!\-\-\-([\s\S]*?)\-\-\-\&gt\;)/g, style: 'comment' },
		cftag: { re: $.litelighter.languages.cfml.cftag.re, style: 'number', embed: ['string'] },
		string: $.litelighter.languages.generic.string,
		numbers: $.litelighter.languages.generic.numbers,
		keywords: $.litelighter.languages.sql.keywords,
		operators: $.litelighter.languages.generic.operators
	};


	/* jQuery Litelighter syntax definition for php */
	$.litelighter.languages.php = $.extend({},$.litelighter.languages.generic);


	/* jQuery Litelighter syntax definition for php embedded in html */
	$.litelighter.languages.htmlphp = $.extend({},$.litelighter.languages.html, {
		php: { re: /(?:\&lt;\?php)([\s\S]+?)(?:\?\&gt;)/gi, language: 'php'}
	});

})(window.jQuery || window.Zepto || window.$);