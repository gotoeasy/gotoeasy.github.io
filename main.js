require.config({
	baseUrl : '',
	paths : {
		domReady : "js/domReady",
		gotoEasy : "js/gotoeasy",
	},
	urlArgs : "ver=" + (new Date()).getTime()
});

var url = location.href.split("?")[0];
var page = url.substring(url.lastIndexOf('/') + 1).split(".")[0];

require(['domReady', page], function(domReady, fn){
	domReady(function() {
		fn();
	});
});
