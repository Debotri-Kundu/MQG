class Quiz {
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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow")
    Contestant.getPlayerInfo();
     if(allContestants !== undefined){
       var displayPos=280
       for(var plr in allContestants){
           var correctAns=2
           if(allContestants[plr].answer == correctAns){
             fill("green")
           }
           else{
             fill("red")
           }
           displayPos+=40
           textSize(25)
           text(allContestants[plr].name + ":"+allContestants[plr].answer,300,displayPos)

       }
     }
    
  }

}
