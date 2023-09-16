import {generateID, globals} from "./Init.js";
import {updateZIndex} from "./ZIndexManager.js";
import {windowStatus} from "./EnumHelper.js";
import {runIfDefined} from "./Util.js";

export class Window implements Element {
    get opacity() {
        return this._opacity;
    }

    /**
     * 设置窗口透明度
     * @param value
     */
    set opacity(value) {
        this._opacity = value;
    }

    get eventHandler() {
        this.#checkDestroy()
        return this._eventHandler;
    }

    get status() {
        this.#checkDestroy()
        return this._status;
    }

    get isHidden() {
        this.#checkDestroy()
        return this._hidden;
    }

    get $element() {
        return this._$element;
    }

    set $element(value) {
        this._$element = value;
    }

    get id() {
        return this._id;
    }

    get position() {
        this.#checkDestroy()
        return this._position;
    }

    set position(value) {
        this.#checkDestroy()
        this._position = value;
        updateZIndex()
    }

    set positionX(value) {
        this.#checkDestroy()
        this.position[0] = value
        updateZIndex()
    }

    get positionX() {
        this.#checkDestroy()
        return this.position[0]
    }

    set positionY(value) {
        this.#checkDestroy()
        this.position[1] = value
        updateZIndex()
    }

    get positionY() {
        this.#checkDestroy()
        return this.position[1]
    }

    get minimizedOrHidden() {
        this.#checkDestroy()
        return this._minimizedOrHidden;
    }

    get isDestroy() {
        return this._isDestroy;
    }

    get title() {
        this.#checkDestroy()
        return this._title;
    }

    /**
     *
     * @param {string}value
     */
    set title(value) {
        this.#checkDestroy()
        this._title = value;
        updateZIndex()
    }

    get height() {
        this.#checkDestroy()
        return this._height;
    }

    set height(value) {
        this.#checkDestroy()
        this._height = value;
        updateZIndex()
    }

    get width() {
        this.#checkDestroy()
        return this._width;
    }

    set width(value) {
        this.#checkDestroy()
        this._width = value;
        updateZIndex()
    }

    constructor(width = 300, height = 200, title = "") {
        this._width = width;
        this._height = height;
        this._position = [100, 100];
        this._title = title;
        this._isDestroy = false;
        this._minimizedOrHidden = false;
        this._hidden = false;
        this._status = windowStatus.RESTORED;
        this._$element = $("<div />")
        this._innerHTML = ""
        this._id = generateID()
        this._opacity = 1.0
        this._eventHandler = {
            onCloseButtonClick: undefined,
            onClick: undefined,
            onRightClick: undefined,
            onDrag: undefined,
            /**
             * 在最大化按钮被点击时触发的函数。
             * @type function(Window, number)|undefined
             *
             * @param {Window}windowObject 触发事件的窗口对象
             * @param {number}type 事件类型
             */
            onMaximizeButtonClick: undefined,
            /**
             * 在最小化按钮被点击时触发的函数。
             * @type function(Window, number)|undefined
             */
            onMinimizeButtonClick: undefined,
            /**
             * 在向下还原按钮被点击时触发的函数。
             * @type function(Window, number)|undefined
             */
            onRestoreButtonClick: undefined,
            /**
             * 在最大化时触发的函数。
             * @type function(Window, number)|undefined
             */
            onMaximize: undefined,
            /**
             * 在最小化时触发的函数。
             * @type function(Window, number)|undefined
             */
            onMinimize: undefined,
            /**
             * 在向下还原时触发的函数。
             * @type function(Window, number)|undefined
             */
            onRestore: undefined,
            onChangeSize: undefined,
            onHide: undefined,
            onShow: undefined,
            onDestroy: undefined,
            onMouseMove: undefined,
            onSetForeground: undefined,
        }

        globals.allWindows[this.id] = this

    }

    destroy() {
        this.#checkDestroy()
        runIfDefined(this.eventHandler.onDestroy, this)
        this._isDestroy = true;
        updateZIndex()
    }

    maximize() {
        this.#checkDestroy()
        this._status = windowStatus.MAXIMIZED
        updateZIndex()
    }

    restore() {
        this.#checkDestroy()
        this._status = windowStatus.RESTORED
        updateZIndex()
    }

    minimize() {
        this.#checkDestroy()
        this._status = windowStatus.MINIMIZED
        updateZIndex()
    }

    /**
     * 隐藏窗口，用于不销毁窗口的关闭。
     */
    hide() {
        this.#checkDestroy()
        this._minimizedOrHidden = true
        updateZIndex()
    }

    /**
     * 显示窗口（重新打开隐藏的窗口，保持原来的窗口大小）。
     */
    show() {
        this.#checkDestroy()
        this._minimizedOrHidden = false
        updateZIndex()

    }

    setForeground() {
        this.#checkDestroy()
        if (this.isHidden) {
            this.show()
        }
        if (this.status === windowStatus.MINIMIZED) {
            this.restore()
        }

    }

    /**
     * 始终显示在最顶层
     */
    setPrior() {
        this.#checkDestroy()

    }

    /**
     * 显示消息框
     *
     * @param title
     * @param content
     * @param type
     * @param option
     */
    messageBox(title, content, type, option) {
        this.#checkDestroy()

    }

    /**
     * 显示子窗口
     *
     * @param {Window}window
     */
    showSubWindow(window) {
        this.#checkDestroy()

    }

    #checkDestroy() {
        if (this.isDestroy) {
            throw new WindowIsAlreadyDestroyException("The window is already destroyed.")
        }
    }

}
