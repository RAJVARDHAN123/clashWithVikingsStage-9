const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, viking1,viking3;
var backgroundImg,platform;
var rock, slingshot;

var gameState = "onSling";
var bg = "sprites/backGround.png";
var score = 0;

function preload() {
    backgroundImg = loadImage(bg);
    // getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,100);
    box2 = new Box(920,320,70,100);
    viking1 = new Viking(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,100);
    box4 = new Box(920,240,70,100);
    viking3 = new Viking(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,100);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    rock = new Rock(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(rock.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    viking1.display();
    viking1.score();
    log1.display();

    box3.display();
    box4.display();
    viking3.display();
    viking3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    rock.display();
    platform.display();
    //log6.display();
    slingshot.display();
    console.log(rock.body.speed);    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(rock.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && rock.body.speed < 1){
       rock.trajectory = [];
       Matter.Body.setPosition(rock.body,{x:200, y:50});
       slingshot.attach(rock.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/backGround.png";
    }
    else{
        bg = "sprites/backGround.png";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}