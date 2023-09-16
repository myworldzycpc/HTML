var API;
var world;
var player;
var oldt;
function init(event) {
    API = event.API;
    world = event.player.getWorld();
    player = event.player;
    var t = player.getTimers();
    t.clear()
    t.start(233, 0, true);
    oldt = (new Date()).getTime();
};
function timer() {
    player.message((new Date()).getTime() - oldt);
    oldt = (new Date()).getTime();
}