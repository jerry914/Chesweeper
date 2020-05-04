let gameScreen = 1;
var playImage;
let bombnum;

var grid;
var cols;
var rows;
var w ;
var totalBees;
var setupBees = false;
var period;
var group;
var winCount = 0;
let input,buttonClick;

var table = [
  ['H','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','He'],
  ['Li','Be','0','0','0','0','0','0','0','0','0','0','B','C','N','O','F','Ne'],
  ['Na','Mg','0','0','0','0','0','0','0','0','0','0','Al','Si','P','S','Cl','Ar'],
  ['K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Sc','Br','Kr'],
  ['Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe'],
  ['Cs','Ba','La...','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At','Rn'],
  ['Fr','Rn','Ac...','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Uut','Fl','Uup','Lv','Uus','Og']
]
function setup() {

  createCanvas(windowWidth, windowHeight);
  background('#00796B');
  textFont('Nova Flat');
  playImage = loadImage('playIcon.png');

  w = min(floor(windowWidth/18),floor(windowHeight/7))-15;
  cols = 18;
  rows = 7;
  grid = make2DArray(cols,rows);
  for(var i = 0;i <cols;i++){
    for(var j = 0;j <rows;j++){
      grid[i][j] = new Cell(i,j,w);
    }
  }
}

function draw() {
  switch(gameScreen){
    case 1 :
      GS1();
      break;
    case 2 :
      GS2();
      break;
    case 3:
      GS3(bombnum);
      break;
    case 4:
      GS4();
      break;
    case 7:
      GS7();
      break;
    case 8:
      GS8();
      break;
  }
}

function GS1(){
  rectMode(CENTER);
  fill('#009688');
  noStroke();
  rect(windowWidth/2,windowHeight/2,windowWidth-50,windowHeight-50);
  textAlign(CENTER);
  textSize(windowWidth/8);
  fill('#FFFFFF');
  text('Chesweeper',windowWidth/2,windowHeight/2);
  textSize(5);
  text('by Jerry Ho,19.0309',windowWidth-50,windowHeight-10);
  imageMode(CENTER);
  image(playImage,windowWidth/2,windowHeight/2+windowHeight/4,windowHeight/4,windowHeight/4);
}
function GS2(){
  rectMode(CENTER);
  fill('#009688');
  noStroke();
  rect(windowWidth/2,windowHeight/2,windowWidth-50,windowHeight-50);
  fill('#FFFFFF');
  rect(windowWidth/2,windowHeight/2-80,200,100,5);
  rect(windowWidth/2,windowHeight/2+80,200,100,5);
  fill('#212121');
  textSize(40);
  textAlign(CENTER);
  text('EASY',windowWidth/2,windowHeight/2-80);
  text('NORMAL',windowWidth/2,windowHeight/2+80);
  fill('#757575');
  textSize(20);
  text('10 MINES',windowWidth/2,windowHeight/2-50);
  text('20 MINES',windowWidth/2,windowHeight/2+110);
  ellipseMode(CENTER);
  fill('#FF4081');
  ellipse(windowWidth-70,70,50);
  fill('#FFFFFF');
  textSize(15);
  text('BACK',windowWidth-70,75);
}
function GS3(num){
  totalBees = num;
  if(setupBees == false){
    var option = [];
    for(var i=0;i<cols;i++){
      for(var j=0;j<rows;j++){
        if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12) || (j>3 && j<6 && i>1 && i<9) || (j == 6 && i>1)){

        }else
          option.push([i,j]);
      }
    }
    for(var n=0;n<totalBees;n++){
      var index = floor(random(option.length));
      var choice = option[index];
      var i = choice[0];
      var j = choice[1];
      option.splice(index,1);
      grid[i][j].bee = true;
    }

    for(var i =0;i<cols;i++){
      for(var j=0;j<rows;j++){
        grid[i][j].countBees();
      }
    }
    setupBees = true;
  }
  rectMode(CENTER);
  fill('#009688');
  noStroke();
  rect(windowWidth/2,windowHeight/2,windowWidth-50,windowHeight-50);
  fill('#FFFFFF');
  textSize(windowWidth/20);
  text("Open All !",windowWidth/2,150);
  winCount =0;
  for(var i = 0; i<cols ; i++){
    for(var j=0 ; j<rows ;j++){
      if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12)){
      }
      else{
        grid[i][j].show();
        if(grid[i][j].revealed == true){
          winCount ++;
          if(winCount == 90){
            gameScreen = 8;
          }
        }
      }
    }
  }
}

function GS4(){

  noLoop();
  rectMode(CENTER);
  fill('#FFFFFF');
  rect(windowWidth/2,windowHeight/2,w*10,w*8,5);
  textSize(w);
  stroke('#00796B');
  text("Guess Who",windowWidth/2,windowHeight/2-80);
  textSize(w*0.5);
  text("Period : "+period+" , Group "+group,windowWidth/2,windowHeight/2);

  input = createInput();
  input.position(windowWidth/2-w*2,windowHeight/2+w);
  buttonClick = createButton("submit");
  buttonClick.position(windowWidth/2+w,windowHeight/2+w);
  buttonClick.mousePressed(ansJudge);
}

function GS7(){
  frameRate(10);
  ellipseMode(CENTER);
  fill('#FF4081');
  noStroke();
  ellipse(windowWidth-70,70,50);
  textSize(w);
  text('YOU LOSE ~',windowWidth/2,windowHeight-50)
  fill('#FFFFFF');
  textSize(15);
  text('BACK',windowWidth-70,75);
    for(var i=0;i<cols;i++){
    for(var j =0;j<rows;j++){
      if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12)){
      }
      else{
        //grid[i][j].bee = true;
        grid[i][j].show();
      }
    }
  }
}

function GS8(){
  textSize(windowWidth/20);
  fill('#FBC02D');
  noStroke();
  text("You Are The Winner !",windowWidth/2,windowHeight-50);
}

function make2DArray(cols,rows){
  var arr = new Array(cols);
  for(var i = 0;i <arr.length;i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

function gameOver(){
  for(var i=0;i<cols;i++){
    for(var j =0;j<rows;j++){
      if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12)){
      }
      else{
        grid[i][j].revealed = true;
        grid[i][j].show();
      }
    }
  }
  gameScreen =7;
}

function ansJudge(){
  const ans = input.value();
  input.hide();
  buttonClick.hide();
  if(ans == table[period-1][group-1]){
    textSize(w);
    stroke('#FFA000');
    text("CORRECT !",windowWidth/2,windowHeight/2+w*2);
    gameScreen = 5;
    loop();
  }
  else{
    stroke('#FF4081');
    text("YOU ARE DEAD !",windowWidth/2,windowHeight/2+w);
    text("The correct answer is : "+table[period-1][group-1],windowWidth/2,windowHeight/2+w*2);
    gameScreen = 6;
    loop();
  }
}
