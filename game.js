var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var audio = {
    "blue": "sounds/blue.mp3",
    "green": "sounds/green.mp3",
    "red": "sounds/red.mp3",
    "yellow": "sounds/yellow.mp3",
    "wrong": "sounds/wrong.mp3"
}
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
}


$(".btn").click(function () {
    var userChosenColour = this.id;
    // $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length);
});

function playSound(name) {
    var sound = new Audio(audio[name]);
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed");
        $(this).dequeue();
    });
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {

        if (currentLevel === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over").delay(200).queue(function () {
            $(this).removeClass("game-over");
            $(this).dequeue();
        });
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = false;
}

var gameStart = false;
$(document).keypress(function (event) {

    if (gameStart === false) {
        gameStart = true;
        $("#level-title").text("Level 0");
        nextSequence();
    }
});

