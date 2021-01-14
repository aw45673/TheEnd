var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var surviveTime = 0;
var backgroundImage,jungle;

function preload(){
  
  backgroundImage=loadImage("jungle.jpg")
  
  monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {

  createCanvas(400, 400);
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
 // monkey.debug = true
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  monkey.velocityX=2;
  
  ground = createSprite(400,380,900,10);
  ground.velocityX=-0.5;
  ground.x=monkey.x
  console.log(ground.x)
  ground.visible=false;

  jungle = createSprite(monkey.x,200)
  jungle.addImage(backgroundImage)
  jungle.velocityX= -0.5
  jungle.depth=monkey.depth
  monkey.depth +=1 
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  
  background("lightblue");
  
  stroke("black");
  textSize(20);
  fill("black");

  
  if(gameState===PLAY){
    
    surviveTime = Math.ceil(frameCount/frameRate());
    
    if(ground.x<monkey.x) {
      ground.x=monkey.x+200;
    }
    
    if (jungle.x<monkey.x-100){
      jungle.x=monkey.x+200;
    }
  
    if(keyDown("space") ) {
       monkey.velocityY = -8;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
    camera.position.x=monkey.x
    camera.position.y=200
    spawnBanana();
    spawnObstacles();
    
    
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
    
  }
  else if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.velocityX = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(ground);   
  
  drawSprites();

  text("Survive Time: "+ surviveTime,monkey.x-70, 50);
  
}



function spawnBanana() {
  //write code here to spawn the Food
  if (frameCount % 200 === 0) {
    banana = createSprite(monkey.x+400,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -0.5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(monkey.x+800,350,10,40);
    obstacle.velocityX = -0.5;
    
    //obstacle.debug = true;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
