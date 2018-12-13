'use strict'

function GroupView() {
    this.extends = Vue_Contorller.build(new View());

    Vue_Contorller.addVar(this, "_indexFource", -1);
    Vue_Contorller.addMethod(this, "tryFocus", function(isReport) {
        if(!this._isMounted) {
            return false;
        }
        var ret = false;

        if(isFunction(this.onFocus) && this.onFocus(true)) {
            ret = true;
        }
        else {
            if(this._data._indexFource < 0) {
                this._data._indexFource = 0;
            }
            else if(this._data._indexFource >= this.$children.length && this.$children.length > 0) {
                this._data._indexFource = this.$children.length - 1;
            }
            for (var i = 0; i < this.$children.length; i++) {
                var index = parseInt(i + this._data._indexFource) % this.$children.length;
                var children = this.$children[index];
                if(isFunction(children.tryFocus)) {
                    if(children.tryFocus(false)) {
                        this._data._indexFource = index;
                        ret = true;
                        break;
                    }
                }
                else if(isFunction(children.onFocus) && children.onFocus(true)) {
                    ret = true;
                    break;
                }
            }
        }
            
        if(ret === true) {
            if(isUndefined(isReport) || isReport === true) {
                var parent = this.$parent;
                var children = this;
                while(isObject(parent) && isNumber(parent._data._indexFource)) {

                    var index = parent.$children.indexOf(children);
                    if(parent._data._indexFource !== index && parent._data._indexFource !== -1) {
                        var next = parent.$children[parent._data._indexFource];
                        while(isObject(next)) {
                            if(isFunction(next.onFocus))
                                next.onFocus(false);
                            if(isNumber(next._data._indexFource) && next._data._indexFource !== -1)
                                next = next.$children[next._data._indexFource];
                            else
                                break;
                        }
                    }
                    parent._data._indexFource = index;
                    if(isFunction(parent.onFocus))
                        parent.onFocus(true);
                    
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