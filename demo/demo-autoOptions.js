
define(['gotoEasy'], function($easy) {

	return function(){

		// 定义数据
		var data = {
			sheng : '0',
			mapOptions : {
				'1' : '0:请选择,a:A省,b:B省,c:C省',
				'a' : '0:请选择,a1:A1市,a2:A2市',
				'b' : '0:请选择,b1:B1市,b2:B2市,b3:B3市',
				'c' : '0:请选择,c1:C1市,c2:C2市',
				'a1' : '0:请选择,a11:A1县1,a12:A1县2,a13:A1县3',
				'a2' : '0:请选择,a21:A2县1,a22:A2县2,a23:A2县3',
				'b1' : '0:请选择,b11:B1县1,b12:B1县2,b13:B1县3',
				'b2' : '0:请选择,b21:B2县1,b22:B2县2',
				'b3' : '0:请选择,b31:B3县1,b32:B3县2,b33:B3县3',
				'c1' : '0:请选择,c11:C1县1,c12:C1县2,c13:C1县3',
				'c2' : '0:请选择,c21:C2县1,c22:C2县2'
			},

			getOptions : function(param){
				return data.mapOptions[param] || '';
			},

			fnSubmit: function(){
				alert(JSON.stringify(data, null, '  '));
			}
		};

		// 绑定数据
		$easy.bind(data);


		// 数据变更时，刷新显示数据的JSON字符串
		$easy.on('datachange', function(data, key, value, oldValue){
			// 省变化时，市待选
			key == 'sheng' && $easy.set(data, 'shi', '0');
			// 市变化时，县待选
			key == 'shi' && $easy.set(data, 'xian', '0');

			// 数据变更时，刷新显示数据的JSON字符串
			document.getElementById('jsonStr').innerHTML = '<pre>' + JSON.stringify(data, null, '  ') + '</pre>'
		});

		// ------------显示数据的JSON字符串--------------
		// 初期显示数据的JSON字符串
		document.getElementById('jsonStr').innerHTML = '<pre>' + JSON.stringify(data, null, '  ') + '</pre>'
		// ----------------------------------------------
	};

});
