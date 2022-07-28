const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var solo
var corda
var fruta
var link1
var backgroundImg
var frutaImg
var coelhoImg
var bunny
var botao
var blink
var eating
var sad

function preload(){

    backgroundImg = loadImage("./assets/background.png")
    frutaImg = loadImage("./assets/melon.png")
    coelhoImg= loadImage("./assets/Rabbit-01.png")
    blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png","./assets/blink_3.png")
    eating = loadAnimation("./assets/eat_0.png", "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png")
    sad = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png", "./assets/sad_3.png")
    blink.playing = true
    blink.looping = true
    eating.playing = true
    eating.looping = false
    sad.playing = true 
    sad.looping = false 

}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;


  solo = Bodies.rectangle(200,690,600,20,{isStatic:true})
  World.add(world,solo)

  corda = new Rope(6,{x:245,y:30})

  fruta = Bodies.circle(300,300,60,{density:1})
  Composite.add(corda.body,fruta)

  link1 = new Link(corda,fruta)
  blink.frameDelay = 20
  eating.frameDelay = 20
  sad.frameDelay = 20
  bunny = createSprite(250,600,100,100)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("eating",eating)
  bunny.addAnimation("sad",sad)
  bunny.scale = 0.2

  botao = createImg("./assets/cut_btn.png")
  botao.size(50,50)
  botao.position(220,30)
  botao.mouseClicked(drop)
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImg,width/2,height/2,width,height)
  Engine.update(engine);
  rect(solo.position.x,solo.position.y,600,20)
  corda.show()
  if(fruta!= null){
    image(frutaImg, fruta.position.x,fruta.position.y,60,60)
  }
  if(collide(fruta,bunny)){
    bunny.changeAnimation("eating")
  }

  if(fruta != null && fruta.position.y > bunny.position.y){
    bunny.changeAnimation("sad")
  }
   drawSprites()
}

function drop(){
  corda.break()
  link1.detach()
  link1 = null

}

function collide(body,sprite){
  if(body != null){
    var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(distance<= 80){
      World.remove(world,fruta)
      fruta = null
      return true
    } else{
      return false
    }
  }
}



