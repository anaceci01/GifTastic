const apiKey = "1HLsDjjus98EZ7ONLXVBoFRbyIfZEHAW";
const queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey +
    "&limit=10&offset=0&rating=pg-13&lang=en";

const topics = ["Dogs", "Cats", "Chickens", "Guinea Pigs", "Sharks", "Elephants", "Whales", "Eagles", "Pigs", "Cows"];

$(document).ready(function() {
    buildButtons($("#btn-div"));
    $("#add-text").keypress(function(e) {
        if (e.which == 13) {
            console.log("You pressed enter!");
            addCategory();
        } else {

        }
    });
});

function addCategory() {
    let newCategory = $("#add-text").val();
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

function buildButtons(theDiv) {
    theDiv.empty();
    for (let i = 0; i < topics.length; i++) {
        let newButton = $("<button>");
        newButton.attr("type", "button");
        newButton.addClass("btn btn-dark m-2 gif-btn");
        newButton.text(topics[i]);
        theDiv.append(newButton);
    }
}

function showGifs() {
    let btnSearch = $(this).text().trim();
    console.log("You selected: " + btnSearch);
    let ajaxRequest = queryUrl + "&q=" + btnSearch;
    console.log("Query URL: " + ajaxRequest);

    $.ajax({
        url: ajaxRequest,
        method: "GET"
    }).then(function(response) {
        createGifs(response, $("#gif-div"));
    });
}