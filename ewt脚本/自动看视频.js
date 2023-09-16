setInterval(function(){
    const video = document.getElementsByTagName("video")[0];
    if (video){
        video.muted = true;
        video.playbackRate = 10;
        video.play();
        const btn = document.querySelector("#earnest_check_unpass_play > p:nth-child(1) > img");
        if (btn) {
            btn.click()
        }
    }
    const audio = $("#btnCenter[data-status=0]");
    if (audio){
        audio.click();
    }
}, 1)