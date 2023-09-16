function checkItem(item, strID, nbtKey, nbtValue) {
    var tag = item.getItemNbt().getCompound("tag");
    if (item.getName() == strID) {
        if (tag.has(nbtKey)) {
            if (nbtValue == tag.getString(nbtKey)) {
                return true;
            };
        };
    };
    return false;
};

function rotary(x, y, cx, cy, a) {
    var x2 = (x - cx) * Math.cos(a * (Math.PI / 180)) - (y - cy) * Math.sin(a * (Math.PI / 180)) + cx;
    var y2 = (x - cx) * Math.sin(a * (Math.PI / 180)) + (y - cy) * Math.cos(a * (Math.PI / 180)) + cy;
    return [x2, y2];
};

function foreach(a, f) {
    var f = f ? f : function (i) { return i };
    var rt = [];
    for (var i in a) {
        rt.push(f(a[i]));
    };
    return rt;
};

function choice(a, pop) {
    if (pop) {
        return a.splice(Math.round(Math.random() * (a.length - 1)), 1)[0];
    } else {
        return a[Math.round(Math.random() * (a.length - 1))];
    }
}

function format(fstr, l) {
    var re0 = /(^|[^#])#\{(\d+)\}/;
    var re1 = /#(#\{.*\})/;
    while (re0.exec(fstr)) {
        var text = re0.exec(fstr)[1];
        var index = Number(re0.exec(fstr)[2]);
        fstr = fstr.replace(re0, text + l[index]);
    }

    while (re1.exec(fstr)) {
        fstr = fstr.replace(re1, re1.exec(fstr)[1]);
    }

    return fstr;
};

function includes(value, list) {
    var include = false;
    foreach(list, function (i) {
        if (i == value) {
            include = true;
        };
    });
    return include;
};

function repeat(src, n) {
    return (new Array(n + 1)).join(src);
};

