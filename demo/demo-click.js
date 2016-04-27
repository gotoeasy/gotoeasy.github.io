
define(['gotoEasy'], function($easy) {

	return function(){

		// 定义数据
		var data = {
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
				alert(JSON.stringify(data, null, '  '));
			}
		};

		// 绑定数据
		$easy.bind(data);

	};

});
