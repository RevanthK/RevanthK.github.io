
var img;
var lowPolyBackground;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  img = loadImage("assets/revanth.jpg");
  lowPolyBackground = loadImage("assets/test.jpg");
  
}

function draw(){
  background(250);
  var radius = 100;
  
  //drag to move the world.
  orbitControl();

  
  translate(-400, 0, -300);
   
  translate(240, 0, 0);
  rotateZ(radians(20));
  push();
    //rotateZ(frameCount * 0.01);
    //rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    //fill(0,0,255);
    texture(lowPolyBackground);
    sphere(70);
  pop();

  push();
      var a = frameCount * 0.01 * PI;
      var b = frameCount * 0.01 * PI;
      translate(sin(2*a) * radius , 0, cos(2*a) * radius);  
      sphere(10);
  pop();

}