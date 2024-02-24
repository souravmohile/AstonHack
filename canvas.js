const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// Objects

class Player {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.width = 45;
		this.height = 45;
		this.colour = "yellow";
	}

	draw() {
		c.fillStyle = this.colour;
		c.fillRect(this.x, this.y, this.width, this.height);
	}

	update(){
		this.draw();
	}
}

class Obstacle {
  constructor(x, y, colour, width, height, velocity) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.width = width;
    this.height = height;
	this.velocity = velocity;
  }

  draw() {
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
	this.x = this.x - this.velocity;
  }
}

let player;
let obstacles;
let score;
let timer;
let interval;
let gameOn;

// Functions + event listeners

function spawnObstacles(){
	interval = setInterval(() => {
		const obstacle = new Obstacle(
      canvas.width,
      canvas.height / 2 - 200,
      "red",
      45,
      45,
      10
    ); // TODO: randomise these values
	
	obstacles.push(obstacle);
	}, 1000);
}

function gameOver() { 
	gameOn = false;

	clearInterval(interval);
  	cancelAnimationFrame(animationId);

	// display final score, name input
}

function animate(){
	animationId = requestAnimationFrame(animate);
  	c.clearRect(0, 0, canvas.width, canvas.height);

	player.update();

	obstacles.forEach((obstacle, index) => {
		obstacle.update();
		// detect collison + hits
		if(
			obstacle.x <= player.x + player.width
		){
			gameOver();
		}
	})

}

function init() {
	player = new Player(200, canvas.height / 2 - 200)
	obstacles = [];
	score = 0;

	gameOn = true;

	animate();
	spawnObstacles();
}

init();