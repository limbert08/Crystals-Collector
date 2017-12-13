// Wait for DOM to Load
$(document).ready(function() {
    // user Guess total 
    var userGuessNumber = 0;
    // a randomNumber
    var randomNum = randomNumGen();
    // initialize
    var wins = 0;
    var losses = 0;
    var crystals;
    // generate randomNumbers between 1 to 12
    function randomNumCrystals() {

        return {
            red: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/ruby.jpg"
            },
            blue: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/sapphire.jpg"
            },
            yellow: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/topaz.jpg"
            },
            green: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/emerald.jpg"
            }
        };
    }
    // random number is limited from 19 to 120
    function randomNumGen() {
        return Math.floor(Math.random() * 120) + 19;
    }
    // reset
    function setGame() {

        userGuessNumber = 0;

        crystals = randomNumCrystals();

        randomNum = randomNumGen();

        $("#div-random").text(randomNum);
    }

    function updateDom(userWon) {
        $("#div-win").empty();
        // success
        if (userWon === true) {

            $("#div-win").append($("<p>").text("You won!!"));
            alert("You won! Let's Play Again...");
            setGame();
            showMatchingNumber();
        }
        // fail
        else if (userWon === false) {

            alert("You lost! Let's Play Again...");
            setGame();
            showMatchingNumber();
        }

        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);
        var pWins = $("<p>").text("Wins: ");
        var pLosses = $("<p>").text("Losses: ");
        pWins.append(wSpan);
        pLosses.append(lSpan);
        $("#div-win").append(pWins);
        $("#div-win").append(pLosses);
    }
    // Function to show our crystals to the page.
    function showCrystals() {
        for (var key in crystals) {
            var crystalDiv = $("<div class='crystals-button' crystal-name='" + key + "'>");
            var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
            crystalDiv.append(crystalImg);
            $("#div-pics").append(crystalDiv);
        }
    }
    // Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
    function updateMatchingNumber(crystal) {
        // Update our "current guess" number based on which crystal was clicked.
        userGuessNumber += crystals[crystal.attr("crystal-name")].points;
    }
    // Function that will show your "current guess" number to the page.
    function showMatchingNumber() {
        var scoreNumDiv = $("<div id='score-number'>").text(userGuessNumber);
        $("#div-scores").html();
        $("#div-scores").html(scoreNumDiv);
    }
    // Call our functions to start the game!
    setGame();
    updateDom();
    showCrystals();
    showMatchingNumber();
    // Here we create an on.click event for the crystals.
    $(".crystals-button").on("click", function(event) {
        // Update our "current guess" number and re-show it.
        updateMatchingNumber($(this));
        showMatchingNumber();
        // Check to see if we have won or lost.
        // If our current guess number equals the target number..
        if (userGuessNumber === randomNum) {
            // Increment wins, restart the game, and update the page.
            wins++;
            setGame();
            updateDom(true);
        }
        // If our guess number exceeded our target number...
        else if (userGuessNumber > randomNum) {
            // Increment losses, restart the game, and update the page.
            losses++;
            setGame();
            updateDom(false);
        }
    });
});