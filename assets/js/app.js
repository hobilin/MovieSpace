
$(document).ready(function() {



// secciones ocultas
$("#mainPage").show();
$("fieldset").hide();
$("#profUser").hide();

$("#signUp").click(function() {
	$("#mainPage").hide();
	$("#msFormReg").show();
	$("#msFormLog").hide();
});

$("#logIn").click(function() {
	$("#mainPage").hide();
	$("#msFormLog").show();
	$("#msFormReg").hide();

});

$("#userPage").click(function() {
	$("#mainPage").hide();
	$("#profUser").show();
});





	  // Cuando se cliqueen los botones en registro
	    $("#next1").click(function () {
				var emailReg = $("#inputEmail").val();
				var passReg = $("#inputPassword").val();

				console.log(emailReg);
				console.log(passReg);
				console.log("hola");
$("fieldset").hide();
$("#mainPage").show();
				firebase.auth().createUserWithEmailAndPassword(emailReg, passReg).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode);
					console.log(errorCode);
				});

	            });


	// FIREBASE


	$("#nextLog").click(function ingresar() {
	  var emailLog = $("#inputEmailLog").val();
	  var passLog = $("#inputPassLog").val();

		$("#logIn").hide();
		$("#signUp").hide();
		$("#mainPage").show();
		$("#userAvatar").show();
		$("#msFormLog").hide();

	  firebase.auth().signInWithEmailAndPassword(emailLog, passLog).catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log(errorCode);
	    console.log(errorCode);
	  });
	});

	// ver si hay usuario activo
	function observardor() {
	  firebase.auth().onAuthStateChanged(function(user) {
	    if (user) {
				$("#logIn").hide();
				$("#signUp").hide();
				$("#mainPage").show();
				$("#userAvatar").show();
	      console.log("usario ingresado")
	      // User is signed in.
	    } else {
	      console.log("no existe usuario activo")
				$("#userAvatar").hide();
	      // User is signed out.
	      // ...
	    }
	  });
	};
	 observardor();



	 $("#logOut").click(function() {
	   firebase.auth().signOut().then(function() {
	     $("#logIn").show();
	     $("#signUp").show();
	     $("#userAvatar").hide();

	   });
	   firebase.auth().signOut().catch(function(error) {
	 console.log("error");
	   })
	 });




// validando registro
$("#msFormReg").validator();
$("#msFormLog").validator();

	// VALIDADOR (cierra el modal al validar)
	$('.modal').on('shown.bs.modal', function () {
$(this).find('form').validator('destroy').validator()})

// email validation
function validateEmail($email) {
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
return emailReg.test( $email );
}





// MOVIES
	/**
	 * funcion para el buscador
	 */
	$('#search').click(function () {

		/* se limpia el div */

		$(".js-contMovieAll").empty();
		$(".js-contSerieAll").empty();
		$(".js-contPelisvieAll").empty();
		$(".js-contUpcomingvieAll").empty();

		/* esto es una llamada a la api que nos obtendra las peliculas mas populares */
		var busqueda = $('.search-query').val();
		var name = busqueda.replace(' ', '+');
		$.ajax({
			url: 'https://api.themoviedb.org/3/search/multi?include_adult=false&page=1&query=' + name + '&language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222',
			type: 'GET',
			success: function (responseAjax) {
				var datosBusqueda = responseAjax.results;
				console.log(datosBusqueda);
				for (var x in datosBusqueda) {
					response = datosBusqueda[x];
					$('.js-contSearchvieAll').append('<div  class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
						'<div class="shadow m-1"><div db-id="' + response.id + '" class="js-img-movie  clickCard">' +
						'<img class="img-responsive" id="imgPoster" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '">' +
						'</div><div class="p-1"><button db-id="' + response.id + '"class="js-saveMovie btn-saveM pull-right">' +
						'<span class="glyphicon glyphicon-bookmark"></span></button>' +
						'<h4 class="js-titleMovie test">' + response.title + '</h4><span class="js-year">(' + response.release_date + ')</span>' +
						'<p class="js-gender">genero</p><div class="js-stars">' +
						'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
						'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
						'</div></div></div></div>'
					);
				}

				$(".js-saveMovie").click(function() {
					 $(this).addClass('saveBtn');
								// ahora obtendremos el id de la pelicula a la cual se le dio click
								var idPelicula = $(this).attr("db-id");
								$(".js-contSerieAll").empty();
								$(".js-contMovieAll").empty();
								$(".js-contPelisvieAll").empty();
								// ahora obtendremos el id de la pelicula a la cual se le dio click
								var idPelicula = $(this).attr("db-id");
								/**
							* funcion para obtener data de la pelicula
							*/
								var settings = {
									"async": true,
									"crossDomain": true,
									"url": "https://api.themoviedb.org/3/movie/" + idPelicula + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
									"method": "GET",
									"headers": {},
									"data": "{}"
								}
								$.ajax(settings).done(function (response) {
									var arrayGender = [];
									console.log(response.genres);
									for (var i in response.genres) {
										console.log(response.genres[i].name);
										arrayGender.push(response.genres[i].name);
									}
									var database = firebase.database();
												var users = database.ref().child('users');
												var currentUser = users.child(firebase.auth().currentUser.uid);
												var saved = currentUser.child("saved"); //#userName.val() del form de registro
								    var data = {
								      poster:  response.poster_path,
								      title: response.original_title,
								      year: response.release_date,
								      genre: response.genres[i].name
								    }
								    saved.push(data);
								    saved.on('value', gotDataSave(), errDataSave());
								});
							});
				/**
				* este evento se agrega justo despues de agregar el nuevo contenido ya que si
				* se pone afuera este evento se agregara cuando el contenido no existe
				* por ende no se le agregara el evento
				*/
				$(".clickCard").click(function () {
					$(".js-contMovieAll").empty();
					$(".js-contSerieAll").empty();
					$(".js-contSearchvieAll").empty();
					$(".js-contPelisvieAll").empty();
					$(".js-contUpcomingvieAll").empty();
					// ahora obtendremos el id de la pelicula a la cual se le dio click
					var idPelicula = $(this).attr("db-id");
					/**
       * funcion para obtener data de la pelicula
       */
					var settings = {
						"async": true,
						"crossDomain": true,
						"url": "https://api.themoviedb.org/3/movie/" + idPelicula + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
						"method": "GET",
						"headers": {},
						"data": "{}"
					}
					$.ajax(settings).done(function (response) {
						var arrayGender = [];
						console.log(response.genres);
						for (var i in response.genres) {
							console.log(response.genres[i].name);
							arrayGender.push(response.genres[i].name);
						}

						$('.js-contPelisvieAll').append('<div class="row">' +
							'<div class= "col-sm-3">' +
							'<div id="coverMovie">' +
							'<img class="img-responsive" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '" alt="">' +
							'</div>' +
							'</div>' +
							'<div class="col-sm-9">' +
							'<h1 id="titleMovie">' + response.original_title + '</h1>' +
							'<div id="rating">' + response.popularity + '</div>' +
							'<p id="duration">' + response.runtime + '´min</p>' +
							'<p id="gender">' + arrayGender + '</p>' +
							'<p id="sipnosis">' + response.overview + '</p>' +
							'</div>' +
							'</div>');
					});
				});
			},
		});

		});
	/**
	 * funcion para obtener data de la pelicula
	 */
	$('#btn-peliculas').click(function () {

		/* se limpia el div */
		$(".js-contSerieAll").empty();
		$(".js-contSearchvieAll").empty();
		$(".js-contPelisvieAll").empty();
		$(".js-contUpcomingvieAll").empty();
				/* esto es una llamada a la api que nos obtendra las peliculas mas populares */
		$.ajax({
			url: 'https://api.themoviedb.org/3/movie/popular?api_key=ca7d88c98023c60da7dcd04d4840b222&language=es-US&page=1',
			type: 'GET',
			success: function (responseAjax) {
				var datosPeliculas = responseAjax.results;
				console.log(datosPeliculas);
				for (var x in datosPeliculas) {
					response = datosPeliculas[x]
					$('.js-contMovieAll').append('<div  class="js-cardMovie  col-xs-6 col-sm-4 col-md-3 b p-0">' +
						'<div class="shadow m-1"><div db-id="' + response.id + '"class="js-img-movie clickCard">' +
						'<img class="img-responsive" id="imgPoster" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '">' +
						'</div><div class="p-1"><button db-id="' + response.id + '"class="js-saveMovie btn-saveM pull-right">' +
						'<span class="glyphicon glyphicon-bookmark"></span></button>' +
						'<h4 class="js-titleMovie test">' + response.original_title + '</h4><span class="js-year">(' + response.release_date + ')</span>' +
						'<p class="js-gender">asd</p><div class="js-stars">' +
						'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
						'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
						'</div></div></div></div>'
					);
				};
				$(".js-saveMovie").click(function() {
					 $(this).addClass('saveBtn');
								// ahora obtendremos el id de la pelicula a la cual se le dio click
								var idPelicula = $(this).attr("db-id");
								$(".js-contSerieAll").empty();
								$(".js-contSearchvieAll").empty();
								// ahora obtendremos el id de la pelicula a la cual se le dio click
								var idPelicula = $(this).attr("db-id");
								/**
							* funcion para obtener data de la pelicula
							*/
								var settings = {
									"async": true,
									"crossDomain": true,
									"url": "https://api.themoviedb.org/3/movie/" + idPelicula + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
									"method": "GET",
									"headers": {},
									"data": "{}"
								}
								$.ajax(settings).done(function (response) {
									var arrayGender = [];
									console.log(response.genres);
									for (var i in response.genres) {
										console.log(response.genres[i].name);
										arrayGender.push(response.genres[i].name);
									}

									var database = firebase.database();
									      var users = database.ref().child('users');
									      var currentUser = users.child(firebase.auth().currentUser.uid);
									      var saved = currentUser.child("saved"); //#userName.val() del form de registro

								    var data = {
								      poster:  response.poster_path,
								      title: response.original_title,
								      year: response.release_date,
								      genre: response.genres[i].name
								    }
								    saved.push(data);
								    saved.on('value', gotDataSave(), errDataSave());

								});
							});
				/**
				* este evento se agrega justo despues de agregar el nuevo contenido ya que si
				* se pone afuera este evento se agregara cuando el contenido no existe
				* por ende no se le agregara el evento
				*/
				$(".clickCard").click(function () {

					// ahora obtendremos el id de la pelicula a la cual se le dio click
					var idPelicula = $(this).attr("db-id");
					$(".js-contMovieAll").empty();
					$(".js-contSerieAll").empty();
					$(".js-contSearchvieAll").empty();
					$(".js-contPelisvieAll").empty();
					$(".js-contUpcomingvieAll").empty();
					// ahora obtendremos el id de la pelicula a la cual se le dio click
					var idPelicula = $(this).attr("db-id");
					/**
       * funcion para obtener data de la pelicula
       */
					var settings = {
						"async": true,
						"crossDomain": true,
						"url": "https://api.themoviedb.org/3/movie/" + idPelicula + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
						"method": "GET",
						"headers": {},
						"data": "{}"
					}
					$.ajax(settings).done(function (response) {
						var arrayGender = [];
						console.log(response.genres);
						for (var i in response.genres) {
							console.log(response.genres[i].name);
							arrayGender.push(response.genres[i].name);
						}

						$('.js-contPelisvieAll').append('<div class="row">' +
							'<div class= "col-sm-3">' +
							'<div id="coverMovie">' +
							'<img class="img-responsive" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '" alt="">' +
							'</div>' +
							'</div>' +
							'<div class="col-sm-9">' +
							'<h1 id="titleMovie">' + response.original_title + '</h1>' +
							'<div id="rating">' + response.popularity + '</div>' +
							'<p id="duration">' + response.runtime + '´min</p>' +
							'<p id="gender">' + arrayGender + '</p>' +
							'<p id="sipnosis">' + response.overview + '</p>' +
							'</div>' +
							'</div>');
					});

				});

			},


				});

		});

	/**
	 * funcion para obtener data de las series
	 */
	$('#btn-series').click(function () {

		/* se limpia el div */
		$(".js-contMovieAll").empty();
		$(".js-contSearchvieAll").empty();
		$(".js-contPelisvieAll").empty();
		$(".js-contUpcomingvieAll").empty();
		/* esto es una llamada a la api que nos obtendra las peliculas mas populares */
		$.ajax({
			url: 'https://api.themoviedb.org/3/tv/popular?api_key=ca7d88c98023c60da7dcd04d4840b222&language=es-US&page=1',
			type: 'GET',
			success: function (responseAjax) {
				var datosSeries = responseAjax.results;
				console.log(datosSeries);
				for (var x in datosSeries) {
					response = datosSeries[x];
					$('.js-contSerieAll').append('<div  class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
						'<div class="shadow m-1"><div db-id="' + response.id + '"class="js-img-movie clickCard">' +
						'<img class="img-responsive" id="imgPoster" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '">' +
						'</div><div class="p-1"><button db-id="' + response.id + '"class="js-saveMovie btn-saveM pull-right">' +
						'<span class="glyphicon glyphicon-bookmark"></span></button>' +
						'<h4 class="js-titleMovie test">' + response.name + '</h4><span class="js-year">(' + response.first_air_date + ')</span>' +
						'<p class="js-gender">asd</p><div class="js-stars">' +
						'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
						'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
						'</div></div></div></div>'
					);
				};
				$(".js-saveMovie").click(function() {
					 $(this).addClass('saveBtn');
								// ahora obtendremos el id de la pelicula a la cual se le dio click
								var idSeries = $(this).attr("db-id");
								$(".js-contMovieAll").empty();
								$(".js-contSearchvieAll").empty();
								$(".js-contPelisvieAll").empty();
								// ahora obtendremos el id de la pelicula a la cual se le dio click
								var idSeries = $(this).attr("db-id");
								/**
							* funcion para obtener data de la pelicula
							*/
								var settings = {
									"async": true,
									"crossDomain": true,
									"url": "https://api.themoviedb.org/3/movie/" + idSeries + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
									"method": "GET",
									"headers": {},
									"data": "{}"
								}
								$.ajax(settings).done(function (response) {
									var arrayGender = [];
									console.log(response.genres);
									for (var i in response.genres) {
										console.log(response.genres[i].name);
										arrayGender.push(response.genres[i].name);
									}
									var database = firebase.database();
												var users = database.ref().child('users');
												var currentUser = users.child(firebase.auth().currentUser.uid);
												var saved = currentUser.child("saved"); //#userName.val() del form de registro
								    var data = {
								      poster:  response.poster_path,
								      title: response.original_title,
								      year: response.release_date,
								      genre: response.genres[i].name
								    }
								    saved.push(data);
								    saved.on('value', gotDataSave(), errDataSave());
								});
							});
				/**
				* este evento se agrega justo despues de agregar el nuevo contenido ya que si
				* se pone afuera este evento se agregara cuando el contenido no existe
				* por ende no se le agregara el evento
				*/
				$(".clickCard").click(function () {

					// ahora obtendremos el id de la pelicula a la cual se le dio click
					var idPelicula = $(this).attr("db-id");
					$(".js-contMovieAll").empty();
					$(".js-contSerieAll").empty();
					$(".js-contSearchvieAll").empty();
					$(".js-contPelisvieAll").empty();
					$(".js-contUpcomingvieAll").empty();
					// ahora obtendremos el id de la pelicula a la cual se le dio click
					var idPelicula = $(this).attr("db-id");
					/**
       * funcion para obtener data de la pelicula
       */
					var settings = {
						"async": true,
						"crossDomain": true,
						"url": "https://api.themoviedb.org/3/tv/" + idPelicula + "?api_key=ca7d88c98023c60da7dcd04d4840b222&language=es-US",
						"method": "GET",
						"headers": {},
						"data": "{}"
					}
					$.ajax(settings).done(function (response) {
						var arrayGender = [];
						console.log(response.genres);
						for (var i in response.genres) {
							console.log(response.genres[i].name);
							arrayGender.push(response.genres[i].name);
						}

						$('.js-contPelisvieAll').append('<div class="row">' +
							'<div class= "col-sm-3">' +
							'<div id="coverMovie">' +
							'<img class="img-responsive" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '" alt="">' +
							'</div>' +
							'</div>' +
							'<div class="col-sm-9">' +
							'<h1 id="titleMovie">' + response.name + '</h1>' +
							'<div id="rating">' + response.popularity + '</div>' +
							'<p id="duration">' + response.runtime + '´min</p>' +
							'<p id="gender">' + arrayGender + '</p>' +
							'<p id="sipnosis">' + response.overview + '</p>' +
							'</div>' +
							'</div>');
					});
				});
			},
		});
	});
	/**
	 * funcion para obtener data de la pelicula que se van a estrenar proximamente
	 */
	$('#btn-upcoming').click(function () {

		/* se limpia el div */
		$(".js-contSerieAll").empty();
		$(".js-contSearchvieAll").empty();
		$(".js-contPelisvieAll").empty();
		$(".js-contMovieAll").empty();

		/* esto es una llamada a la api que nos obtendra las peliculas mas populares */
		$.ajax({
			url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=ca7d88c98023c60da7dcd04d4840b222&language=es-US&page=1',
			type: 'GET',
			success: function (responseAjax) {
				var datosUpcoming = responseAjax.results;
				console.log(datosUpcoming);
				for (var x in datosUpcoming) {
					response = datosUpcoming[x]
					$('.js-contUpcomingvieAll').append('<div db-id="' + response.id + '" class="js-cardMovie clickCard col-xs-6 col-sm-4 col-md-3 b p-0">' +
						'<div class="shadow m-1"><div class="js-img-movie">' +
						'<img class="img-responsive" id="imgPoster" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '">' +
						'</div><div class="p-1"><button class="js-saveMovie btn-saveM pull-right">' +
						'<span class="glyphicon glyphicon-bookmark"></span></button>' +
						'<h4 class="js-titleMovie test">' + response.original_title + '</h4><span class="js-year">(' + response.release_date + ')</span>' +
						'<p class="js-gender">asd</p><div class="js-stars">' +
						'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
						'<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
						'</div></div></div></div>'
					);
				}
				/**
				* este evento se agrega justo despues de agregar el nuevo contenido ya que si
				* se pone afuera este evento se agregara cuando el contenido no existe
				* por ende no se le agregara el evento
				*/
				$(".clickCard").click(function () {

					// ahora obtendremos el id de la pelicula a la cual se le dio click
					var idPelicula = $(this).attr("db-id");
					$(".js-contMovievieAll").empty();
					$(".js-contSeriesvieAll").empty();
					$(".js-contSearchvieAll").empty();
					$(".js-contPelisvieAll").empty();
					$(".js-contMovievieAll").empty();
					// ahora obtendremos el id de la pelicula a la cual se le dio click
					var idPelicula = $(this).attr("db-id");
					/**
       * funcion para obtener data de la pelicula
       */
					var settings = {
						"async": true,
						"crossDomain": true,
						"url": "https://api.themoviedb.org/3/movie/" + idPelicula + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
						"method": "GET",
						"headers": {},
						"data": "{}"
					}
					$.ajax(settings).done(function (response) {
						var arrayGender = [];
						console.log(response.genres);
						for (var i in response.genres) {
							console.log(response.genres[i].name);
							arrayGender.push(response.genres[i].name);
						}

						$('.js-contPelisvieAll').append('<div class="row">' +
							'<div class= "col-sm-3">' +
							'<div id="coverMovie">' +
							'<img class="img-responsive" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '" alt="">' +
							'</div>' +
							'</div>' +
							'<div class="col-sm-9">' +
							'<h1 id="titleMovie">' + response.original_title + '</h1>' +
							'<div id="rating">' + response.popularity + '</div>' +
							'<p id="duration">' + response.runtime + '´min</p>' +
							'<p id="gender">' + arrayGender + '</p>' +
							'<p id="sipnosis">' + response.overview + '</p>' +
							'</div>' +
							'</div>');
					});
				});
			},
		});
	});






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

});
function gotDataSave(data) {
	console.log("data funciona");
	var users = firebase.database.ref().child();
		 var userid = firebase.auth().currentUser.uid;
     var posterSaved = userid.saved.poster;
     var titleSaved = userid.saved.title;
     var yearSaved = userid.saved.year;
     var genreSaved = userid.saved.genre;
     $("#favoritos").append('<div class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
                                  '<div class="shadow m-1"><div class="js-img-movie">' +
                                  '<img class="img-responsive" src="' + posterSaved + '"></div>' +
                                  '<div class="p-1"><button class="js-saveMovie btn-saveM pull-right">' +
                                  '<span class="glyphicon glyphicon-bookmark"></span></button>' +
                                  '<h4 class="js-titleMovie">' + titleSaved + '</h4><span class="js-year">' + yearSaved + '</span>' +
                                  '<p class="js-gender">' + genreSaved + '</p><div class="js-stars">' +
                                  '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
                                  '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
                                  '</div></div></div></div>');
   };

   function errDataSave(err) {
     console.log("Error!2")
     console.log(err);
   };
/*
	 function gotDataUser(data) {
        var users = firebase.auth().currentUser.uid;
	     var username = users.nombre;
	     $("#nameProfUser").append(username);
	   };

	   function errDataUser(err) {
	     console.log("Error!1")
	     console.log(err);
	   };*/
