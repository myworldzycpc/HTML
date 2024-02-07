const MC = {
    on(eventType, handler) {
        handler();
        return new Handler();
    }
};

class Handler {
    constructor(id) {
        this.id = id;
    }

    disable() {

    }
}

class Player {
    constructor(props) {
    }

    sendMessage(message) {

    }
}

// 绑定事件
const handler = MC.on("playerJoin", function (event) {

    event.player.sendMessage([{"text": "Hello!", "color": "gold"}, {"selector": "@s"}]);
});

handler.disable();