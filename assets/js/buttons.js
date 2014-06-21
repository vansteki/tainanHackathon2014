$(function() {
    app.init();
    
    $("form").submit(function(e){ return false; });

    $("#sub-class").change(function () {
        $("#main").text("");
        switch($(this).find("option:selected").prop("value")) {
            case "dining": app.food.dining(); break;
            case "restaurant": app.food.restaurant(); break;
            case "nightmarket": app.food.nightmarket(); break;
        }
    });
    
    var iniBasicUI = function() {
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
        });
        $spotBtn.click(function() {
            switchPage();
            $subClass.html('');
            $subClass.prev().text('古蹟');
            $subClass.append($('<option>').text('古蹟'));
            $subClass.append($('<option>').text('寺廟'));
        });
        $convBtn.click(function() {
            switchPage();
            $subClass.html('');
            $subClass.prev().text('廁所');
            $subClass.append($('<option>').text('廁所'));
            $subClass.append($('<option>').text('Wifi '));
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
    };
    iniBasicUI();
});