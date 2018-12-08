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
    }
    Vue_Contorller.addVar(this, "sClass", "");

    Vue_Contorller.addVar(this, "mCssObj", {focus: "item_button_focus", nofocus: "item_button_nofocus"});
    Vue_Contorller.addMethod(this, "onFocus", function(b) {
        if(b)
            this.sClass = (this.iCssObj && this.iCssObj.focus) || this.mCssObj.focus;
        else
            this.sClass = (this.iCssObj && this.iCssObj.nofocus) || this.mCssObj.nofocus;
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
    Vue_Contorller.addAttribute(this, ':id="vid" @click="sClick" :class="sClass"');
    if(!isCom)
        Vue_Contorller.addAttribute(this, 'v-text="itext"');
    //Vue_Contorller.addElement(this, '<div :id="vid" @click="sClick" v-text="itext" :class="sClass"></div>');
}
Vue.component('vbutton', Vue_Contorller.build(new Button(null, null, null, true)));