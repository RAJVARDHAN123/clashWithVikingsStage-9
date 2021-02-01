const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint
const Mouse = Matter.Mouse

var canvas;
var ground, platform;
var engine, world;
var box1, box2, box3, box4, box5;
var log1, log2;
var viking1, viking2;
var rock1, rock2, rock3, rock3, rock4;
var rocks = [];
var score = 0;
var rockFlySound;

//games state
var gameState = "onSling";

function preload() {
  rockFlySound = loadSound("sounds/rock_flying.mp3");
  backgroundImg = loadImage("./assets/background_1.png");
  getBackgroundImg();
  console.log(backgroundImg)
}

function setup() {
  canvas = createCanvas(1200, 600);
  canvas.position(15, 70);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(600, height, 1200, 100);
  platform = new Ground(150, height - 120, 300, 170);

  box1 = new Box(700, height - 100, 70, 100);
  box2 = new Box(920, height - 100, 70, 100);
  log1 = new Log(810, height - 160, 300, PI / 2);
  viking1 = new Viking(810, height - 100);

  box3 = new Box(700, 240, 70, 100);
  box4 = new Box(920, 240, 70, 100);
  log2 = new Log(810, 180, 300, PI / 2);
  viking2 = new Viking(810, height - 220);

  box5 = new Box(810, 160, 70, 70);

  rock1 = new Rock(200, 50);
  rock2 = new Rock(150, 170);
  rock3 = new Rock(100, 170);
  rock4 = new Rock(50, 170);

  rocks.push(rock4);
  rocks.push(rock3);
  rocks.push(rock2);
  rocks.push(rock1);

  slingshot = new SlingShot(rock1.body, { x: 200, y: 220 });
}

function draw() {
  
  background(backgroundImg);

  Engine.update(engine);

  noStroke();
  textFont("Impact");
  textSize(20);
  fill("Red");
  text("Score : " + score, width - 300, 20);

  if (rocks.length > 0) {
    text("Press Space Key for Next Rock", width / 2 - 200, 25);
    text("Rock :  " + rocks.length, width / 2 - 100, 60);
  } else {
    text(
      "Click on 'Reload Button' to reload the Game Level",
      width / 2 - 200,
      70
    );
  }

  ground.display();
  platform.display();

  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();

  log1.display();
  log2.display();

  viking1.display();
  viking2.display();
  viking1.score();
  viking2.score();

  rock1.display();
  rock2.display();
  rock3.display();
  rock4.display();

  slingshot.display();

  if (mouseIsPressed && gameState == "onSling") {    
    Matter.Body.setPosition(rocks[rocks.length - 1].body, { x: mouseX, y: mouseY });    
  }

}

function mouseDragged() {
  if (gameState !== "launched") {    
    Matter.Body.setPosition(rocks[rocks.length - 1].body, { x: mouseX, y: mouseY });
    Matter.Body.applyForce(rocks[rocks.length - 1].body, rocks[rocks.length - 1].body.position, { x: 5, y: -5 });
    return false;
  }
}

//fly the rock when mouse is released
function mouseReleased() {
  if (gameState !== "launched") {
    slingshot.fly();
    rockFlySound.play();
    rocks.pop();
    gameState = "launched";
    locked=false
    return false;
  }

}

//set next rock when space key is pressed
function keyPressed() {
  if (keyCode === 32 && gameState === "launched") {
    if (rocks.length >= 0) {
      Matter.Body.setPosition(rocks[rocks.length - 1].body, { x: 200, y: 220 });
      slingshot.attach(rocks[rocks.length - 1].body);
      gameState = "onSling";
      rockFlySound.play();
    }
  }
}

async function getBackgroundImg() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
 
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);

  if (hour >= 06 && hour <= 17) {
    bg = "./assets/background_1.png";
  } else {
    bg = "./assets/background_2.png";
  }  
  backgroundImg = loadImage(bg);
}
