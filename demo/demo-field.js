
define(['gotoEasy'], function($easy) {

	return function(){

		// 定义数据
		var data = {
			price : 101,
			num : 0,
			total : 0,

			fnSubmit: function(){
			alert(JSON.stringify(data, null, '  '));
		}};

		// 绑定数据
		$easy.bind(data);

		// 数量修改时自动计算并更新总价
		$easy.on('datachange', function(data, key, value){
			if (key == 'num'){
				data.set('total', data.price * value);
			}
		});

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
