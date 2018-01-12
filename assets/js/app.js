$(document).ready(function() {



// secciones ocultas
$("#mainPage").show();
$("#msform").hide();

	  // Cuando se cliqueen los botones en registro
	    $("#next1").click(function () {
				var emailReg = $("#inputEmail").val();
				var passReg = $("#inputPassword").val();
				console.log(emailReg);
				console.log(passReg);
				console.log("hola");

				firebase.auth().createUserWithEmailAndPassword(emailReg, passReg).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode);
					console.log(errorCode);
				});
	        $("#form-cont").remove();
	        $("fieldset").append(
	            '<div id="form-cont2">'+
	            '<h2 class="fs-title">Redes Sociales</h2>'+
	            '<h3 class="fs-subtitle">Para comenzar puedes ingresar tus peliculas o series favoritas(opcional)</h3>'+
	            '<input type="text" name="title-1" placeholder="Titulo 1" />'+
	            '<input type="text" name="title-2" placeholder="Titulo 2" />'+
	            '<input type="text" name="title-3" placeholder="Titulo 3" />'+
	            '<input type="button" id="next2" name="next" class="action-button btn-md disabled" value="Siguiente" />'+
	            '</div>'
	        );



	        $("#2").addClass("active");

	        $("#next2").click(function () {
	            $("#form-cont2").remove();
	            $("fieldset").append(
	                '<div id="form-cont3">' +
	                '<h2 class="fs-title">Datos Personales</h2>' +
	                '<h3 class="fs-subtitle">Para terminar ingresa tus Datos personales</h3>' +
	                '<input type="text" name="nombre" placeholder="Nombre"/>' +
	                '<input type="text" name="apellido" placeholder="Apellido"/>' +
	                '<input type="text" name="alias" placeholder="Alias"/>' +
	                '<input type="submit" id="btn-submit" name="submit" class="submit action-button disabled" value="Enviar"/>' +
	                '</div>'
	            );


	            $("#3").addClass("active");

	            $("#btn-submit").click(function () {
	                $("#form-cont3").remove();
	                $("#progressbar").remove();
	                $("fieldset").append(
	                    '<img class="success-img" src="img/success.png" alt="">'+
	                    '<div id="form-cont4">' +
	                    '<h1 class="success">¡Felicitaciones!</h1>' +
	                    '<h3 class="success">¡Bienvenido a MovieSpace!</h3>' +
	                    '<input type="button" id="comenzar" name="next" class="next action-button" value="Comenzar" />'+
	                    '</div>'

	                );


									$("#comenzar").click(function () {
										$("#mainPage").show();
										$("#msform").hide();
										$("html").removeClass('bkr-html');
									});



	            });
	        });
	    });

	// FIREBASE



	function ingresar() {
	  var emailLog = $("#inputEmailLog").val();
	  var passLog = $("#inputPassLog").val();

	  firebase.auth().signInWithEmailAndPassword(emailLog, passLog).catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log(errorCode);
	    console.log(errorCode);
	  });
	};

	function observardor() {
	  firebase.auth().onAuthStateChanged(function(user) {
	    if (user) {
	      console.log("usario ingresado")
	    /*  $("#log-in").hide();
	      $(".uno").hide();
	      $(".tres").show();
	      $("#newsfeed").show();
	      $("#profile-mobile").show();
	*/
	      // User is signed in.
	    } else {
	      console.log("no existe usuario activo")
	      // User is signed out.
	      // ...
	    }
	  });
	};
	 observardor();
	 /*

	 function cerrar() {
	   firebase.auth().signOut()
	   .then(function() {
	     $("#log-in").show();
	     $(".uno").show();
	     $(".tres").hide();
	     $("#newsfeed").hide();
	     $("#profile-mobile").hide();
	   })
	   .catch(function(error) {
	 console.log("error");
	   })
	 };*/




// validando registro
$("#msform").validator();

	// VALIDADOR (cierra el modal al validar)
	$('.modal').on('shown.bs.modal', function () {
$(this).find('form').validator('destroy').validator()})

// email validation
function validateEmail($email) {
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
return emailReg.test( $email );
}




// MOVIES
	 /*
		* funcion para obetener nombre y id
		*/
	var data = movie.movies;
	var seriesArr = ["black+mirror", "game+of+thrones", "vikings", "shameless", "stranger+things", "peaky+blinders", "the+crown", "dark", "the+walking+dead", "the+punisher", "the+x+files", "lucifer", "travelers", "the+flash", "the+gifted","modern+family", "supernatural", "riverdale",
									 "criminal+minds", "the+blacklist", "runaways", "arrow", "rick+and+morty", "mindhunter", "mcmafia", "doctor+who", "the+big+bang+theory", "suits", "the+office", "this+is+us","breaking-bad", "the+good+doctor", "bates+motel", "ncis", "the+100", "outlander", "gotham",
									 "american+horror+story", "blindspot", "fuller+house", "orphan+black", "ancient+aliens"];
	var dataMovie = [];

	for (var i in data) {
		dataMovie.push(data[i].name);
	}

	for (var l in seriesArr) {
		dataMovie.push(seriesArr[l])
		}

	/*
 * funcion de autocompletado en el buscador
 */
	$(".search-query").autocomplete({
		source: dataMovie
	});
	/**
	 * funcion para obtener data de las peliculas por el buscador
	 */
	function getMovie() {
		var seriesArr = ["black+mirror", "game+of+thrones", "vikings", "shameless", "stranger+things", "peaky+blinders", "the+crown", "dark", "the+walking+dead", "the+punisher", "the+x+files", "lucifer", "travelers", "the+flash", "the+gifted","modern+family", "supernatural", "riverdale",
                     "criminal+minds", "the+blacklist", "runaways", "arrow", "rick+and+morty", "mindhunter", "mcmafia", "doctor+who", "the+big+bang+theory", "suits", "the+office", "this+is+us","breaking-bad", "the+good+doctor", "bates+motel", "ncis", "the+100", "outlander", "gotham",
                     "american+horror+story", "blindspot", "fuller+house", "orphan+black", "ancient+aliens"];
		var data = movie.movies;
		var pelicula = $('.search-query').val();
		for (var j in seriesArr) {
			if(seriesArr[j] === pelicula){
				var seriesSearch = $.getJSON('http://www.omdbapi.com/?t=' + seriesArr[j] + '&apikey=bfdd22b0');
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
																		});


			}
		}
		for(var i in data){
			if(data[i].name === pelicula){
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
			}
		}
	}
	/**
	 * funcion para obtener data de la pelicula
	 */
	var data = movie.movies;
	for(var h in data){
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.themoviedb.org/3/movie/" + data[h].id + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
			"method": "GET",
			"headers": {},
			"data": "{}"
		}
		$.ajax(settings).done(function (response) {
			/**
			 * identificar genero de la pelicula y guardarlo en un array
			 */
			var arrayGender = [];
			for (var i in response.genres) {


				arrayGender.push(response.genres[i].name);
			}
			$('#btn-peliculas').click(function () {
				$(".js-contMovieAll").empty();
				$('.js-contPelisvieAll').append('<div class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
					'<div class="shadow m-1"><div class="js-img-movie">' +
					'<img class="img-responsive" id="imgPoster" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '">' +
					'</div><div class="p-1"><button class="js-saveMovie btn-saveM pull-right">' +
					'<span class="glyphicon glyphicon-bookmark"></span></button>' +
					'<h4 class="js-titleMovie">' + response.original_title + '</h4><span class="js-year">(' + response.release_date + ')</span>' +
					'<p class="js-gender">' + arrayGender + '</p><div class="js-stars">' +
					'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
					'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
					'</div></div></div></div>');
			})
		});

	}




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
/*  $("#btn-submitFilter").click(function() {
    $(".js-contSerieAll").empty();
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
                                      '</div></div></div></div>');
          };
        };


      });
    };
  });*/

// si clickeas en series
$("#btn-series").click(function() {
          $(".js-contMovieAll").empty();
					  $(".js-contProfile").empty();
  console.log("clic");
  var seriesArr = ["black+mirror", "game+of+thrones", "vikings", "shameless", "stranger+things", "peaky+blinders", "the+crown", "dark", "the+walking+dead", "the+punisher", "the+x+files", "lucifer", "travelers", "the+flash", "the+gifted","modern+family", "supernatural", "riverdale",
                   "criminal+minds", "the+blacklist", "runaways", "arrow", "rick+and+morty", "mindhunter", "mcmafia", "doctor+who", "the+big+bang+theory", "suits", "the+office", "this+is+us", "breaking-bad", "the+good+doctor", "bates+motel", "ncis", "the+100", "outlander", "gotham",
                   "american+horror+story", "blindspot", "fuller+house", "orphan+black", "ancient+aliens"]
var posterSerie;
var titleSerie;
var yearSerie;
var genreSerie;
var titleArr;
var titleNoSpaces;
    for (var i in seriesArr) {
    var series = $.getJSON('http://www.omdbapi.com/?t=' + seriesArr[i] + '&apikey=bfdd22b0');
    series.then(function(responseSeries) {
			 posterSerie = responseSeries.Poster;
	 	   titleSerie = responseSeries.Title;
	     yearSerie = responseSeries.Year;
	 	   genreSerie = responseSeries.Genre;
		   titleArr = titleSerie.split(" ");
		   titleNoSpaces = titleArr.join('');
        $(".js-contSerieAll").append('<div class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
                                  '<div class="shadow m-1"><div class="js-img-movie">' +
                                  '<img class="img-responsive ' + titleNoSpaces +'Poster" id="imgPoster" src="' + posterSerie + '">' +
                                  '</div><div class="p-1"><button class="js-saveMovie btn-saveM pull-right ' + titleNoSpaces +'Save">' +
                                  '<span class="glyphicon glyphicon-bookmark"></span></button>' +
                                  '<h4 class="js-titleMovie ' + titleNoSpaces +'Title">' + titleSerie + '</h4><span class="js-year ' + titleNoSpaces +'Year">(' + yearSerie + ')</span>' +
                                  '<p class="js-gender ' + titleNoSpaces +'Genre">' + genreSerie + '</p><div class="js-stars">' +
                                  '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
                                  '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
                                  '</div></div></div></div>');

																	$(".StrangerThingsSave").click(function() {
																	if ( $(this).hasClass('saveBtn') ) {
																				 $(this).removeClass('saveBtn');
																	} else {
																		var database = firebase.database();
																		var ref = database.ref().child('saved');
																		var data = {
																			poster: $(".StrangerThingsPoster").attr("src"),
																			title: $(".StrangerThingsTitle").text(),
																			year: $(".StrangerThingsYear").text(),
																			genre: $(".StrangerThingsGenre").text()
																		}
																		ref.push(data);
																		console.log(ref);
																	 $(this).addClass('saveBtn');

																	}

																	});

      $(".js-img-movie").click(function() {
        $(".js-contSerieAll").empty();
        $(".js-contProfile").append(this);
        console.log("hey");
      });
    });
};

});
