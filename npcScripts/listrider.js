var API;
var world;
var helloing = false;
function init(event) {
    API = event.API;
    world = event.player.getWorld();
};
function interact(event) {
    var player = event.player;
    var riders = player.getAllRiders();
    player.message(riders.length);
    for (var i in riders){
        player.message(riders[i].getName());
    };
};

