
define(['gotoEasy'], function($easy) {

	return function(){

		// 定义数据
		var data = {
			count: 5,
			details: [{ id: 1, name: '电风扇', price: 200, count: 2 },
					{ id: 2, name: '剃须刀', price: 198, count: 1 },
					{ id: 3, name: '电视', price: 2000, count: 3 }, 
					{ id: 4, name: '鼠标', price: 100, count: 1 },
					{ id: 5, name: '电吹风', price: 199, count: 1 }
				],

			fns : {
				edit : function ($data){
					var name = prompt('请修改名称', $data.name);
					if (name){
						$data.set('name', name);
					}
				}
			},
			
			fnSubmit: function() {
					alert(JSON.stringify(this, null, '  '))
				alert(JSON.stringify(data, null, '  '));
			}
		};

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
