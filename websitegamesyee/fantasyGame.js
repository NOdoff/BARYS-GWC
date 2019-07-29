var unicorn;
var fireball;
var unicornImage, fireballsImage;
var SCORE = 0;
var gameOver;
var UP = 15;
var DOWN = 15;
var GameStart;

function setup() {
  createCanvas(700, 600);
  GameStart = false

  unicornImage = loadImage('https://i.imgur.com/quw6xZa.png');
  fireballsImage = loadImage('https://i.imgur.com/rXCTofE.png');

  unicorn = createSprite(width/5, height/2, 40, 40);
  unicorn.addImage(unicornImage);

  fireballs = new Group();

  var gameStart = true;
  gameOver = false;
  updateSprites(false);
  background("#000000");
  fill("#00fff6");
  textAlign(CENTER);
  textSize(30);
  text('Click this game and then press "c" to play!', width/2, height/2);
}

function draw() {

 if (keyWentDown('c')){
      newGame();
    GameStart = true
    }
    if (!GameStart) {
     background("#000000");
     fill("#00fff6");
     textAlign(CENTER);
     textSize(30);
     text('Click this game and then press "c" to play!', width/2, height/2);
     return;
    }

   background("#BDF3F1");
   fill("#ffffff");
  textAlign(CENTER);
  textSize(16);
 text('Controls: w for up, s for down.', width/2, 20);
 text('Fireballs Hit: ' + SCORE, width/10, 20 );

  if(gameOver) {
  unicorn.remove();
  for(var i = 0; i<fireballs.length; i++) {
    fireballs[i].remove();
    }

   background("#000000");
   fill("#00fff6");
   textAlign(CENTER);
   textSize(30);
   text('GAME OVER - Press "c" to try again', width/2, height/2);
   if (keyWentDown('c')){
     newGame();
  }
  }

  if(!gameOver) {
    if (unicorn.position.y < 590 && unicorn.position.y > 10) {
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
  else if (unicorn.position.y >= 560) {
    if(keyDown('w')) {
      unicorn.position.y = 560;
    }
    else if(keyDown('s')) {
      unicorn.position.y -= UP;
    }
  }

  else if (unicorn.position.y <= 40) {
    if(keyDown('w')) {
      unicorn.position.y += DOWN;
    }
    else if(keyDown('s')) {
      unicorn.position.y = 40;
    }
  }

   if (unicorn.overlap(fireballs)) {
      score();
      for(var i = 0; i<fireballs.length; i++) {
       if(unicorn.overlap(fireballs[i])) {
     fireballs[i].position.x = 740;
      fireballs[i].position.y = random(0, 600);
       }
      }
    }

   if (SCORE == 5) {
 gameOver = true ;
}
  }

   for(var i = 0; i<fireballs.length; i++) {
     if(fireballs[i].position.x < -30){
       fireballs[i].position.x = 740;
      fireballs[i].position.y = random(0, 600);
     }
   }

 drawSprite(unicorn);
  fireballs.draw();
}

function score() {
  SCORE = SCORE + 1;
}

function newGame() {
  fireballs.removeSprites();
  gameOver = false;
  updateSprites(true);
  unicorn.position.x = width/5;
  unicorn.position.y = height/2;
  SCORE = 0
  for (var i = 0; i < 4; i++) {
    let fireballH = random(0, 600);
  let fireballX = random(800, 400);

    fireball = createSprite(fireballX, fireballH, 75, 75);

  fireball.addImage(fireballsImage);
   fireball.velocity.x = random(-4, -8);
  fireballs.add(fireball);
  }
  unicorn = createSprite(width/5, height/2, 40, 40);
  unicorn.addImage(unicornImage);
   drawSprite(unicorn);

}

function disappear() {
  for(var i = 0; i<fireballs.length; i++) {
        if(unicorn.overlap(fireballs[i])){
          fireballs[i].remove();
        }
   }
}
