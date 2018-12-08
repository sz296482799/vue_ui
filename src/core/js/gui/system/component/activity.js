'use strict'

function Activity() {
    this.extends = Vue_Contorller.build(new GroupView());
    Vue_Contorller.addMethod(this, "getFocus", function() {
        var focus = this;
        while(isObject(focus) && focus.$children.length > 0 
            && focus._data._indexFource >= 0
            && focus._data._indexFource < focus.$children.length) {
            focus = focus.$children[focus._data._indexFource];
        }
        return focus;
    });
    Vue_Contorller.addMethod(this, "touchKeyUp", function(event) {
        var focus = this.getFocus();

        while(isObject(focus)) {
            if(isFunction(focus.onkeyup) && focus.onkeyup(event) === true)
                return true;
            focus = focus.$parent;
        }
        return false;
    });
    Vue_Contorller.addMethod(this, "touchKeyDown", function(event) {
        var focus = this.getFocus();

        while(isObject(focus)) {
            if(isFunction(focus.onkeydown) && focus.onkeydown(event) === true)
                return true;
            focus = focus.$parent;
        }
        return false;
    });
}

Activity.prototype.onCreate = function() {
    console.log("Activity onCreate:" + this.activity_path);
    this.$el.classList.add("activity");
    this.tryFocus();
}

function LinearActivity(orientation) {
    this.extends = Vue_Contorller.build(new LinearLayout(orientation, Activity));
}