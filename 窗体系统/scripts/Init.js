import {Window} from "./Window.js";
import {DEBUG_MODE} from "./Reference.js";
import {debugHTML} from "./Template.js";
import {updateZIndex} from "./ZIndexManager.js";

if (typeof jQuery == "undefined") {
    window.onload = function () {
        document.getElementsByTagName("body")[0].innerHTML = `<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 10px; background-color: red; color: white; padding: 10px; font-weight: bold">需要 jQuery ，请在导入此脚本之前导入 jQuery 。</div>`
    }
    throw new Error("\njQuery is required, please import it in the HTML before import this script.\n需要jQuery，请在导入此脚本之前导入jQuery。");
}

export const globals = {}
/**
 * 窗口的显示顺序（最后一个窗口可能为活跃窗口）
 * @type {Window[]}
 */
globals.zIndex = []

/**
 * 前置窗口的显示顺序（最后一个窗口可能为活跃窗口）
 * @type {Window[]}
 */
globals.priorZIndex = []

/**
 * 任务栏
 * @type {Window[]}
 */
globals.taskBar = []

/**
 * 隐藏的窗口
 * @type {Window[]}
 */
globals.hiddenWindows = []

/**
 * 窗口的显示顺序（最后一个窗口为活跃窗口）
 * @type {Object.<number, Window>}
 */
globals.allWindows = {}
globals.lastID = 0

/**
 * 活跃的窗口
 * @type {?Window}
 */
globals.activeWindow = null

/**
 * 生成一个不重复的ID（注意：每次生成的ID都不固定）
 *
 * @returns {number}
 */
export function generateID() {
    return globals.lastID++;
}

/**
 * 通过id获取窗口
 * @param {number}id
 * @returns {Window}获取到的窗口
 */
export function getWindowByID(id) {
    return globals.allWindows[id]
}

globals.$debug = $(debugHTML);
$("body").append(globals.$debug);
globals.$debug.css({
    "position": "fixed",
    "left": "5px",
    "right": "5px",
})

if (!DEBUG_MODE) {
    globals.$debug.hide()
}

updateZIndex()