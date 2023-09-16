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

function itbt(gui, x, y, itemname, tip) {
    gui.addButton(nrid(), "", x, y, 19, 18);
    sctx(gui, "minecraft:textures/items/" + itemname + ".png", x + 1, y + 1, 16, 16, 0.062)
    var t = gui.addLabel(nrid(), "", x, y, 19, 18);
    t.setHoverText(tip);
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
            gui.addTexturedButton(nrid, "test", 0, 0, 200, 20, "minecraft:textures/customgui/testbtn.png")
            player.showCustomGui(gui);
        };
    };
};