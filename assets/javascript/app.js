$(document).ready(() => {
    
    //array to hold topics for buttons
    var topics = [
      "Jurassic Park",
      "Harry Potter",
      "Lord of the Rings",
      "The Matrix",
      "Forest Gump",
      "The Lion King",
      "Jumanji"
    ];

    //for loop, for each item in array, create and display a button with data-topic, then append it to #buttons div
    var generateButtons = function() {
      for (var i=0; i<topics.length; i++) {
          var $button = $("<button>");
          $button.text(topics[i]);
          $button.attr("data-topic", topics[i]);
          $("#buttons").append($button);
      }
    }

    generateButtons();
    




    $('#userInput').on('click', function () {
      $('#userInput').val('');
    });


    $('#userButton').on('click', function (event) {
      submit();
    });

    $('#userInput').keydown(function(event) {
      if (event.keyCode == 13) {
        submit();
      }
  });

    var submit = function () {
      event.preventDefault();
        // var newButton = $('#userInput').val().trim();
        // $('#buttons').append('<button data-topic="' + newButton + '">' + newButton + '</button>')
        var newButton = $('#userInput').val().trim();
        topics.push(newButton);
        $('#userInput').val('');
        $("#buttons").html('');
        generateButtons();
    }


    $(document).on("click", "button", function() {
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=Iu7O2yvrkQkP0gGkAWyITP4oK1rspQjn&limit=10";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");

              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);

              var topicImage = $("<img>");
              topicImage.attr("src", results[i].images.fixed_height_still.url);
              topicImage.attr("data-still", results[i].images.fixed_height_still.url);
              topicImage.attr("data-animate", results[i].images.fixed_height.url);
  
              topicImage.addClass("gif");
              topicImage.attr("data-state", "still");

              gifDiv.prepend(p);
              gifDiv.prepend(topicImage);
              
              $("#gifs-appear-here").prepend(gifDiv);
  
            }
          });
      });

      $(document).on("click", ".gif", function() {
        var state = $(this).attr('data-state');
        
        if (state === "still") {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
        } else {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
  
        }
  
      });


    

});