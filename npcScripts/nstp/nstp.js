// for player
var API, player;
function init(event) {
    API = event.API;
    player = event.player;

    var item = player.getWorld().createItem("minecraft:nether_star", 0, 1);
    item.setCustomName("\u00a7r\u00a76玩家传送");
    player.removeItem(item, 1);
    player.giveItem(item);
};
function interact(event) {
    if (player.getMainhandItem().getName() == "minecraft:nether_star") {
        if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76玩家传送") {
            if (player.getName() == "myworldzycpc") {
                API.executeCommand(player.getWorld(), "tp " + player.getName() + " TheRedMaker_");
            } else if (player.getName() == "TheRedMaker_") {
                API.executeCommand(player.getWorld(), "tp " + player.getName() + " myworldzycpc");
            };
        };
    };
};