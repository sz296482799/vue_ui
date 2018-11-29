'use strict'

function View() {
    Vue_Contorller.addVar(this, "vid", "view" + Appliction.requestID());
}

View.prototype.onBuild = function() {
    console.log("View onBuild");
}

View.prototype.onCreate = function() {
    console.log("View onCreate");
}