$(document).ready(function () {



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

		firebase.auth().createUserWithEmailAndPassword(emailReg, passReg).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorCode);
		});
		$("#form-cont").remove();
		$("fieldset").append(
			'<div id="form-cont2">' +
			'<h2 class="fs-title">Redes Sociales</h2>' +
			'<h3 class="fs-subtitle">Para comenzar puedes ingresar tus peliculas o series favoritas(opcional)</h3>' +
			'<input type="text" name="title-1" placeholder="Titulo 1" />' +
			'<input type="text" name="title-2" placeholder="Titulo 2" />' +
			'<input type="text" name="title-3" placeholder="Titulo 3" />' +
			'<input type="button" id="next2" name="next" class="action-button btn-md disabled" value="Siguiente" />' +
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
					'<img class="success-img" src="img/success.png" alt="">' +
					'<div id="form-cont4">' +
					'<h1 class="success">¡Felicitaciones!</h1>' +
					'<h3 class="success">¡Bienvenido a MovieSpace!</h3>' +
					'<input type="button" id="comenzar" name="next" class="next action-button" value="Comenzar" />' +
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

		firebase.auth().signInWithEmailAndPassword(emailLog, passLog).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorCode);
		});
	};

	function observardor() {
		firebase.auth().onAuthStateChanged(function (user) {
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
		$(this).find('form').validator('destroy').validator()
	})

	// email validation
	function validateEmail($email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailReg.test($email);
	}




	// MOVIES
	/**
	 * funcion para el buscador
	 */
	$('#search').click(function () {

		/* se limpia el div */
		$(".js-contMovievieAll").empty();
		$(".js-contSeriesvieAll").empty();
		$(".js-contSearchvieAll").empty();
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
					$('.js-contSearchvieAll').append('<div db-id="' + response.id + '" class="js-cardMovie clickCard col-xs-6 col-sm-4 col-md-3 b p-0">' +
						'<div class="shadow m-1"><div class="js-img-movie">' +
						'<img class="img-responsive" id="imgPoster" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '">' +
						'</div><div class="p-1"><button class="js-saveMovie btn-saveM pull-right">' +
						'<span class="glyphicon glyphicon-bookmark"></span></button>' +
						'<h4 class="js-titleMovie test">' + response.title + '</h4><span class="js-year">(' + response.release_date + ')</span>' +
						'<p class="js-gender">genero</p><div class="js-stars">' +
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

					$(".js-contMovievieAll").empty();
					$(".js-contSeriesvieAll").empty();
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
		$(".js-contSeriesvieAll").empty();
		$(".js-contSearchvieAll").empty();
		$(".js-contPelisvieAll").empty();
		$(".js-contUpcomingvieAll").empty();
		$(".js-contMovievieAll").empty();

		/* esto es una llamada a la api que nos obtendra las peliculas mas populares */
		$.ajax({
			url: 'https://api.themoviedb.org/3/movie/popular?api_key=ca7d88c98023c60da7dcd04d4840b222&language=es-US&page=1',
			type: 'GET',
			success: function (responseAjax) {
				var datosPeliculas = responseAjax.results;
				console.log(datosPeliculas);
				for (var x in datosPeliculas) {
					response = datosPeliculas[x]
					$('.js-contMovievieAll').append('<div db-id="' + response.id + '" class="js-cardMovie clickCard col-xs-6 col-sm-4 col-md-3 b p-0">' +
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
		$(".js-contMovievieAll").empty();
		$(".js-contSearchvieAll").empty();
		$(".js-contPelisvieAll").empty();
		$(".js-contUpcomingvieAll").empty();
		$(".js-contSeriesvieAll").empty();

		/* esto es una llamada a la api que nos obtendra las series mas populares */
		$.ajax({
			url: 'https://api.themoviedb.org/3/tv/popular?api_key=ca7d88c98023c60da7dcd04d4840b222&language=es-US&page=1',
			type: 'GET',
			success: function (responseAjax) {
				var datosSeries = responseAjax.results;
				console.log(datosSeries);
				for (var x in datosSeries) {
					response = datosSeries[x]
					$('.js-contSeriesvieAll').append('<div db-id="' + response.id + '" class="js-cardMovie clickCard col-xs-6 col-sm-4 col-md-3 b p-0">' +
						'<div class="shadow m-1"><div class="js-img-movie">' +
						'<img class="img-responsive" id="imgPoster" src="https://image.tmdb.org/t/p/w185/' + response.poster_path + '">' +
						'</div><div class="p-1"><button class="js-saveMovie btn-saveM pull-right">' +
						'<span class="glyphicon glyphicon-bookmark"></span></button>' +
						'<h4 class="js-titleMovie test">' + response.name + '</h4><span class="js-year">(' + response.first_air_date + ')</span>' +
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
		$(".js-contSeriesvieAll").empty();
		$(".js-contSearchvieAll").empty();
		$(".js-contPelisvieAll").empty();
		$(".js-contMovievieAll").empty();
		$(".js-contUpcomingvieAll").empty();

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


})
