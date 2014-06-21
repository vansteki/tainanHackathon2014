$(function() {


var $foodBtn = $('#food');
var $spotBtn = $('#spot');
var $convBtn = $('#conv');
var $subClass = $('#sub-class');
var $searchForm = $('#search-form');
var $navLink = $('.navLink');

$foodBtn.click(function() {
    switchPage();
    $subClass.html('');
    $subClass.prev().text('店家');
    $subClass.append($('<option>').text('店家'));
    $subClass.append($('<option>').text('餐廳'));
    $subClass.append($('<option>').text('夜市'));
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
   hideNavLink();
   hideSearchForm();
});

var showNavLink = function() {
    $navLink.removeClass('hidden');
};
var hideNavLink = function() {
    $navLink.addClass('hidden');
}
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
    showSearchForm();
    showNavLink();
    $navLink.find('#prev-link').removeClass('ui-btn-active'); //remove active blue color
};




}); //end of jQuery done
