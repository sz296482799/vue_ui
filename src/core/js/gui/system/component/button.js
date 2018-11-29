'use strict'

function Button(text, cssObj) {
    this.extends = Vue_Contorller.build(new GroupView());
    this.text = text;
    this.cssObj = cssObj;
}

Button.prototype.onBuild = function() {

    Vue_Contorller.addVar(this, "itext", this.text);
    Vue_Contorller.addVar(this, "canFocus", true);
    Vue_Contorller.addVar(this, "isFocus", false);
    Vue_Contorller.addVar(this, "iCssObj", this.cssObj);
    Vue_Contorller.addVar(this, "mCssObj", {focus: "item_button_focus", nofocus: "item_button_nofocus"});

    Vue_Contorller.addMethod(this, "getElement", function() {
        return $("#" + this.vid);
    });

    Vue_Contorller.addComputed(this, "sClass", function () {
        if(this.isFocus)
            return (this.iCssObj && this.iCssObj.focus) || this.mCssObj.focus;
        else
            return (this.iCssObj && this.iCssObj.nofocus) || this.mCssObj.nofocus;
    });

    Vue_Contorller.addElement(this, '<div :id="vid" v-text="itext" :class="sClass"></div>');
}