// Array of dog breeds that will be used to create buttons
var topics = ["Welsh Corgi", "Pug", "French Bulldog", "Shiba Inu", "Yorkshire Terrier", "Boston Terrier",
"Cavalier King Charles Spaniel", "Beagle", "Bichon Frise", "Labrador", "Golden Retriever", "Bernese Mountain Dog",
"Saint Bernard", "Akita", "Siberian Husky", "Shih Tzu", "Schnauzer", "Sheep Dog", "Newfoundland"];

// Create a button for each dog breed in the array
function showButtons() {
	$(".button-view").empty();
	for (var i = 0; i < topics.length; i++) {
		$(".button-view").append($("<button>").text(topics[i]).attr("data-breed", topics[i]).addClass("button btn btn-primary"));
	}
}

// When the input form is filled out, create a new button
function newButton(event) {
	event.preventDefault();
	if ($("#breed-input").val().trim() !== "") {
		var userInput = $("#breed-input").val().trim();
		topics.push(userInput);
		showButtons();
	}
}

// Function to call Giphy API and return results to the page
function displayGifs() {
	// Clear page of gifs
	$(".gif-view").empty();
	// Declare Giphy URL
	var breed = $(this).attr("data-breed");
	var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=dc6zaTOxFJmzC&limit=10";
	// Call API to get JSON data
	$.ajax({
		url: gifURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);

		var gifResults = response.data;
		// Use JSON data to put gifs on the page
		for (var i = 0; i < gifResults.length; i++) {
			// For every item in the returned data array, create a <p> element displaying the rating and an <img> element displaying a gif
			// All this gets appended to the gif-view div
			var rating = $("<p>").html("Rating: " + gifResults[i].rating).addClass("rating-text");
			var gif = $("<img>").addClass("gif");
			var dogDiv = $("<div>").addClass("gif-div").html(rating).append(gif);
			gif.attr({"src": gifResults[i].images.fixed_height_still.url,
					"data-still": gifResults[i].images.fixed_height_still.url,
					"data-animate": gifResults[i].images.fixed_height.url,
					"data-state": "still"
					});
			$(".gif-view").append(dogDiv);
		}
	});
}

// Function to start or stop a gif from playing
function startStop() {
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr({"src": $(this).attr("data-animate"),
					"data-state": "animate"
					});
	} else{
		$(this).attr({"src": $(this).attr("data-still"),
					"data-state": "still"
					});
	}
}

// When the user submits the input form, run newButton
$("#add-breed").on("click", newButton);
// When a button is clicked, run displayGifs
$(document).on("click", ".button", displayGifs);
// When a gif is clicked, run startStop
$(document).on("click", ".gif", startStop);
// Function call to bring initial topics array to screen 
showButtons();