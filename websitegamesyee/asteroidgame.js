var spaceship;
 var astroid;
var spaceshipImage, astroidsImage;

var SCORE = 0;
var gameOver;
var UP = 15;
var DOWN = 15;


function setup() {
  createCanvas(800, 600);




  spaceshipImage = loadImage('https://i.imgur.com/hNCQhFo.png');
astroidsImage = loadImage('https://i.imgur.com/s18v4Ay.png');

   spaceship = createSprite(width/5, height/2, 40, 40);
//   astroid = createSprite(width/2, height/2, 40, 40);
  // spaceship.rotateToDirection = true;
  // spaceship.velocity.x = 4;
  // spaceship.setCollider('circle', 0, 0, 20);
  // spaceship.maxSpeed = 10;
  spaceship.addImage(spaceshipImage);
  //astroid.addImage(astroidsImage);
  //
   astroids = new Group();

//   for (var i = 0; i < 5; i++) {
//     var astroidH = random(0, 600);
//   var astroidX = random(0, 1200);

//     astroid = createSprite(astroidX, astroidH, 75, 75);

// //   var img = loadImage('https://i.imgur.com/cEZZLFv.png');
//   astroid.addImage(astroidsImage);
//   astroids.add(astroid);
//   }

  //
  newGame();
  var gameStart = true;
  gameOver = false;
  updateSprites(false);
  //
  //camera.position.y = height/2;

  // for(var i = 0; i<8; i++) {
  //   var ang = random(360);
  //   var px = width/2 + 1000 * cos(radians(ang));
  //   var py = height/2+ 1000 * sin(radians(ang));
  //   createAstroid(3, px, py);
  //   createAstroid(1, px, py);
  //   createAstroid(2, px, py);
  //}
}

function draw() {
 background("#000000");
   fill("#ffffff");
   textAlign(CENTER);
   
   text('Press "c" to play game!', width/3, 20);
   if (keyWentDown('c')){
     newGame();
  
//   background("#003366");
//   fill("#ffffff");
//   textAlign(CENTER);
//   text('Controls: w for up, s for down.', width/3, 20);
//   text('Asteroids Hit: ' + SCORE, width/10, 20 );


  if(gameOver) {
  spaceship.remove();
  for(var i = 0; i<astroids.length; i++) {
    astroids[i].remove();

    }
   background("#000000");
   fill("#ffffff");
   textAlign(CENTER);
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


    } else if(keyDown('s')) {
      spaceship.position.y += DOWN;

    } else {
      spaceship.position.y += 0;


    }

  }
  else if (spaceship.position.y >= 560) {
    if(keyDown('w')) {
      spaceship.position.y = 560;


    } else if(keyDown('s')) {
      spaceship.position.y -= UP;

    }
  }

  else if (spaceship.position.y <= 40) {
    if(keyDown('w')) {
      spaceship.position.y += DOWN;


    } else if(keyDown('s')) {
      spaceship.position.y = 40;

    }
  }

  // }
   if (spaceship.overlap(astroids)) {
      score();
      for(var i = 0; i<astroids.length; i++) {
       if(spaceship.overlap(astroids[i])) {
     astroids[i].position.x = 840;
      astroids[i].position.y = random(0, 600);
//    disappear();
       }
      }
    }

   if (SCORE == 5) {
 gameOver = true ;
}
  }


  // get rid of passed asteroids

   for(var i = 0; i<astroids.length; i++) {
     if(astroids[i].position.x < -30){
       astroids[i].position.x = 860;
      astroids[i].position.y = random(0, 600);

     }
   }

//   if(!) {
//       var astroidH = random(50, 300);
//       var astroid1 = createSprite(spaceship.position.x + width, astroidH/2+1+100, 80, astroidH);
//       astroid1.addImage(astroidsImage);
//       astroids.add(astroid1);
//   }


//      camera.position.x = spaceship.position.x + width/4;



//     for(var i = 0; i<5; i++) {
//       createAstroid();
//       drawSprite(astroid);
//     }

 drawSprite(spaceship);
 //drawSprites(astroids);
  astroids.draw();

}


// function createAstroid() {
//   var astroidH = random(0, 600)
//   var astroidX = random(0, 1200)
//   astroid = createSprite(astroidX, astroidH, 150, 150);
//   var img = loadImage('https://i.imgur.com/cEZZLFv.png');
//   astroid.addImage(img);
//   astroids.add(astroid);
//   return astroid;
  //drawSprite(a);
  //a.setSpeed(2.5-(type/2), random(360));
  //a.rotationSpeed = 0.5;
  //a.debug = true;
  // a.type = type;
  //
  // if(type == 2)
  //   a.scale = 0.6;
  // if(type == 1)
  //   a.scale = 0.3;
  //
  // a.mass = 2+a.scale;
  // a.setCollider('circle', 0, 0, 50);
  // astroids.add(a);
  // return a;



// }

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
  for (var i = 0; i < 7; i++) {
    let astroidH = random(0, 600);
  let astroidX = random(800, 400);

    astroid = createSprite(astroidX, astroidH, 75, 75);


//   var img = loadImage('https://i.imgur.com/cEZZLFv.png');
  astroid.addImage(astroidsImage);
   astroid.velocity.x = random(-3, -6);
  astroids.add(astroid);
  }
  spaceship = createSprite(width/5, height/2, 40, 40);
  spaceship.addImage(spaceshipImage);
   drawSprite(spaceship);

  background("#003366");
  fill("#ffffff");
  textAlign(CENTER);
  text('Controls: w for up, s for down.', width/3, 20);
  text('Asteroids Hit: ' + SCORE, width/10, 20 );


//   astroid.position.x = width/4;

//   astroid.position.y = height/4;


}

function disappear() {
  for(var i = 0; i<astroids.length; i++) {
        if(spaceship.overlap(astroids[i])){


         astroids[i].remove();
        }
   }
}
