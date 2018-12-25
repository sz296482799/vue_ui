'use strict'

function Button(text, cssObj, eventObj, isCom) {
    this.extends = Vue_Contorller.build(new GroupView());

    if(!isCom) {
        Vue_Contorller.addVar(this, "itext", text);
        Vue_Contorller.addVar(this, "iCssObj", cssObj);
        if(isObject(eventObj)) {
            if(isFunction(eventObj.click))
                Vue_Contorller.addMethod(this, "iclick", eventObj.click);
        }
        if(!isObject(cssObj))
            Vue_Contorller.addVar(this, "mCssObj", {focus: "item_button_focus", nofocus: "item_button_nofocus"});
        else
            Vue_Contorller.addVar(this, "mCssObj", cssObj);
    }
    else {
        Vue_Contorller.addProps(this, 'item', {
            type: Object,
        });
        Vue_Contorller.addProps(this, 'name', {
            type: String,
            required: true
        });
        Vue_Contorller.addProps(this, 'cssObj', {
            type: [String, Object]
        });
        Vue_Contorller.addComputed(this, "mCssObj", function () {
            if(isString(this.cssObj)) {
                return {focus: this.cssObj + "_focus", nofocus: this.cssObj + "_nofocus"};
            }
            else if(isObject(this.cssObj)) {
                return this.cssObj;
            }
            else {
                return {focus: "item_button_focus", nofocus: "item_button_nofocus"}
            }
        });
        Vue_Contorller.addComputed(this, "item_name_", function () {
            return this.name || "unknow_name";
        });
        Vue_Contorller.setHasSlot(this, true);
    }

    Vue_Contorller.addMethod(this, "onFocus", function(b) {
        return true;
    });

    Vue_Contorller.addMethod(this, "setText", function(text) {
        if(isString(text))
            this.itext = text;
    });

    Vue_Contorller.addMethod(this, "getText", function() {
        return this.itext;
    });

    Vue_Contorller.addComputed(this, "sClick", function () {
        return this.iclick || function() {};
    });
    Vue_Contorller.addAttribute(this, ':id="vid" @click="sClick" ');
    if(!isCom)
        Vue_Contorller.addAttribute(this, 'v-text="itext"');
    //Vue_Contorller.addElement(this, '<div :id="vid" @click="sClick" v-text="itext" :class="sClass"></div>');
}

Vue.component('vbutton', Vue_Contorller.build(new Button(null, null, null, true)));