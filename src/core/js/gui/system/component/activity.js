'use strict'

function Activity() {
    extendStaticFunc(this, VuePrototype);
    this.extend(new GroupView());
    this.addMethod("getFocus", function() {
        var focus = this;
        while(isObject(focus) && focus.$children.length > 0 
            && focus.indexFource >= 0
            && focus.indexFource < focus.$children.length
            && isFunction(focus.getChildren)) {
            focus = focus.getChildren();
        }
        return focus;
    });
    this.addMethod("touchKeyUp", function(event) {
        var focus = this.getFocus();

        while(isObject(focus)) {
            if(isFunction(focus.onkeyup) && focus.onkeyup(event) === true)
                return true;
            focus = focus.$parent;
        }
        return false;
    });
    this.addMethod("touchKeyDown", function(event) {
        var focus = this.getFocus();

        while(isObject(focus)) {
            if(isFunction(focus.onkeydown) && focus.onkeydown(event) === true)
                return true;
            focus = focus.$parent;
        }
        return false;
    });
    this.addClass("activity");
}

Activity.prototype.onCreate = function() {
    console.log("Activity onCreate:" + this._data._activity_path);
    this.tryFocus();
}

function LinearActivity(orientation) {
    extendStaticFunc(this, VuePrototype);
    this.extend(new LinearLayout(orientation, Activity));
}
