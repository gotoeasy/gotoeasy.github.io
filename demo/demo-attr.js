
define(['gotoEasy'], function($easy) {

	return function(){

		// 定义数据
		var data = {
			maxlen : '5',
			maxlenList : '1,3,5,7,9',
			fnSubmit: function(){
			alert(JSON.stringify(data, null, '  '));
		}};

		// 绑定数据
		$easy.bind(data);

		// ------------显示数据的JSON字符串--------------
		// 初期显示数据的JSON字符串
		document.getElementById('jsonStr').innerHTML = '<pre>' + JSON.stringify(data, null, '  ') + '</pre>'
		// 数据变更时，刷新显示数据的JSON字符串
		$easy.on('datachange', function(){
			document.getElementById('jsonStr').innerHTML = '<pre>' + JSON.stringify(data, null, '  ') + '</pre>'
		});
		// ----------------------------------------------
	};

});
