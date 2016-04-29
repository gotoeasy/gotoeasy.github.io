
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
				push : function (){
					var ary = data.details;
					ary.push({id:new Date()-1, price:999, count:0});
				}
				,pop : function (){
					data.details.pop();
				}
				,shift : function (){
					data.details.shift();
				}
				,unshift : function (){
					data.details.unshift({id:new Date()-1,name:'unshift???1',price:90,count:1}
									, {id:new Date()-1,name:'unshift???2',price:90,count:1});
				}
				,reverse : function (){
					data.details.reverse();
				}
				,copyAdd : function ($data){
					var ary = data.details;
					ary.push({id:new Date()-1, name:$data.name, price:$data.price, count:$data.count});
				}
				,del : function ($data){
					if (confirm("确认要删除编号为 " + $data.id + " 的数据吗？")){
						var ary = data.details;
						ary.splice(ary.indexOf($data), 1);
					}
				}
				,sortByPrice : function (){
					var ary = data.details;
					ary.sort(function (o1,o2){
								return  o1.price > o2.price ? 1 : (o1.price == o2.price ? 0:-1); // 升序
							});
				}
			},
			
			fnSubmit: function() {
				alert(JSON.stringify(data, null, '  '));
			}
			,selectAll: function() {
				var checkeVal = event.target.checked? '1':'0';
				var ary = data.details;
				for (var i=0; i<ary.length; i++){
					$easy.set(ary[i], 'checked', checkeVal);
				}
			}
		};

		// 绑定数据（按自定义配置进行绑定）
		$easy.bind(data, '', {
			domAttrBind : 'bind-key-as-you-like',
			bindRefData : '$this',
			bindKeyValue : 'v',
			bindKeyInnerText : 't',
			bindKeyInnerHtml : 'h',
			bindKeyClick : 'clk',
			bindKeyForeach : 'loop',
			bindKeyChecked : 'chk',
		});

	};

});
