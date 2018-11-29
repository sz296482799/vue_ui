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
                return;
            ui.template = ui.template.ToString();
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
                _addHtml(ui, '<component :is=\"' + name + '\" ></component>');
            addVar(obj, "item_name_", name);
            ui.data[name] = build(obj);
        };

        var addElement = function(ui, str) {
            if(!isView(ui) || !isString(str))
                return;
            _addHtml(ui, str);
        };

        var build = function(ui) {
            if(!isView(ui))
                return null;

            _html(ui, "<div>");
            if(isFunction(ui.onBuild))
                ui.onBuild();
            _addHtml(ui, "</div>");
            _htmlToString(ui);

            if(isFunction(ui.onCreate)) {
                ui.mounted = ui.onCreate;
            }

            var data = ui.data;
            ui.data = function() {
                return deepCopy(data);
            }
            return ui;
        };

        var addmMdules = function(ui, name, modules, func) {
            if(!isView(ui) || !isFunction(func))
                return;

            if(!isObject(ui[modules]))
                ui[modules] = new Object();
            ui[modules][name] = func;
        };

        var addMethod = function(ui, name, func) {
            addmMdules(ui, name, "methods", func);
        };

        var addWatch = function(ui, name, func) {
            addmMdules(ui, name, "watch", func);
        };

        var addComputed = function(ui, name, func) {
            addmMdules(ui, name, "computed", func);
        };

        return {
            addVar: addVar,
            addItem: addItem,
            addElement: addElement,
            build: build,
            addMethod: addMethod,
            addWatch: addWatch,
            addComputed: addComputed,
        }
    }
) ();