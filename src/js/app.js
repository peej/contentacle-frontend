define(["jquery", "backbone", "./router"], function ($, Backbone, Router) {
    var router = new Router();
    Backbone.history.start({
        pushState: true
    });

    $(document).on("click", "a[href^='/']", function(event) {
        var href = $(event.currentTarget).attr('href')

        // Allow shift+click for new tabs, etc.
        if(!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            event.preventDefault();
            router.navigate(href, {
                trigger: true
            });
            return false
        }
    });
});