/**
 * 使用此函数来把页面从侧面移入。
 * @param {jQuery} $element body唯一的下一级元素，必须包括所有页面元素（包括container），不可以是body。
 * @param {number} time 总共需要的时间。
 * @author myworldzycpc
 * @example <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>Title</title>
     <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
     <script src="Sideslip.js"></script>
     <script>
         $(function () {
            sideslip($("#content"), 1000);
         })
     </script>
 </head>
 <body>
 <div id="content">
     <h1>test</h1>
     <h2>test2</h2>

 </div>
 </body>
 </html>
 * @requires jQuery
 */
function sideslip($element, time) {
    $("body").show();
    $element.css({"opacity": "0", "position": "fixed", "left": "50%", "width": "100%"})
    $element.animate({"opacity": "1", "left": "0"}, time, function () {
        $element.css({"position": "static"});
    });
}
