'use strict'

function Button(text, cssObj, eventObj) {
    extendStaticFunc(this, VuePrototype);
    this.extend(new GroupView());

    this.addVar("itext", text);
    this.addVar("iCssObj", cssObj);
    if(isObject(eventObj)) {
        if(isFunction(eventObj.click))
            this.addMethod("click", eventObj.click);
    }
    if(!isObject(cssObj))
        this.addVar("mCssObj", {focus: "item_button_focus", nofocus: "item_button_nofocus"});
    else
        this.addVar("mCssObj", cssObj);

    this.addMethod("onFocus", function(b) {
        return true;
    });

    this.addMethod("setText", function(text) {
        if(isString(text))
            this.itext = text;
    });

    this.addMethod("getText", function() {
        return this.itext;
    });

    this.addComputed(this, "sClick", function () {
        return this.click || function() {};
    });
    this.addAttribute(":id", "vid");
    this.addAttribute("@click", "sClick");
    this.addAttribute("v-text", "itext");
}