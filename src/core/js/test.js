'use strict'

$(document).ready(function() {

    $("body").css({
        "display": "flex",
        "margin": "0px",
    });

    Vue.use(Vuex);

    Appliction.setDatabase("appliction", {teststr: "test"});
    Appliction.addFunction("changeTest", "appliction", function(appliction, str) {
        appliction.teststr = str;
    });

    Appliction.addActivity("/", '<router-link to="/home">home</router-link>');

    var home = new HomeActivity();
    Appliction.addActivity("/home", home);
    Appliction.start("app");

    //Appliction.tiggerFunc("changeTest", "bbbb");
});



