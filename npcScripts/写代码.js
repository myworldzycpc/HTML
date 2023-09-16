// for player
// writing code tip

var global = this;

// hooks

function init(event) {
    global.API = event.API;
    global.player = event.player;

    global.mode = player.getGamemode();

    var item = player.getWorld().createItem("minecraft:stick", 0, 1);
    item.setCustomName("\u00a7r\u00a76右键写代码");
    player.removeItem(item, 1);
    player.giveItem(item);
};

function interact(event) {
    if (player.getMainhandItem().getName() == "minecraft:stick") {
        if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76右键写代码") {
            mode = player.getGamemode();
            player.setGamemode(3);
            player.getWorld().broadcast("\u00a73" + player.getName() + " \u00a72正在写代码")
        };
    };
};
function keyPressed(event){
    if (player.getGamemode() == 3 && event.key == 16) {
        player.setGamemode(mode);
        player.getWorld().broadcast("\u00a73" + player.getName() + " \u00a72回来了")
    };
}
