var pyjs = {
    printSelf: function (tePlayer, text) {
        tePlayer.message(text);
    },

    printAll: function (world, text) {
        world.broadcast(text);
    },

    format: function (fstr, l) {
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
    }
};

function checkItem(item, nbtKey, nbtValue) {
    var tag = item.getItemNbt().getCompound("tag");
    if (tag.has(nbtKey)) {
        if (nbtValue == tag.getString(nbtKey)) {
            return true;
        }
    }
    return false;
}

function removeAllTags(player) {
    var tags = player.getTags();
    for (var index in tags) {
        player.removeTag(tags[index]);
    }
}

//---------------------------------------------------------------------------------

function init(event) {
    var thePlayer = event.player;
    var world = thePlayer.getWorld();
    var api = event.API;

    var relist = [
        thePlayer.getUUID()
    ];
    api.executeCommand(world, pyjs.format('/give #{0} minecraft:blaze_rod 1 0 {TRMsMorph:"morphBlock", display:{Name:"\u00a76右键方块变身"}}', relist));
    api.executeCommand(world, pyjs.format('/give #{0} minecraft:blaze_rod 1 0 {TRMsMorph:"morphHuman", display:{Name:"\u00a76右键变回人类"}}', relist));
}

function interact(rcEvent) {
    var rcPlayer = rcEvent.player;
    var pmhItem = rcPlayer.getMainhandItem();
    var world = rcPlayer.getWorld();
    var api = rcEvent.API;

    if (rcEvent.type == 2) {
        if (checkItem(pmhItem, "TRMsMorph", "morphBlock")) {
            var bannedBlocks = {
                "minecraft:tallgrass": 0,
                "minecraft:double_plant": 0,
                "minecraft:fire": 0,
                "minecraft:barrier": 0,
                "minecraft:water": 0,
                "minecraft:lava": 0,
                "minecraft:redstone_wire": 0,
                "minecraft:standing_sign": 0,
                "minecraft:wall_sign": 0,
                "minecraft:standing_banner": 0,
                "minecraft:wall_banner": 0,
                "minecraft:skull": 0
            };
            var facingBlock = rcPlayer.rayTraceBlock(6, true, false).getBlock();
            if (facingBlock.getName() in bannedBlocks) {
                pyjs.printSelf(rcPlayer, "\u00a7c你不能变成此方块");
            }
            else {
                var relist = [
                    rcPlayer.getUUID(), //0 Player
                    facingBlock.getMetadata(), //1 Block data
                    facingBlock.getName(), //2 Block ID
                    world.createItem(facingBlock.getName(), facingBlock.getMetadata(), 1).getDisplayName() //3 Block display name
                ];
                api.executeCommand(world, pyjs.format('/morph #{0} block {Meta:#{1}b, Block:"#{2}", Name:"block"}', relist));
                pyjs.printSelf(rcPlayer, pyjs.format('\u00a76你变成了\u00a7c#{3}', relist));
            }
        }
    }
}
