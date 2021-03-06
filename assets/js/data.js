var likeStar = function() {
	$('.likeStar').click(function(e) {
	   var req = $(this).attr('href');
	   console.log('star was clicked')
		e.preventDefault(); 
		e.stopPropagation();
		$.ajax({
		  url: req,
		  method: 'GET',
		  success: function(data){
			console.log(data)
		  },
		  error: function(err){
			console.log(err)
		  }   
		});
	});
};
var unlikeStar = function() {
	$('.unlikeStar').click(function(e) {
	   var req = $(this).attr('href');
	   console.log('star was clicked')
		e.preventDefault(); 
		e.stopPropagation();
		$.ajax({
		  url: req,
		  method: 'GET',
		  success: function(data){
			console.log(data)
		  },
		  error: function(err){
			console.log(err)
		  }   
		});
	});
};
var app = {
	init: function () {

		$(document).on("mobileinit");

		$.mobile.loading("show", {
			text: "資料讀取中",
			textVisible: true,
			theme: "b",
			html: ""
		});

		var root = this;
		var data = {
			"美食": {
				"店家": "assets/json/food_dining.json",
            	"餐廳": "assets/json/food_restaurant.json",
            	"夜市": "assets/json/food_nightmarket.json"
            },
            "景點": {
            	"古蹟": "assets/json/spot_interestingPlace.json",
            	"寺廟": "assets/json/spot_temple.json"
            },
            "便民": {
            	"廁所": "http://data.tainan.gov.tw/api/action/datastore_search?resource_id=bde652b1-90d8-4b90-8ab4-f8bdc19242fc&limit=100",
            	"Wifi": "assets/json/service_wifi.json"
            }
        };

        var requestQueue = [];
		var getjson = function (url, id) {
			requestQueue.push($.getJSON(url, function(data) { window[id] = data; }));
		};

		getjson(data["美食"]["店家"], "dining");
		getjson(data["美食"]["餐廳"], "restaurant");
		getjson(data["美食"]["夜市"], "nightmarket");
		getjson(data["景點"]["古蹟"], "interestingPlace");
		getjson(data["景點"]["寺廟"], "temple");
		getjson(data["便民"]["廁所"], "toilet");
		getjson(data["便民"]["Wifi"], "wifi");

		$.when.apply($, requestQueue).then(function(data) {
			$('#food').removeClass("hidden");
			$('#spot').removeClass("hidden");
			$('#conv').removeClass("hidden");
			$.mobile.loading("hide");
		});

	},
	food: {
		dining: function (data) {
			var data = data || window["dining"];
			
			$("#main").append('<div id="dining" data-role="collapsible-set" data-filter="true" data-input="#search"></div>');
			$("#dining").collapsibleset();

			$.each(data, function(key, val) {

				var bd = val["營業時間"].split("*");
				
				$("#dining").append(
					'<div data-role="collapsible">'+
					'	<h3 id="dining-'+key+'">'+val["餐飲店家名稱"]+'</h3>'+
					'<p><a class="show likeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=1" + '>LIKE</a>' +
					'<a class="show unlikeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=0" + '>UNLIKE</a>' +
					'	營業時間：'+bd[7]+'<br />'+
					'		店家地址：<a href="http://maps.google.com.tw/?q='+val["店家地址"]+'" target="_blank">'+val["店家地址"]+'</a><br />'+
					'		店家電話：<a href="tel:'+val["店家電話"]+'">'+val["店家電話"]+'</a>'+
					'	</p>'+
					'</div>'
				);

				if(key == data.length - 1) {
					$("#dining").collapsibleset("refresh");
				}
			});
			likeStar();
			unlikeStar();
		},
		restaurant: function (data) {
			var data = data || window["restaurant"];
			$("#main").append('<div id="restaurant" data-role="collapsible-set" data-filter="true" data-input="#search"></div');
			$("#restaurant").collapsibleset();

			$.each(data, function(key, val) { //data.result.records
				$("#restaurant").append(
					'<div data-role="collapsible">'+
					'	<h3 id="restaurant-'+key+'">'+val["餐廳名稱"]+'</h3>'+
					'<p><a class="show likeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=1" + '>LIKE</a>' +
					'<a class="show unlikeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=0" + '>UNLIKE</a>' +					
					'	店家地址：<a href="http://maps.google.com.tw/?q=台南市'+val["區別"]+val["地址"]+'" target="_blank">台南市'+val["區別"]+val["地址"]+'</a><br />'+
					'	店家電話：<a href="tel:'+val["電話"]+'">'+val["電話"]+'</a>'+
					'	</p>'+
					'</div>'
				)
				if(key == data.length - 1) { //result.records.length
					$("#restaurant").collapsibleset("refresh");
				}
			});
			likeStar();
			unlikeStar();			
		},
		nightmarket: function (data) {
			var data = data || window["nightmarket"];
			$("#main").append('<ul id="nightmarket" data-role="listview" data-filter="true" data-input="#search" data-inset="true"></ul>');
			$("#nightmarket").listview();
			
			$.each(data, function(key, val) {
				$("#nightmarket").append(
					'<li id="nightmarket-'+key+'"><a href="'+val["地圖"]+'" target="_blank">'+val["夜市名"]+'</a>' +
					'<span>' +
					'<a class="show likeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=1" + '>LIKE</a>' +
					'<a class="show unlikeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=0" + '>UNLIKE</a>' +					
					'</span>' +
					'</li>'					 
				)
				if(key == data.length - 1) {
					$("#nightmarket").listview("refresh");
				}
			});
			likeStar();
			unlikeStar();			
		}
	},
	spot: {
		interestingPlace: function (data) {
			var data = data || window["interestingPlace"];
			$("#main").append('<div id="interestingPlace" data-role="collapsible-set" data-filter="true" data-input="#search"></div');
			$("#interestingPlace").collapsibleset();

			$.each(data, function(key, val) {
				$("#interestingPlace").append(
					'<div data-role="collapsible">'+
					'	<h3 id="interestingPlace-'+key+'">'+val["個案名稱"]+'</h3>'+
					'<p><a class="show likeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=1" + '>LIKE</a>' +
					'<a class="show unlikeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=0" + '>UNLIKE</a>' +					
					'	種類級別：'+val["種類"]+' '+val["級別"]+'<br />'+
					'		地理位置：<a href="http://maps.google.com/?q='+val["所在地理區域-縣市"]+val["所在地理區域-鄉鎮市"]+val["地址或位置"]+'">'+val["所在地理區域-縣市"]+val["所在地理區域-鄉鎮市"]+val["地址或位置"]+'</a>'+
					'		歷史沿革：<br />　　'+val["歷史沿革"]+
					'	</p>'+
					'</div>'
				)
				if(key == data.length - 1) {
					$("#interestingPlace").collapsibleset("refresh");
				}
			});
			likeStar();
			unlikeStar();			
		},
		temple: function (data) {
			var data = data || window["temple"];
			$("#main").append('<ul id="temple" data-role="listview" data-filter="true" data-input="#search" data-inset="true"></ul>');
			$("#temple").listview();
			
			$.each(data, function(key, val) {
				$("#temple").append(
					'<li id="interestingPlace-'+key+'"><a href="http://maps.google.com/?q='+val["地址"]+'" target="_blank">'+val["寺廟名稱"]+'</a>'
					'<span>' +
					'<a class="show likeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=1" + '>LIKE</a>' +
					'<a class="show unlikeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=0" + '>UNLIKE</a>' +					
					'</span>' +	
					'</li>'				
				)
				if(key == data.length - 1) {
					$("#temple").listview("refresh");
				}
			});
			likeStar();
			unlikeStar();
		}
	},
	service: {
		toilet: function (data) {
			var data = data || window["toilet"].result.records;
			$("#main").append('<ul id="toilet" data-role="listview" data-filter="true" data-input="#search" data-inset="true"></ul>');
			$("#toilet").listview();
			
			$.each(data, function(key, val) {
				$("#toilet").append(
					'<li id="toilet-'+key+'"><a href="http://maps.google.com/?q='+val["地址或地點描述"]+'" target="_blank">'+val["公廁名稱"]+'</a>'// +val["縣市名稱"]+'+'+val["鄉鎮名稱"]+'+'+val["村里名稱"]+'+'
					'<span>' +
					'<a class="show likeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=1" + '>LIKE</a>' +
					'<a class="show unlikeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=0" + '>UNLIKE</a>' +					
					'</span>' +
					'</li>'		
				)
				if(key == data.length - 1) {
					$("#toilet").listview("refresh");
				}
			});
			likeStar();
			unlikeStar();			
		},
		wifi: function (data) {
			var data = data || window["wifi"];
			$("#main").append('<ul id="wifi" data-role="listview" data-filter="true" data-input="#search" data-inset="true"></ul>');
			$("#wifi").listview();
			
			$.each(data, function(key, val) {
				$("#wifi").append(
					'<li id="wifi-'+key+'"><a href="http://maps.google.com/?q='+val["熱點地址"]+'" target="_blank">'+val["臺南市無線網路熱點名稱"]+'</a>'
					'<span>' +
					'<a class="show likeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=1" + '>LIKE</a>' +
					'<a class="show unlikeStar" href=' + "http://web.thu.edu.tw/s955740/www/fb/like.php?uid=" + localStorage.fbId + "&pid=" + val.id + "&like=0" + '>UNLIKE</a>' +					
					'</span>' +	
					'</li>'
				)
				if(key == data.length - 1) {
					$("#wifi").listview("refresh");
				}
			});
			likeStar();
			unlikeStar();
			
		}
	}
};