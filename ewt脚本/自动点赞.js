$("div").each(function () {
    $this = $(this);
    if ($this.attr("class") && $this.attr("class").startsWith("agree-")) {
        $this.children().click();
    }
})