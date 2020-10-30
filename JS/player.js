class Player{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;

    }

    getCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", function(data){
            playerCount = data.val();
        });
    }

    updateCount(count){
        database.ref('/').update({
            playerCount: count
        });
    }

    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance
        });
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data)=>{
            allPlayers = data.val()
        });
    }

    play(){
        form.hide();

        textSize(30);
        text("Start", 320, 100);

        Player.getPlayerInfo();
        if(allPlayers!==undefined){
            var displayPosition = 230;
            for(var plr in allPlayers){
                if(plr === "player" + player.index){
                    fill("red");
                } else {
                    fill("black");
                }
                displayPosition+=20;
                textSize(15);
                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 220, displayPosition);
            }
        }

        if(keyIsDown(UP_ARROW)&& player.index!==null){
            player.distance+=50;
            player.update();
        }
    }
}