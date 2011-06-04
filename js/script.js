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
			var origDesc = obj.description;
			if($(obj.description).find('img').length){
				imgSrc = $(obj.description).find('img').attr('src');
				console.log($(obj.description).find('img').onError);
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
		$("#articles").tmpl(article).appendTo('#articlesHolder');
	});
})(jQuery);