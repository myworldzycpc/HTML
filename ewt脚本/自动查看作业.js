$("div").each(function () {
    $this = $(this);
    if ($this.attr("class") && $this.attr("class").startsWith("homework-item-")) {
        $this.click();
        $this.remove();
    }
})