// for player
var API, player, namelist, uuidlist, gui;
var globals = this;
var opst = [true, true, true, true];
var searchfor = "";

var nextid = 0;
function nrid() {
    nextid += 1;
    return nextid;
}

function sctx(gui, texture, x, y, w, h, sc) {
    var t = gui.addTexturedRect(nrid(), texture, x, y, Math.round(w / sc), Math.round(h / sc))
    t.setScale(sc);
    return t;
};

function itbt(gui, x, y, itemname, tip) {
    gui.addTexturedButton(nrid(), "", x, y, 20, 20, itemname);
    var t = gui.addLabel(nrid(), "", x, y, 20, 20);
    t.setHoverText(tip);
}

function initgui() {
    var gui = API.createCustomGui(nrid(), 400, 200, false);
    var ael = player.getWorld().getAllEntities(-1);
    var el = [];
    for (var i in ael) {
        if (ael[i].getName().indexOf(searchfor) != -1) {
            if (ael[i].typeOf(5)) {
                if (opst[0]) {
                    el.push(ael[i]);
                }
            } else if (ael[i].typeOf(1)) {
                if (opst[1]) {
                    el.push(ael[i]);
                }
            } else if (ael[i].typeOf(6)) {
                if (opst[2]) {
                    el.push(ael[i]);
                }
            } else {
                if (opst[3]) {
                    el.push(ael[i]);
                }
            };
        };
    };
    namelist = [];
    uuidlist = [];
    for (var i in el) {
        namelist.push(el[i].getName() + "\u00a77(" + Math.round(el[i].getX()) + ", " + Math.round(el[i].getY()) + ", " + Math.round(el[i].getZ()) + ")\u00a7r");
        uuidlist.push(el[i].getUUID());
    };
    player.message(namelist);
    sctx(gui, "minecraft:textures/gui/options_background.png", 0, 0, 400, 200, 0.1);
    gui.addTexturedButton(nrid(), "选择你要传送的实体", 0, 10, 200, 20, "myworldzycpc:empty.png");
    gui.addLabel(nrid(), "搜索", 10, 30, 30, 20);
    globals.sf = gui.addTextField(nrid(), 40, 30, 150, 20);
    globals.ls = gui.addScroll(nrid(), 10, 50, 180, 140, namelist);
    itbt(gui, 190, 50, "myworldzycpc:button/beefbtn.png", "\u00a7r\u00a76生物");
    itbt(gui, 190, 71, "myworldzycpc:button/pickbtn.png", "\u00a7r\u00a76玩家");
    itbt(gui, 190, 92, "myworldzycpc:button/dyegreenbtn.png", "\u00a7r\u00a76掉落物");
    itbt(gui, 190, 113, "myworldzycpc:button/armorstandbtn.png", "\u00a7r\u00a76其他实体");
    globals.sw1 = sctx(gui, opst[0] ? "myworldzycpc:icon/on.png" : "myworldzycpc:icon/off.png", 211, 50, 20, 20, 1);
    globals.sw2 = sctx(gui, opst[1] ? "myworldzycpc:icon/on.png" : "myworldzycpc:icon/off.png", 211, 71, 20, 20, 1);
    globals.sw3 = sctx(gui, opst[2] ? "myworldzycpc:icon/on.png" : "myworldzycpc:icon/off.png", 211, 92, 20, 20, 1);
    globals.sw4 = sctx(gui, opst[3] ? "myworldzycpc:icon/on.png" : "myworldzycpc:icon/off.png", 211, 113, 20, 20, 1);
    return gui;
}

function updategui() {
    var ael = player.getWorld().getAllEntities(-1);
    var el = [];
    for (var i in ael) {
        if (searchfor == "" || ael[i].getName().indexOf(searchfor) != -1) {
            if (ael[i].typeOf(5)) {
                if (opst[0]) {
                    el.push(ael[i]);
                }
            } else if (ael[i].typeOf(1)) {
                if (opst[1]) {
                    el.push(ael[i]);
                }
            } else if (ael[i].typeOf(6)) {
                if (opst[2]) {
                    el.push(ael[i]);
                }
            } else {
                if (opst[3]) {
                    el.push(ael[i]);
                }
            };
        };
    };
    namelist = [];
    uuidlist = [];
    for (var i in el) {
        namelist.push(el[i].getName() + "\u00a77(" + Math.round(el[i].getX()) + ", " + Math.round(el[i].getY()) + ", " + Math.round(el[i].getZ()) + ")\u00a7r");
        uuidlist.push(el[i].getUUID());
    };

    globals.ls.setList(namelist);
    globals.sw1.setTexture(opst[0] ? "myworldzycpc:icon/on.png" : "myworldzycpc:icon/off.png");
    globals.sw2.setTexture(opst[1] ? "myworldzycpc:icon/on.png" : "myworldzycpc:icon/off.png");
    globals.sw3.setTexture(opst[2] ? "myworldzycpc:icon/on.png" : "myworldzycpc:icon/off.png");
    globals.sw4.setTexture(opst[3] ? "myworldzycpc:icon/on.png" : "myworldzycpc:icon/off.png");
    gui.update(player);
}

// hooks

function init(event) {
    player = event.player;
    API = event.API;

    var item = player.getWorld().createItem("minecraft:nether_star", 0, 1);
    item.setCustomName("\u00a7r\u00a76玩家传送");
    player.removeItem(item, 1);
    player.giveItem(item);
    gui = initgui();
    globals.sf.setText("test");
};

function interact(event) {
    if (player.getMainhandItem().getName() == "minecraft:nether_star") {
        if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76玩家传送") {
            player.showCustomGui(gui);
        };
    };
};

function customGuiScroll(event) {
    player.message(uuidlist);
    player.setPos(player.getWorld().getEntity(uuidlist[event.scrollIndex]).getPos());
    player.closeGui();
    player.message("已传送至\u00a76" + namelist[event.scrollIndex] + "");
};

function customGuiSlot(event) {
    player.message([event.stack.getDisplayName(), event.slotId]);
};

function timer(event) {
    if (event.id == 0) {
        if (player.getCustomGui() != null && player.getCustomGui().getID() == gui.getID()) {
            player.message(searchfor + " > " + globals.sf.getText());
            if (globals.sf.getText() != searchfor) {
                searchfor = globals.sf.getText();
                updategui();
            };
        };
    };
};
