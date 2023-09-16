// for player
var API, player;

var nextid = 0;
function nrid() {
    nextid += 1;
    return nextid;
}

function sctx(gui, texture, x, y, w, h, sc) {
    gui.addTexturedRect(nrid(), texture, x, y, Math.round(w / sc), Math.round(h / sc)).setScale(sc);
};

function IsX(gui, dfX) {
    return dfX - (gui.getWidth() - 176) / 2
};

function IsY(gui, dfY) {
    return dfY - (gui.getHeight() - 166) / 2
}

// hooks

function init(event) {
    API = event.API;
    player = event.player;

    var item = player.getWorld().createItem("minecraft:nether_star", 0, 1);
    item.setCustomName("\u00a7r\u00a76showgui");
    player.removeItem(item, 1);
    player.giveItem(item);
};

function interact(event) {
    if (player.getMainhandItem().getName() == "minecraft:nether_star") {
        if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76showgui") {
            var gui = API.createCustomGui(nrid(), 400, 200, false);
            sctx(gui, "minecraft:textures/gui/options_background.png", 0, 0, 500, 300, 0.1);
            gui.addItemSlot(IsX(gui, 0), IsY(gui, 0));
            player.showCustomGui(gui);
        };
    };
};