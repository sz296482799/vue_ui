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

    //Appliction.tiggerFunc("changeTest", "bbbb");
});


function TestActivity() {
    this.extends = Vue_Contorller.build(new Activity());
}

TestActivity.prototype.onBuild = function() {

    Vue_Contorller.addVar(this, "teststr",  "zshang");

    Vue_Contorller.addItem(this, 'button1', new Button("test1", null));//onMove onClick
    Vue_Contorller.addItem(this, 'button2', new Button("test2", null));
    Vue_Contorller.addItem(this, 'button3', new Button("test3", null));
    Vue_Contorller.addElement(this, '<input type="text"> </input>');
}

TestActivity.prototype.onCreate = function() {
    var vue = this;

    vue.getItem('button1').itext = vue.teststr;
}

function TestActivity2() {
    this.extends = Vue_Contorller.build(new Activity());
}

TestActivity2.prototype.onBuild = function() {

    Vue_Contorller.addVar(this, "teststr",  "ggggggg");

    Vue_Contorller.addItem(this, 'button11', new Button("test11", null));
    Vue_Contorller.addItem(this, 'button22', new Button("test22", null));
    Vue_Contorller.addItem(this, 'button33', new Button("test33", null));
    Vue_Contorller.addElement(this, '<input type="text">{{teststr}}</input>');
}

TestActivity2.prototype.onCreate = function() {
    Appliction.tiggerFunc("changeTest", "cccc");
}