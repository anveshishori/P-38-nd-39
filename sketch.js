var path,boy,cash,diamonds,jwellery,sword;
var endImg,pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var score = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(1000,800);
// Moving background
path=createSprite(500,500);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(300,700,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("collided",endImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
  edges= createEdgeSprites();

}

function draw() {

  background(0);
  
  
  boy.collide(edges);
  
  if(keyDown("Space")&&gameState===END){
    
    gameState=PLAY;
    boy.changeAnimation("SahilRunning",boyImg);
    boy.scale = 0.08;
    
      
  }
   
  if(gameState === PLAY){
    
 boy.y = 700
    
     if(keyDown(RIGHT_ARROW)){
     
       boy.x +=6;
   }
    if(keyDown(LEFT_ARROW)){
      
     boy.x -= 6;
   }
  
    path.velocityY = 4;
    
  //code to reset the background
 if(path.y > 800 ){
    path.y = height/2;
  }
    
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      score=score+250
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score=score+200
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      score = score+50
    
      
    
    }
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    camera.x = boy.x
     //camera.y = boy.y
    
    if(swordGroup.isTouching(boy)) {
     swordGroup.destroyEach();
        gameState=END;
    }
  
  }
  
    if(gameState===END){
      
   
    boy.velocityY=0;
    boy.velocityX=0; 
    boy.x = 400;
    boy.y = 400;  
    boy.changeAnimation("collided",endImg);
    boy.scale = 1.5;  
      
      
      
    path.velocityY = 0;
    score = 0;
      
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    cashG.destroyEach();
    swordGroup.destroyEach();
      
    jwelleryG.setLifetimeEach(-1);
    cashG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    
     jwelleryG.setVelocityYEach(0);
     cashG.setVelocityYEach(0);    
     diamondsG.setVelocityYEach(0);
     swordGroup.setVelocityYEach(0); 
      
    }
  
  
  
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Treasure: "+ score,400,30);
  
  if(gameState===END){
  fill("Yellow");
    textSize(50); 
  text("Press Space To Restart!!",180,600);
  }
  
 

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 700),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 800;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 700),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 800;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
var jwellery = createSprite(Math.round(random(50, 700),40,10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime =800;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 700),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 800;
  swordGroup.add(sword);
  }
}