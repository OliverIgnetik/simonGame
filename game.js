var gamePattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var userClickedPattern = [];
var gameLevel = 1;
var userClicks = 0 ;

// display the current level

function displayLevel(gameLevel) {
    var display = $('h1');
    display.text('Level '+gameLevel);
}

//  make a new sequence
function nextSequence() {
    // this function is called when: 
    // 1. game is loaded 
    // 2. level passed 
    // 3. level failed

    // reset gamePattern,userClicks and userClickedPattern each time this is called
    userClicks=0;
    userClickedPattern=[];
    gamePattern=[];
    for (var i = 0; i < gameLevel; i++) {
        // delay loop with setTimeout
        (function (i) {
            setTimeout(function () {
                var randomNumber = Math.floor(Math.random() * 4);
                var randomChosenColour = buttonColours[randomNumber];
                gamePattern.push(randomChosenColour);
                $('#' + randomChosenColour).animate({
                    opacity: 0
                }, 'fast').animate({
                    opacity: 1
                }, 'fast');

                playSound(randomChosenColour);
            }, 1000 * i);
        })(i);
    };
}

// play sound
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// check user pattern against randomly generated pattern 
function checkPattern(userClicks){
    // slice the gamePattern and check it against entered pattern 
    var userPattern = JSON.stringify(userClickedPattern);
    var randomPattern = JSON.stringify(gamePattern.slice(0,userClicks));
    if(userPattern!==randomPattern){
        // 3. level failed
        // reset the game to zero 
        // level fail sound 
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        // set to level 1 
        gameLevel=1;
        displayLevel(gameLevel);
        // call next Sequence but wait a bit
        setTimeout(nextSequence,3000); 
    }

    // pass level when the userClicks is the same as the gameLevel and the final patterns match 
    if(userClicks==gameLevel && userPattern==randomPattern){
        // 2. level passed
        gameLevel++;
        displayLevel(gameLevel);
        setTimeout(nextSequence,2000); 
    }
}

// Call functions when document is ready 
$(document).ready(function () {
    // event listener to start game 
    $(document).keydown(function (e) {
        // 1. game is loaded 
        if (e.key == "Enter") {
            gameLevel=1;
            nextSequence();
        }
        displayLevel(gameLevel);
    });

    // add event listeners for buttons   
    $('.btn').on('click', function (event) {
        // add to userClicks
        userClicks++;
        // store the id
        var userChosenColour = this.id;
        // animate a click 
        $(this).animate({
            opacity: 0
        }, 'fast').animate({
            opacity: 1
        }, 'fast');
        // add to array 
        userClickedPattern.push(userChosenColour);
        // playSound
        playSound(userChosenColour);
        // check the pattern when ever you click 
        checkPattern(userClicks);
    });
});