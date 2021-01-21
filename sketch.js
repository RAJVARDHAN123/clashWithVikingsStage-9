const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

//game objects
var box1,box2,box3,box4,box5; 
var viking1,viking3;
var log1,log3,log4,log5;
var rock, slingshot,platform;

//game sounds
var rockSelectSound,rockFlySound,vikingSnortSound;

//background images
var backgroundImg;
var bg = "sprites/backGround.png";


//games state
var gameState = "onSling";

//score
var score = 0;

//rocks
var rocks=[];

function preload() {

    getBackgroundImg();
    bgImg=loadImage(bg);

    rockFlySound=loadSound("sounds/bird_flying.mp3")
    vikingSnortSound=loadSound("sounds/pig_snort.mp3")
    rockSelectSound=loadSound("sounds/bird_select.mp3")
    
}

function setup(){
    var canvas = createCanvas(1200,400);
    canvas.position(15, 70);
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

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    rock = new Rock(200,50);    
    rock2 = new Rock(150,170);   
    rock3 = new Rock(100,170);     
    rock4 = new Rock(50,170);    

    rocks.push(rock4)
    rocks.push(rock3)
    rocks.push(rock2)
    rocks.push(rock)

    slingshot = new SlingShot(rock.body,{x:200, y:50});
}

function draw(){
    
    if(backgroundImg){
        background(backgroundImg);
        
        noStroke();
        textFont("Impact")
        textSize(20)
        fill("Red")
        text("Score : " + score, width-300, 20); 
        
        if(rocks.length>0){
            text("Press Space Key for Next rock", width/2-200, 25); 
            text("rock :  "+rocks.length,width/2-100, 60)
           
        }
        else{
            text("Click on 'Reload Button' to reload the Game Level",width/2-200, 70)
        }
        
    }
    else{
        //background("lightblue");
        background(bgImg);
        noStroke();
        textFont("Impact")
        textSize(20)
        fill("Red")
        text("Score : " + score, width-300, 20); 
        
        if(rocks.length>0){
            text("Press Space Key for Next rock", width/2-200, 25); 
            text("rock :  "+rocks.length,width/2-100, 60)
            
        }
        else{
            text("Click on 'Reload Button' to reload the Game Level",width/2-200, 70)
        }
         
    }
    Engine.update(engine);
    
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
    rock2.display();
    rock3.display();
    rock4.display();

    platform.display();
   
    slingshot.display(); 
    
}

//pull the rock with the rubber band when mouse is dragged
function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(rocks[rocks.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(rocks[rocks.length-1].body, rocks[rocks.length-1].body.position, {x:5,y:-5})
        rockSelectSound.play()
        return false;
    }
}
//fly the rock when mouse is released
function mouseReleased(){
    slingshot.fly();
    rockFlySound.play()
    rocks.pop();
    gameState = "launched";
    return false;
}

//set next rock when space key is pressed
function keyPressed(){
    if((keyCode === 32) && gameState ==="launched"){
        if(rocks.length>=0 ){   
            Matter.Body.setPosition(rocks[rocks.length-1].body, {x: 200 , y: 50});         
            slingshot.attach(rocks[rocks.length-1].body);
            
            gameState = "onSling";
            rockSelectSound.play()
        }
        
    }
    
}


async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/backGround.png";
    }
    else{
        bg = "sprites/backGround.png";
    }

    backgroundImg = loadImage(bg);
    
}
