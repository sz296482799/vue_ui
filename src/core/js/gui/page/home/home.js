'use strict'

var home_config = [
    {
        name: "test",
        list: [
            {
                name: "c_test11",
                src: "img/0_1.png"
            },
            {
                name: "c_test12",
                src: "img/0_1.png"
            }
        ]
    },
    {
        name: "test1",
        list: [
            {
                name: "c_test21",
                src: "img/1_1.png"
            },
            {
                name: "c_test22",
                src: "img/1_1.png"
            }
        ]
    },
];

function HomeActivity() {
    extendStaticFunc(this, VuePrototype);
    this.extend(new LinearActivity());

    var home_list = new Array();
    for (var i = 0; i < home_config.length; i++) {
        var text = new Text(home_config[i].name);

        var child_list = new Array();
        var list = home_config[i].list;
        for (var j = 0; j < list.length; j++) {
            var child_button = new Button(list[j].name, {focus: "list_item_focus", nofocus: "list_item_nofocus"});
            
            var child_img = new Image(list[j].src);
            var child_text = new Text(list[j].name);

            child_img.addClass("in_pic");
            child_text.addClass("list_text");
            child_button.addItem("img_" + i + j, child_img);
            child_button.addItem("text_" + i + j, child_text);
            
            child_button.addClass("list_icon");
            var item_child = new ItemAdapter(child_button);

            child_list.push(item_child);
        }
        var list_child = new ListView(child_list, "horizontal");

        var item_view = new LinearLayout();
        item_view.addItem("text", text);
        item_view.addItem("list", list_child);

        item_view.addMethod("onFocus", function(b) {
            var list = this.getItem("list")[0];
            if(b)  {
                list.setVisible(true);
                list.tryFocus();
            }
            else 
                list.setVisible(false);
            
            return true;
        });

        home_list.push(new ItemAdapter(item_view));
    }
    var list = new ListView(home_list);
    /*list.addMethod("onSelect", function(index, isFocus, data) {
        console.log(" " + index + "-" + isFocus + " data:" + data);
        if(isFocus)
            this.get(index).getItem("list")[0].setVisible(true); 
        else
            this.get(index).getItem("list")[0].setVisible(false);
    });*/
    this.addItem("list", list);
}

HomeActivity.prototype.onCreate = function() {
    this.getItem('test1');
}
