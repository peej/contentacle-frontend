define(["jquery"], function ($) {
    return {
        render: function (template, data) {
            $("#menu").html(JST["menu.html"](data));
            $("#body").html(JST[template](data));
        }
    };
});