$(document).ready(function() {

  $("#gotPoster").click(function() {
    $("#serieSeason").append('<div class="container">' +
                             '<select name="" id="cusSelectbox">' +
                             '<option value="seasons">temporadas</option>' +
    			                   '<option value="one" id="one">1</option>' +
    			                   '<option value="two" id="two">2</option>' +
    			                   '<option value="three" id="three">3</option>' +
    			                   '<option value="four" id="four">4</option>' +
    			                   '<option value="five" id="five">5</option>' +
    			                   '<option value="six" id="six">6</option>' +
                             '<option value="seven" id="seven">7</option>' +
                             '<option value="eight" id="eight">8</option>' +
    		                     '</select>' +
    	                       '</div>' +
                             '<div id="divEpisodesGOT">' +
                             '<a href="#"></a>' +
                             '</div>')
  });

// selector
$(function () {
	var defaultselectbox = $('#cusSelectbox');
	var numOfOptions = $('#cusSelectbox').children('option').length;

	// hide select tag
	defaultselectbox.addClass('s-hidden');

	// wrapping default selectbox into custom select block
	defaultselectbox.wrap('<div class="cusSelBlock"></div>');

	// creating custom select div
	defaultselectbox.after('<div class="selectLabel"></div>');

	// getting default select box selected value
	$('.selectLabel').text(defaultselectbox.children('option').eq(0).text());

	// appending options to custom un-ordered list tag
	var cusList = $('<ul/>', { 'class': 'options'} ).insertAfter($('.selectLabel'));

	// generating custom list items
	for(var i = 0; i < numOfOptions; i++) {
		$('<li/>', {
		text: defaultselectbox.children('option').eq(i).text(),
		rel: defaultselectbox.children('option').eq(i).val()
		}).appendTo(cusList);
	}

	// open-list and close-list items functions
	function openList() {
		for(var i = 0; i < numOfOptions; i++) {
			$('.options').children('li').eq(i).attr('tabindex', i).css(
				'transform', 'translateY('+(i * +  100) + '%)').css(
				'transition-delay', i * 30 +'ms');
		}
	}

	function closeList() {
		for(var i = 0; i < numOfOptions; i++) {
			$('.options').children('li').eq(i).css(
				'transform', 'translateY('+ i * 0 +'px)').css('transition-delay', i * 0 +'ms');
      }
		$('.options').children('li').eq(1).css('transform', 'translateY('+ 2 +'px)');
		$('.options').children('li').eq(2).css('transform', 'translateY('+ 4 +'px)');
	}

	// click event functions
	$('.selectLabel').click(function () {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			openList();
			focusItems();
		} else {
			closeList();
		}
	});

	$(".options li").on('keypress click', function(e) {
		e.preventDefault();
		$('.options li').siblings().removeClass();
		closeList();
		$('.selectLabel').removeClass('active');
		$('.selectLabel').text($(this).text());
		defaultselectbox.val($(this).text());
    // Función para traer data de episodios
    seasons();
    $("#divEpisodesGOT").empty();
    });
});

});

function focusItems() {

	$('.options').on('focus', 'li', function() {
		$this = $(this);
		$this.addClass('active').siblings().removeClass();
	}).on('keydown', 'li', function(e) {
		$this = $(this);
		if (e.keyCode === 40) {
			$this.next().focus();
			return false;
		} else if (e.keyCode === 38) {
			$this.prev().focus();
			return false;
		}
	}).find('li').first().focus();
}


  function seasons() {
  var numSeason = $('.selectLabel').text();
  var seasonsGOT = $.getJSON('http://www.omdbapi.com/?t=Game%20of%20Thrones&Season='+ numSeason +'&apikey=bfdd22b0');
  seasonsGOT.then(function(responseSeason) {
    var episodes = responseSeason.Episodes;
    for(var j = 0; j < episodes.length; j++){
    console.log(episodes[j].Title);
    var episodesGOT = episodes[j].Title;
    $("#divEpisodesGOT").append('<p id="episodesLink">'+ episodesGOT +'</p>');
  }

});
  };
