const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var panda, pandaImg;
var bamboo, bambooImg;
var Btn;
 var rope1;
 var bamboo_con;
 var ground



let engine;
let world;
function preload(){
  pandaImg=loadImage("Panda.png")
  bambooImg=loadImage("Bamboo.jpeg")
}
function setup() 
{

  createCanvas(1200,700);
  engine = Engine.create();
  world = engine.world;

 panda= createSprite(100,600,50,50);
 panda.addImage(pandaImg)
 panda.scale=0.2

 var options= {
   isStatic:true
 }
bamboo= Bodies.rectangle(100,200,50,50);
ground= new Ground(0,690,1200,10)






Btn=createImg("button.jpeg")
Btn.position(100,50);
Btn.size(50,50)
Btn.mouseClicked(drop);

rope1= new Rope(5,{x:40,y:30});
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  bamboo_con= new Link(rope1,bamboo);
  Matter.Composite.add(rope1.body,bamboo)


}

function draw() 
{
  background(51);
  
imageMode (CENTER);
if(bamboo!=null){
  image(bambooImg,bamboo.position.x,bamboo.position.y,50,50)
}

  Engine.update(engine);
   drawSprites()

   rope1.show()


   if(collide(bamboo,panda)==true)
   {
     
     text ("You Win", 500,500)
   }
   if(collide(bamboo,ground.body)==true){
text("You LOOSE!",500,500)
   }

   ground.show()
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,bamboo);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function drop(){
rope1.break();
bamboo_con.detach();
}