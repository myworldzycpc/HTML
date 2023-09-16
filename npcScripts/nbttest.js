// for player
var API, player;
function init(event) {
    API = event.API;
    player = event.player;

    var item = player.getWorld().createItem("minecraft:nether_star", 0, 1);
    item.setCustomName("\u00a7r\u00a76实体nbt");
    player.removeItem(item, 1);
    player.giveItem(item);
};
function interact(event) {
    if (player.getMainhandItem().getName() == "minecraft:nether_star") {
        if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76实体nbt") {
            player.message(player.getEntityNbt().getMCNBT())
        };
    };
};