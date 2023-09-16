// for player
var API, player;
function init(event) {
    API = event.API;
    player = event.player;

    var item = player.getWorld().createItem("minecraft:flint_and_steel", 0, 1);
    player.removeItem(item, 1);
    player.giveItem(item);
};
function interact(event) {
    if (player.getMainhandItem().getName() == "minecraft:flint_and_steel") {
        var e = event.player.rayTraceEntities(100, false, true);
        if (e.length != 0) {
            var nbt = e[0].getEntityNbt();
            nbt.setShort("Fire", 100);
            e[0].setEntityNbt(nbt);
        } else if (event.player.rayTraceBlock(100, false, true) == null) {
            var nbt = event.player.getEntityNbt();
            nbt.setShort("Fire", 100);
            event.player.setEntityNbt(nbt);
        };
    };
};