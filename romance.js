var cupid;
var fireball;
var cupidImage, fireballsImage;
var SCORE = 0;
var gameOver;
var UP = 15;
var DOWN = 15;
var GameStart;

function setup() {
  createCanvas(800, 600);
  GameStart = false

  cupidImage = loadImage('https://i.imgur.com/Te2bSgo.png');
  fireballsImage = loadImage('https://i.imgur.com/rXCTofE.png');

  cupid = createSprite(width/5, height/2, 40, 40);
  cupid.addImage(cupidImage);

  fireballs = new Group();

  var gameStart = true;
  gameOver = false;
  updateSprites(false);
  background("#000000");
  fill("#ff4ad8");
  textAlign(CENTER);
  textSize(42);
  text('Click this game and then press "c" to play!', width/2, height/2);
}

function draw() {

 if (keyWentDown('c')){
      newGame();
    GameStart = true
    }
    if (!GameStart) {
     background("#000000");
     fill("#ff4ad8");
     textAlign(CENTER);
     textSize(42);
     text('Click this game and then press "c" to play!', width/2, height/2);
     return;
    }

   background("#BDF3F1");
   fill("#ffffff");
  textAlign(CENTER);
  textSize(16)
 text('Controls: w for up, s for down.', width/3, 20);
 text('fireballs Hit: ' + SCORE, width/10, 20 );

  if(gameOver) {
  cupid.remove();
  for(var i = 0; i<fireballs.length; i++) {
    fireballs[i].remove();
    }

   background("#000000");
   fill("#ff4ad8");
   textAlign(CENTER);
   textSize(42)
   text('GAME OVER - Press "c" to try again', width/2, height/2);
   if (keyWentDown('c')){
     newGame();
  }
  }

  if(!gameOver) {
    if (cupid.position.y < 590 && cupid.position.y > 10) {
    if(keyDown('w')) {
      cupid.position.y -= UP;
    }
    else if(keyDown('s')) {
      cupid.position.y += DOWN;
    }
    else {
      cupid.position.y += 0;
    }

  }
  else if (cupid.position.y >= 560) {
    if(keyDown('w')) {
      cupid.position.y = 560;
    }
    else if(keyDown('s')) {
      cupid.position.y -= UP;
    }
  }

  else if (cupid.position.y <= 40) {
    if(keyDown('w')) {
      cupid.position.y += DOWN;
    }
    else if(keyDown('s')) {
      cupid.position.y = 40;
    }
  }

   if (cupid.overlap(fireballs)) {
      score();
      for(var i = 0; i<fireballs.length; i++) {
       if(cupid.overlap(fireballs[i])) {
     fireballs[i].position.x = 840;
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
       fireballs[i].position.x = 840;
      fireballs[i].position.y = random(0, 600);
     }
   }

 drawSprite(cupid);
  fireballs.draw();
}

function score() {
  SCORE = SCORE + 1;
}

function newGame() {
  fireballs.removeSprites();
  gameOver = false;
  updateSprites(true);
  cupid.position.x = width/5;
  cupid.position.y = height/2;
  SCORE = 0
  for (var i = 0; i < 5; i++) {
    let fireballH = random(0, 600);
  let fireballX = random(800, 400);

    fireball = createSprite(fireballX, fireballH, 75, 75);

  fireball.addImage(fireballsImage);
   fireball.velocity.x = random(-4, -8);
  fireballs.add(fireball);
  }
  cupid = createSprite(width/5, height/2, 40, 40);
  cupid.addImage(cupidImage);
   drawSprite(cupid);

}

function disappear() {
  for(var i = 0; i<fireballs.length; i++) {
        if(cupid.overlap(fireballs[i])){
          fireballs[i].remove();
        }
   }
}
