var API, player, world, gui;
function init(event) {
    player = event.player;
    API = event.API;
    world = player.getWorld();
    gui = API.createCustomGui(233, 100, 100, false);
    gui.addButton(233, "你没有查看容器的权限", 0, 0);
};
function containerOpen(event) {
    player.getTimers().start(4, 0, false);
};
function timer(event) {
    if (event.id == 4) {
        if (player.getCustomGui() == null) {
            player.showCustomGui(gui);
        }
    }
}