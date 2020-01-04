const apiKey = "1HLsDjjus98EZ7ONLXVBoFRbyIfZEHAW";
const queUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey +
    "&limit=10&offset=0&rating=pg-13&lang=en";

const topics = ["Dogs", "Cats", "Chickens", "Guinea Pigs", "Sharks", "Elephants", "Whales", "Eagles", "Pigs", "Cows"];

$(document).ready(function() {
    buildButtons($("#btn-div"));
    $("#add-text").keypress(function(e) {
        if (e.which == 13) {
            console.log("You pressed enter!");
            addCategory();
        }
    })
})