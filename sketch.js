var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(windowWidth/2,200);
path.addImage(pathImg);
path.velocityY = 4;

  gameOver = createSprite(windowWidth/2,150)
  gameOver.addImage(endImg);
  gameOver.scale=0.8;
  gameOver.visible=false;

//creating boy running
boy = createSprite(200,windowHeight,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  
  background(0);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(swordGroup.isTouching(boy)){
    gameState=END;
  }
  
   if(gameState===PLAY){
     
  boy.setCollider("circle",0,0,550);
  boy.debug = false;
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
     
  if(cashG.isTouching(boy)){
    treasureCollection = treasureCollection+2
  }
  
  if(diamondsG.isTouching(boy)){
    treasureCollection = treasureCollection+5
  }
  
  if(jwelleryG.isTouching(boy)){
    treasureCollection = treasureCollection+10
  }
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      
    }else if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        }
     
     boy.x = World.mouseX;
  
     createCash();
    createDiamonds();
    createJwellery();
    createSword();
     
   }
   
  else if(gameState===END){
   reset();
                           
  }
  drawSprites();
  
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,windowWidth/2-50,20); 
  
  }

function createCash() {
  if (World.frameCount % 175 == 0) {
  var cash = createSprite(Math.round(random(windowWidth, 0),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = -1;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 200 == 0) {
  var diamonds = createSprite(Math.round(random(windowWidth, 0),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = -1;
  diamondsG.add(diamonds)
  }
}

function createJwellery() {
  if (World.frameCount % 250 == 0) {
  var jwellery = createSprite(Math.round(random(windowWidth, 0),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = -1;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount %125 == 0) {
  var sword = createSprite(Math.round(random(windowWidth,0),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = -1;
  swordGroup.add(sword);
  
  }
}

function reset(){
  
  path.velocityY=0;
  gameOver.visible=true;
  swordGroup.setVelocityYEach(0);
  cashG.setVelocityYEach(0);
  diamondsG.setVelocityYEach(0);
  jwelleryG.setVelocityYEach(0);
  
}