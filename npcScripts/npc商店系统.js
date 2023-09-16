// for npc

var global = this;

// algorithms functions

function format(fstr, l) {
    var re0 = /(^|[^#])#\{(\d+)\}/;
    var re1 = /#(#\{.*\})/;
    while (re0.exec(fstr)) {
        var text = re0.exec(fstr)[1];
        var index = Number(re0.exec(fstr)[2]);
        fstr = fstr.replace(re0, text + l[index]);
    }

    while (re1.exec(fstr)) {
        fstr = fstr.replace(re1, re1.exec(fstr)[1]);
    }

    return fstr;
};

var nextid = 0;
function nrid() {
    nextid += 1;
    return nextid;
}

function itsl(gui, x, y, itemslot) {
    if (itemslot) {
        gui.addItemSlot((x - 166) / 2, (y - 176) / 2, itemslot);
    } else {
        gui.addItemSlot((x - 166) / 2, (y - 176) / 2);
    };
};

// hooks

function init(event) {
    global.npc = event.npc;
    global.API = event.API;
}

function interact(event) {
    var player = event.player;

    var gui = API.createCustomGui(nrid(), 220, 220, false);
    gui.setBackgroundTexture("myworldzycpc:background/browser.png");
    global.closebtn = gui.addTexturedButton(nrid(), "", 210, 4, 5, 5, "myworldzycpc:icon/icons.png", 0, 0);

    player.showCustomGui(gui);
}
