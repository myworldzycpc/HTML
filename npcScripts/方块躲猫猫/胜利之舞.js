// for player
// victory danction of hypixels WUWar

var global = this;

// algorithms functions

function checkItemEssence(item, strID, essence) {
    var tag = item.getItemNbt().getCompound("tag");
    if ((item.getName() == strID) || (!strID)) {
        if (tag.has("essence")) {
            if (essence == tag.getString("essence")) {
                return true;
            };
        };
    };
    return false;
};

function refreshItem(p, itemlist) {
    foreach(itemlist, function (i) {
        p.removeItem(i, 1);
    });
    foreach(itemlist, function (i) {
        p.giveItem(i);
    });
}

function foreach(a, f) {
    var f = f ? f : function (i) { return i };
    var rt = [];
    for (var i in a) {
        rt.push(f(a[i]));
    };
    return rt;
};

function loopcount(count, f) {
    var f = f ? f : function (i) { return i };
    var rt = [];
    for (var i = 0; i < count; i++) {
        rt.push(f(i));
    };
    return rt;
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// hooks

function init(event) {
    global.player = event.player;
    global.API = event.API;

    global.npcs = [];

    refreshItem(player, [
        player.getWorld().createItemFromNbt(API.stringToNbt('{id:"minecraft:stick",Count:1b,Damage:0s,tag:{display:{Name:"\u00a76spawn"},essence:"spawn_npc"}}')),
        player.getWorld().createItemFromNbt(API.stringToNbt('{id:"minecraft:stick",Count:1b,Damage:0s,tag:{display:{Name:"\u00a76kill"},essence:"kill_npc"}}')),

    ])
}

function interact(event) {
    if (checkItemEssence(player.getMainhandItem(), undefined, "spawn_npc")) {
        if (npcs.length == 0) {
            var x = player.getX() - 10;
            var z = player.getZ() - 10;
            loopcount(4, function () {
                loopcount(4, function () {
                    var e = API.createNPC(player.getWorld().getMCWorld());
                    e.setHome(x + randint(0, 4), 4, z + randint(0, 4));
                    e.setPosition(x + randint(0, 4), 4, z + randint(0, 4));
                    e.spawn();
                    npcs.push(e);
                    x += 5;
                })
                x = player.getX() - 10;
                z += 5;
            })
        }
    } else if (checkItemEssence(player.getMainhandItem(), undefined, "kill_npc")) {
        foreach(npcs, function (i) {
            i.despawn();
        });
        npcs = [];
    }
};

function timer(event) {
    if (event.id == 0) {
        for (var index in npcs) {
            var i = npcs[index];
            if (Math.round(new Date().getTime() / 1000) % 2 == 0) {
                if (index % 2 == 0) {
                    i.getAi().setAnimation(4);
                } else {
                    i.getAi().setAnimation(0);
                }
            } else {
                if (index % 2 == 0) {
                    i.getAi().setAnimation(0);
                } else {
                    i.getAi().setAnimation(4);
                }
            }
        }
    }
}