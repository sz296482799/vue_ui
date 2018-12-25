'use strict'

function ItemAdapter(view, data) {
    this.view = view;
    this.data = data;
}

function ListView(adapter, orientation, isCom) {
    this.extends = Vue_Contorller.build(new LinearLayout(orientation, null, isCom));

    if(!isCom) {
        Vue_Contorller.addVar(this, "adapters", adapter);
        for (var i = 0; i < adapter.length; i++) {
            Vue_Contorller.addItem(this, "item" + i, adapter[i].view);
        }
    }
    else {
        Vue_Contorller.addProps(this, 'items', {
            type: Array,
            required: true
        });
        Vue_Contorller.addElement(this, '<template v-for="(item, index) in items" ><slot :item="item" :index="index"></slot></template>');
    }
    Vue_Contorller.addMethod(this, "setAdapter", function(index, adapter) {
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
    Vue_Contorller.addMethod(this, "list_select", function(index, isFocus) {
        var item = this.$children[index];
        if(isFunction(this.onSelect) && isObject(item)) {
            this.onSelect(index, isFocus, this.adapters[index].data);
        }
    });
}

Vue.component('listview', Vue_Contorller.build(new ListView(null, null, true)));