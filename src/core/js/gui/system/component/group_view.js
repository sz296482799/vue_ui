'use strict'

function GroupView() {
    this.extends = Vue_Contorller.build(new View());

    Vue_Contorller.addMethod(this, "getItem", function(name) {
        var vue = this; //vue call this function
        if(vue.$children) {
            for (var i = 0; i < vue.$children.length; i++) {
                if(vue.$children[i].item_name_ === name) {
                    return vue.$children[i];
                }
            }
        }
    });
}

GroupView.prototype.onBuild = function() {
    console.log("GroupView onBuild");
}

GroupView.prototype.onCreate = function() {
    console.log("GroupView onCreate");
}