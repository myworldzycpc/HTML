var world, api, player;
var pyjs = {
    print: function (text) {
        player.message(text);
    }
};

function init(event) {
    world = event.player.getWorld();
    api = event.API;
    player = event.player;
}

function interact(event) {
    var item = player.getMainhandItem();
    var target = event.target;
    player.message(target);
    if (event.type == 2) {
        // pyjs.print(block.getName());
    }
}
