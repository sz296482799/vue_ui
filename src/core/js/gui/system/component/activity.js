'use strict'

function Activity() {
    this.extends = Vue_Contorller.build(new GroupView());
    Vue_Contorller.addMethod(this, "getFocus", function() {
        var focus = this;
        while(isObject(focus) && focus.$children.length > 0 
            && focus.indexFource >= 0
            && focus.indexFource < focus.$children.length
            && isFunction(focus.getChildren)) {
            focus = focus.getChildren();
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
    Vue_Contorller.addClass(this, "activity");
}

Activity.prototype.onCreate = function() {
    console.log("Activity onCreate:" + this._data._activity_path);
    this.tryFocus();
}

function LinearActivity(orientation) {
    this.extends = Vue_Contorller.build(new LinearLayout(orientation, Activity));
}