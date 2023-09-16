var API;
var world;
var oldys = {};
function init(event) {
    API = event.API;
    world = event.player.getWorld();
    oldys[event.player.getName()] = event.player.getY();
};
function tick(event) {
    var player = event.player;
    API.executeCommand(world, "title " + player.getUUID() + " actionbar \"速度:" + Math.abs(oldys[player.getName()] - player.getY()) + "\"")
    oldys[player.getName()] = player.getY();
};

