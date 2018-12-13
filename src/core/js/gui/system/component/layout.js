'use strict'

function LinearLayout(orientation, type, isCom) {
    if(!isFunction(type))
        type = GroupView;
    this.extends = Vue_Contorller.build(new type());

    if(!isCom) {
        var ori = "v";//vertical
        if(orientation === "horizontal")
            ori = "h";
        Vue_Contorller.addVar(this, "orientation", ori);
    }
    else {
        Vue_Contorller.addProps(this, 'orientation', {
            default: 'v',
            validator: function (value) {
                return ['v', 'h'].indexOf(value) !== -1;
            }
        });
    }
}

LinearLayout.prototype.onCreate = function() {
    console.log("View onCreate");
    this.$el.classList.add("linear_layout_" + this.orientation);
}

LinearLayout.prototype.onKeyDown = function(event) {
    
    if(this.orientation === "h") {
        if(event.keyCode === 37) {
            var index = (this._data._indexFource - 1);
            index = index >= 0 ? index : 0;
            isFunction(this.$children[index].tryFocus) && this.$children[index].tryFocus();
        }
        else if(event.keyCode === 39) {
            var index = (this._data._indexFource + 1) % this.$children.length;
            isFunction(this.$children[index].tryFocus) && this.$children[index].tryFocus();
        }
    }
    else {
        if(event.keyCode === 38) {
            var index = (this._data._indexFource - 1);
            index = index >= 0 ? index : 0;
            isFunction(this.$children[index].tryFocus) && this.$children[index].tryFocus();
        }
        else if(event.keyCode === 40) {
            var index = (this._data._indexFource + 1) % this.$children.length;
            isFunction(this.$children[index].tryFocus) && this.$children[index].tryFocus();
        }
    }
}
Vue.component('linear-layout', Vue_Contorller.build(new LinearLayout(null, null, true)));