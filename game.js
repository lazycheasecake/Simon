var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0
//detecting if a key has been pressed.

$(document).on("keypress", function(){
    nextSequence();
    $("h1").text("level: "+level);
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
    new playSound(userChosenColor);
    new animatePress(userChosenColor);
    checkAnswer(userClickedPattern.at(-1));
});

// code to change the button color.



function playSound(name){
    var playSound = new Audio("sounds/"+name+".mp3");
    playSound.play();
    
}

//function to change the color of button when pressed.
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed").removeClass(currentColor);
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed").addClass(currentColor);
    }, 100);
}
function nextSequence(){
    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level +=1;
}
function checkAnswer(answer){
    if (answer == gamePattern.at(-1)){
        console.log("success");
        setTimeout(function(){
            nextSequence();
        },1000);
        userClickedPattern.clear();

    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100)
        $("h1").text("Game over!\nPress Any Key To Restart");
        startOver();
    }
}

function startOver(){
    userClickedPattern.clear();
    level =0;
    gamePattern.clear()

}