class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    robo1=createSprite(900,200);
    robo1.addImage("robot",roboImg);
    //robo1.scale=0.5;
    robo2=createSprite(500,200);
    robo2.addImage("robots",robo2Img);
    //robo2.scale=0.5;
    robots=[robo1,robo2];
    
  }

  play(){
    form.hide();
    //textSize(30);
    //text("GAME START",100,100);
    
    Player.getPlayerInfo();

    if(allPlayers!==undefined){
      background("yellow");
      image(trackImg, 0,-displayHeight,displayWidth,displayHeight*2);
      //var dp=130;
      var index=0;
      var x;
      var y=0;
      for(var pl in allPlayers){
        index+=1;
        y+=200;
        x=displayWidth-allPlayers[pl].distance;
        robots[index-1].x=x;
        robots[index-1].y=y;
        if(index===player.index){
          robots[index-1].shapeColor="red";
          camera.position.x=robots[index-1].x;
          camera.position.y=displayWidth/2;
        }
      }
    }

    if(keyIsDown(LEFT_ARROW) && player.index!==null){
      player.distance+=10;
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index!==null){
      player.distance-=10;
      player.update();
    }

    drawSprites();
  }

  end(){
    console.log("game ended");
    //console.log(player.rank);
  }
}
