
define(['gotoEasy'], function($easy) {

	return function(){

		// 定义数据
		var data = {
			citylist : [null,{value:'beijin',text:'北京'},{value:'sahnghai',text:'上海'},{value:'guangzhou',text:'广州'}],
			city : 'sahnghai',

			booklist : [{value:'',text:'请选择你最喜欢的书'},'《Java最佳实践》','《JavaScript最佳实践》','《.NET最佳实践》','《读死书不如无书》'],

			
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
