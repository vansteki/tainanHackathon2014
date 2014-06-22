$(function() {
    var $foodBtn = $('#food');
    var $spotBtn = $('#spot');
    var $convBtn = $('#conv');
    var $subClass = $('#sub-class');
    var $searchForm = $('#search-form');
    var $navLink = $('#home');
    var $main = $('#main');

    $foodBtn.click(function() {
        switchPage();
        $subClass.html('');
        $subClass.prev().text('店家');
        $subClass.append($('<option>').text('店家').prop("value", "dining"));
        $subClass.append($('<option>').text('餐廳').prop("value", "restaurant"));
        $subClass.append($('<option>').text('夜市').prop("value", "nightmarket"));
        $subClass.trigger("change");
    });
    $spotBtn.click(function() {
        switchPage();
        $subClass.html('');
        $subClass.prev().text('古蹟');
        $subClass.append($('<option>').text('古蹟').prop("value", "interestingPlace"));
        $subClass.append($('<option>').text('寺廟').prop("value", "temple"));
        $subClass.trigger("change");
    });
    $convBtn.click(function() {
        switchPage();
        $subClass.html('');
        $subClass.prev().text('廁所');
        $subClass.append($('<option>').text('廁所').prop("value", "toilet"));
        $subClass.append($('<option>').text('Wifi').prop("value", "wifi"));
        $subClass.trigger("change");
    });
    $navLink.click(function() {
       showAllClassBtn();
       hideMain();
       hideSearchForm();
    });

    var showNavLink = function() {
        $navLink.removeClass('hidden');
    };
    var hideNavLink = function() {
        $navLink.addClass('hidden');
    };
    var showMain = function () {
        $main.removeClass('hidden');
    };
    var hideMain = function () {
        $main.addClass('hidden');
    };
    var showSearchForm = function() {
        $searchForm.removeClass('hidden');
    };
    var hideSearchForm = function() {
        $searchForm.addClass('hidden');
    };
    var showAllClassBtn = function() {
        $foodBtn.removeClass('hidden'); 
        $spotBtn.removeClass('hidden'); 
        $convBtn.removeClass('hidden');
    };
    var hideAllClassBtn = function() {
        $foodBtn.addClass('hidden');
        $spotBtn.addClass('hidden');
        $convBtn.addClass('hidden');    
    };
    var switchPage = function() {
        $foodBtn.addClass('hidden');
        $spotBtn.addClass('hidden');
        $convBtn.addClass('hidden');
        $main.addClass('hidden');
        showSearchForm();
        showNavLink();
        showMain();
        $navLink.find('#prev-link').removeClass('ui-btn-active'); //remove active blue color
    };

    app.init();
    
    $("#sub-class").change(function () {
        $("#main").text("");
        switch($(this).find("option:selected").prop("value")) {
            case "dining": app.food.dining(); break;
            case "restaurant": app.food.restaurant(); break;
            case "nightmarket": app.food.nightmarket(); break;
            case "interestingPlace": app.spot.interestingPlace(); break;
            case "temple": app.spot.temple(); break;
            case "toilet": app.service.toilet(); break;
            case "wifi": app.service.wifi(); break;
        }
        $("a").click(function (e) {
            var id = $(e.target).parent().prop("id");
            var text = $(e.target).text().replace(" click to expand contents", "").replace(" click to collapse contents", "");
            if(id != "") {
                if(history.length >= 20)history.shift();
                history.push({id: id, text: text}); // data into array
                localStorage["history"] = JSON.stringify(history); // save to localstorage
            }
        })
    });
    
    // history section
    var history_panel_refresh = function () {
        $("#history_panel ul").html("")
        var arr = JSON.parse(localStorage["history"]).reverse();
        $.each(arr, function (key, val) {
            $("#history_panel ul").append('<li><a id="'+val.id+'" href="#'+val.id+'" class="ui-btn ui-btn-icon-left ui-icon-carat-l">'+val.text+'</a></li>');
            if(key == arr.length - 1) {
                $("#history_panel ul").listview("refresh");

                // autoload history
                autoload_history("food", "dining");
                autoload_history("food", "restaurant");
                autoload_history("food", "nightmarket");

                autoload_history("spot", "interestingPlace");
                autoload_history("spot", "temple");

                autoload_history("service", "toilet");
                autoload_history("service", "wifi");
            }
        })
    };

    var autoload_history = function (fstclass, subclass) {
        $("a[id^='"+subclass+"-']").click(function () {
            switch(fstclass) {
                case "food": $foodBtn.trigger("click"); break;
                case "spot": $spotBtn.trigger("click"); break;
                case "service": $convBtn.trigger("click"); break;
            }
            $subClass.find("option[value='"+subclass+"']").prop("selected", true).trigger("change");
            $("#search").prop("value", $(this).text()).trigger("keyup");
        })
    };

    var history;
    $("#history").click(function () {
        if(localStorage["history"] == "") {
            localStorage["history"] = "[]";
        }
        history = JSON.parse(localStorage["history"]);
        history_panel_refresh();
        $("#history_panel").panel("open");
    });

    // search section
    var iniSearch = function() {
        var defaultFuseOpt = {
            keys: [],
            threshold: 0.1
        };
        var setFilter = function(group, keyName, newFuseOption, searchInput, remoteData) {
            var options = $.extend(true, {}, defaultFuseOpt, newFuseOption);
            var values = (remoteData)?window[keyName].result.records:window[keyName];
            var result = (new Fuse(values, options)).search($(searchInput).val());
                if($(searchInput).val() != "") {
                    $("#main").html("");
                }
                else {
                    $("#sub-class").trigger("change");
                }
                app[group][keyName](result);
        };
        $('#search').keyup(function(e) {
            var currentSubClass = $('#sub-class').prev().text();
            if (e.keyCode !== 38 && e.keyCode !== 40 ) {
                 if (currentSubClass === '店家') setFilter('food', 'dining', {keys: ['餐飲店家名稱', '店家簡述']}, this, false);
                 if (currentSubClass === '餐廳') setFilter('food', 'restaurant', {keys: ['餐廳名稱']}, this, false);
                 if (currentSubClass === '夜市') setFilter('food', 'nightmarket', {keys: ['夜市名']}, this, false);

                 if (currentSubClass === '古蹟') setFilter('spot', 'interestingPlace', {keys: ['個案名稱']}, this, false);   //need modify keyName and options
                 if (currentSubClass === '寺廟') setFilter('spot', 'temple', {keys: ['寺廟名稱']}, this, false);   //need modify keyName and options
                
                 if (currentSubClass === '廁所') setFilter('service', 'toilet', {keys: ['地址或地點描述', '公廁名稱']}, this, true);
                 if (currentSubClass === 'Wifi') setFilter('service', 'wifi', {keys: ['臺南市無線網路熱點名稱']}, this, false);
            }
        });
    };
    iniSearch();
	

});