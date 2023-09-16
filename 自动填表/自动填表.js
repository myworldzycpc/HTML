const w = window.open("https://www.wjx.cn/vm/PgoKfda.aspx");
const l = [];
for (let k = 1; k <= 100; k++) {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 2; j++) {
            l.push([i, j]);
        }
    }
}

function submitOne() {
    const item = l[0];
    w.location.href = `javascript:$("#q1_${item[0]} + .jqradio").click();$("#q2_${item[1]} + .jqradio").click();$("#ctlNext").click();`;
    return l.splice(0, 1);
}

window.waiting = false;
setInterval(function () {
    if (waiting) {
        if (w.location.href !== "https://www.wjx.cn/vm/PgoKfda.aspx") {
            w.location.href = "https://www.wjx.cn/vm/PgoKfda.aspx";
            window.waiting = false;
        }
        w.location.href = `javascript:$(".layui-layer-btn0").click();`;
    } else {
        if ($(w).find(`#q1_1 + .jqradio`)) {
            submitOne();
            window.waiting = true;
        }
    }
}, 500);