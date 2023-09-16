var API;
var world;
var helloing = false;
function init(event) {
    API = event.API;
    world = event.player.getWorld();
};
function tick(event) {
    var player = event.player;
    var el = player.rayTraceEntities(100,false,true);
    var testin = false;
    for (var i in el){
        if (el[i].getUUID() == "0556df00-9549-4211-a71b-7458f79f0241"){
            testin = true;
            var npc = el[i];
        };
    };
    if (testin){
        if (!helloing){
            helloing = true;
            npc.say("你在看我");
            var allplayer = world.getAllPlayers()
            for (var i in allplayer) {
                allplayer[i].playSound("minecraft:block.end_portal.spawn", 1, 1)
            }
        }
    } else {
        helloing = false;
    }
}


