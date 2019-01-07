'use strict'

function View() {
    extendStaticFunc(this, VuePrototype);
    
    this.addVar("vid", "view_unknow");
    this.addMethod("getElement", function() {
        return $("#" + this.vid);
    });

    this.addMethod("setFocusCss", function(cssObj) {
        if(isString(cssObj)) {
            this.mCssObj = {focus: cssObj + "_focus", nofocus: cssObj + "_nofocus"};
        }
        else if(isObject(cssObj)) {
            this.mCssObj = cssObj;
        }
    });

    this.addVar("isFocus", false);
    this.addMethod("setFocus", function(b) {
        if(!this.isVisible)
            return false;
        if(b !== this.isFocus) {
            this.isFocus = b;
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

            if(isFunction(this.onFocus))
                return this.onFocus(b);
        }
        return false;
    });

    this.addVar("isVisible", true);
    this.addAttribute("v-show", "isVisible");
    this.addMethod("setVisible", function(b) {
        this.isVisible = b;
    });

    this.addMethod("addClass", function(str) {
        addClass(this.$el, str);
    });

    this.addClass("view");
}

View.prototype.onCreate = function() {
    console.log("View onCreate");
    this.setFocus(false);
    this.vid = "view" + Appliction.requestID();
}
