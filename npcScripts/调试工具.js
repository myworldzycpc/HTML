// for player

var global = this;

function msp(c, n) {
    var rt = ""
    for (var i = 0; i < n; i++) {
        rt += c;
    };
    return rt;
};

// hooks

function init(event) {
    global.API = event.API;
    global.player = event.player;
    global.code = "";
    global.nextc = ""
    global.cl = false;
};

function chat(event) {
    if (event.message.slice(0, 4) == "run:") {
        nextc = event.message.slice(4);
        player.getTimers().start(5, 0, false)
    } else if (cl) {
        nextc = event.message;
        player.getTimers().start(5, 0, false)
    }
};

function timer(event) {
    if (event.id == 5) {
        if (nextc.slice(-1) == "\\") {
            code += nextc.slice(0, -1) + "\n";

            // player.message(msp(" ", player.getName().length + 3) + "\u00a77Continue entering the code...")
            player.message(String(code).replace(/\n/g, "\n\u00a77" + msp(" ", player.getName().length + 3)) + msp(" ", player.getName().length + 3) + "\u00a77Continue entering the code...")
            cl = true;
        } else {
            code += nextc + "\n";
            try {
                player.getWorld().broadcast("\u00a72" + player.getName() + " \u00a7a> " + String(eval(code)).replace(/\n/g, "\n\u00a7a" + msp(" ", player.getName().length + 3)));
            } catch (err) {
                player.getWorld().broadcast("\u00a72" + player.getName() + " \u00a7c> " + String(err).replace(/\n/g, "\n\u00a7c" + msp(" ", player.getName().length + 3)));
            };
            code = "";
            cl = false;
        }

    }
}

