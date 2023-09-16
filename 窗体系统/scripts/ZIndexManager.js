import {globals} from "./Init.js";
import {windowHtml} from "./Template.js";
import {windowStatus} from "./EnumHelper.js";
import {DEBUG_MODE} from "./Reference.js";

export function updateZIndex() {
    globals.zIndex = globals.zIndex.filter(function (item) {
        return !item.isDestroy && !item.minimizedOrHidden
    })
    globals.zIndex.push(...Object.values(globals.allWindows).filter(function (item) {
        return !(item in globals.zIndex) && !item.isDestroy && !item.minimizedOrHidden
    }))

    globals.hiddenWindows = globals.hiddenWindows.filter(function (item) {
        return !item.isDestroy && item.isHidden
    });
    globals.hiddenWindows.push(...Object.values(globals.allWindows).filter(function (item) {
        return !(item in globals.hiddenWindows) && !item.isDestroy && item.isHidden
    }))

    globals.taskBar = globals.taskBar.filter(function (item) {
        return !item.isDestroy && !item.isHidden
    })
    globals.taskBar.push(...Object.values(globals.allWindows).filter(function (item) {
        return !(item in globals.taskBar) && !item.isDestroy && !item.isHidden
    }))

    if (DEBUG_MODE) {
        globals.$debug.find("[data-reference=zIndex]").text(JSON.stringify(globals.zIndex))
        globals.$debug.find("[data-reference=hiddenWindows]").text(JSON.stringify(globals.hiddenWindows))
        globals.$debug.find("[data-reference=taskBar]").text(JSON.stringify(globals.taskBar))
        globals.$debug.find("[data-reference=allWindows]").text(JSON.stringify(globals.allWindows))

    }

    $(".window").remove();
    for (const i in globals.zIndex) {
        const windowObject = globals.zIndex[i]
        const $windowDiv = $(windowHtml);
        $("body").append($windowDiv)
        $windowDiv.find("[data-reference=title]").html(windowObject.title)
        $windowDiv.css({
            "position": "fixed",
            "opacity": windowObject.opacity,
        })
        if (windowObject.status === windowStatus.MAXIMIZED) {
            $windowDiv.find("[data-reference=title]").removeClass("glyphicon-unchecked").addClass(".glyphicon-resize-small")
            $windowDiv.css({
                "left": "0",
                "top": "0",
                "height": "100%",
                "width": "100%"
            })
        } else {

        }
    }
}
