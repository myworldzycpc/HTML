const script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://code.jquery.com/jquery-1.12.4.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
script.onload = function () {
    $("body").append(`<video class="tipSound" src="http://112.253.31.18:8213/p/6033/file/Windows%20Notify%20Calendar.wav" hidden/>`)
    const audio = $(".tipSound")[0];
    audio.playbackRate = 1;
    let count = 0;
    setInterval(function () {
        const notificationCount = $(".notification").length;
        if (notificationCount > count) {
            audio.load()
            let playPromise = audio.play()
            if (playPromise !== undefined) {
                if (window.Notification && Notification.permission !== "denied") {
                    Notification.requestPermission(function (status) {
                        new Notification('消息提醒', {body: $(".notification").text()});
                    });
                }
                playPromise.then(() => {
                    audio.play()
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
        count = notificationCount;
    }, 100);
    console.log("消息提醒已开启");
}