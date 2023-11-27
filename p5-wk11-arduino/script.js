

//arduino variables
let serial 
let portName = "/dev/tty.usbmodem14201"

//p5 variables
let colors = ['#03b6fc','#ff8363','#ffec5e','#8945ff','#eb52b0']
let buildings = []
let suns = []
let sunColor = ["#eb52b0",'#f58a42',"#ff8363",'#8945ff','#ff4f19','#ffab19']
let colorShade = ['#4dff67','#41ab50','#2beaff','#2540f5',]
let colorShade2 = ['#f5d742','#f58a42','#e3e3e3','#c7c7c7']
let c1 
let c2
const Y_AXIS = 1
const X_AXIS = 2


 //building1 
 class Building{
  constructor(){ 
  this.x = random(100,600) 
  this.y = random(420,600) 
  this.w = random(40,100) 
  this.h = random(300,700)
  this.color = random(colors) 
  this.shade = random(colorShade) 
  this.shade2 = random(colorShade2)
  }

  display(){ 
      granulate(25)

  let halfSize = this.w/2 
  
  //Front face
  fill(this.color)
  rect(this.x, this.y,this.w, this.h)
  
  //draw top face 
    fill(this.shade)
    beginShape()
    vertex(this.x,this.y)
    vertex(this.x + halfSize, this.y -halfSize)
    vertex(this.x + halfSize +this.w, this.y -halfSize)
    vertex(this.x + this.w, this.y)
    endShape(CLOSE)
    
   //draw right face 
    fill(this.shade2) 
    beginShape() 
    vertex(this.x + this.w, this.y)
    vertex(this.x + halfSize+this.w, this.y -halfSize)
    vertex(this.x + halfSize +this.w, this.y -halfSize + this.h)
    vertex(this.x + this.w, this.y + this.h)
    endShape(CLOSE)
    
}
}

//Sun 

class Sun { 
constructor(){
this.x = random(50,700) 
this.y = random(50,400) 
this.radius = random(200,400)
this.speed = random(10,30)
this.color = random(sunColor)
} 

display() { 
 fill(this.color) 
 ellipse(this.x, this.y, this.radius)
}

}




function setup() {
  createCanvas(800, 800)
  skies = [color("#03b6fc"), color("#ff8363"), color("#ffec5e"), color("#8945ff"), color("#eb52b0")];
  c1 = random(skies); // sky gradient
  c2 = random(skies); 

  let circle = new Sun() 
  suns.push(circle)
  
  for(let l = 0; l<7; l++){
   let building1 = new Building() 
   buildings.push(building1)
  }

  serial = new p5.SerialPort()

  serial.onList(gotList) 
  serial.list()
  serial.onOpen(gotOpen) 
  serial.openPort(portName) 
  serial.onData(gotData)

  }


function draw() {
  setGradient(0, 0, 800, 800, c1, c2, Y_AXIS);
  granulate(25)
  for(let k = 0; k< suns.length; k++) { 
    suns[k].display() 
  //  suns[k].move()
  }
   

for(let b = 0; b<buildings.length; b++) { 
  buildings[b].display()
}


}

function gotList(ports){ 
for(let i = 0; i < ports.length; i++){ 
  console.log(ports[i])
}
}

function gotOpen(){ 
console.log("Port Open!") 
}

function gotData(){
  let newData = serial.readLine() 
  if(newData.length <= 0) return; 
  console.log(newData)

  c1 = random(skies) 
  c2 = random(skies)
  buildings = [];
  suns = [];
  // randomBGcolor = random(colorArray2)
  // background(randomBGcolor)


  let circle = new Sun();
  suns.push(circle);

  for (let i = 0; i < 7; i++) {
    let building1 = new Building();
    buildings.push(building1);
  }



}

function setGradient(x,y,w,h,c1,c2,axis) { 
  noFill() 
  push() 
  if (axis === Y_AXIS) {
   // Top to bottom gradient
   for (let i = y; i <= y + h; i++) {
     let inter = map(i, y, y + h, 0, 1);
     let c = lerpColor(c1, c2, inter);
     stroke(c);
     line(x, i, x + w, i);
   }
 } else if (axis === X_AXIS) {
   // Left to right gradient
   for (let i = x; i <= x + w; i++) {
     let inter = map(i, x, x + w, 0, 1);
     let c = lerpColor(c1, c2, inter);
     stroke(c);
     line(i, y, i, y + h);
   }
 
}
 pop()
}


function granulate(amount) { 
  loadPixels();
    const d = pixelDensity();
    const pixelsCount = 4 * (width * d) * (height * d);
    for (let i = 0; i < pixelsCount; i += 4) {
        const grainAmount = random(-amount, amount);
        pixels[i] = pixels[i] + grainAmount;
        pixels[i+1] = pixels[i+1] + grainAmount;
        pixels[i+2] = pixels[i+2] + grainAmount;
    
    }
    updatePixels();
}
