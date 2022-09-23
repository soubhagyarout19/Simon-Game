
let buttonColors = ["red" , "blue" , "green" , "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;


$(document).keypress(function() {
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


 function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

     let randomNumber = Math.random();
     randomNumber = randomNumber*4;
     randomNumber = Math.floor(randomNumber);

     let randomchoosenColor = buttonColors[randomNumber];
     gamePattern.push(randomchoosenColor);

     $("#" + randomchoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

      playSound(randomchoosenColor);

    // var audio = new Audio("sounds/" + randomchoosenColor + ".mp3");
    // audio.play();   
}


$(".btn").click(function(event){

    let userChoosenColor = (event.target.id);
        userClickedPattern.push(userChoosenColor);

        playSound(userChoosenColor);
        animatePress(userChoosenColor);

        checkAnswer(userClickedPattern.length-1);
});


 function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {    
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
  
      }   

}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}