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
    Appliction.addActivity("/", '<router-link to="/test">test</router-link>');
    Appliction.addActivity("/test", new TestActivity());

    var test2 = new TestActivity2();
    Appliction.addActivity("/test2", test2);
    Appliction.start("app");

    Appliction.tiggerFunc("changeTest", "bbbb");
});


function TestActivity() {
    Activity.call(this);
}
extend(TestActivity, Activity);

TestActivity.prototype.onBuild = function() {
    this.variables.teststr = "zshang";
    this.addItem('button1', new Button("test1", null));//onMove onClick
    this.addItem('button2', new Button("test2", null));
    this.addItem('button3', new Button("test3", null));
    this.addElement('<input type="text"> </input>');
}

TestActivity.prototype.onCreate = function() {
    var vue = this;

    vue.getItem('button1').itext = vue.teststr;
}

function TestActivity2() {
    Activity.call(this);
}
extend(TestActivity2, Activity);

TestActivity2.prototype.onBuild = function() {
    this.variables.teststr = "ggggggg";
    this.addItem('button11', new testButton("test11", null));
    this.addItem('button22', new Button("test22", null));
    this.addItem('button33', new Button("test33", null));
    this.addElement('<input type="text">{{teststr}}</input>');
}

TestActivity2.prototype.onCreate = function() {
    Appliction.tiggerFunc("changeTest", "cccc");
}