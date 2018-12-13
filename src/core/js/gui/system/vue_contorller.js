'use strict'

var Vue_Contorller = (
    function() {

        var _addHtml = function(ui, str) {
            if(!isClassName(ui.template, StringBuffer))
                return;
            ui.template.Append(str);
        };

        var _html = function(ui, str) {

            if(!isClassName(ui.template, StringBuffer))
                ui.template = new StringBuffer();

            ui.template.clear();
            if(isString(str))
                _addHtml(ui, str);
        };

        var _htmlToString = function(ui) {
            if(!isClassName(ui.template, StringBuffer))
                return null;
            ui.template = ui.template.ToString();
            return ui.template;
        };

        var addVar = function(ui, name, value) {
            if(!isView(ui) || !isString(name))
                return;
            if(!isObject(ui.data))
                ui.data = new Object();
            ui.data[name] = value;
        };
        
        var addItem = function(ui, name, obj) {
            if(!isGroupView(ui) || !isString(name) || !isObject(obj))
                return;
            if(!isObject(ui.data[name]))
                addElement(ui, '<component :is=\"' + name + '\" ></component>');
            addVar(obj, "item_name_", name);
            ui.data[name] = build(obj);
        };

        var syncLoadHtml = function(url, timeout) {
            var response = $.ajax({url:url, async:false, dataType:"html", timeout: timeout, global:false});
            return response.responseText;
        }

        var addElement = function(ui, str) {
            if(!isView(ui) || !isString(str))
                return;
            if(str.charAt(0) === '@') {
                str = syncLoadHtml(str.slice(1), 1000);
            }
            if(!isClassName(ui.template, StringBuffer))
                _html(ui);
            _addHtml(ui, str);
        };

        var clearElement = function(ui) {
            if(!isView(ui) || !isString(str) || !isClassName(ui.template, StringBuffer))
                return;
            _html(ui);
        };

        var addAttribute = function(ui, str) {
            if(!isView(ui) || !isString(str))
                return;
            if(!isClassName(ui.attribute, StringBuffer))
                ui.attribute = new StringBuffer();
            ui.attribute.Append(str + ' ');
        };

        var addAttribute = function(ui, str) {
            if(!isView(ui) || !isString(str))
                return;
            if(!isClassName(ui.attribute, StringBuffer))
                ui.attribute = new StringBuffer();
            ui.attribute.Append(str + ' ');
        };

        var addProps = function(ui, name, prop) {
            if(!isView(ui) || !isString(name))
                return;
            if(!isObject(ui.props))
                ui.props = new Object();
            ui.props[name] = prop;
        };

        var build = function(ui) {
            if(!isView(ui))
                return null;

            var attribute = isClassName(ui.attribute, StringBuffer) ? ui.attribute.ToString() : "";
            ui.attribute = null;
            var tmp =  _htmlToString(ui);
            _html(ui, '<div ' + attribute + '>');
            if(isString(tmp))
                _addHtml(ui, tmp);
            if(isFunction(ui.onBuild))
                ui.onBuild();
            _addHtml(ui, "<slot></slot>");
            _addHtml(ui, "</div>");
            _htmlToString(ui);

            if(isFunction(ui.onCreate)) {
                ui.mounted = ui.onCreate;
            }

            if(isFunction(ui.onKeyDown)) {
                Vue_Contorller.addMethod(ui, "onkeydown", ui.onKeyDown);
            }

            if(isFunction(ui.onKeyUp)) {
                Vue_Contorller.addMethod(ui, "onkeyup", ui.onKeyUp);
            }

            var data = ui.data;
            ui.data = function() {
                return deepCopy(data);
            }
            return ui;
        };

        var addModule = function(ui, name, module, func) {
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
            addElement: addElement,
            addAttribute: addAttribute,
            addProps: addProps,
            build: build,
            addMethod: addMethod,
            addWatch: addWatch,
            addComputed: addComputed,
        }
    }
) ();