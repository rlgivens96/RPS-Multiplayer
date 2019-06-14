var config = {
    apiKey: "AIzaSyAbZ5NKuY7bqT_pgKxBGDzeNVKXZSA6jD0",
    authDomain: "rps-multiplayer-b0940.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-multip.firebaseio.com",
    storageBucket: "rock-paper-scissors-multip.appspot.com",
    messagingSenderId: "76174236759"
};
firebase.initializeApp(config);

var ref = database.ref();
var connRef = database.ref(".info/connected");
var playerRef = database.ref("/players");
var playerOne = database.ref("/players/1");
var playerTwo = database.ref("/players/2");
var connectRef = firebase.database().ref("connections");
var playerScore1 = 0;
var playerScore2 = 0;
var tieScore = 0;
var playerName;
var playerNumber;
var turn = 1;
var timeDelay = 1000;

$("#player-1").append(playerOne);
$("#player-2").append(playerTwo);


//Adding text, attributes and class to variables r, p & s which will be the three choices
var displayChoices = function (playNum) {
    if (playerNumber === playNum) {
        // console.log("display " + playNum);
        var r = $("<div>").text("Rock").attr("data-choice", "Rock").addClass("p" + playNum + "-choice");
        var p = $("<div>").text("Paper").attr("data-choice", "Paper").addClass("p" + playNum + "-choice");
        var s = $("<div>").text("Scissors").attr("data-choice", "Scissors").addClass("p" + playNum + "-choice");
        var rps = $("<div>").append(r, p, s);
        $("#p" + playNum + "-choices").append(rps);
    }
}

var displayMessage = function (type) {
    if (playerNumber === 1) {
        if (type === "yourTurn") {
            $("#game-message").text("It's Your Turn!");
            $("#game-message").show();
        } else if (type === "waitingFor") {
            p2Ref.once("value", function (snap) {
                if (snap.exists() === true) {
                    $("#game-message").text("Waiting for " + snap.val().name + " to choose...");
                }
            });
            $("#game-message").show();
        }
    } else if (playerNumber === 2) {
        if (type === "yourTurn") {
            $("#game-message").text("It's Your Turn!");
            $("#game-message").show();
        } else if (type === "waitingFor") {
            playerOne.once("value", function (snap) {
                if (snap.exists() === true) {
                    $("#game-message").text("Waiting for " + snap.val().name + " to choose...");
                }
            });
            $("#game-message").show();
        }
    }
}
$("#name-submit-button").click(function (submit) {
    submit.preventDefault();
    playerName = $("#player-name").val().trim();
    $("#player-name").val("");

    playersRef.once("value", function (snap) {
        if (snap.exists() === false) {
            playerNum = 1;
            p1Ref.update({
                name: playerName,
                wins: 0,
                losses: 0,
                key: userKey
            });
            connectionsRef.child(userKey).set(playerName);
        } else if (snap.child(2).exists() === true && snap.child(1).exists() === false) {
            playerNum = 1;
            p1Ref.update({
                name: playerName,
                wins: 0,
                losses: 0,
                key: userKey
            });

            displayChoices(1);
            connectionsRef.child(userKey).set(playerName);
        } else {
            playerNum = 2;
            p2Ref.update({
                name: playerName,
                wins: 0,
                losses: 0,
                key: userKey
            });
            ref.update({
                turn: 1
            });
            connectionsRef.child(userKey).set(playerName);
        }
    }).then(function () {
        $("#player-name").text(playerName);
        $("#play-num").text(playerNum);
    });
});

$(document).on("click", ".choices", function () {
    var oneChoice = $(this).attr("data-choices");
    playerOne.update({
        choice: oneChoice
    });

    $(".choices").text(oneChoice);
});
$(document).on("click", ".choices", function () {
    var twoChoice = $(this).attr("data-choices");
    playerTwo.update({
        choice: twoChoice
    });

    $(".choices").text(twoChoice);
});

function playerTurn1() {
    //OnClick event responds to player1's click/touch on buttons and saves the choice in memory.
    $("#rock-button").on("click", function () {
        playerChoiceword1 = "rock";
        player1Rock();

        //Referencing the Firebase database.
        database.ref().set({
            playerOne: playerOne,
            playerTwo: playerTwo,
            playerScore1: playerScore2,
            playerScore2: playerScore2,
            tieScore: tieScore,
        });
    });
    $("#paper-button").on("click", function () {
        playerChoiceword1 = "paper";
        player1Paper();

        //Referencing the Firebase database.
        database.ref().set({
            playerOne: playerOne,
            playerTwo: playerTwo,
            playerScore1: playerScore2,
            playerScore2: playerScore2,
            tieScore: tieScore,
        });
    });
    $("#scissors-button").on("click", function () {
        playerChoiceword1 = "scissors";
        player1Scissors();

        //Referencing the Firebase database.
        database.ref().set({
            playerOne: playerOne,
            playerTwo: playerTwo,
            playerScore1: playerScore2,
            playerScore2: playerScore2,
            tieScore: tieScore,
        });
    });
};

function playerTurn2() {
    //OnClick event responds to player2's click/touch on buttons and saves the choice in memory.
    $("#rock-button").on("click", function () {
        playerChoiceword2 = "rock";
        player2Rock();

        //Referencing the Firebase database.
        database.ref().set({
            playerName1: playerName1,
            playerName2: playerName2,
            playerScore1: playerScore2,
            playerScore2: playerScore2,
            tieScore: tieScore,
        });
    });

    //OnClick event responds to player2's click/touch on buttons and saves the choice in memory.
    $("#paper-button").on("click", function () {
        playerChoiceword2 = "paper";
        player2Paper();

        //Referencing the Firebase database.
        database.ref().set({
            playerName1: playerName1,
            playerName2: playerName2,
            playerScore1: playerScore2,
            playerScore2: playerScore2,
            tieScore: tieScore,
        });
    });

    //OnClick event responds to player2's click/touch on buttons and saves the choice in memory.
    $("#scissors-button").on("click", function () {
        playerChoiceword2 = "scissors";
        player2Scissors();

        //Referencing the Firebase database.
        database.ref().set({
            playerName1: playerName1,
            playerName2: playerName2,
            playerScore1: playerScore2,
            playerScore2: playerScore2,
            tieScore: tieScore,
        });
    });

};






