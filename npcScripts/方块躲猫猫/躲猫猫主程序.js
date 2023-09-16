// for player
// main code of blockhide

var global = this;

// algorithms functions

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

function checkItem(item, strID, nbtKey, nbtValue) {
    var tag = item.getItemNbt().getCompound("tag");
    if (item.getName() == strID) {
        if (tag.has(nbtKey)) {
            if (nbtValue == tag.getString(nbtKey)) {
                return true;
            }
        }
    }
    return false;
}

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

// fragment functions

function endgame() {
    foreach(foreach(player.getWorld().getAllPlayers()), function (i) {
        var item = player.getWorld().createItem("minecraft:diamond_sword", 0, 1);
        item.setCustomName("\u00a7r\u00a76右键准备");
        i.removeItem(item, 1);
        i.giveItem(item);
        var item = i.getWorld().createItem("minecraft:blaze_rod", 0, 1);
        i.removeItem(item, 1);
        var item = i.getWorld().createItem("minecraft:compass", 0, 1);
        i.removeItem(item, 1);
        var item = i.getWorld().createItem("minecraft:redstone_torch", 0, 1);
        i.removeItem(item, 1);
        i.removeTag("hurter");
        i.removeTag("hider");
        i.removeTag("visiter");
        i.setGamemode(options.dgm);
        i.setPos(options.dt)
        API.executeCommand(i.getWorld(), "morph " + i.getUUID());
    });
    score_ready.setValue(0);
    score_wait.setValue(0);
    score_dogamestart.setValue(0);
    score_nextpos.setValue(0);

    player.getTimers().stop(6);
    player.getTimers().stop(8);
    player.getTimers().stop(9);

}

// hooks

function init(event) {
    global.API = event.API;
    global.player = event.player;
    global.options = {
        "nostw": 30, // Number of seconds to wait 猎人等待的秒数
        "noh": 1, // Number of hurters 猎人数量
        "sp": [
            {
                "name": "世界树",
                "pos": API.getIPos(-428, 70, 566),
            },
            {
                "name": "沙漠",
                "pos": API.getIPos(75, 70, 1570),
            },
            {
                "name": "不毛之地",
                "pos": API.getIPos(198, 69, 736),
            },
            {
                "name": "农场",
                "pos": API.getIPos(8, 63, 58),
            },
        ], // spawn 玩家出生点
        "dt": API.getIPos(-56, 88, 162),// 大厅坐标
        "dgm": 1, // default game mode 默认游戏模式
        "tcdt": 10, // Tool cooling down time 工具冷却时间
    };
    global.t = new Date().getTime();
    var item = player.getWorld().createItem("minecraft:diamond_sword", 0, 1);
    item.setCustomName("\u00a7r\u00a76右键准备");
    player.removeItem(item, 1);
    player.giveItem(item);
    var item = player.getWorld().createItem("minecraft:blaze_rod", 0, 1);
    player.removeItem(item, 1);
    var item = player.getWorld().createItem("minecraft:compass", 0, 1);
    player.removeItem(item, 1);
    var item = player.getWorld().createItem("minecraft:redstone_torch", 0, 1);
    player.removeItem(item, 1);

    API.executeCommand(player.getWorld(), "morph " + player.getUUID());

    // object blockhide
    if (!player.getWorld().getScoreboard().hasObjective("blockhide")) {
        player.getWorld().broadcast("\u00a76检测到没有计分项blockhide,已创建\u00a7oblockhide\u00a7r\u00a76计分项(这是个全局计分项)");
        player.getWorld().getScoreboard().addObjective("blockhide", "dummy");
    };
    if (!player.getWorld().getScoreboard().getObjective("blockhide").hasScore("ready")) {
        player.getWorld().broadcast("\u00a76检测到计分项blockhide没有分数,已创建\u00a7oready\u00a7r\u00a76分数");
        player.getWorld().getScoreboard().getObjective("blockhide").createScore("ready");
    };
    if (!player.getWorld().getScoreboard().getObjective("blockhide").hasScore("wait")) {
        player.getWorld().broadcast("\u00a76检测到计分项blockhide没有分数,已创建\u00a7owait\u00a7r\u00a76分数");
        player.getWorld().getScoreboard().getObjective("blockhide").createScore("wait");
    };
    if (!player.getWorld().getScoreboard().getObjective("blockhide").hasScore("dogamestart")) {
        player.getWorld().broadcast("\u00a76检测到计分项blockhide没有分数,已创建\u00a7odogamestart\u00a7r\u00a76分数");
        player.getWorld().getScoreboard().getObjective("blockhide").createScore("dogamestart");
    };
    if (!player.getWorld().getScoreboard().getObjective("blockhide").hasScore("nextpos")) {
        player.getWorld().broadcast("\u00a76检测到计分项blockhide没有分数,已创建\u00a7onextpos\u00a7r\u00a76分数");
        player.getWorld().getScoreboard().getObjective("blockhide").createScore("nextpos");
    };

    // object other
    if (!player.getWorld().getScoreboard().hasObjective("toolcd")) {
        player.getWorld().broadcast("\u00a76检测到没有计分项toolcd,已创建\u00a7otoolcd\u00a7r\u00a76计分项");
        player.getWorld().getScoreboard().addObjective("toolcd", "dummy");
    };
    if (!player.getWorld().getScoreboard().hasObjective("hica")) {
        player.getWorld().broadcast("\u00a76检测到没有计分项hica,已创建\u00a7ohica\u00a7r\u00a76计分项");
        player.getWorld().getScoreboard().addObjective("hica", "dummy");
    };
    player.removeTag("hurter")
    player.removeTag("hider")
    player.removeTag("visiter")
    global.score_ready = player.getWorld().getScoreboard().getObjective("blockhide").getScore("ready");
    global.score_wait = player.getWorld().getScoreboard().getObjective("blockhide").getScore("wait");
    global.score_dogamestart = player.getWorld().getScoreboard().getObjective("blockhide").getScore("dogamestart");
    global.score_nextpos = player.getWorld().getScoreboard().getObjective("blockhide").getScore("nextpos");
    global.objective_toolcd = player.getWorld().getScoreboard().getObjective("toolcd");
    global.objective_hica = player.getWorld().getScoreboard().getObjective("hica");


    score_ready.setValue(0);
    score_wait.setValue(0);
    score_dogamestart.setValue(0);
    score_nextpos.setValue(0);

    player.getTimers().stop(6);
    player.getTimers().stop(8);
    player.getTimers().stop(9);
};

function interact(event) {
    global.player = event.player;
    if (new Date().getTime() - t > 50) {
        t = new Date().getTime();
        if (player.getMainhandItem().getName() == "minecraft:diamond_sword") {
            if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76右键准备") {
                score_ready.setValue(score_ready.getValue() + 1);
                var item = player.getMainhandItem();
                item.setCustomName("\u00a7r\u00a76右键取消准备");
                item.addEnchantment("sharpness", 0);
            } else if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76右键取消准备") {
                score_ready.setValue(score_ready.getValue() - 1);
                var item = player.getMainhandItem();
                item.setCustomName("\u00a7r\u00a76右键准备");
                item.removeEnchant("sharpness");
            };
            if (score_ready.getValue() == player.getWorld().getAllPlayers().length) {
                player.getWorld().broadcast("\u00a76所有玩家已准备好(" + score_ready.getValue() + "/" + player.getWorld().getAllPlayers().length + ")");
                if (player.getWorld().getAllPlayers().length >= 2) {
                    if (options.noh < player.getWorld().getAllPlayers().length) {
                        score_dogamestart.setValue(1);
                        score_nextpos.setValue(Math.round(Math.random() * (options.sp.length - 1)))
                        var pl = foreach(player.getWorld().getAllPlayers());
                        for (var c = 0; c < options.noh; c++) {
                            var hurter = choice(pl, true);
                            hurter.addTag("hurter");
                            hurter.setPos(options.dt);
                            hurter.message("\u00a76你是 \u00a7c猎人 \u00a76，请等待" + options.nostw + "秒");
                            var item = player.getWorld().createItem("minecraft:diamond_sword", 0, 1);
                            hurter.removeItem(item, 1);
                            objective_toolcd.createScore(hurter.getUUID());
                            objective_hica.createScore(hurter.getUUID());
                        }
                        score_wait.setValue(options.nostw);
                        player.getTimers().start(6, 20, false);
                        foreach(pl, function (i) {
                            var item = player.getWorld().createItem("minecraft:diamond_sword", 0, 1);
                            i.removeItem(item, 1);
                            i.setPos(options.sp[score_nextpos.getValue()].pos);
                            API.executeCommand(i.getWorld(), format("title #{0} title \"\u00a76#{1}\"", [i.getUUID(), options.sp[score_nextpos.getValue()].name]));
                            var block = choice(["minecraft:stone", "minecraft:bedrock", "minecraft:waterlily", "minecraft:glass", "minecraft:grass"])
                            API.executeCommand(i.getWorld(), format("morph #{0} block {Block:\"#{1}\"}", [i.getUUID(), block]));
                            // var testblock = API.getIBlock(i.getWorld, API.getIPos(0, 0, 0))
                            // testblock.setBlock(block);
                            // i.message("\u00a76你伪装成了\u00a7c" + testblock.getDisplayName());
                            i.message("\u00a76你伪装成了\u00a7c" + player.getWorld().createItem(block, 0, 1).getDisplayName());
                            i.addTag("hider");
                            API.executeCommand(i.getWorld(), format('give #{0} minecraft:blaze_rod 1 0 {TRMsMorph:"morphBlock", display:{Name:"\u00a7r\u00a76右键方块变身"}}', [i.getUUID()]));

                        });
                    } else {
                        player.getWorld().broadcast("\u00a76但是猎人不够，游戏无法开始");
                        endgame();
                    }
                } else {
                    player.getWorld().broadcast("\u00a76但是只有一个玩家，游戏无法开始");
                    endgame();
                }

            } else {
                player.getWorld().broadcast("\u00a76玩家准备(" + score_ready.getValue() + "/" + player.getWorld().getAllPlayers().length + ")");
            };
        } else if (checkItem(player.getMainhandItem(), "minecraft:blaze_rod", "TRMsMorph", "morphBlock")) {
            var bannedBlocks = [
                "minecraft:tallgrass",
                "minecraft:double_plant",
                "minecraft:fire",
                "minecraft:barrier",
                "minecraft:water",
                "minecraft:lava",
                "minecraft:redstone_wire",
                "minecraft:standing_sign",
                "minecraft:wall_sign",
                "minecraft:standing_banner",
                "minecraft:wall_banner",
                "minecraft:skull",
            ];
            var facingBlock = player.rayTraceBlock(6, true, false).getBlock();
            if (includes(facingBlock.getName(), bannedBlocks)) {
                player.message("\u00a7c你不能变成此方块");
            } else {
                API.executeCommand(player.getWorld(), format('morph #{0} block {Meta:#{1}b, Block:"#{2}", Name:"block"}', [player.getUUID(), facingBlock.getMetadata(), facingBlock.getName()]));
                try {
                    var bname = player.getWorld().createItem(facingBlock.getName(), facingBlock.getMetadata(), 1).getDisplayName();
                    player.message(format('\u00a76你伪装成了\u00a7c#{0}', [bname]));
                } catch (err) {
                    player.message('\u00a76你伪装成了\u00a7c未知方块');
                };
                player.closeGui();
                player.getTimers().start(7, 0, false);
            };
        } else if (player.getMainhandItem().getName() == "minecraft:compass") {
            if (player.getMainhandItem().getDisplayName() == "\u00a7r\u00a76获取最近方块距离") {
                var item = player.getWorld().createItem("minecraft:compass", 0, 1);
                player.removeItem(item, 1);
                var distance_list = [];
                foreach(player.getWorld().getAllPlayers(), function (i) {
                    if (i.hasTag("hider")) {
                        distance_list.push(player.getPos().distanceTo(i.getPos()));
                    };
                });
                player.message(format("\u00a76距离你(#{0}, #{1}, #{2})最近的方块位于 \u00a7c#{3} \u00a76格外", [Math.round(player.getX()), Math.round(player.getY()), Math.round(player.getZ()), Math.min.apply(null, distance_list).toFixed(2)]));
                objective_toolcd.getScore(player.getUUID()).setValue(options.tcdt)
                player.getTimers().start(8, 20, false);
            };
        };
    };
};

function attack(event) {
    global.player = event.player;
    if (event.type == 1) {
        if (event.target.getType() == 1) {
            if (player.hasTag("hurter")) {
                if (event.target.hasTag("hider")) {
                    player.getWorld().broadcast("\u00a7c" + event.target.getName() + " \u00a76被\u00a7c " + player.getName() + " \u00a76击杀，请大家小心")
                    event.target.removeTag("hurter")
                    event.target.removeTag("hider")
                    event.target.addTag("visiter")
                    event.target.setGamemode(3);
                    var isendgame = true;
                    foreach(player.getWorld().getAllPlayers(), function (i) {
                        if ((!i.hasTag("visiter")) && (!i.hasTag("hurter"))) {
                            isendgame = false;
                        };
                    });
                    if (isendgame) {
                        player.getWorld().broadcast("\u00a76所有方块都被找到，游戏结束")
                        endgame();
                    };
                } else {
                    player.message("\u00a76对方不是方块，不能击杀")
                }
            } else {
                player.message("\u00a76你不是猎人，不能击杀")
            }

        };
    };
};

function keyPressed(event) {
    global.player = event.player;
    if (event.key == 45) {
        player.setPosition(player.getBlockX() + 0.5, player.getBlockY(), player.getBlockZ() + 0.5);
    }
}

function timer(event) {
    if (event.id == 6) {
        score_wait.setValue(score_wait.getValue() - 1);
        foreach(player.getWorld().getAllPlayers(), function (i) {
            if (i.hasTag("hurter")) {
                API.executeCommand(i.getWorld(), "title " + i.getUUID() + " title \"\u00a76" + score_wait.getValue() + "\"")
            } else {
                API.executeCommand(i.getWorld(), "title " + i.getUUID() + " actionbar \"\u00a76" + score_wait.getValue() + "\"")
            };
        });
        if (score_wait.getValue() <= 0) {
            player.getWorld().broadcast("\u00a76猎人已出场");
            player.getTimers().start(9, 0, false);
            foreach(player.getWorld().getAllPlayers(), function (i) {
                if (i.hasTag("hurter")) {
                    i.message("\u00a76时间到，去找出伪装成方块的玩家吧");
                    i.setPos(options.sp[score_nextpos.getValue()].pos);
                    API.executeCommand(i.getWorld(), format("title #{0} title \"\u00a76#{1}\"", [i.getUUID(), options.sp[score_nextpos.getValue()].name]));
                    var item = player.getWorld().createItem("minecraft:compass", 0, 1);
                    item.setCustomName("\u00a7r\u00a76获取最近方块距离");
                    i.giveItem(item);
                    API.executeCommand(i.getWorld(), format("give #{0} minecraft:redstone_torch 1 0 {essence:\"hica_sensor\"}", [i.getUUID()]))
                };
            });
        } else {
            if (score_dogamestart.getValue() == 1) {
                player.getTimers().start(6, 20, false);
            };
        };
    } else if (event.id == 7) {
        player.closeGui();
    } else if (event.id == 8) {
        objective_toolcd.getScore(player.getUUID()).setValue(objective_toolcd.getScore(player.getUUID()).getValue() - 1);
        API.executeCommand(player.getWorld(), format("title #{0} actionbar \"\u00a76工具冷却时间: \u00a7c#{1}\"", [player.getUUID(), objective_toolcd.getScore(player.getUUID()).getValue()]));
        if (objective_toolcd.getScore(player.getUUID()).getValue() <= 0) {
            player.message("\u00a76冷却时间已到，重新获得工具");
            var item = player.getWorld().createItem("minecraft:compass", 0, 1);
            item.setCustomName("\u00a7r\u00a76获取最近方块距离");
            player.giveItem(item);
        } else {
            if (score_dogamestart.getValue() == 1) {
                player.getTimers().start(8, 20, false);
            };
        };
    } else if (event.id == 9) {
        foreach(player.getWorld().getAllPlayers(), function (i) {
            foreach(i.getInventory().getItems(), function (j) {
                if (checkItem(j, "minecraft:redstone_torch", "essence", "hica_sensor")) {
                    var distance_list = [];
                    foreach(player.getWorld().getAllPlayers(), function (k) {
                        if (k.hasTag("hider")) {
                            distance_list.push(i.getPos().distanceTo(k.getPos()));
                        };
                    });
                    var min_distance = Math.min.apply(null, distance_list);
                    var diff = objective_hica.getScore(i.getUUID()).getValue() / 1000 - min_distance;
                    var power = 0;
                    if (Math.round(diff * 1000) / 1000 <= 0) {
                        power = 0;
                        j.removeEnchant("sharpness")
                    } else if (diff > 2) {
                        if (!j.hasEnchant("sharpness")) {
                            j.addEnchantment("sharpness", 1)
                        };
                        power = 50;
                        i.playSound("minecraft:block.note.flute", 1, (diff / 2) * 1)
                    } else {
                        if (!j.hasEnchant("sharpness")) {
                            j.addEnchantment("sharpness", 1)
                        };
                        power = Math.round((diff / 2) * 50);
                        i.playSound("minecraft:block.note.flute", (diff / 2) * 1, 1)
                    };
                    j.setCustomName(format("\u00a7r\u00a76虚卡传感器\u00a7e#{0}\u00a7f#{1}", [repeat("|", power), repeat("|", 50 - power)]));
                    objective_hica.getScore(i.getUUID()).setValue(min_distance * 1000);
                };
            });
        });
        if (score_dogamestart.getValue() == 1) {
            player.getTimers().start(9, 5, false);
        };
    };
};

function logout(event) {
    if (score_dogamestart.getValue() == 1) {
        if (player.hasTag("hurter")) {
            player.addTag("hurterd");
        } else if (player.hasTag("hider")) {
            player.addTag("hiderd");
        };
        var nohurter = true;
        foreach(player.getWorld().getAllPlayers(), function (i) {
            if (i.hasTag("hurter") && i.getUUID() != player.getUUID()) {
                nohurter = false;
            };
        });
        if (nohurter) {
            player.getWorld().broadcast("\u00a76猎人退出，游戏结束");
            endgame();
        } else {
            var nohider = true;
            foreach(player.getWorld().getAllPlayers(), function (i) {
                if (i.hasTag("hider") && i.getUUID() != player.getUUID()) {
                    nohider = false;
                };
            });
            if (nohider) {
                player.getWorld().broadcast("\u00a76方块退出，游戏结束");
                endgame();
            };
        };
    };
};

function login(event) {
    if (score_dogamestart.getValue() == 0) {
        if (player.hasTag("hurterd")) {
            player.getWorld().broadcast(format("\u00a76猎人 \u00a7c#{0} \u00a76回来了，但是游戏已经结束", [player.getName()]))
            var item = player.getWorld().createItem("minecraft:diamond_sword", 0, 1);
            item.setCustomName("\u00a7r\u00a76右键准备");
            player.removeItem(item, 1);
            player.giveItem(item);
            player.removeTag("hurterd");
            player.removeTag("hurter");
            player.removeTag("hider");
            player.removeTag("visiter");
            player.setGamemode(options.dgm);
            player.setPos(options.dt)
            API.executeCommand(player.getWorld(), "morph " + player.getUUID());

        } else if (player.hasTag("hiderd")) {
            player.getWorld().broadcast(format("\u00a76方块 \u00a7c#{0} \u00a76回来了，但是游戏已经结束", [player.getName()]))
            var item = player.getWorld().createItem("minecraft:diamond_sword", 0, 1);
            item.setCustomName("\u00a7r\u00a76右键准备");
            player.removeItem(item, 1);
            player.giveItem(item);
            player.removeTag("hiderd");
            player.removeTag("hurter");
            player.removeTag("hider");
            player.removeTag("visiter");
            player.setGamemode(options.dgm);
            player.setPos(options.dt)
            API.executeCommand(i.getWorld(), "morph " + i.getUUID());

        }
    }
}