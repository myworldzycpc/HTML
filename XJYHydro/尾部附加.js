const DARK = document.getElementsByClassName("theme--dark").length !== 0;
const script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://code.jquery.com/jquery-1.12.4.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
// 深色浅色区别
if (DARK) {
    document.getElementsByClassName("main")[0].style = "background-image: url('/file/2/wallpaper1667618255557.png'); background-repeat: no-repeat;background-attachment: fixed;background-position: center;background-size: cover;";
} else {
    document.getElementsByClassName("main")[0].style = "background-image: url('/file/2/wallpaper1667618255557.jpg'); background-repeat: no-repeat;background-attachment: fixed;background-position: center;background-size: cover;";
}
// 标题点击定位
headerList = [];
for (const i of [1, 2, 3, 4, 5, 6]) {
    headerList.push(...document.getElementsByTagName(`h${i}`));
}
for (const e of headerList) {
    if (e.id) {
        e.innerHTML = `<a class="directLinkTitle" style="color: ${DARK ? "white" : "black"}" href="#${e.id}" title="点击以复制定位链接 (#)">${e.innerHTML}</a><span class="directLink">&nbsp;#</span>`;
    }
}
// 样式表
document.getElementsByTagName("head")[0].innerHTML += `<style>
    .directLink:hover {
        text-decoration: none
    }

    .directLink {
        user-select: none;
        text-decoration: none;
        transition: 0.5s;
        opacity: 0;
        color: orange
    }

    .directLinkTitle:hover + .directLink {
        opacity: 1;
        transition: 0.5s
    }

    .backToTop {
        background-color: ${DARK ? "rgb(50, 51, 52)" : "white"};
        z-index: 999;
        position: fixed;
        height: 70px;
        width: 70px;
        right: 20px;
        bottom: 20px;
        box-shadow: ${DARK ? "0 0.375rem 1.375rem rgba(0, 0, 0, 0.5)" : "0 0.375rem 1.375rem rgba(175, 194, 201, 0.5)"};
        transition: 0.2s;
        cursor: pointer;
        user-select: none;
        border-radius: 10px
    }

    .backToTop:active {
        filter: brightness(${DARK ? "1.7" : "0.7"})
    }

    .section, img {
        border-radius: 10px
    }

    .button {
        border-radius: 5px
    }

    ${DARK ? "img {filter: brightness(0.75)}" : ""}
    
    .wanghaoliang {
        color: orange;
        transition: 0.5s;
        cursor: pointer;
    }

    .wanghaoliang:hover {
        text-decoration: underline
    }

    mark {
        background-color: rgba(0, 128, 255, 0.5);
        border-bottom: none;
        border-radius: 5px;
        padding: 2px 5px;
    }
</style>`;
// 回到顶部
document.getElementsByTagName("body")[0].innerHTML += `<div class="backToTop" onclick="window.scrollTo({'top': 0})"><div style="position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)">回到<br>顶部</div></div>`;
// 页尾信息以及友情链接
const footerHtml = `
      <div class="medium-3 large-2 columns footer__category expandable">
        <h1>
          状态
          <span class="expand-icon">
            <span class="icon icon-expand_more"></span>
          </span>
        </h1>
        <div class="footer__category__expander"><ul class="footer__category__list">
          <li class="footer__category__item"><a href="/record">评测队列</a></li>
          <li class="footer__category__item"><a href="/status">服务状态</a></li>
        </ul></div>
      </div>
      <div class="medium-3 large-2 columns footer__category expandable">
        <h1>
          开发
          <span class="expand-icon">
            <span class="icon icon-expand_more"></span>
          </span>
        </h1>
        <div class="footer__category__expander"><ul class="footer__category__list">
          <li class="footer__category__item"><a href="https://github.com/hydro-dev/Hydro" target="_blank">开源</a></li>
          <li class="footer__category__item"><a href="/api">API</a></li>
        </ul></div>
      </div>
      <div class="medium-3 large-2 columns footer__category expandable">
        <h1>
          支持
          <span class="expand-icon">
            <span class="icon icon-expand_more"></span>
          </span>
        </h1>
        <div class="footer__category__expander"><ul class="footer__category__list">
          <li class="footer__category__item"><a href="/wiki/help">帮助</a></li>
          <li class="footer__category__item"><a href="/wiki/about#contact">QQ 群</a></li>
        </ul></div>
      </div>
      <div class="medium-3 large-2 columns footer__category expandable end">
        <h1>
          友情链接
          <span class="expand-icon">
            <span class="icon icon-expand_more"></span>
          </span>
        </h1>
        <div class="footer__category__expander"><ul class="footer__category__list">
          <li class="footer__category__item"><a href="http://112.253.31.18:8213">鞠宪庆的 XJYOJ</a></li>
          <li class="footer__category__item"><a href="https://myworldzycpc.github.io">myworldzycpc 的网站</a></li>
          <li class="footer__category__item"><a href="tencent://message/?uin=3554503496&Site=&Menu=yes">myworldzycpc 的 QQ</a></li>
          <li class="footer__category__item"><a href="https://zqy.ac.cn">Acos_X 的个人站点</a></li>
          <li class="footer__category__item"><a href="https://1638230566.github.io/">拿起失乐园的屑 CENSORED 的网站</a></li>
          <li class="footer__category__item"><hr></li>
          <li class="footer__category__item" style="font-weight: bold; color: black; text-align: center"><a href="https://oj.zqy.ac.cn/discuss/6368e62ddaca4b03fdf6c603" style="color: orange">+ 友链征集</a></li>
        </ul></div>
      </div>`;
document.querySelector("#panel > div.footer > div > div > div.row.footer__links").innerHTML = footerHtml;
// for (const e of document.getElementsByTagName("img")) {
//     e.onmousedown = function (event) {
//         if (event.button === 1) {
//         }
//     };
// }
script.onload = function () {
    // 王昊亮
    $("p,h1,h2,h3,h4,h5,h6,span").each(function () {
        const $this = $(this);
        $this.html($this.html().replaceAll("王昊亮", `<span onclick="window.location.href='/user/10'" class="wanghaoliang">王昊亮</span>`));
    });
    // 排名显示
    if (String(window.location).search("ranking") !== -1) {
        $("tbody > tr:nth-child(1)").css({"border-bottom": "1px solid gray"});
    }
    // 图片放大
    $("img").mousedown(function (event) {
        if (event.button === 1) {
            const $this = $(this);
            const newTab = window.open();
            newTab.document.write(`<body style="margin: 0" onclick="window.close();"><div style="position: fixed; width: 100%; height: 100%; filter: brightness(0.5); background-image: url('https://oj.zqy.ac.cn/file/2/wallpaper1667618255557.jpg');background-repeat: no-repeat;background-attachment: fixed;background-position: center;background-size: cover;"></div><img src="${$this.attr("src")}" style="background-color: rgba(255, 255, 255, 0.5); box-shadow: 5px 5px 30px white; border: 2px solid white; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%)" alt="${$this.attr("alt") || ""}"></body>`);
        }
    });
    // 内嵌html
    $("code.language-htmlContent, code.language-htmlcontent").each(function () {
        const $this = $(this);
        const $pre = $this.parent();
        $pre.after($this.text());
        $pre.remove();
    });
    // 双标签
    const EXTRA_BADGES = {
        2: [{foreground: "#FFFFFF", background: "#9a50b3", content: "Hoshino Ai"}]
    };
    for (const uid in EXTRA_BADGES) {
        for (const badge of EXTRA_BADGES[uid]) {
            $(`a[href="/user/${uid}"]`).parent().append(`<span class="user-profile-badge v-center" style="background-color:${badge.background};color:${badge.foreground}">${badge.content}</span>`);
        }
    }


};
