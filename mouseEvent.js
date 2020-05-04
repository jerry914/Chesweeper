var timeStart, timeEnd, time;

function mouseMoved(){
  if(gameScreen === 1){
    let d = dist(mouseX, mouseY, windowWidth/2, windowHeight/2+windowHeight/4);
    if( d < windowHeight/8){
      tint(200,200,200);
      image(playImage,windowWidth/2,windowHeight/2+windowHeight/4,windowHeight/4,windowHeight/4);
    }
    else{
      noTint();
    }
  }
}
function mouseClicked(){
  if(mouseButton == LEFT){
    if(gameScreen === 1){
      let d = dist(mouseX, mouseY, windowWidth/2, windowHeight/2+windowHeight/4);
      if( d < windowHeight/8){
        gameScreen = 2;
      }
    }
    else if(gameScreen === 2){
      if(mouseX > windowWidth/2-100 &&mouseX < windowWidth/2+100){
        if(mouseY > windowHeight/2 -130 &&mouseY < windowHeight/2 -30){
          gameScreen = 3
          bombnum = 10;
        }
        else if(mouseY >windowHeight/2+30 &&mouseY < windowHeight/2+130){
          gameScreen = 3;
          bombnum = 20;
        }
      }
      let d = dist(mouseX, mouseY, windowWidth-70,70);
      if( d < 50){
        gameScreen = 1;
      }
    }
    else if(gameScreen === 3){
      for(var i =0 ; i<cols; i++){
        for(var j=0;j<rows;j++){
          if(grid[i][j].contains(mouseX,mouseY)){
            if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12)){
            }else{
              grid[i][j].reveal();
              if(grid[i][j].bee){
                gameOver();
              }
            }
          }
        }
      }
    }
    else if(gameScreen === 4){

    }
    else if(gameScreen === 5 && (mouseY<windowHeight/2+w || mouseY>windowHeight/2+w*2 )){
      gameScreen = 3;
      grid[group-1][period-1].reveal();
    }
    else if(gameScreen === 6 && (mouseY<windowHeight/2+w || mouseY>windowHeight/2+w*2 )){
      gameScreen = 3;
      gameOver();
    }
    else if(gameScreen === 7){
      let d = dist(mouseX, mouseY, windowWidth-70,70);
      if( d < 50){
        gameScreen = 1;
        for(var i=0;i<cols;i++){
          for(var j =0;j<rows;j++){
            if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12)){

            }
            else{
              grid[i][j].revealed = false;
              grid[i][j].bee = false;
              setupBees = false;
              winCount = 0;
            }
          }
        }
      }
    }
    else if(gameScreen == 8){
      gameScreen =1;
      for(var i=0;i<cols;i++){
        for(var j =0;j<rows;j++){
          if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12)){

          }
          else{
            grid[i][j].revealed = false;
            grid[i][j].bee = false;
            setupBees = false;
            winCount = 0;
          }
        }
      }
    }
  }
}
function mousePressed(){
  if(mouseButton == RIGHT){
    if(gameScreen === 3){
      for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
          if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12)){

          }
          else if(grid[i][j].contains(mouseX,mouseY)){
            period = j+1;
            group = i+1;
            gameScreen =4;
          }
        }
      }
    }
    }
  timeStart = getTimeNow();
  time = setInterval(function () {
            timeEnd = getTimeNow();
            if (timeEnd - timeStart > 1000) {
               clearInterval(time);
               if(gameScreen === 3){
                 for(var i=0;i<cols;i++){
                   for(var j=0;j<rows;j++){
                     if((j==0 && i>0 && i<17) || ((j==1 || j==2) && i>1 &&　i<12)){

                     }
                     else if(grid[i][j].contains(mouseX,mouseY)){
                       period = j+1;
                       group = i+1;
                       gameScreen =4;
                     }
                   }
                 }
               }
           }
         }, 100);
}
function mouseReleased(){
  clearInterval(time);
}

function getTimeNow() {
        var now = new Date();
        return now.getTime();
    }
