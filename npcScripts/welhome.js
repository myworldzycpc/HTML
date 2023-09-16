var ishomes = {};

function tick(event) {
    var name = event.player.getName();
    var x = event.player.x;
    var z = event.player.z;
    var API = event.API;
    var world = event.player.getWorld();
    if (!ishomes[name]) {
        ishomes[name] = 0;
    }
    if ((1002 > z && z > 971) && (1135 < x && x < 1161)) {
        if (ishomes[name] == 0) {
            ishomes[name] = 1;
            API.executeCommand(world, 'title ' + name + ' title "欢迎回家"');
        }
    } else if (!((1002 > z && z > 971) && (1135 < x && x < 1161))) {
        if (ishomes[name] == 1) {
            ishomes[name] = 0;
            API.executeCommand(world, 'title ' + name + ' title "欢迎下次再来"');
        }
    }

};