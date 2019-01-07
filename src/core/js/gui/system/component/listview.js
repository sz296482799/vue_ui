'use strict'

function ItemAdapter(view, data) {
    this.view = view;
    this.data = data;
}

ItemAdapter.prototype.setData = function(data) {
    this.data = data;
}

function ListView(adapter, orientation) {
    extendStaticFunc(this, VuePrototype);
    this.extend(new LinearLayout(orientation, null));

    this.addVar("adapters", adapter);
    for (var i = 0; i < adapter.length; i++) {
        this.addItem("item" + i, adapter[i].view);
    }
    
    this.addMethod("setAdapter", function(index, adapter) {
        if(!isClassName(adapter, ItemAdapter) || !isObject(adapter.view)) {
            return;
        }

        if(isNumber(index)) {
            this.setItem("item" + index, adapter.view);
            this.$set(this.adapters, index, adapter);
        }
        else {
            this.setItem("item" + this.adapters.length, adapter.view);
            this.adapters.push(adapter);
        }
        if(this.indexFource === index) {
            this.$nextTick(function () {
                this.tryFocus();
            });
        }
    });
    this.addMethod("get", function(index) {
        return this.getChildren(index);
    });
    this.addMethod("list_select", function(index, isFocus) {
        var item = this.$children[index];
        if(isFunction(this.onSelect) && isObject(item)) {
            this.onSelect(index, isFocus, this.adapters[index].data);
        }
    });
}