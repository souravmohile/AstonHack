// Images setup

let img1 = new Image();
img1.src = 'img1.png';

let img2 = new Image();
img2.src = "img2.png";

let img3 = new Image();
img3.src = "img3.png";

// Synths setup

const notes = ["C", "D", "E", "F", "G", "A", "B"];
let synths = {}

notes.forEach(note => {
  // creates a separate synth for each note to avoid collisions

  const synth = new Tone.Synth().toDestination();
  synths[note] = synth;
})

// Canvas setup

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d"); // creates the canvas window

// TODO: too big for some reason, need to fix
canvas.height = window.innerHeight; 
canvas.width = window.innerWidth;

addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// Objects

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 45;
    this.frames = [img1, img2, img3]; // animation frames
    this.index = 0; // current index of frames array
  }

  draw() {
    if(animationId % 20 === 0){
      this.index = this.index+1 > 2 ? 0 : this.index+1; // cycles through 3 frames
    }
    
    c.drawImage(this.frames[this.index], this.x, this.y, this.width, this.height); // draw the image on the canvas

  }

  update() { // this function is called every time the canvas refreshes
    this.draw();
  }
}

class Obstacle {
  constructor(x, y, colour, width, height, velocity, note) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.note = note;
  }

  draw() {
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.width, this.height); // draws the square on the canvas
    // TODO: change to image frames
  }

  update() {
    this.draw();
    this.x = this.x - this.velocity; // move the obstacle to the left
  }
}

// Instantiate variables

let player;
let obstacles;
let score;
let interval;
let gameOn = false;

// Functions + event listeners

function spawnObstacles() {
  // const notes = ["C", "D", "E", "F", "G", "A", "B"];
  // const colours = ["red", "blue", "green", "yellow", "purple", "orange", "black"];

  const notes = ["C", "D", "E"];
  const colours = ["red", "blue", "green"];

  interval = setInterval(() => { // creates a new obstacle every 1000 milliseconds
    const index = Math.floor(Math.random() * notes.length); // random index of notes+colours arrays

    const obstacle = new Obstacle(
      canvas.width,
      canvas.height / 2 - 200,
      colours[index],
      45,
      45,
      10,
      notes[index]
    ); // TODO: randomise other values? NOT velocity

    obstacles.push(obstacle); // add obstacle to obstacle array
  }, 1000);
}

function gameOver() {
  gameOn = false;

  clearInterval(interval); // stop creating obstacles
  cancelAnimationFrame(animationId); // stop canvas animation loop

  // TODO: display final score, name input, save to local storage/database?
}

function checkHit(note, obstacles){
  if(obstacles.length > 0 && obstacles[0].note === note){

    // TODO: animate obstacle destruction
    obstacles.shift(); // remove first obstacle in array i.e. leftmost

    score++;
  }
}

function animate() {
  animationId = requestAnimationFrame(animate); // starts the animation loop
  c.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas each refresh before re-drawing

  player.update(animationId); // animate player

  obstacles.forEach((obstacle, index) => {
    obstacle.update(); // animate obstacles
    if (obstacle.x <= player.x + player.width) { // collision detection
      gameOver();
    }
  });
}

const keyHandler = async (key) => {
  await Tone.start();
  const now = Tone.now();

  switch (key) {
    case "a":
      synths["C"].triggerAttackRelease("C4", 0.25, now);
      checkHit("C", obstacles);
      break;
    case "s":
      synths["D"].triggerAttackRelease("D4", 0.25, now);
      checkHit("D", obstacles);
      break;
    case "d":
      synths["E"].triggerAttackRelease("E4", 0.25, now);
      checkHit("E", obstacles);
      break;
    case "f":
      synths["F"].triggerAttackRelease("C4", 0.25, now);
      checkHit("F", obstacles);
      break;
    case "g":
      synths["G"].triggerAttackRelease("C4", 0.25, now);
      checkHit("G", obstacles);
      break;
    case "h":
      synths["A"].triggerAttackRelease("C4", 0.25, now);
      checkHit("A", obstacles);
      break;
    case "j":
      synths["B"].triggerAttackRelease("C4", 0.25, now);
      checkHit("B", obstacles);
      break;
  }
}

function init() {
  player = new Player(200, canvas.height / 2 - 200);
  obstacles = [];
  score = 0;

  gameOn = true;

  animate();
  spawnObstacles();
}

addEventListener("keydown", (event) => {

  if(event.key == " " && gameOn == false){
    init(); // start or restart game
  } else if (gameOn == true) {
    keyHandler(event.key);
  }
});

// TODO: MIDI event listener
