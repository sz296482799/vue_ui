'use strict'

function GroupView() {
    HtmlView.call(this);

    this.configurable = true;

    if(!isObject(this.variables))
        this.variables = new Object();
    this.itemList = new Object();
    this.isBuild = false;

    this.variables.aid = Appliction.getID();

    this.addMethod("getItem", function(name) {
        var vue = this; //vue call this function
        if(vue.$children) {
            for (var i = 0; i < vue.$children.length; i++) {
                if(vue.$children[i]._item_name_ === name) {
                    return vue.$children[i];
                }
            }
        }
    });

    this.variables.created = this.onCreate;
    this.bulid();
}
extend(GroupView, HtmlView);

GroupView.prototype.addItem = function(name, obj) {
    if(this.isBuild || !isObject(obj))
        return;
    if(!isObject(this.itemList[name]))
        this.appendHtml('<component :is=\"' + name + '\" ></component>');
    if(!isObject(obj.computed))
        obj.computed = new Object();
    obj.computed['_item_name_'] = function() {return name;};
    this.itemList[name] = obj;
}

GroupView.prototype.addElement = function(str) {
    if(this.isBuild || !isString(str))
        return;
    this.appendHtml(str);
}

GroupView.prototype.bulid = function() {
    if(this.isBuild)
        return;

    this.html("<div>");
    this.onBuild();
    this.appendHtml("</div>");
    this.htmlToString();

    this.isBuild = true;

    var itemList = this.itemList;
    var variables = this.variables;
    this.data = function() {
        return deepCopy(itemList, variables);
    }
    delete this.itemList;
    //delete this.variables;
}

GroupView.prototype.addMethod = function(name, func) {
    if(!isFunction(func))
        return;

    if(!isObject(this.methods))
        this.methods = new Object();
    this.methods[name] = func;
}

GroupView.prototype.addWatch = function(name, func) {
    if(!isFunction(func))
        return;

    if(!isObject(this.watch))
        this.watch = new Object();
    this.watch[name] = func;
}

GroupView.prototype.addComputed = function(name, func) {
    if(!isFunction(func))
        return;

    if(!isObject(this.computed))
        this.computed = new Object();
    this.computed[name] = func;
}

GroupView.prototype.created = function() {
    console.log("GroupView created");
}

//vue will be call
GroupView.prototype.mounted = function() {
    this.created(); // call class function onCreate()
}

GroupView.prototype.onBuild = function() {
    console.log("GroupView onBuild");
}

GroupView.prototype.onCreate = function() {
    console.log("GroupView onCreate");
}