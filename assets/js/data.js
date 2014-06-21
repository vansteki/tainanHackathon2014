var app = {
	food: {
		dining: function () {
			$.ajax({
				type: "GET",
				url: "assets/json/food_dining.json",
				success: function(data) {
					
					var checkit = function (onoff) {
						if(onoff == 1)
							return 'O';
						else 
							return 'X';
					};

					$("#main").append('<div id="dining" data-role="collapsible-set" data-filter="true" data-filter-placeholder="搜尋"></div>');
					$("#dining").collapsibleset();

					$.each(data, function(key, val) {

						var bd = val["營業時間"].split("*");
						var table = '<table class="ui-responsive ui-table ui-table-reflow">';
						table += "<tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th>";
						table += '<tr><td>'+checkit(bd[0])+'</td><td>'+checkit(bd[1])+'</td><td>'+checkit(bd[2])+'</td><td>'+checkit(bd[3])+'</td><td>'+checkit(bd[4])+'</td><td>'+checkit(bd[5])+'</td><td>'+checkit(bd[6])+'</td>';
						table += '</table>';

						$("#dining").append(
							'<div data-role="collapsible">'+
							'	<h3>'+val["餐飲店家名稱"]+'</h3>'+
							'	<p>'+table+
							'		營業時間：'+bd[7]+'<br />'+
							'		店家地址：<a href="http://maps.google.com.tw/?q='+val["店家地址"]+'" target="_blank">'+val["店家地址"]+'</a><br />'+
							'		店家電話：<a href="tel:'+val["店家電話"]+'">'+val["店家電話"]+'</a></p>'+
							'	</div>'+
							'</div>'
						);

						if(key == data.length - 1) {
							$("#dining").collapsibleset("refresh");
						}
					})
				}
			});
		},
		restaurant: function () {
			$.ajax({
				type: "GET",
				url: "http://data.tainan.gov.tw/api/action/datastore_search?resource_id=a4dda55a-6ffb-4423-b968-471de89c779f&limit=100",
				success: function(data) {

					$("#main").append('<div id="restaurant" data-role="collapsible-set" data-filter="true" data-filter-placeholder="搜尋"></div');
					$("#restaurant").collapsibleset();

					$.each(data.result.records, function(key, val) {
						$("#restaurant").append(
							'<div data-role="collapsible">'+
							'	<h3>'+val["餐廳名稱"]+'</h3>'+
							'	<p>店家地址：<a href="http://maps.google.com.tw/?q=台南市'+val["區別"]+val["地址"]+'" target="_blank">台南市'+val["區別"]+val["地址"]+'</a><br />'+
							'		店家電話：<a href="tel:'+val["電話"]+'">'+val["電話"]+'</a></p>'+
							'	</div>'+
							'</div>'
						)
						if(key == data.result.records.length - 1) {
							$("#restaurant").collapsibleset("refresh");
						}
					})
				}
			});
		},
		nightmarket: function () {
			$.ajax({
				type: "GET",
				url: "assets/json/food_nightmarket.json",
				success: function(data) {
					
					$("#main").append('<ul id="nightmarket" data-role="listview" data-filter="true" data-filter-placeholder="搜尋" data-inset="true"></ul>');
					$("#nightmarket").listview();
					
					$.each(data, function(key, val) {
						$("#nightmarket").append(
							'<li><a href="'+val["地圖"]+'" target="_blank">'+val["區別"]+' - '+val["夜市名"]+'</a></li>'
						)
						if(key == data.length - 1) {
							$("#nightmarket").listview("refresh");
						}
					})
				}
			});
		}
	}
};