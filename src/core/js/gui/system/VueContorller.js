'use strict'

var VueContorller = (
    function() {

        var _unbuild = function(ui) {
            if(ui.isBuilt) {
                if(isFunction(ui.data))
                    ui.data = ui.data();
                if(isFunction(ui.render))
                    ui.render = null;
                ui.isBuilt = false;
            }
        }

        var _getExtendData = function(ui, name) {
            if(!isView(ui))
                return {};

            var data = null;
            if(isFunction(ui.data))
                data = ui.data();
            else if(isObject(ui.data))
                data = ui.data;
            if(!isObject(data))
                data = {};
            if(!isObject(data[name]))
                data[name] = {};
            if(!isObject(data) || !isObject(data[name]))
                return _getExtendData(ui.extends, name);
            return $.extend(data[name], _getExtendData(ui.extends, name));
        };

        var addVar = function(ui, name, value) {
            _unbuild(ui);
            if(!isView(ui) || !isString(name))
                return;
            if(!isObject(ui.data))
                ui.data = new Object();
            ui.data[name] = value;
        };
        
        var addItem = function(ui, name, obj) {
            _unbuild(ui);
            if(!isGroupView(ui) || !isString(name) || !isObject(obj))
                return;
            if(!isObject(ui.data)) {
                ui.data = new Object();
            }
            if(!isNumber(ui.data.view_count))
                ui.data.view_count = 0;
            if(!isObject(ui.data.views))
                ui.data.views = new Object();
            addVar(obj, "item_name_", name);
            addVar(obj, "view_index", ui.data.view_count);
            ui.data.views[name] = build(obj);
            ui.data.view_count++;
        };

        var syncLoadHtml = function(url, timeout) {
            var response = $.ajax({url:url, async:false, dataType:"html", timeout: timeout, global:false});
            return response.responseText;
        }

        var addClass = function(ui, classStr) {
            _unbuild(ui);
            if(!isView(ui) || !isString(classStr))
                return;
            if(!isObject(ui.data)) 
                ui.data = new Object();
            
            if(!isObject(ui.data.class))
                addVar(ui, "class", new Object());
            ui.data.class[classStr] = true;
        };

        var addStyle = function(ui, name, styleStr) {
            _unbuild(ui);
            if(!isView(ui) || !isString(name) || !isString(styleStr))
                return;
            if(!isObject(ui.data)) 
                ui.data = new Object();
            
            if(!isObject(ui.data.style))
                addVar(ui, "style", new Object());
            ui.data.style[name] = styleStr;
        };

        var addAttribute = function(ui, name, str) {
            _unbuild(ui);
            if(!isView(ui) || !isString(name) || !isString(str))
                return;
            if(!isObject(ui.data.attrs))
                addVar(ui, "attrs", {});
            ui.data.attrs[name] = str;
        };

        var addProps = function(ui, name, prop) {
            _unbuild(ui);
            if(!isView(ui) || !isString(name))
                return;
            if(!isObject(ui.props))
                ui.props = new Object();
            ui.props[name] = prop;
        };

        var extend = function(ui, extend_ui) {
            
            if(!isView(extend_ui))
                return;

            if(isFunction(extend_ui.onCreate)) {
                extend_ui.mounted = extend_ui.onCreate;
            }

            if(isFunction(extend_ui.onKeyDown)) {
                VueContorller.addMethod(extend_ui, "onkeydown", extend_ui.onKeyDown);
            }

            if(isFunction(extend_ui.onKeyUp)) {
                VueContorller.addMethod(extend_ui, "onkeyup", extend_ui.onKeyUp);
            }

            var data = extend_ui.data;
            extend_ui.data = function() {
                return deepCopy(data);
            }
            ui.extends = extend_ui;
        };

        var build = function(ui) {
            for(var key in VuePrototype) {
                delete ui[key];
            }
            if(ui.isBuilt) {
                return ui;
            }
            if(!isView(ui))
                return null;
            if(!isObject(ui.data) || !isString(ui.data.tag))
                addVar(ui, "tag", "div");

            _getExtendData(ui, "class");
            _getExtendData(ui, "attrs");

            ui.render = function(createElement) {
                var obj = new Object();
                var children = [];

                for (var key in this.attrs) {
                    if(key.charAt(0) === ':' && isString(this.attrs[key])) {
                        var name = key.slice(1);
                        if(name === "id" || name === "src") {
                            if(!isObject(obj.attrs))
                                obj.attrs = new Object();
                            obj.attrs[name] = this[this.attrs[key]];
                        }
                        else if(name === "class") {
                            obj.class = this[this.attrs[key]];
                        }
                        else if(name === "style") {
                            obj.style = this[this.attrs[key]];
                        }
                    }
                    else if(key.charAt(0) === '@' && (isFunction(this.attrs[key]) || isString(this.attrs[key]))) {
                        if(!isObject(obj.on))
                            obj.on = new Object();
                        obj.on[key.slice(1)] = this.attrs[key];
                    }
                    else if(isUndefined(this.views) && key.indexOf("v-text") === 0 && isString(this.attrs[key])) {
                        if(!isObject(obj.domProps))
                            obj.domProps = new Object();
                        obj.domProps["textContent"] = this[this.attrs[key]];
                    }
                    else if(key.indexOf("v-show") === 0 && isString(this.attrs[key])) {
                        if(!isObject(obj.directives))
                            obj.directives = new Array();
                        var show = {name:"show",rawName:"v-show",value:(this[this.attrs[key]]),expression:"isShow"};
                        obj.directives.push(show);
                    }
                }

                obj.staticClass = "";
                for(var key in this.class) {
                    if(this.class[key])
                        obj.staticClass += key + ' ';
                }

                obj.staticStyle = "";
                for(var key in this.style) {
                    if(isString(this.style[key]))
                        obj.staticStyle += key + ":" + this.style[key] + ";";
                }

                for(var view in this.views) {
                    //"{tag:"component",class:sClass,attrs:{"id":vid},domProps:{"textContent":_s(itext)},on:{"click":sClick}}"
                    //Vue.compile('<component v-show="isShow" :id="vid" @click="sClick" v-text="itext" :class="sClass" :is="views.' + view + '">{{test}}<img :src="aaa"></img></component>', {});
                    children.push(createElement(this.views[view], {tag: "component"}));
                }
                return createElement(this.tag, obj, children);
            };

            if(isFunction(ui.onCreate)) {
                ui.mounted = ui.onCreate;
            }

            if(isFunction(ui.onKeyDown)) {
                VueContorller.addMethod(ui, "onkeydown", ui.onKeyDown);
            }

            if(isFunction(ui.onKeyUp)) {
                VueContorller.addMethod(ui, "onkeyup", ui.onKeyUp);
            }

            var data = ui.data;
            ui.data = function() {
                return deepCopy(data);
            }
            ui.isBuilt = true;
            return ui;
        };

        var addModule = function(ui, name, module, func) {
            _unbuild(ui);
            if(!isView(ui) || !isFunction(func))
                return;

            if(!isObject(ui[module]))
                ui[module] = new Object();
            ui[module][name] = func;
        };

        var addMethod = function(ui, name, func) {
            addModule(ui, name, "methods", func);
        };

        var addWatch = function(ui, name, func) {
            addModule(ui, name, "watch", func);
        };

        var addComputed = function(ui, name, func) {
            addModule(ui, name, "computed", func);
        };

        return {
            addVar: addVar,
            addItem: addItem,
            addClass: addClass,
            addAttribute: addAttribute,
            addProps: addProps,
            build: build,
            extend: extend,
            addMethod: addMethod,
            addWatch: addWatch,
            addComputed: addComputed,
        }
    }
) ();