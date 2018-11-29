'use strict'

function Button(text, cssObj) {
    this.text = text;
    this.cssObj = cssObj;

    GroupView.call(this);
}
extend(Button, GroupView);

Button.prototype.onBuild = function() {
    this.variables.itext = this.text;
    this.variables.canFocus = true;
    this.variables.isFocus = false;
    this.variables.iCssObj = this.cssObj;
    this.variables.mCssObj = {focus: "item_button_focus", nofocus: "item_button_nofocus"};

    this.addMethod("getElement", function() {
        return $("#button" + this.aid);
    });

    this.addComputed("sClass", function () {
        if(this.isFocus)
            return (this.iCssObj && this.iCssObj.focus) || this.mCssObj.focus;
        else
            return (this.iCssObj && this.iCssObj.nofocus) || this.mCssObj.nofocus;
    });

    this.appendHtml('<div id=\"button' + this.variables.aid + '\" v-text="itext" :class="sClass"></div>');
}


function testButton(text, cssObj) {
    this.extends = new Button(text, cssObj);
    this.created = function() {
        console.log("testButton created");
    };
}