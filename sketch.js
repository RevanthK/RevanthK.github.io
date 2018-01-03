
var myFont;

var drawLength = 250;

var noiseScale = 0.005;

var strokeLength = 35;

var imgNames = ["Revanth.jpg", "starryNight.jpg"] //, "LowPolyTexture2.jpg", "LowPolyTexture3.jpg"]; // Add your image's name here.

var imgs = [];

var imgIndex = -1;

var frame;

var check = false;

function preload() {

  // Pre-load all images.

  for (let i = 0; i < imgNames.length; i++) {
    let newImg = loadImage(imgNames[i]);

    imgs.push(newImg);

  }
  
  FontLato = loadFont('assets/Font/Lato-Regular.ttf');
  FontAm = loadFont('assets/Font/Amethyst.ttf');
  FontRC = loadFont('assets/Font/R&C-Demo.otf');
  FontHoney = loadFont('assets/Font/Honeymoon.ttf');
  

}

function setup(){
  createCanvas(windowWidth, windowHeight*5);
  
  
  changeImage();

}

function draw(){
	

	
		/*
		background(82,0,22);
		*/
		noStroke();
  textSize(100);
  fill(226, 150, 170);
  textFont(FontAm);
		text('Revanth', 0, 150);
		text('  Korrapolu', 0, 300);
		
		fill(190, 95, 120);
		textSize(50);
		textFont(FontHoney);
		text('Always Building', 25, 450);
		
		textFont(FontLato);
		text("Projects", 0, 750)
		
		if (frame > drawLength*3) {
				changeImage()
				
    return;
  }
  let img = imgs[imgIndex];
  img.loadPixels();
  
  translate(width/2-img.width/2+100, height/2-img.height/2+150);
  
  let count = map(frame, 0, drawLength, 2, 80);
  
  count *= 2;
  
  for (let i = 0; i < count; i++) {
    // Pick a random point on the image.
    let x = int(random(img.width))
    let y = int(random(img.height))
				
				let index = (y*img.width+x)*4;

    let r = img.pixels[index];

    let g = img.pixels[index+1];

    let b = img.pixels[index+2];

    let a = img.pixels[index+3];

    

    stroke(r, g, b, a);

    let sw = map(frame/3, 0, drawLength, 25, 0);

    strokeWeight(sw);

    push();

    translate(x, y)
    
    ////////////////////////////////////////////////////////////////////////////
			if(check){
				fill(r, g, b, a);
    ellipse(0, 0, 0, 0);

    pop();
			}
    ///////////////////////////////////////////////////////////////////////////////

			if(!check){
    let n = noise(x*noiseScale, y*noiseScale);

    rotate(radians(map(n, 0, 1, -180, 180)));
				
    let lengthVariation = random(0.75, 1.25);

				fill(r, g, b, a);

    line(0, 0, strokeLength*lengthVariation-frame/25, 0);
    //ellipse(0, 0, 0, 0);

    stroke(min(r*3, 225), min(g*3, 225), min(b*3, 225), random(100));
    

    strokeWeight(sw*0.8);
    

    line(0, -sw*0.15, strokeLength*lengthVariation, -sw*0.15);
    

    pop();
			}
  }

  frame++;


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}


function changeImage() {

		if(check)
			check = false;
		else 
			check = true;

  background(82,0,22);
  
  frame = 0;

  noiseSeed(int(random(1000)));

  imgIndex++;

  if (imgIndex >= imgNames.length) {

    imgIndex = 0;

  }


}
/*
function mousePressed() {

  changeImage();

}*/
