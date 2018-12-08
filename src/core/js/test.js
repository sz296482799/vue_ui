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

    Appliction.addActivity("/test3", {url:"core/js/test.html"});

    Appliction.start("app");

    //Appliction.tiggerFunc("changeTest", "bbbb");
});

function LineGroupView() {
    this.extends = Vue_Contorller.build(new LinearLayout("horizontal"));
}

LineGroupView.prototype.onBuild = function() {
    
    Vue_Contorller.addItem(this, 'button1', new Button("test1", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));//onMove onClick
    Vue_Contorller.addItem(this, 'button2', new Button("test2", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));
    Vue_Contorller.addItem(this, 'button3', new Button("test3", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));
}

function TestActivity() {
    this.extends = Vue_Contorller.build(new LinearActivity());
}

TestActivity.prototype.onBuild = function() {

    Vue_Contorller.addVar(this, "teststr", "zshang");

    var liner1 = new LinearLayout("horizontal");
    var liner2 = new LinearLayout("horizontal");
    var liner3 = new LinearLayout("horizontal");

    Vue_Contorller.addItem(liner1, 'button1', new Button("test1", null, {
        click: function(e) {
            this.setText(this.getText() + "_click");
        },
    }));//onMove onClick
    Vue_Contorller.addItem(liner1, 'button2', new Button("test2", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));
    Vue_Contorller.addItem(liner1, 'button3', new Button("test3", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));

    Vue_Contorller.addItem(liner2, 'button1', new Button("test1", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));//onMove onClick
    Vue_Contorller.addItem(liner2, 'button2', new Button("test2", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));
    Vue_Contorller.addItem(liner2, 'button3', new Button("test3", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));

    Vue_Contorller.addItem(liner3, 'button1', new Button("test1", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));//onMove onClick
    Vue_Contorller.addItem(liner3, 'button2', new Button("test2", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));
    Vue_Contorller.addItem(liner3, 'button3', new Button("test3", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));


    Vue_Contorller.addItem(this, 'line1', liner1);
    Vue_Contorller.addItem(this, 'line2', liner2);
    Vue_Contorller.addItem(this, 'line3', liner3);
    Vue_Contorller.addElement(this, '<input type="text"> </input>');
}

TestActivity.prototype.onCreate = function() {
    var vue = this;

    vue.getItem('line2').tryFocus();
}

function TestActivity2() {
    this.extends = Vue_Contorller.build(new LinearActivity("horizontal"));
}

TestActivity2.prototype.onBuild = function() {

    Vue_Contorller.addVar(this, "teststr",  "ggggggg");

    Vue_Contorller.addItem(this, 'button11', new Button("test11", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));
    Vue_Contorller.addItem(this, 'button22', new Button("test22", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));
    Vue_Contorller.addItem(this, 'button33', new Button("test33", null, {
        click: function(e) {
            this.tryFocus();
        },
    }));
    Vue_Contorller.addElement(this, '<input type="text">{{teststr}}</input>');
}

TestActivity2.prototype.onCreate = function() {
    Appliction.tiggerFunc("changeTest", "cccc");
}