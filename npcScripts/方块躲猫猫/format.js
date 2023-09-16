function format(fstr) {
    var p = /\$\{(.*)\}/;
    while (p.test(fstr)){
        fstr = fstr.replace(p, eval(p.exec(fstr)[1]));
    }
    return fstr;
}

