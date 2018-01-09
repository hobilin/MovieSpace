$(document).ready(function() {


console.log("redi");



  function seasons() {
  var got = $.getJSON('http://www.omdbapi.com/?t=Game%20of%20Thrones&apikey=bfdd22b0').then(function(response) {
    var totalSeasons = response.totalSeasons;
      console.log(totalSeasons);

      for(var i = 1; i < totalSeasons; i++ ){
        var seasonsGOT = $.getJSON('http://www.omdbapi.com/?t=Game%20of%20Thrones&Season='+i+'&apikey=bfdd22b0');
        seasonsGOT.then(function(responseSeason) {
          console.log(responseSeason);
          var episodes = responseSeason.Episodes;
        for(var j = 0; j < episodes.length; j++){
          console.log(episodes[j].Title);
          var episodesGOT = episodes[1].Title;
          $("#episodesGOT").append(episodesGOT);
        }
        });

      }
      });
  };





seasons();



});
