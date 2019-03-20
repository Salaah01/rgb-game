var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colour-display")
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");

//Start with 6 squares on the page
var numSquares = 6; 
var colours = [];
var pickedColour;

init();

function init(){
    setupModeButtons()
    setupSquares()
    reset();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
        
            //Select the button
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            //Calculate how many squares to show by updating numSquares
            if(this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset()
        });
    }
}

function setupSquares() {
    //add an event listener for each title that had been clicked
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
        
        //compare if the clicked colour matches the colour picked
        clickedColour = this.style.backgroundColor;
        
            if (clickedColour===pickedColour) {
                message.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColours(clickedColour);
                h1.style.backgroundColor = clickedColour;
            } else {
                this.style.backgroundColor = "#232323";
                message.textContent = "Try Again";
            }

        });
    }
}

function reset(){
    h1.style.backgroundColor = "steelblue"          //reset the BG colours for the h1 element
    colours = generateRandomColours(numSquares);    //generate a new set of colours for each tile
    pickedColour = pickColour();                    //pick a winning colour/tile
    colorDisplay = pickedColour;                    //update the display text with the new colour
    message.textContent = "";
    resetButton.textContent = "New Colours"
    
    //update the colours on each square/tile and hide/show squares
    for(var i = 0; i<squares.length; i++) {
        if(colours[i]) {
            squares[i].style.backgroundColor = colours[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
        
    }
}


resetButton.addEventListener("click", function() {
    reset();
});


function changeColours(colour) {
    //loop through all squares and change each square to given colour
    for (var i = 0; i<colours.length; i++) {
        squares[i].style.backgroundColor = colour;
    }
}

function pickColour() {
    var random = Math.floor(Math.random() * colours.length);
    return colours[random];
}

function generateRandomColours(num) {
    //make an array
    var arr = []
    
    //repeat num times
    for (var i=0; i<num; i++) {
        arr.push(randomColour())
    }
    
    //return the array
    return arr;
}

function randomColour() {
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    return "rgb(" + r + ", " + g + ", " + b +")"; 
}

