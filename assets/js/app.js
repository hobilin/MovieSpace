$(document).ready(function() {

// MOVIES
	 /*
		* funcion para obetener nombre y id
		*/
	var data = movie.movies;
	var dataMovie = [];

	for (var i in data) {
		dataMovie.push(data[i].name);
	}
	/**
 * funcion de autocompletado en el buscador
 */
	$(".search-query").autocomplete({
		source: dataMovie
	})
	/**
	 * funcion para obtener data de las peliculas
	 */
	function getMovie() {
		var data = movie.movies;
		var pelicula = $('.search-query').val();
		for(var i in data){
			if(data[i].name == pelicula){
				/**
       * fincion para obtener trailer de la pelicula
       */
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://api.themoviedb.org/3/movie/" + data[i].id + "/videos?language=en-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
					"method": "GET",
					"headers": {},
					"data": "{}"
				}
				$.ajax(settings).done(function (trailer) {
					console.log(trailer);
					console.log(trailer.results[0].key);
					//$('.trailer').append('<iframe width="426" height="240" src="https://www.youtube.com/embed/' + trailer.results[0].key + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
				});

				/**
       * funcion para obtener data de la pelicula
       */
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://api.themoviedb.org/3/movie/" + data[i].id + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
					"method": "GET",
					"headers": {},
					"data": "{}"
				}
				$.ajax(settings).done(function (response){
					console.log(response);
					/**
					 * identificar genero de la pelicula y guardarlo en un array
					 */
					var arrayGender = [];
					console.log(response.genres);
					for (var i in response.genres) {
						console.log(response.genres[i].name);
						arrayGender.push(response.genres[i].name);
					//$('#izquierda').click(function(){

					//})
				})
			}
		}

	}

seriesPoster();

// FILTRO

  // Función para activar selección de filtros de búsqueda
  $(".btn-round").click(function () {
      //cambia colores de los filtros
      $(this).toggleClass("tag-red-active");
  });

  // Función para aguardar pelis a la lista
  $(".btn-saveM").click(function () {
      // cambia colores del boton archivar
      $(this).toggleClass("btn-saveM-active");
  });



// SERIES
  // cuando ya se clickea una serie lleva a su perfil y se debe añadir este dropdown más los datos
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





  // funcion que coloca las series filtradas
  $("#btn-submitFilter").click(function() {
    $(".js-contMovieAll").empty();
    var seriesArr = ["black+mirror", "game+of+thrones", "vikings", "shameless", "stranger+things", "peaky+blinders", "the+crown", "dark", "the+walking+dead", "the+punisher", "the+x+files", "lucifer", "travelers", "the+flash", "the+gifted","modern+family", "supernatural", "riverdale",
                     "criminal+minds", "the+blacklist", "runaways", "arrow", "rick+and+morty", "mindhunter", "mcmafia", "doctor+who", "the+big+bang+theory", "suits", "the+office", "this+is+us","breaking-bad", "the+good+doctor", "bates+motel", "ncis", "the+100", "outlander", "gotham",
                     "american+horror+story", "blindspot", "fuller+house", "orphan+black", "ancient+aliens"]

      for (var i = 0; i < seriesArr.length; i++) {
      var series = $.getJSON('http://www.omdbapi.com/?t=' + seriesArr[i] + '&apikey=bfdd22b0');
      series.then(function(responseSeries) {
        var posterSerie = responseSeries.Poster;
        var titleSerie = responseSeries.Title;
        var yearSerie = responseSeries.Year;
        var genreSerie = responseSeries.Genre;
        var genreArr = genreSerie.split(",");
        for (var j = 0; j < genreArr.length; j++) {

          if($(".btn-genre[class='tag-red-active']").val() === genreArr[j]){
            console.log(titleSerie);

          /*$(".js-contMovieAll").append('<div class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
                                      '<div class="shadow m-1"><div class="js-img-movie">' +
                                      '<img class="img-responsive" src="' + posterSerie + '">' +
                                      '</div><div class="p-1"><button class="js-saveMovie btn-saveM pull-right">' +
                                      '<span class="glyphicon glyphicon-bookmark"></span></button>' +
                                      '<h4 class="js-titleMovie">' + titleSerie + '</h4><span class="js-year">(' + yearSerie + ')</span>' +
                                      '<p class="js-gender">' + genreSerie + '</p><div class="js-stars">' +
                                      '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
                                      '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
                                      '</div></div></div></div>');*/
          };
        };


      });
    };
  });

// si clickeas en series
$("#btn-series").click(function() {
          $(".js-contMovieAll").empty();
  console.log("clic");
  var seriesArr = ["black+mirror", "game+of+thrones", "vikings", "shameless", "stranger+things", "peaky+blinders", "the+crown", "dark", "the+walking+dead", "the+punisher", "the+x+files", "lucifer", "travelers", "the+flash", "the+gifted","modern+family", "supernatural", "riverdale",
                   "criminal+minds", "the+blacklist", "runaways", "arrow", "rick+and+morty", "mindhunter", "mcmafia", "doctor+who", "the+big+bang+theory", "suits", "the+office", "this+is+us", "breaking-bad", "the+good+doctor", "bates+motel", "ncis", "the+100", "outlander", "gotham",
                   "american+horror+story", "blindspot", "fuller+house", "orphan+black", "ancient+aliens"]

    for (var i = 0; i < seriesArr.length; i++) {
    var series = $.getJSON('http://www.omdbapi.com/?t=' + seriesArr[i] + '&apikey=bfdd22b0');
    series.then(function(responseSeries) {
      var posterSerie = responseSeries.Poster;
      var titleSerie = responseSeries.Title;
      var yearSerie = responseSeries.Year;
      var genreSerie = responseSeries.Genre;
        $(".js-contMovieAll").append('<div class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
                                  '<div class="shadow m-1"><div class="js-img-movie">' +
                                  '<img class="img-responsive" id="imgPoster" src="' + posterSerie + '">' +
                                  '</div><div class="p-1"><button class="js-saveMovie btn-saveM pull-right">' +
                                  '<span class="glyphicon glyphicon-bookmark"></span></button>' +
                                  '<h4 class="js-titleMovie">' + titleSerie + '</h4><span class="js-year">(' + yearSerie + ')</span>' +
                                  '<p class="js-gender">' + genreSerie + '</p><div class="js-stars">' +
                                  '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
                                  '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
                                  '</div></div></div></div>');

      $(".js-img-movie").click(function() {
        $(".js-contMovieAll").empty();
        $(".js-contMovieAll").append('<div class="col-xs-12 col-sm-3 col-md-3"><div id="coverMovie">' +
                               '<img class="img-responsive"src="' + posterSerie + '"></div></div>' +
                               '<div class="col-xs-12 col-sm-6 col-md-7"><h1 id="titleMovie">' + titleSerie + '</h1>' +
                               '<div id="rating">Rating</div><p id="duration">Duration</p><p id="gender">gender</p>' +
                               '<p id="sipnosis"></p></div>')
        console.log("hey");
      });
    });
}
});
