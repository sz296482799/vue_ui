'use strict'

function GroupView() {
    extendStaticFunc(this, VuePrototype);
    this.extend(new View());

    this.addVar("indexFource", -1);
    this.addMethod("setItem", function(name, view) {
        if(isObject(this.views[name])) {
            var data = this.views[name].data();
            VueContorller.addVar(view, "item_name_", name);
            VueContorller.addVar(view, "view_index", data.view_index);
            this.views[name] = VueContorller.build(view);
        }
        else {
            VueContorller.addVar(view, "item_name_", name);
            VueContorller.addVar(view, "view_index", this.view_count);
            this.views[name] = VueContorller.build(view);
            this.view_count++;
        }
    });
    this.addMethod("getChildren", function(index) {
        if(!isNumber(index)) {
            if(this.indexFource == -1)
                return null;
            index = this.indexFource;
        }
        if(index < this.$children.length && this.$children.length > 0) {
            for (var i = 0; i < this.$children.length; i++) {
                if(this.$children[i].view_index === index) {
                    return this.$children[i];
                }
            }
        }
        return null;
    });
    this.addMethod("tryFocus", function(isReport) {
        if(!this._isMounted) {
            return false;
        }
        var ret = false;

        if(!this.isVisible)
            return ret;

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

                        this.removeFource(parent.getChildren());
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
    this.addMethod("removeFource", function(child) {
        while(isObject(child)) {
            if(isFunction(child.setFocus))
                child.setFocus(false);
            if(isNumber(child.indexFource) && child.indexFource !== -1) 
                child = isFunction(child.getChildren) ? child.getChildren() : null;
            else
                break;
        }
    });
    this.addMethod("getItem", function(name) {
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
