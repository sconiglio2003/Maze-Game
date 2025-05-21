var timer = setInterval(clockTick, 1000); // calls function clock tick every ten milliseconds. 
document.addEventListener('keypress', move);
var x = 20; 
var y = 20; 
var speed = 20; 
// variables for lives, score, and winning.
var lives = 10;
var coins = 0; 
var dead = false; 
// position of the player row is equal to the playerY / 20 
var arrayColumn = x; 
var arrayRow = y; 
// create a new ball with the rubber ball class. 
var balls = []; 
var ballX = []; 
var ballY = []; 

// create arrays for the rubies to be held in
// creat arrays for the ruby coordinates.
var rubies = []; 
var rubyX = []; 
var rubyY = []; 
// outer for loop = row
// inner for loop = column 
var row; 
var column; 
// the user has 10 seconds to complete the maze. 
var timer = 10; 
var timeSurvived = 0; 
// document.getElementById(elementID).style.color = 
var containerWidth = window.getComputedStyle(this.container).getPropertyValue("width"); 
var containerHeight = window.getComputedStyle(this.container).getPropertyValue("height"); 
containerWidth = Number(containerWidth.substr(0,containerWidth.length-2)); 
containerHeight = Number(containerHeight.substr(0,containerHeight.length-2)); 
var win = false; 
var map = [ // row length is 58
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [0,2,2,2,2,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,1,2,2,2,2,2,2,2,2,1,1,1,2,1,1],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,1,0,1,0,0,1,1,1,1,1,1,0,1,1,1,0,1,1],
    [1,1,0,1,1,0,0,0,2,2,2,1,1,0,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,1,1,0,1,1],
    [1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,0,1,1,0,0,1,0,2,2,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,1,1,0,1,1],
    [1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,2,2,2,2,2,2,2,2,0,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,2,2,2,2,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,0,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,0,0,0,1,1,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,0,0,0,1,1,0,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1],
    [1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,2,2,2,2,2,2,2,2,0,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,0,0,0,1,1,1,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,2,1,0,1,1,2,1,0,1,1,1,0,1,2,2,1,1,0,1,2,1,1],
    [1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,1],
    [1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,1],
    [1,1,0,0,0,0,0,1,0,1,1,1,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,0,1,0,1,0,1,1,1,1,1,0,0,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,0,1,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,0,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,0,1,0,2,2,2,2,2,1,1,2,1,1,1,1,0,1,1,0,2,2,2,2,2,2,2,0,1,0,1,1,1,1,0,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1],
    [1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,0,2,2,2,2,2,2,2,1,1,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,0,1,1,0,2,2,2,1,1,1,2,1,1,2,1,2,1,1,0,0,0,0,0,0,0,1,1,1,2,1,1,1,1,2,1,1,0,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1],
    [1,1,1,2,1,1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,0,1,1,0,1,0,0,0,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1],
    [1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,0,1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,1,1,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,0,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,1,0,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,1,1],
    [1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,1,0,0,0,0,0,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1],
    [1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,1],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1]
]; 
const colorList = [ 
"#7d8ca3",
"#a573a0",
"#4d7f9e",
"#8ea15d",
"#d28474",
"#6c9a8e",
"#b07a9b",
"#5d8e75",
"#a08753",
"#457ca7",
"#926d6a",
"#6e99c9",
"#c3a85d",
"#9a6f8c",
"#528a71",
"#b4934c",
"#8a5d84",
"#6b8eab",
"#d2967d",
"#7eaa63",
"#b86f8c",
"#5497b3",
"#ae765f",
"#768ea6",
"#c98d5e",
"#5f869b",
"#9a624d",
"#477eab",
"#ad876d",
"#7b94a2",
"#cc7d58",
"#607c92",
"#a7744c",
"#4d829c",
"#92795e",
"#5d82a1",
"#846c53",
"#5082ab",
"#9a7e5d",
"#437f9d",
"#7b8a59",
"#c37883",
"#6c8dab",
"#a4796d",
"#547eaa",
"#8a6c5f",
"#678cab",
"#b88266",
"#7d97a2",
]
class rubberBall {
// make a constructor first
constructor (id, x, y, sz, color, containerDiv) {
        // set the properties 
        this.xpos = x; 
        this.ypos = y; 
        this.size = sz;
        this.color = color; 
        this.id = id; 
        this.container = containerDiv; 
        // add to html container
        container.innerHTML += "<div class='ball' id='" + this.id + "'> </div>";
        //  make things easier by having an object reference to the div we just created. 
        this.obj = document.getElementById(this.id); 
        this.obj.style.backgroundColor = this.color; 
        
        this.obj.style.left = this.xpos + "px"; 
        this.obj.style.top = this.ypos + "px"; 
        
}
}
//------------------------------------
// class for rubies that you can collect.
class ruby {
            // make a constructor first
            constructor (id, x, y, sz, containerDiv) {
                // set the properties 
                this.xpos = x+4; 
                this.ypos = y+4; 
                this.size = sz;
                this.id = id; 
                this.container = containerDiv; 
                // add to html container
                container.innerHTML += "<div class='ruby' id='" + this.id + "'> </div>";
                //  make things easier by having an object reference to the div we just created. 
                this.obj = document.getElementById(this.id); 
                this.obj.style.left = this.xpos + "px"; 
                this.obj.style.top = this.ypos + "px";
            }


}

function collectRuby (row,column) {
    if(map[row][column] == 2) {
        // delete that ruby
        map[row][column] = 0; 
        // reward with coins
        coins = coins + 1; 
        document.getElementById("numCoins").innerHTML = coins; 
    }
}   
    // draw the map. 
    // outer for loop = row shifter
            for(row = 0; row < 61; row++) {
                // inner for loop = column shifter
                for(let column = 0; column < 58; column++) {
                    var color = colorList[Math.floor(Math.random()*49)]; 
                    // make a wall if it's a 1, but a ruby if it's a 2
                    if(map[row][column] == 1) {
                        balls.push(new rubberBall("ball"+row+" , "+column, column * 20, row*20, 20, color, container));
                    }
                    // make a ruby if it's a 2
                    if(map[row][column] == 2) {
                        rubies.push(new ruby("ruby"+row+"x"+column, column * 20, row*20, 20, container));
                    }
                }
            }

    for(let ball in balls) {
        ballX.push(balls[ball].xpos); 
        ballY.push(balls[ball].ypos); 
    }
// make a moveable player
var gp = document.getElementById("gamepiece"); 
// move up function
function mUp() {
        y-=speed; 
        if(y < 0) {
            y = 0; 
        }
                gp.style.top = y +"px"; // move the character
    }

function mDown() {
    y+=speed; 
    if(y > 1200) {
        y = 1200; 
    }
    gp.style.top = y + "px"; // move the character 
}


function mLeft() {
        x-=speed; 
    if(x < 0) {
        x = 0; 
    }
    gp.style.left = x +"px"; // move the character 
}
    

function mRight() {
        x+=speed; 
    if(x > 1100) {
        x = 1100; 
    }
    gp.style.left = x +"px"; // move the character 
}

function move(e) { 
    if(dead == false) {   

        switch (e.charCode) {
            case 119: 
            // determine if there's a block above the player by testing if there's a block above 
            // the player. 
            // if there is no block, the player can move that direction. 
            if(map[(y/20)-1][x/20] != 1) {
                mUp(); 
            }
            break; 
    
    
            case 115: 
            if(map[(y/20)+1][x/20] != 1) { 
                mDown(); 
            }
            break; 
    
            case 97:  
            if(map[(y/20)][(x/20)-1] != 1) { 
                mLeft(); 
            }
            break; 
    
            case 100: 
            if(map[(y/20)][(x/20)+1] != 1) { 
                mRight(); 
            }
            break;
            case 32:
                increaseTime(); 
                break;
        }
        if(map[y/20][x/20] == 2 ) {
            var thisruby = document.getElementById("ruby"+y/20+"x"+x/20); 
            thisruby.style.display = "none"; 
            console.log("Coins:" + coins); 
            collectRuby(y/20,x/20); 
        }
    }

}
                        // game loop
                        function clockTick () {
                        
                        // decrease timer every 1000 milliseconds
                        timer-=1; 
                        document.getElementById("timeLeft").innerHTML = timer; 
                        if(dead == false && win == false) {
                            timeSurvived +=1;
                            console.log(timer); 
                        }
                        // the player dies when the timer reaches -1. 
                        if(timer < 0) {
                            dead = true; 
                            deathScreen(); 
                        }
                        console.log("x:" +  x); 
                        console.log("Y" + y); 
                        // check if the player has reached the destination in the lower right corner. 
                        if(x > 1000 && x < 1080 && y > 1060 && y < 1200) {
                            win = true; 
                        }
                        // if player wins, display win screen.
                        if(win == true) {
                            winScreen(); 
                            console.log("The Player has won"); 
                        }
                        
}

// make a div that is display none, which changes to display absolute when the player dies, 
// showing their coins collected
// and showing their time survived. 
function deathScreen () {
    var screen = document.getElementById("stats");
    screen.style.display = "block"; 
    var container = document.getElementById("container"); 
    container.style.display = "none";
    var banner = document.getElementById("Homebanner"); 
    banner.style.display = "none"; 
    // show the time survived
    document.getElementById("timeAlive").innerHTML = timeSurvived; 
    // show the coins collected
    document.getElementById("coinsCollected").innerHTML = coins * coins; 
    screen.style.backgroundColor = "dark red"; 
    screen.style.border = "red"

   
}
// for displaying only when winning
function winScreen () {
    var message = "You won!"; 
    document.getElementById("endGamemessage").innerHTML = message; 
    var screen = document.getElementById("stats");
    screen.style.display = "block"; 
    var container = document.getElementById("container"); 
    container.style.display = "none";
    var banner = document.getElementById("Homebanner"); 
    banner.style.display = "none"; 
    // show the time survived
    document.getElementById("timeAlive").innerHTML = timeSurvived; 
    // show the coins collected
    document.getElementById("coinsCollected").innerHTML = coins * 2048; 
    screen.style.backgroundColor = "green"; 

   
}
function increaseTime () {
    if(coins > 0) {
        coins--; 
        timer = timer + 1; 
        document.getElementById("numCoins").innerHTML = coins; 
        document.getElementById("timeLeft").innerHTML = timer; 
    }
}