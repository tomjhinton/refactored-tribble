const Matter = require('matter-js')

const random = Math.floor(Math.random() *256)

document.onkeydown = checkKey

let score = 0

const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies

// create an engine
const engine = Engine.create()

// create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    pixelRatio: 1,
    background: 'linear-gradient(#e66465, #9198e5)',
    wireframeBackground: '#AAA',
    enabled: true,
    wireframes: false,
    // showVelocity: true,
    // showAngleIndicator: true,
    showCollisions: true
  }
})

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 70, 30,
  {render: {
    fillStyle: `rgba(${Math.floor(Math.random() *256)},${Math.floor(Math.random() *256)},${Math.floor(Math.random() *256)},0.4)`,
    strokeStyle: 'blue',
    lineWidth: 3,
    friction: 0, frictionAir: 0, frictionStatic: 0, density: 0.0000000001
  }})
const boxB = Bodies.rectangle(450, 50, 80, 180, {isSensor: true, isStatic: true})
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })
const ceiling = Bodies.rectangle(400, 0, 810, 60, { isStatic: true })
const left = Bodies.rectangle(0, 250, 10, 800, { isStatic: true })
const right = Bodies.rectangle(820, 250, 90, 800, { isStatic: true })
const platform = Bodies.rectangle(500, 310, 810, 20, { isStatic: true })
const ball = Bodies.circle(100, 400, 20, {restitution: 1, friction: 0, frictionAir: 0, frictionStatic: 0, density: 0.0000000001 })

var collision = Matter.SAT.collides(boxA, ball)

Matter.Events.on(engine, 'collisionStart', function(event) {

  console.log(event)
  console.log(collision.collided)
  console.log(engine)
});

function checkKey(e) {
  e = e || window.event
  e.preventDefault()
  // console.log(collision.collided)

  if (e.keyCode === 38 || e.keyCode === 32) {
    // up arrow
    //console.log(boxA)
    boxA.position.y-=5
  }else if (e.keyCode === 40) {
    // down arrow

  } else if (e.keyCode === 37) {
    // left arrow


    boxA.position.x-=5

  }else if (e.keyCode === 39) {
    // right arrow
    boxA.position.x+=5

  }else if (e.keyCode === 82) {
    //R
  }
}

if(boxB.position.x === boxA.bounds.min.x-5){
  console.log('test')
}



if (collision.collided) {
  console.log('hiya')
}



// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground, platform, ball, left, ceiling, right])

// run the engine
Engine.run(engine)

// run the renderer
Render.run(render)
