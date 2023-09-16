// for player
// edit world border

var global = this;

function init(event) {
    global.API = event.API;
    global.player = event.player;
    global.pos = [];

    var item = player.getWorld().createItem("minecraft:nether_star", 0, 1);
    item.setCustomName("\u00a7r\u00a76边界工具");
    player.removeItem(item, 1);
    player.giveItem(item);
};
function interact(event) {
    if (player.getMainhandItem().getName() == "minecraft:nether_star") {
        if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76边界工具") {
            if (pos.length == 0) {
                pos.push(player.rayTraceBlock(100, false, false).getBlock());
                player.message("\u00a76已确认第一点，请再次右键确认第二点");
            } else if (pos.length == 1) {
                pos.push(player.rayTraceBlock(100, false, false).getBlock());
                player.message("\u00a76已确认第二点，已修改世界边界");
                var wide = (Math.abs(pos[0].getX() - pos[1].getX()) > Math.abs(pos[0].getZ() - pos[1].getZ())) ? Math.abs(pos[0].getX() - pos[1].getX()) : Math.abs(pos[0].getZ() - pos[1].getZ());
                var centerx = ((pos[0].getX() + pos[1].getX()) / 2).toFixed(1);
                var centerz = ((pos[0].getZ() + pos[1].getZ()) / 2).toFixed(1);
                player.message([pos[0].getX(),pos[1].getX(),pos[0].getZ(),pos[1].getZ(),wide,centerx,centerz])
                player.message(API.executeCommand(player.getWorld(), "worldborder set " + wide + " 1"));
                player.message(API.executeCommand(player.getWorld(), "worldborder center " + centerx + " " + centerz));
                pos = [];
            }
        };
    };
};