$(function () {


    $("body").removeClass("hide")
    $(".tp-warnof-numberonly").hide();
    $(".tp-warnof-infinity").hide();
    $(".tp-content").css({ "opacity": "0", "position": "fixed", "left": "50%", "width": "100%" })
    $(".tp-cover").css({ "opacity": "0", "left": "-50%" }).animate({ "opacity": "1", "left": "0" }, 500, function () {
        setTimeout(function () {
            $(".tp-cover").fadeOut(200, function () {
                $(".tp-content").animate({ "opacity": "1", "left": "0" }, 1000, function () {
                    $(".tp-content").css({ "position": "static" });
                });
            });
        }, 300);
    });


    $(".tp-switch").click(function () {
        $this = $(this);
        $this.parent().parent().parent().fadeTo(100, 0, function () {
            $this.toggleClass("btn-success");
            $this.is(".btn-success") ? $this.html("开") : $this.html("关");
            $this.parent().parent().parent().fadeTo(100, 1);
            if ($(".tp-colorhexswitch").html() == "开") {
                $(".tp-namecolor").attr("disabled", "");
                $(".tp-namecolor").parent().addClass("text-muted");
                $(".tp-colorhex").removeAttr("disabled");
                $(".tp-colorhex").parent().parent().removeClass("text-muted");
            } else {
                $(".tp-colorhex").attr("disabled", "");
                $(".tp-colorhex").parent().parent().addClass("text-muted");
                $(".tp-namecolor").removeAttr("disabled");
                $(".tp-namecolor").parent().removeClass("text-muted");
            };
        });
    });

    $(".tp-swselect").change(function () {
        if ($(".tp-swselect").val() == "苦力怕") {
            $(".tp-movement-speed").removeAttr("disabled");
            tphide(".tp-eq");
            tphide(".tp-forslime");
            tphide(".tp-forghast");
            tpshow(".tp-forcreeper");
        } else if ($(".tp-swselect").val() == "史莱姆" || $(".tp-swselect").val() == "岩浆史莱姆") {
            $(".tp-movement-speed").removeAttr("disabled");
            tphide(".tp-eq");
            tpshow(".tp-forslime");
            tphide(".tp-forghast");
            tphide(".tp-forcreeper");
        } else if ($(".tp-swselect").val() == "恶魂") {
            $(".tp-movement-speed").attr("disabled", "");
            tphide(".tp-eq");
            tphide(".tp-forslime");
            tpshow(".tp-forghast");
            tphide(".tp-forcreeper");
        } else {
            $(".tp-movement-speed").removeAttr("disabled");
            tpshow(".tp-eq");
            tphide(".tp-forslime");
            tphide(".tp-forghast");
            tphide(".tp-forcreeper");
        };
        if (["僵尸", "溺尸", "尸壳", "僵尸猪灵"].includes($(".tp-swselect").val())) {
            tpshow(".tp-CanBreakDoors-group");
            tpshow(".tp-IsBaby-group");
        } else {
            tphide(".tp-CanBreakDoors-group");
            tphide(".tp-IsBaby-group");
        };
    });
    $(".tp-swselect").change();

    var pageX = pageY = 0;
    $("body").mousemove(function (event) {
        pageX = event.pageX;
        pageY = event.pageY;
    });

    $(".tp-numberonly").change(function () {
        if ($(this).val()) {
            if (isNaN(parseFloat($(this).val()))) {
                $(".tp-warnof-numberonly").css({
                    "left": pageX - 10,
                    "top": pageY - 10,
                })
                $(".tp-warnof-numberonly").fadeIn(200, function () {
                    setTimeout(function () {
                        $(".tp-warnof-numberonly").fadeOut(100);
                    }, 200)
                });
                $(this).val("");
            } else if (!isFinite(parseFloat($(this).val()))) {
                $(".tp-warnof-infinity").css({
                    "left": pageX - 10,
                    "top": pageY - 10,
                })
                $(".tp-warnof-infinity").fadeIn(200, function () {
                    setTimeout(function () {
                        $(".tp-warnof-infinity").fadeOut(100);
                    }, 200)
                });
                $(this).val("");
            } else {
                $(this).val(parseFloat($(this).val()));
            };
        };

    });

    $(".panel-heading").click(function () {
        $(this).next().collapse('toggle');
    })

    $(".tp-build").click(buildfunc);

    $(".tp-PersistenceRequired").click();

    var s = [
        ['', 3],
        ['秋风落日入长河 江南烟雨行舟', 11.734113454818726],
        ['乱石穿空 卷起  多少的烽火', 16.841179370880127],
        ['万里山河都踏过 天下又入谁手', 23.20427894592285],
        ['分分合合 不过几十载春秋', 29.001450538635254],
        ['我在 十面埋伏 四面楚歌的时候', 31.49618101119995],
        ['把酒与苍天对酌', 34.20988488197327],
        ['纵然一去不回 此战又如何', 39.39305567741394],
        ['谁见 万箭齐发 星火漫天夜如昼', 42.758952140808105],
        ['刀光剑影交错', 45.30958294868469],
        ['而我枪出如龙 乾坤撼动', 48.57840442657471],
        ['一啸破苍穹', 50.667593240737915],
        ['长枪刺破云霞 放下一生牵挂', 56.17827296257019],
        ['望着寒月如牙', 58.26076936721802],
        ['孤身纵马 生死无话', 61.949455976486206],
        ['风卷残骑裂甲 血染万里黄沙', 67.47428011894226],
        ['成败笑谈之间 与青史留下', 73.23433756828308],
        ['', 95.4881238937378],
        ['我在 十面埋伏 四面楚歌的时候', 98.53990173339844],
        ['把酒与苍天对酌', 101.2924075126648],
        ['纵然一去不回 此战又如何', 106.39686226844788],
        ['谁见 万箭齐发 星火漫天夜如昼', 109.55182313919067],
        ['刀光剑影交错', 112.4508273601532],
        ['而我枪出如龙 乾坤撼动', 115.53088116645813],
        ['一啸破苍穹', 117.560964345932],
        ['长枪刺破云霞 放下一生牵挂', 123.26822090148926],
        ['望着寒月如牙', 125.27182340621948],
        ['孤身纵马 生死无话', 128.78579139709473],
        ['风卷残骑裂甲 血染万里黄沙', 134.24951481819153],
        ['成败笑谈之间 与青史留下', 139.7369384765625],
        ['长枪刺破云霞 放下一生牵挂', 145.65092754364014],
        ['望着寒月如牙', 147.6053717136383],
        ['孤身纵马 生死无话', 151.14512658119202],
        ['风卷残骑裂甲 血染万里黄沙', 156.79584169387817],
        ['笑谈间 谁能留下', 162.67546939849854]
    ];
    function rec(r, A) {
        x = r * Math.cos(A * Math.PI / 180);
        y = r * Math.sin(A * Math.PI / 180);
        return [x, y];
    }
    function roll(d) {
        return rec(0.5, 180 * d)[0] + 0.5;
    }
    function anifunc(f, t, cf = function () { }) {
        var c = 0;
        for (var i = 0; i < t; i++) {
            setTimeout(function () {
                c++;
                f(c / t);
                if (c == t) {
                    cf();
                }
            }, i);
        }
    }
    var playing = false;
    $("body").click(function () {
        if (!playing) {
            playing = true;
            $('#sound').trigger('play');
            $("#div2").hide();
            index = 0;
            for (var i = 1; i < s.length; i++) {
                setTimeout(function () {
                    index++;
                    // console.log(index, s[index - 1][1]);
                    $("#d3").html(s[index][0]);
                    anifunc(function (a) {
                        $("#div2").css("filter", `blur(${roll(a) * 5}px)`);
                        $("#div2").css("opacity", roll(1 - a) * 1);
                        $("#div2").css("letter-spacing", `${roll(a) * 5}rem`);
                        $("#div2").css("font-size", `${200 - roll(a) * 100}%`);
                        $("#d3").css("transform", `rotate(${roll(a) * 45}deg)`);
                    }, 400, function () {
                        // console.log('e');
                        setTimeout(function () {
                            anifunc(function (a2) {
                                $("#div2").css("filter", `blur(${roll(1 - a2) * 5}px)`);
                                $("#div2").css("opacity", roll(a2) * 1);
                                $("#div2").css("letter-spacing", `${roll(1 - a2) * 5}rem`);
                                $("#div2").css("font-size", `${200 + roll(1 - a2) * 100}%`);
                                $("#d3").css("transform", `rotate(${0 - roll(1 - a2) * 45}deg)`);
                            }, 900)
                        }, (s[index][1] - s[index - 1][1]) * 1000 - 1600);
                    })
                    $("#div2").fadeIn(200, function () {

                    });
                    if (index == s.length) {
                        playing = false;
                    }
                }, s[i - 1][1] * 1000 - 3000)
            }
        }
    })
});