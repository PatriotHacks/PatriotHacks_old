
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var cw = 320;
var ch = window.innerHeight;

ctx.canvas.width  = cw;
ctx.canvas.height = ch;

var rainSpeed = 10;
var rainWeight = 1; // 1 being heaviest
var raindrops = new Array();

var requestAnimationFrame = window.requestAnimationFrame || 
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


function Raindrop(x, length, opacity) {
  this.y = x;
  this.xStart = x;
  this.x = (0 - length) * (Math.random() * 15);
  this.length = length;
  this.opacity = opacity;
  this.dropSpeed = Math.max(0.5, Math.random()*3);
}

Raindrop.prototype.update = function () {
  if (this.x >= cw + this.length * 2) {
    // Set drop back to the top of the screen
    this.x = 0 - this.length * 1;
    this.y = this.xStart;
    
    // Get a new random length and opacity
    this.length = Math.floor(Math.random() * 150) + 120;
    this.opacity = Math.random() * (0.3 - 0) + 0;
    
    this.dropSpeed = Math.max(1.75, Math.random()*3);
    
  } else {
    // Increment y coordinate to move down the screen.
    this.x = this.x + rainSpeed * this.dropSpeed;
  }
  
  ctx.beginPath();
  
  var grd = ctx.createLinearGradient(0, this.x, 0, this.x + this.length);
  grd.addColorStop(0,"rgba(0,255,0," + this.opacity + ")");
  grd.addColorStop(1,"rgba(255,255,0,"+ this.opacity +")");
  
  ctx.fillStyle = grd;
  ctx.fillRect(this.x, this.y, this.length, 2);
 
}

function makeRain() {
  raindrops = [];
  for (var i = 0; i < ch; i+=2) {
    if (parseFloat(i)? !(i % rainWeight) : void 0) {
      var posX = i;
      // Get random length range
      var length = Math.floor(Math.random() * 550) + 280;
      var opacity = Math.random() * (0.2 - 0) + 0.25;
      var newDrop = new Raindrop(posX, length, opacity);
      raindrops.push(newDrop);
    }
  }
  draw();
  
}

makeRain();

function draw() {

  ctx.clearRect(0, 0, cw, ch);
  for (var i = 0; i < raindrops.length; i++) {
    var currentDrop = raindrops[i];
    currentDrop.update();
  }
  
  requestAnimationFrame(draw);
  
}
var thunderBtn = document.getElementById("thunder");
var rainBtn = document.getElementById("rain");

thunderBtn.addEventListener("click", function () {
  document.body.className = "thunder-now";
  setTimeout(function() {
    document.body.className = "";
  }, 1000);
}, false);

rainBtn.addEventListener("click", function () {
  document.body.className = "rain-pause";
  setTimeout(function() {
    document.body.className = "";
  }, 1000);
}, false);

