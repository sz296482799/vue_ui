'use strict'

function View() {
    Vue_Contorller.addVar(this, "vid", "view" + Appliction.requestID());
    Vue_Contorller.addMethod(this, "getElement", function() {
        return $("#" + this.vid);
    });
}

View.prototype.onCreate = function() {
    console.log("View onCreate");
    if(isFunction(this.onFocus)) {
        this.onFocus(false);
        this.$on("focus", this.onFocus);
    }
    this.$el.classList.add("view");
}