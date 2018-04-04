
var myFont;

var drawLength = 250;

var noiseScale = 0.005;

var strokeLength = 35;

var imgNames = ["Revanth.jpg"] //, "LowPolyTexture2.jpg", "LowPolyTexture3.jpg"]; // Add your image's name here.

var imgs = [];

var button;

var imgIndex = -1;

var rows = 30;
var cols = 50;
var ts = 20;

var frame;

var prevX;
var prevY;

var check = false;

var letter;

var iconNames = ["assets/envelope.svg", "assets/file-alt.svg","assets/github.svg","assets/linkedin.svg","assets/twitter-square.svg"]
var icons = [];

var button1;
var button2;
var button3;
var button4;
var button5;

var matrix = [];

function preload() {

  // Pre-load all images.

  for (let i = 0; i < imgNames.length; i++) {
    let newImg = loadImage(imgNames[i]);

    imgs.push(newImg);

  }
  
  for (let i = 0; i < iconNames.length; i++) {
    let newIcon = loadImage(iconNames[i]);

    icons.push(newIcon);

  }
  
  
  
  FontLato = loadFont('assets/Font/Lato-Regular.ttf');
  FontAm = loadFont('assets/Font/Amethyst.ttf');
  FontRC = loadFont('assets/Font/R&C-Demo.otf');
  FontHoney = loadFont('assets/Font/Honeymoon.ttf');
  FontScript = loadFont('assets/Font/Impregnable.ttf');
  
  //result = loadStrings('assets/test.txt');
  
}

function setup(){
  createCanvas(windowWidth, windowHeight*7);

		prevX = 0;
		prevY = 0;
  
		  
  button1 = createInput('click me');
  button1.position(width/2-(250), 550);
  button1.size(50, 55);
  button1.attribute('type', 'image');
  button1.attribute('src', 'assets/envelope.svg');
  button1.attribute('color', '#1ebbd7')
  //button1.style(type="image" src="assets/envelope.svg");
  
  button2 = createInput('click me');
  button2.position(width/2-(250)+100, 550);
  button2.size(50, 55);
  button2.attribute('type', 'image');
  button2.attribute('src', 'assets/file-alt.svg');
  button2.attribute('color', '#1ebbd7')
  
  button3 = createInput('click me');
  button3.position(width/2-(250)+200, 550);
  button3.size(50, 55);
  button3.attribute('type', 'image');
  button3.attribute('src', 'assets/github.svg');
  button3.attribute('color', '#1ebbd7')
  
  button4 = createInput('click me');
  button4.position(width/2-(250)+300, 550);
  button4.size(50, 55);
  button4.attribute('type', 'image');
  button4.attribute('src', 'assets/linkedin.svg');
  button4.attribute('color', '#1ebbd7')
  
  button5 = createInput('click me');
  button5.position(width/2-(250)+400, 550);
  button5.size(50, 55);
  button5.attribute('type', 'image');
  button5.attribute('src', 'assets/twitter-square.svg');
  button5.attribute('color', '#1ebbd7')

		for(let i=0; i<rows; i++){
			let col = [];
			for(let j=0; j<cols; j++){
					col.push(0);
			}
			matrix.push(col);
		}
		

}

function draw(){
		
		background(0);
		textFont(FontLato);
		textSize(ts);
		for(let i=0; i<rows; i++){
			for(let j=0; j<cols; j++){
					if((i > 7 && i < 21 && j > 6 && j < 15) || (i > 8 && i < 20 && j > 40 && j < 46))
						fill(0);
						else
							//fill(190, 95, 120);
							fill("#189ad3");
					text('x', (width/rows)*i+10, (windowHeight/cols)*j);
			}
		}


		noStroke();
		fill("#1ebbd7");

		textSize(70);
		textFont(FontHoney);
		rectMode(CORNERS)
		text('Revanth Korrapolu', width/2-(8*70/2), 150);
		rectMode(CORNERS);
		
		
		fill("#71c7ec");
		
		textFont(FontLato);
		text("Projects", 0, 750)
		
		/*
  for (let i = 0; i < iconNames.length; i++) {
  			//tint(226, 150, 170);
  			tint("#1ebbd7");
					image(icons[i], width/2-(250)+100*i, 550, 50, 55);
  }
*/
		
		

}
