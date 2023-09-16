// for player
// make a array circle

var global = this;

// algorithms functions

function checkItem(item, strID, nbtKey, nbtValue) {
    var tag = item.getItemNbt().getCompound("tag");
    if (item.getName() == strID) {
        if (tag.has(nbtKey)) {
            if (nbtValue == tag.getString(nbtKey)) {
                return true;
            };
        };
    };
    return false;
};

function rotary(x, y, cx, cy, a) {
    var x2 = (x - cx) * Math.cos(a * (Math.PI / 180)) - (y - cy) * Math.sin(a * (Math.PI / 180)) + cx;
    var y2 = (x - cx) * Math.sin(a * (Math.PI / 180)) + (y - cy) * Math.cos(a * (Math.PI / 180)) + cy;
    return [x2, y2];
};

// hooks

function init(event) {
    global.player = event.player;
    global.API = event.API;
    global.options = {
        "count": 20,
        "radius": 5,
        "ladder": 10,
    }

    var item = player.getWorld().createItemFromNbt(API.stringToNbt('{id:"minecraft:bow",Count:1b,Damage:0s,tag:{essence:"rotary_archery"}}'))
    item.setCustomName("\u00a7r\u00a76右键射箭");
    player.removeItem(item, 1);
    player.giveItem(item);
}

function interact(event) {
    if (checkItem(player.getMainhandItem(), "minecraft:bow", "essence", "rotary_archery")) {
        var ppos = player.getPos();
        for (var i = 0; i < options.count; i++) {
            var newa = player.getWorld().createEntity("minecraft:arrow");
            var rotxz = rotary(ppos.getX() + options.radius, ppos.getZ(), ppos.getX(), ppos.getZ(), (i / options.count) * 360);
            newa.setPosition(rotxz[0], ppos.getY() + options.ladder * i, rotxz[1]);
            newa.spawn();
        };
    };
};