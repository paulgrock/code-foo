(function(){
	function yqlQuery(query, callback){
		var yqlURL = "http://query.yahooapis.com/v1/public/yql";
		var data = {
			q: query,
			format: 'json'
		}
		
		$.get(yqlURL, data, callback, 'jsonp');
	}
	var page = $("div[data-role='page']").attr("id");
	yqlQuery("select * from feed where  url='http://feeds.ign.com/ignfeeds/" + page + '/' + "'", function(resp){
		var items = resp.query.results.item,
			imgSrc;
		var	article = $.map(items, function(obj, index){
			var origDesc = obj.description,
				$images = $(obj.description).find('img');
			if($images.length) {
				imgSrc = $images.attr('src');
			} else {
				imgSrc = "IGN-logo.png";
			}
			return {
				title: obj.title,
				link: obj.link,
				description: $(obj.description).filter('p:last').text(),
				image: imgSrc
			}
		});
		var markup = '<li class="ui-btn ui-btn-hover-b ui-btn-down-b ui-btn-icon-right ui-li ui-li-has-thumb"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="${link}" class="ui-link-inherit"><img src="${image}" class="ui-li-thumb" /><h3 class="ui-li-heading">${title}</h3><p class="ui-li-desc">${description}</p></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>';
		$.template("feedReading", markup);
		$.tmpl("feedReading", article).appendTo('#articlesHolder');			
		$("#articlesHolder").find('img').error(function(){
			$(this).attr("src", "IGN-logo.png");
		});
	});
})(jQuery);