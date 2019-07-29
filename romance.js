var cupid;
var poisonArrow;
var cupidImage, poisonArrowsImage;
var SCORE = 0;
var gameOver;
var UP = 15;
var DOWN = 15;
var GameStart;

function setup() {
  createCanvas(800, 600);
  GameStart = false

  cupidImage = loadImage('https://i.imgur.com/Te2bSgo.png');
  poisonArrowsImage = loadImage('https://i.imgur.com/nh3MBrl.png');

  cupid = createSprite(width/5, height/2, 40, 40);
  cupid.addImage(cupidImage);

  poisonArrows = new Group();

  var gameStart = true;
  gameOver = false;
  updateSprites(false);
  background("#000000");
  fill("#00fff6");
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
     fill("#00fff6");
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
 text('poisonArrows Hit: ' + SCORE, width/10, 20 );

  if(gameOver) {
  cupid.remove();
  for(var i = 0; i<poisonArrows.length; i++) {
    poisonArrows[i].remove();
    }

   background("#000000");
   fill("#00fff6");
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

   if (cupid.overlap(poisonArrows)) {
      score();
      for(var i = 0; i<poisonArrows.length; i++) {
       if(cupid.overlap(poisonArrows[i])) {
     poisonArrows[i].position.x = 840;
      poisonArrows[i].position.y = random(0, 600);
       }
      }
    }

   if (SCORE == 5) {
 gameOver = true ;
}
  }

   for(var i = 0; i<poisonArrows.length; i++) {
     if(poisonArrows[i].position.x < -30){
       poisonArrows[i].position.x = 840;
      poisonArrows[i].position.y = random(0, 600);
     }
   }

 drawSprite(cupid);
  poisonArrows.draw();
}

function score() {
  SCORE = SCORE + 1;
}

function newGame() {
  poisonArrows.removeSprites();
  gameOver = false;
  updateSprites(true);
  cupid.position.x = width/5;
  cupid.position.y = height/2;
  SCORE = 0
  for (var i = 0; i < 2; i++) {
    let poisonArrowH = random(0, 600);
  let poisonArrowX = random(800, 400);

    poisonArrow = createSprite(poisonArrowX, poisonArrowH, 75, 75);

  poisonArrow.addImage(poisonArrowsImage);
   poisonArrow.velocity.x = random(-3, -5);
  poisonArrows.add(poisonArrow);
  }
  cupid = createSprite(width/5, height/2, 40, 40);
  cupid.addImage(cupidImage);
   drawSprite(cupid);

}

function disappear() {
  for(var i = 0; i<poisonArrows.length; i++) {
        if(cupid.overlap(poisonArrows[i])){
          poisonArrows[i].remove();
        }
   }
}
