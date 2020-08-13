const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 

var plinkos = [];
var divisions = [];


var gameState = "PLAY";

var divisionHeight=300;
var score = 0;
var particle = null;
var turn = 0;

function setup() {
  var canvas = createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);


    for (var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }
    


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var i = 50; i <=width-10; i=i+50) 
    {
    
       plinkos.push(new Plinko(i,175));
    }

     for (var p = 75; p <=width; p=p+50) 
    {
    
       plinkos.push(new Plinko(p,275));
    }

     for (var d = 50; d <=width-10; d=d+50) 
    {
    
       plinkos.push(new Plinko(d,375));
    }

    

    
}
 
function draw() {
  background("black");
  textSize(20);
  text("Score : "+score,5,30);
  text("TOTAL CHANCES : 5",140,30);
  text("CHANCES DONE : " + turn, 370,30);

  text("500",30,520);
  text("500",100,520);
  text("500",180,520);
  text("500",270,520);
  text("100",350,520);
  text("100",420,520);
  text("100",500,520);
  text("200",580,520);
  text("200",660,520);
  text("200",745,520);

  Engine.update(engine);
 
  

  push();
  stroke("yellow");
  strokeWeight(3);
  line(0,420,800,420);
  pop();
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
 
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   
   if(particle != null){
    particle.display();

    if(particle.body.position.y > 780){
      gameState = "PLAY";
      if(particle.body.position.x > 0 && particle.body.position.x < 300){
        score += 50 * Math.round(random(1,10));
        particle = null;
        if(turn >= 5){
          gameState = "END";
        }
      }
      else if(particle.body.position.x > 301 && particle.body.position.x < 600){
        score += 50 * Math.round(random(1,10));
        particle = null;
        if(turn >= 5){
          gameState = "END";
        }
      }
      else if(particle.body.position.x > 601 && particle.body.position.x < 800){
        score += 50 * Math.round(random(1,10));
        particle = null;
        if(turn >= 5){
          gameState = "END";
        }
      }
      
    }
  }

  if(gameState === "END"){
    textSize(25);
    text("GAME OVER",330,340);
  }

   
}

function mousePressed(){
  if(gameState != "END" && gameState != "NOMOREPARTICLE"){
    turn++;
    particle = new Particle(mouseX,10,10,10);
    gameState = "NOMOREPARTICLE";
    
  }
}