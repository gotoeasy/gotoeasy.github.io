
define(['gotoEasy'], function($easy) {

	return function(){

		// 定义数据
		var data = {
					formData:{},
					jsonStr:''
					};

		// 绑定数据
		$easy.bind(data);

		// 数据变更时，显示数据的JSON字符串
		$easy.on('datachange', function(){
			data.set('jsonStr', JSON.stringify(data.formData, null, '  '));
		});
	};

});
