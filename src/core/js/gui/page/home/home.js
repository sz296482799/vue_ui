'use strict'

/*var home_config = [
    [
        {name: "aaaa1"},
        {name: "bbb"},
        {name: "ccccc"},
        {name: "dd"},
        {name: "eeeeeee"},
        {name: "f"}
    ],
    [
        {name: "aaaa2"},
        {name: "bbb"},
        {name: "ccccc"},
        {name: "dd"},
        {name: "eeeeeee"},
        {name: "f"}
    ],
    [
        {name: "aaaa3"},
        {name: "bbb"},
        {name: "ccccc"},
        {name: "dd"},
        {name: "eeeeeee"},
        {name: "f"}
    ],
    [
        {name: "aaaa4"},
        {name: "bbb"},
        {name: "ccccc"},
        {name: "dd"},
        {name: "eeeeeee"},
        {name: "f"}
    ],
    [
        {name: "aaaa8"},
        {name: "bbb"},
        {name: "ccccc"},
        {name: "dd"},
        {name: "eeeeeee"},
        {name: "f"}
    ]
];*/


var home_config = [
    new ListView([new Button("11"), new Button("12"), new Button("13")], "horizontal"),
    new ListView([new Button("21"), new Button("22"), new Button("23")], "horizontal"),
    new ListView([new Button("31"), new Button("32"), new Button("33")], "horizontal"),
    new ListView([new Button("41"), new Button("42"), new Button("43")], "horizontal"),
    new ListView([new Button("51"), new Button("52"), new Button("53")], "horizontal"),
    new ListView([new Button("61"), new Button("62"), new Button("63"), new Button("64"), new Button("65"), new Button("66")], "horizontal"),
];


function HomeActivity() {
    this.extends = Vue_Contorller.build(new LinearActivity());

    //Vue_Contorller.addElement(this, "@core/js/gui/page/home/home.html");
    //Vue_Contorller.addVar(this, "views", home_config);

    var home_list = new Array();
    for (var i = 0; i < home_config.length; i++) {
        var text = new Button("aa");

        var child_list = new Array();
        for (var j = 0; j < 3; j++) {
            var text_child = new Button("child-" + j);
            var item_child = new ItemAdapter(text_child);

            child_list.push(item_child);
        }
        var list_child = new ItemAdapter(new ListView(child_list, "horizontal"));

        var item = new ItemAdapter(text, list_child);

        home_list.push(item);
    }
    var list = new ListView(home_list);
    Vue_Contorller.addMethod(list, "onSelect", function(index, isFocus, data) {
        console.log(" " + index + "-" + isFocus + " data:" + data);
        if(isFocus)
            this.setAdapter(index, data);
    });
    Vue_Contorller.addItem(this, "list", list);
}

HomeActivity.prototype.onCreate = function() {
    this.getItem('test1');
}

