$(document).ready(() => {


    // $("#userButton").attr("onclick", "createButton()");

    // var createButton = function() {
    //   var userButton = document.getElementById("userInput").value;
    //   console.log(userButton);

    // }
    // $("#userInput").keyup(function(){
    //   // alert($(this).val());
    //   var userButton = $("#userInput").val();
    //   console.log(userButton);
    // });
    
    $('#userInput').on('click', function () {
      $('#userInput').val('');
    });


    $('#userButton').on('click', function (event) {
        event.preventDefault();

        var newButton = $('#userInput').val().trim();
        console.log("new button: "+newButton);

        $('#userInput').val('');
    });




    $(".gifButton").on("click", function() {
        var person = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=5&rating=g";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            //create a results variable equal to the response's data attributes
            var results = response.data;
            console.log(results);
            //create a for loop that runs for the length of the results array of objects (10 gifs)
            for (var i = 0; i < results.length; i++) {
              //create a variable that is equal to a div element
              var gifDiv = $("<div>");
              //create a variable that's set to the object's rating 
              var rating = results[i].rating;
              //create a variable that's set to a paragraph element that then displays the rating
              var p = $("<p>").text("Rating: " + rating);
              // create a variable set to an image element
              var personImage = $("<img>");
              // set the image element's src attrivute to the object's image url
              personImage.attr("src", results[i].images.fixed_height.url);
  
              //prepend the p element with the rating to the gifDiv
              gifDiv.prepend(p);
              //prepend the gif to the gifDiv
              gifDiv.prepend(personImage);
              
              // prepend the whole gifDiv to the page in the correct div
              $("#gifs-appear-here").prepend(gifDiv);
  
            }
          });
      });


    

});