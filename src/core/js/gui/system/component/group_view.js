'use strict'

function GroupView() {
    this.extends = Vue_Contorller.build(new View());

    Vue_Contorller.addVar(this, "indexFource", -1);
    Vue_Contorller.addMethod(this, "setItem", function(name, view) {
        if(isObject(this.views[name])) {
            var data = this.views[name].data();
            Vue_Contorller.addVar(view, "item_name_", name);
            Vue_Contorller.addVar(view, "view_index", data.view_index);
            this.views[name] = Vue_Contorller.build(view);
        }
        else {
            
            Vue_Contorller.addVar(view, "item_name_", name);
            Vue_Contorller.addVar(view, "view_index", this.view_count);
            this.views[name] = Vue_Contorller.build(view);
            this.view_count++;
            this.$createElement("component", {is:"views." + name});
        }
    });
    Vue_Contorller.addMethod(this, "getChildren", function(index) {
        if(!isNumber(index))
            index = this.indexFource;
        if(index < this.$children.length && this.$children.length > 0) {
            for (var i = 0; i < this.$children.length; i++) {
                if(this.$children[i].view_index === index) {
                    return this.$children[i];
                }
            }
        }
        return null;
    });
    Vue_Contorller.addMethod(this, "tryFocus", function(isReport) {
        if(!this._isMounted) {
            return false;
        }
        var ret = false;

        if(isFunction(this.setFocus) && this.setFocus(true)) {
            ret = true;
        }
        else {
            if(this.indexFource < 0) {
                this.indexFource = 0;
            }
            else if(this.indexFource >= this.$children.length && this.$children.length > 0) {
                this.indexFource = this.$children.length - 1;
            }
            for (var i = 0; i < this.$children.length; i++) {
                var index = parseInt(i + this.indexFource) % this.$children.length;
                if(!isFunction(this.getChildren))
                    continue;
                var children = this.getChildren(index);
                if(!isObject(children))
                    continue;
                if(isFunction(children.tryFocus)) {
                    if(children.tryFocus(false)) {
                        this.indexFource = index;
                        ret = true;
                        break;
                    }
                }
                else if(isFunction(children.setFocus) && children.setFocus(true)) {
                    ret = true;
                    break;
                }
            }
        }
            
        if(ret === true) {
            if(isUndefined(isReport) || isReport === true) {
                var parent = this.$parent;
                var children = this;
                while(isObject(parent) && isNumber(parent.indexFource)) {

                    var index = children.view_index;
                    if(parent.indexFource !== index && parent.indexFource !== -1) {
                        if(!isFunction(parent.getChildren))
                            continue;
                        var next = parent.getChildren();
                        while(isObject(next)) {
                            if(isFunction(next.setFocus))
                                next.setFocus(false);
                            if(isNumber(next.indexFource) && next.indexFource !== -1) 
                                next = isFunction(next.getChildren) ? next.getChildren() : null;
                            else
                                break;
                        }
                    }
                    parent.indexFource = index;
                    if(isFunction(parent.setFocus))
                        parent.setFocus(true);
                    
                    children = parent;
                    parent = parent.$parent;
                }
            }
        }
        return ret;
    });
    Vue_Contorller.addMethod(this, "getItem", function(name) {
        var vue = this; //vue call this function
        var items = new Array();

        if(vue.item_name_ === name)
            items.push(vue);
        
        if(isArray(vue.$children)) {
            for (var i = 0; i < vue.$children.length; i++) {
                if(isFunction(vue.$children[i].getItem)) {
                    var tmp = vue.$children[i].getItem(name);
                    if(isArray(tmp)) {
                        items = items.concat(tmp);
                    }
                }
                else {
                    if(vue.$children[i].item_name_ === name)
                        items.push(vue.$children[i]);
                }
            }
        }
        if(items.length > 0)
            return items;
        return null;
    });
}