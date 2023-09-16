var API;
var world;
var helloing = false;
function init(event) {
    API = event.API;
    world = event.npc.getWorld();
};
function tick(event) {
    var npc = event.npc;
    if (API.executeCommand(world, "execute " + event.npc.getUUID() + " ~ ~ ~ testfor @a[r=2]") == null){
        if (!helloing){
            helloing = true;
            npc.say("你要传送吗");
            var allplayer = world.getAllPlayers()
            for (var i in allplayer){
                allplayer[i].playSound("minecraft:block.end_portal.spawn",1,1)
            }
        };
    } else {
        helloing = false;
    };
};

