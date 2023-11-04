// r,g,b范围为[0,255],转换成h范围为[0,360]
// s,v为百分比形式，范围是[0,100],可根据需求做相应调整
function rgbToHsv(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let h, s, v;
    const min = Math.min(r, g, b);
    const max = v = Math.max(r, g, b);
    const difference = max - min;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / difference + (g < b ? 6 : 0);
                break;
            case g:
                h = 2.0 + (b - r) / difference;
                break;
            case b:
                h = 4.0 + (r - g) / difference;
                break;
        }
        h = Math.round(h * 60);
    }
    if (max === 0) {
        s = 0;
    } else {
        s = 1 - min / max;
    }
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    return [h, s, v];
}

//输入的h范围为[0,360],s,l为百分比形式的数值,范围是[0,100]
//输出r,g,b范围为[0,255],可根据需求做相应调整
function hsvToRgb(h, s, v) {
    s = s / 100;
    v = v / 100;
    const h1 = Math.floor(h / 60) % 6;
    const f = h / 60 - h1;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r, g, b;
    switch (h1) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

$("body").append(`<div style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 9999;mix-blend-mode: difference;background-color: #fff;pointer-events: none;" />`)