const script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://code.jquery.com/jquery-1.12.4.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
script.onload = function () {
    $("code.language-htmlContent").each(function () {
        const $this = $(this);
        const $pre = $this.parent();
        $pre.after($this.text());
        $pre.remove();
    });
};

