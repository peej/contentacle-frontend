define(["jquery", "backbone", "viewport"], function ($, Backbone, Viewport) {
    return Backbone.Router.extend({
        routes: {
            ":user": "user",
            ":user/:repo": "repo",
            ":user/:repo/:branch": "branch",
            ":user/:repo/:branch/documents": "documents",
            ":user/:repo/:branch/documents/*document": "document",
            ":user/:repo/:branch/commits": "commits",
            ":user/:repo/:branch/commits/:sha": "commit",
            "*anything": "default"
        },
        user: function (user) {
            Viewport.render("hello.html", {
                hello: user
            });
        },
        default: function () {
            Viewport.render("404.html");
        }
    });
});