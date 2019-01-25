$(document).ready(() => {
    
    $('#userInput').on('click', function () {
      $('#userInput').val('');
    });


    $('#userButton').on('click', function (event) {
        event.preventDefault();

        var newButton = $('#userInput').val().trim();
        console.log("new button: "+newButton);

        $('#userInput').val('');

        $('#buttons').append('<button data-person="' + newButton + '">' + newButton + '</button>')
    });




    $(document).on("click", "button", function() {
        var person = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=Iu7O2yvrkQkP0gGkAWyITP4oK1rspQjn&limit=10&rating=g";
  
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

              var personImage = $("<img>");
              personImage.attr("src", results[i].images.fixed_height_still.url);
              personImage.attr("data-still", results[i].images.fixed_height_still.url);
              personImage.attr("data-animate", results[i].images.fixed_height.url);
  
              personImage.addClass("gif");
              personImage.attr("data-state", "still");

              gifDiv.prepend(p);
              gifDiv.prepend(personImage);
              
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