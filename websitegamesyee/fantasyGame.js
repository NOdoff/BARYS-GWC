var spaceship;
var astroid;
var spaceshipImage, astroidsImage;
var SCORE = 0;
var gameOver;
var UP = 15;
var DOWN = 15;
var GameStart;

function setup() {
  createCanvas(800, 600);
GameStart = false

spaceshipImage = loadImage('https://i.imgur.com/hNCQhFo.png');
astroidsImage = loadImage('https://i.imgur.com/s18v4Ay.png');

spaceship = createSprite(width/5, height/2, 40, 40);
spaceship.addImage(spaceshipImage);

  astroids = new Group();

  var gameStart = true;
  gameOver = false;
  updateSprites(false);
   background("#000000");
    fill("#ffffff");
   textAlign(CENTER);
   //text size
   text('Press "c" to play game!', width/3, 20);
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
     text('Press "c" to play game!', width/3, 20);
     return;
    }

   background("#003366");
   fill("#ffffff");
  textAlign(CENTER);
  //text size
 text('Controls: w for up, s for down.', width/3, 20);
 text('Asteroids Hit: ' + SCORE, width/10, 20 );

  if(gameOver) {
  spaceship.remove();
  for(var i = 0; i<astroids.length; i++) {
    astroids[i].remove();
    }

   background("#000000");
   fill("#ffffff");
   textAlign(CENTER);
   // text size
   text('GAME OVER', width/10, 20 );
   text('Press "c" to try again', width/3, 20);
   if (keyWentDown('c')){
     newGame();
  }
  }

  if(!gameOver) {
    if (spaceship.position.y < 590 && spaceship.position.y > 10) {
    if(keyDown('w')) {
      spaceship.position.y -= UP;
    }
    else if(keyDown('s')) {
      spaceship.position.y += DOWN;
    }
    else {
      spaceship.position.y += 0;
    }

  }
  else if (spaceship.position.y >= 560) {
    if(keyDown('w')) {
      spaceship.position.y = 560;
    }
    else if(keyDown('s')) {
      spaceship.position.y -= UP;
    }
  }

  else if (spaceship.position.y <= 40) {
    if(keyDown('w')) {
      spaceship.position.y += DOWN;
    }
    else if(keyDown('s')) {
      spaceship.position.y = 40;
    }
  }

   if (spaceship.overlap(astroids)) {
      score();
      for(var i = 0; i<astroids.length; i++) {
       if(spaceship.overlap(astroids[i])) {
     astroids[i].position.x = 840;
      astroids[i].position.y = random(0, 600);
       }
      }
    }

   if (SCORE == 5) {
 gameOver = true ;
}
  }

   for(var i = 0; i<astroids.length; i++) {
     if(astroids[i].position.x < -30){
       astroids[i].position.x = 840;
      astroids[i].position.y = random(0, 600);
     }
   }

 drawSprite(spaceship);
  astroids.draw();
}

function score() {
  SCORE = SCORE + 1;
}

function newGame() {
  astroids.removeSprites();
  gameOver = false;
  updateSprites(true);
  spaceship.position.x = width/5;
  spaceship.position.y = height/2;
  SCORE = 0
  for (var i = 0; i < 5; i++) {
    let astroidH = random(0, 600);
  let astroidX = random(800, 400);

    astroid = createSprite(astroidX, astroidH, 75, 75);

  astroid.addImage(astroidsImage);
   astroid.velocity.x = random(-3, -6);
  astroids.add(astroid);
  }
  spaceship = createSprite(width/5, height/2, 40, 40);
  spaceship.addImage(spaceshipImage);
   drawSprite(spaceship);

}

function disappear() {
  for(var i = 0; i<astroids.length; i++) {
        if(spaceship.overlap(astroids[i])){
          astroids[i].remove();
        }
   }
}
