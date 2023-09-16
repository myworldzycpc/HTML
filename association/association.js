var HTMLEscape = {

    "HTMLEncode":function(html){
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    "HTMLDecode":function(text) { 
        var temp = document.createElement("div"); 
        temp.innerHTML = text; 
        var output = temp.innerText || temp.textContent; 
        temp = null; 
        return output; 
    }
};
var Uio = {
    "init":function(){
        $("body").attr({"class":"inited"});
    },
    "print":function(text, options={}){
        tag=options.tag;
        style=options.style;
        single=options.single;
        if ($("body").attr("class") == "inited"){
            if (single){
                $textele = $("<div />").html(HTMLEscape.HTMLEncode(text));       
            } else {
                $textele = $("<span />").html(HTMLEscape.HTMLEncode(text));
            };
            if (style){
                $textele.css(style);
            };
            if (tag){
                $textele.attr({"class":tag});
            };
            $("body").append($textele);
        };
    },
    "input":function(text, action, options={}){
        tag=options.tag;
        style=options.style;
        single=options.single;
        if ($("body").attr("class") == "inited"){
            if (single){
                $textele = $("<div />").html(HTMLEscape.HTMLEncode(text));       
            } else {
                $textele = $("<span />").html(HTMLEscape.HTMLEncode(text));
            };
            if (style){
                $textele.css(style);
            };
            if (tag){
                $textele.attr({"class":tag});
            };
            $input = $("<input />");
            $input.attr({"type":"text"});
            $textele.append($input);
            $("body").append($textele);
            $input.focus()
            $input.bind("keypress",function(){
                if (event.keyCode == 13){
                    $(this).parent().append($input.val());
                    $(this).hide();
                    action($input.val());
                };
            });
        };
    },
};
var dynamicLoading = {
    css: function(path) {
        if (!path || path.length === 0) {
            alert('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function(path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
};
