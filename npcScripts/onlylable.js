var API, player;
function init(event) {
    player = event.player;
    API = event.API;
    var gui = API.createCustomGui(0, 200, 200, false);
    gui.addLabel(1, "TEST", 0, 0, 200, 50);
    player.showCustomGui(gui);
}

