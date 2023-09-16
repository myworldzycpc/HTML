function tpshow(elem) {
    $(`${elem}:hidden`).slideDown(200, function () {
        $(elem).fadeTo(200, 1);
    });
};
function tphide(elem) {
    $(`${elem}:visible`).fadeTo(200, 0, function () {
        $(elem).slideUp(200);
    });
};

