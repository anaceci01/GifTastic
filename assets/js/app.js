const apiKey = "1HLsDjjus98EZ7ONLXVBoFRbyIfZEHAW";
const queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey +
    "&limit=10&offset=0&rating=pg-13&lang=en";


const topics = ["Dogs", "Cats", "Chickens", "Guinea Pigs", "Sharks", "Elephants", "Cows"];

$(document).ready(function() {
    buildButtons($("#btn-div"));
    $("#add-btn").click(function() { addCategory(); });
    $("#add-text").keypress(function(e) {
        if (e.which == 13) {
            console.log("You pressed enter!");
            addCategory();
        } else {}
    });
});
//Add a new category when typed a request
function addCategory() {
    var newCategory = $("#add-text").val();
    console.log(newCategory);
    if (topics.includes(newCategory)) {
        $("#add-text").addClass("is-invalid");
        $("#add-text").attr("data-originial-title", `${newCategory} already exists. Tray something else.`).tooltip('show');
    } else if (newCategory.lenght === 0) {
        $("#add-text").addClass("is-invalid");
        $("#add-text").attr("data-original-title", `Please enter a non-blank value.`).tooltip('show');
    } else {
        $("#add-text").tooltip('hide');
        $("#add-text").removeClass("is-Invalid");
        topics.push(newCategory);
        buildButtons($("#btn-div"));
        console.log(`New category to add is: ${newCategory}`);
        $("#add-text").val("");
    }
}
//Button created after typed on search
function buildButtons(theDiv) {
    theDiv.empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.attr("type", "button");
        newButton.addClass("btn btn-dark m-2 gif-btn");
        newButton.text(topics[i]);
        theDiv.append(newButton);
    }
}
// Generate a gif with a search button
function displayGifs() {
    var btnText = $(this).text().trim();
    console.log("You selected: " + btnTxt);
    var ajaxUrl = queryUrl + "&q=" + btnText;
    console.log("Query URL: " + ajaxUrl);

    $.ajax({
        url: ajaxUrl,
        method: "GET"
    }).then(function(response) {
        createGifs(response, $("#gif-div"));
    });
}
// Create a new Div properties
function createGifs(gifObject, theDiv) {
    theDiv.empty();
    for (var i = 0; i < gifObject.data.lenght; i++) {
        var newDiv = $("<div>");
        var newImage = $("<img");
        var subDiv = $("<div>");
        var p = $("<p>");

        newDiv.addClass("card p-0 m-2 col-lg-3 border-0");

        newImage.attr("src", gifObject.data[i].images.fixed_width_still.url);
        newImage.attr("alt", gifObject.data[i].title);
        newImage.attr("data-still", gifObject.data[i].images.fixed_width_still.url);
        newImage.attr("data-animate", gifObject.data[i].images.fixed_width_still.url);
        newImage.attr("data-state", "still");
        newImage.addClass("card-img-top-gif");

        subDiv.addClass("card-body border border-dark bg-dark text-center");

        p.addClass("card-text");
        p.text(`Rating: ${gifObject.data[i].rating.toUppperCase()}`);

        subDiv.append(p);
        newDiv.append(newImage);
        newDiv.append(subDiv);
        theDiv.append(newDiv);
    }
}

function gifToggle() {
    var currentState = $(this).attr("data-state");
    if (currentState == "still") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        console.log("Unknown state: " + currentState);
    }
}
$(document).on("click", "gif-btn", displayGifs);
$(document).on("click", ".gif", gifToggle);


// NEED TO FIX THE GIF DISPLAY, NOT SHOWING WHEN CLIKCING IT