'use strict'

function View() {
    Vue_Contorller.addVar(this, "vid", "view_unknow");
    Vue_Contorller.addVar(this, "staticClass", "view_unknow");
    Vue_Contorller.addMethod(this, "getElement", function() {
        return $("#" + this.vid);
    });

    Vue_Contorller.addMethod(this, "setFocusCss", function(cssObj) {
        if(isString(cssObj)) {
            this.mCssObj = {focus: cssObj + "_focus", nofocus: cssObj + "_nofocus"};
        }
        else if(isObject(cssObj)) {
            this.mCssObj = cssObj;
        }
    });

    Vue_Contorller.addVar(this, "isFocus", false);
    Vue_Contorller.addMethod(this, "setFocus", function(b) {
        if(isFunction(this.onFocus)) {
            if(isObject(this.mCssObj)) {
                if(b) {
                    if(isString(this.mCssObj.nofocus))
                        removeClass(this.$el, this.mCssObj.nofocus);
                    if(isString(this.mCssObj.focus))
                        addClass(this.$el, this.mCssObj.focus);
                } 
                else {
                    if(isString(this.mCssObj.focus))
                        removeClass(this.$el, this.mCssObj.focus);
                    if(isString(this.mCssObj.nofocus))
                        addClass(this.$el, this.mCssObj.nofocus);
                }
            }
            this.isFocus = this.onFocus(b);
            return this.isFocus;
        }
        return false;
    });

    Vue_Contorller.addMethod(this, "addClass", function(str) {
        addClass(this.$el, str);
    });

    Vue_Contorller.addClass(this, "view");
}

View.prototype.onCreate = function() {
    console.log("View onCreate");
    this.setFocus(false);
    this.vid = "view" + Appliction.requestID();
}