// Global Variables
  var PLAY = 1;
  var END = 0;
  var WIN = 2;
  var PAUSE = 3;
  var gameState = "start";
  var score = 0;
  var jungle, jungleImg, jungle1;
  var player_running, player;
  var gameOver, gameOverImg;
  var stone, stoneImg;
  var banana, bananaImg;
  var invisible;
  var bananaGroup, stoneGroup;
  var pause, pauseImg;
  var resumeImg, resume;

function preload(){  

// Loading the animations, images and sound.
// Animation 
  player_running = loadAnimation("Images/Monkey_01.png" ,"Images/Monkey_02.png", "Images/Monkey_03.png" , "Images/Monkey_04.png" ,  "Images/Monkey_05.png" , "Images/Monkey_06.png" , "Images/Monkey_07.png" ,    "Images/Monkey_08.png" , "Images/Monkey_09.png" , "Images/Monkey_10.png" );
  player_collided = loadAnimation ("Images/Monkey_01.png");
  // Images
  jungleImg = loadImage("Images/jungle32.jpg");
  gameOverImg = loadImage("Images/over.jpg");
  stoneImg = loadImage("Images/stone.png");
  bananaImg = loadImage("Images/banana.png");
  pauseImg = loadImage("Images/pause.png");
  resumeImg = loadImage("Images/resume.png");
  // Sound
  DieS = loadSound("Sound/die.wav");
  EatS = loadSound("Sound/Eatbanana.wav");
}

function setup() {
// Adjust the  canvas according to the width and height of the height.
  createCanvas(displayWidth/2+50,displayHeight-150);
  
// Creating groups for bananas and stones.
bananaGroup = createGroup();
stoneGroup = createGroup();

// Creating the sprites and giving them animation and scale.
// Jungle2
  jungle2 = createSprite(displayWidth/2-200,displayHeight/2-50);
  jungle2.addImage(jungleImg);
  jungle2.visible = false;
  jungle2.velocityX = -3;

// Jungle1
  jungle1 = createSprite(jungle2.x+200,displayHeight/2-50);
  jungle1.addImage(jungleImg);
  jungle1.visible = false;
  jungle1.velocityX = -3;

// Background
  jungle = createSprite(displayWidth/2-200,displayHeight/2-50);
  jungle.addImage(jungleImg);
  jungle.visible = false;
  jungle.velocityX = -3;

// Player
  player = createSprite (100,450,600,500);
  player.addAnimation ("running",player_running);
  player.addAnimation("collided", player_collided);
  player.scale = 0.15;
  player.visible = false;

// An invisible wall on which player can stand.
  invisible = createSprite (350,500,1000000,40);
  invisible.scale = 0.1;
  invisible.visible = false;

  // A game over images
  gameOver = createSprite(displayWidth/2-400,displayHeight/2-100,1000);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.6;
  gameOver.visible = false;
}

function draw(){

  if(gameState === "start"){
    background(0);
  }
    if(keyWentDown("space") && gameState === "start"){
      gameState = PLAY;
    }
   else if(gameState === PLAY){ 
  background(255);
  
  jungle.visible = true;
  jungle1.visible = true;
  player.visible = true;

  if(keyWentDown("space") && player.y>=440){
    player.velocityY = -15;
  } else if(keyWentDown("up") && player.y>=440){
    player.velocityY = -25;
  }

  if(jungle.x<200){
    jungle.x = displayWidth/2-200;
  }

  switch(score) {
    case 10: monkey.scale = 0.18;
            break;
    case 20: monkey.scale = 0.21;
            break;
    case 30: monkey.scale = 0.24;
            break;
    case 40: monkey.scale = 0.27;
            break;
   case 50: monkey.scale = 0.3;
            break;
    default: break;
  }
  
  if(bananaGroup.isTouching(player)){
   bananaGroup.destroyEach();
   score++;
   EatS.play();
  }

  if(stoneGroup.isTouching(player)){
    gameState = END;
    DieS.play();
  }

  player.velocityY += 0.8;

  player.collide(invisible);

  banana1();
  stone1();

 }

 if(gameState === END){
   background(gameOverImg);
   player.visible = false;
   gameOver.visible = true;
   canvas = createCanvas(displayWidth/2-100,displayHeight-190)
 }
  drawSprites();   

  if(gameState === PLAY){ 
  textFont("Comic Sans MS");
  textSize(40);
  fill(255);
  stroke(0);
  text("Score :- " + score,displayWidth/2-150,40);
  } else if(gameState === "start"){
  textFont("Comic Sans MS");
  textSize(40);
  fill(255);
  stroke(0);
  text("Instructions :- ",40,90);
  textSize(30);
  text("1. Press space to jump.",200,190);
  text("2. Press up arrow key for a higher jump.",200,280);
  text("3. Collect as much bananas as much possible.",200,370);
  text("4. Avoid touching stones.",200,460);
  textSize(40);
  fill("yellow");
  text("Press 'space' to continue",150,560);
  }
}


function banana1 (){
  if (frameCount % 150 === 0){
  banana = createSprite (displayWidth/2+200,300,600,500);
  banana.addImage (bananaImg);
  banana.scale = 0.1;
  banana.velocityX = -6;
  banana.lifetime = 1000;
  bananaGroup.add(banana);  
}
}   

function stone1 (){
  if (frameCount % 150 === 0){
  stone = createSprite (displayWidth/2+200,500,600,500);
  stone.addImage (stoneImg);
  stone.scale = 0.1;
  stone.velocityX = -8;
  stone.lifetime = 1000;
  stoneGroup.add(stone);  
}
}    