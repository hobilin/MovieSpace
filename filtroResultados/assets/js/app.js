

// funcion que coloca las series filtradas
$("#btn-submitFilter").click(function() {
  window.location.href = "filtroResultados/filtro.html";
  console.log("entrado");
  var seriesArr = ["black+mirror", "game+of+thrones", "vikings", "shameless", "stranger+things", "peaky+blinders", "the+crown", "dark", "the+walking+dead", "the+punisher", "the+x+files", "lucifer", "travelers", "the+flash", "friends", "the+gifted","modern+family", "supernatural", "riverdale",
                   "criminal+minds", "the+blacklist", "runaways", "arrow", "rick+and+morty", "mindhunter", "mcmafia", "doctor+who", "the+big+bang+theory", "suits", "the+office", "this+is+us", "westword", "breaking-bad", "the+good+doctor", "bates+motel", "ncis", "the+100", "outlander", "gotham",
                   "american+horror+story", "blindspot", "fuller+house", "orphan+black", "ancient+aliens"]

    for (var i = 0; i < seriesArr.length; i++) {
       console.log("hehe");
    var series = $.getJSON('http://www.omdbapi.com/?t=' + seriesArr[i] + '&apikey=bfdd22b0');
    series.then(function(responseSeries) {
      var posterSerie = responseSeries.Poster;
      var titleSerie = responseSeries.Title;
      var yearSerie = responseSeries.Year;
      var genreSerie = responseSeries.Genre;
      if($("#serieFilter[class='tag-red-active']") && $(".btn-genre[class='tag-red-active']").val() === genreSerie || $(".btn-emotion[class='tag-red-active']").val() === genreSerie){
        $(".js-contMovieAll").append('<div class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
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

    });
    }
});
