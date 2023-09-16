// for block

var global = this;

// hooks

function init(event) {
    global.block = event.block;
    global.API = event.API;
    
}

function interact(event) {
    var player = event.player;

    player.message(1);
};