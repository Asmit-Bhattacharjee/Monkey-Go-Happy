var monkey_running, monkey;
var ground  , Background, invisibleGround;
var bananaImage, bananaGroup;
var obstaclesGroup, obstaclesImage;
var score;
function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  Background = loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
  obstaclesImage=loadImage("stone.png");
  score=0;
} 
function setup() {
  createCanvas(600, 200);
  ground = createSprite(200, 0, 400, 20);
  ground.addImage("jungle", Background);
  ground.velocityX = -3;
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(200, 200, 600, 20 );
  invisibleGround.visible = false;
  monkey = createSprite(100, 160, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
  background(220);
  
  
  if (ground.x<0) {
    ground.x = ground.width/2;
  }
   monkey.collide(invisibleGround);
  
 
  food();
  obstacles();
  if (keyDown("space")&&monkey.y>=139) {
       monkey.velocityY=-17; 
    } 
    monkey.velocityY = monkey.velocityY+1;
  
  switch(score) {
        case 10: monkey.scale=0.12
        break;
        case 20: monkey.scale=0.14
        break;
        default: break;
  }
  drawSprites();
  stroke("white");
  fill("yellow");
  text("Score:" + score, 550, 50);
  
  if (bananaGroup.isTouching(monkey)) {
  score = score+5;
  bananaGroup.destroyEach();
  }
  
  if (obstaclesGroup.isTouching(monkey)) {
      obstaclesGroup.destroyEach();
      bananaGroup.destroyEach();
      bananaGroup.setLifetimeEach(0);
      bananaGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      monkey.scale = 0.1;
      score=0;
  }
      
    
}
function food() {
 if (frameCount%175===0 ) {
  var bananas = createSprite(600, 200, 40, 20);
  bananas.addImage("Banana", bananaImage);
  bananas.scale = 0.05;
  bananas.y = random(0, 100);
  bananas.velocityX = -3;
  bananaGroup.add(bananas);
 }
}
   
function obstacles() {
  if (frameCount%300===0) {
    var stone = createSprite(600, 165, 10, 40);
    stone.addImage("Stone", obstaclesImage);
    stone.scale=0.15;
    stone.velocityX=-8;
    obstaclesGroup.add(stone);
  }

}