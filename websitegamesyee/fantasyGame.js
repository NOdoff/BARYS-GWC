var unicorn;
var astroid;
var unicornImage, fireballImage;

var SCORE = 0;
var gameOver;
var UP = 15;
var DOWN = 15;

function setup() {
  createCanvas(1200, 600);

unicornImage = loadImage('https://i.imgur.com/RoGsgTC.png');
fireballImage = loadImage('https://i.imgur.com/37bnkYA.png');

unicorn = createSprite(width/5, height/2, 40, 40);
unicorn.addImage(unicornImage);

fireball = new Group();


newGame();
var gameStart = true;
gameOver = false;
updateSprites(false);
}

function draw() {
  background("#BDF3F1");
  fill("#000000");
  textAlign(CENTER);
  text('Controls: Up and Down Arrow Keys', width/3, 20);
  text('fireballs Hit: ' + SCORE, width/10, 20 );

  if(gameOver) {
  unicorn.remove();
  for(var i = 0; i<fireball.length; i++) {
    fireball[i].remove();
    }

   background("#000000");
   fill("#00fff6");
   textAlign(CENTER);
   textSize(50);
   text('GAME OVER - Press "c" to try again', width/2, height/2 );
   if (keyWentDown('c')){
     newGame();
  }
  }

  if(!gameOver) {
    if (unicorn.position.y < 540 && unicorn.position.y > 80) {
    if(keyDown(38)) {
      unicorn.position.y -= UP;
    }
    else if(keyDown(40)) {
      unicorn.position.y += DOWN;
    }
    else {
      unicorn.position.y += 0;
    }

  }
  else if (unicorn.position.y >= 520) {
    if(keyDown(38)) {
      unicorn.position.y = 520;
    }
    else if(keyDown(40)) {
      unicorn.position.y -= UP;
    }
  }

  else if (unicorn.position.y <= 90) {
    if(keyDown(38)) {
      unicorn.position.y += DOWN;
    }
    else if(keyDown(40)) {
      unicorn.position.y = 90;
    }
  }

   if (unicorn.overlap(fireball)) {
      score();
      for(var i = 0; i<fireball.length; i++) {
       if(unicorn.overlap(fireball[i])) {
     fireball[i].position.x = 1260;
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
       fireball[i].position.x = 1260;
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
    let astroidH = random(0, 600);
  let astroidX = random(600, 1200);

    astroid = createSprite(astroidX, astroidH, 75, 75);

  astroid.addImage(fireballImage);
   astroid.velocity.x = random(-4, -8);
  fireball.add(astroid);
  }
  unicorn = createSprite(width/5, height/2, 40, 40);
  unicorn.addImage(unicornImage);
   drawSprite(unicorn);

  background("#003366");
  fill("#ffffff");
  textAlign(CENTER);
  text('Controls: Up and Down Arrow Keys', width/3, 20);
  text('fireballs Hit: ' + SCORE, width/10, 20 );
}

function disappear() {
  for(var i = 0; i<fireball.length; i++) {
        if(unicorn.overlap(fireball[i])){
         fireball[i].remove();
        }
   }
}
