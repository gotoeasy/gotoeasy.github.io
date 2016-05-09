
define(['gotoEasy'], function($easy) {

	return function(){

		// 定义数据
		var data = {fnSubmit: function(){
			alert(JSON.stringify(data, null, '  '));
		}};

		// 绑定数据
		$easy.bind(data);

		// 数据变更时，显示数据的JSON字符串
		$easy.on('datachange', function(){
			document.getElementById('jsonStr').innerHTML = '<pre>' + JSON.stringify(data, null, '  ') + '</pre>'
		});
	};

});
