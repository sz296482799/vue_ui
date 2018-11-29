'use strict'

function Activity() {
    this.extends = Vue_Contorller.build(new GroupView());
}

Activity.prototype.onBuild = function() {
    console.log("Activity onBuild");
}

Activity.prototype.onCreate = function() {
    console.log("Activity onCreate");
}