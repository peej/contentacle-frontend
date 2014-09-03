define(["jquery"], function ($) {
    return {
        render: function (template, data) {
            $("#menu").html(JST["menu.html"](data));
            if (JST[template]) {
                $("#body").html(JST[template](data));
            }
        }
    };
});