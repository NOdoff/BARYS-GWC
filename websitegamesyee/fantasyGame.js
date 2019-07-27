var unicorn;
var fireball;
var unicornImage, fireballImage;
var SCORE = 0;
var gameOver;
var UP = 10;
var DOWN = 10;
var GameStart;

function setup() {
  createCanvas(800, 600);
  GameStart = false

unicornImage = loadImage('https://i.imgur.com/RoGsgTC.png');
fireballImage = loadImage('https://i.imgur.com/37bnkYA.png');

unicorn = createSprite(width/5, height/2, 40, 40);
unicorn.addImage(unicornImage);

fireball = new Group();

var gameStart = true;
gameOver = false;
updateSprites(false);
  background("#000000");
   fill("#00fff6");
   textAlign(CENTER);
   textSize(42);
   text('Press "c" to play the game!', width/2, height/2);
}

function draw() {
  if (keyWentDown('c')){
       newGame();
     GameStart = true
     }
     if (!GameStart) {
      background("#000000");
      fill("#ffffff");
      textAlign(CENTER);
      textSize(42)
      text('Press "c" to play the game!', width/2, height/2);
      return;
     }

  background("#BDF3F1");
  fill("#000000");
  textAlign(CENTER);
  textSize(16)
  text('Controls: w (up) and s (down) keys', width/3, 20);
  text('fireballs Hit: ' + SCORE, width/10, 20 );

  if(gameOver) {
  unicorn.remove();
  for(var i = 0; i<fireball.length; i++) {
    fireball[i].remove();
    }

   background("#000000");
   fill("#00fff6");
   textAlign(CENTER);
   textSize(42);
   text('GAME OVER - Press "c" to try again', width/2, height/2 );
   // more writing
   if (keyWentDown('c')){
     newGame();
  }
  }

  if(!gameOver) {
    if (unicorn.position.y < 540 && unicorn.position.y > 80) {
    if(keyDown('w')) {
      unicorn.position.y -= UP;
    }
    else if(keyDown('s')) {
      unicorn.position.y += DOWN;
    }
    else {
      unicorn.position.y += 0;
    }

  }
  else if (unicorn.position.y >= 520) {
    if(keyDown('w')) {
      unicorn.position.y = 520;
    }
    else if(keyDown('s')) {
      unicorn.position.y -= UP;
    }
  }

  else if (unicorn.position.y <= 90) {
    if(keyDown('w')) {
      unicorn.position.y += DOWN;
    }
    else if(keyDown('s')) {
      unicorn.position.y = 90;
    }
  }

   if (unicorn.overlap(fireball)) {
      score();
      for(var i = 0; i<fireball.length; i++) {
       if(unicorn.overlap(fireball[i])) {
     fireball[i].position.x = 760;
      fireball[i].position.y = random(0, 600);
       }
      }
    }

   if (SCORE == 5) {
 gameOver = true ;
}
  }

   for(var i = 0; i<fireball.length; i++) {
     if(fireball[i].position.x < -30){
       fireball[i].position.x = 760;
      fireball[i].position.y = random(0, 600);
     }
   }

 drawSprite(unicorn);
  fireball.draw();
}

function score() {
  SCORE = SCORE + 1;
}

function newGame() {
  fireball.removeSprites();
  gameOver = false;
  updateSprites(true);
  unicorn.position.x = width/5;
  unicorn.position.y = height/2;
  SCORE = 0
  for (var i = 0; i < 5; i++) {
    let fireballH = random(0, 600);
  let fireballX = random(800, 400);

    fireball = createSprite(fireballX, fireballH, 75, 75);

  fireball.addImage(fireballImage);
   fireball.velocity.x = random(-4, -8);
  fireball.add(fireball);
  }
  unicorn = createSprite(width/5, height/2, 40, 40);
  unicorn.addImage(unicornImage);
   drawSprite(unicorn);

  // background("#003366");
  // fill("#ffffff");
  // textAlign(CENTER);
  // text('Controls: W (up) and S (down) Keys', width/3, 20);
  // text('fireballs Hit: ' + SCORE, width/10, 20 );
}

function disappear() {
  for(var i = 0; i<fireball.length; i++) {
        if(unicorn.overlap(fireball[i])){
         fireball[i].remove();
        }
   }
}
