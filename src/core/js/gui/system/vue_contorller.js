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

        var _strUnique = function(str) {
            var ret = [];
            str.replace(/[^ ]+/g, function(x1, x2){
                (str.indexOf(x1)==x2) && ret.push(x1);
            });
            return ret.join(' ');
        }

        var _getAttribute = function(template, name) {
            var reg = new RegExp(name + '=\"([a-zA-Z0-9 ]*)\"');
            var attr = reg.exec(template);
            if(attr && attr.length > 1)
                return attr[1];
            return "";
        };

        var _getClass = function(ui) {
            if(!isView(ui))
                return "";
            if(!isString(ui.template))
                return _getClass(ui.extends);
            return _getClass(ui.extends) + _getAttribute(ui.template, "class");
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
            if(!isObject(ui.data)) {
                ui.data = new Object();
            }
            if(!isNumber(ui.data.view_count))
                ui.data.view_count = 0;
            if(!isObject(ui.data.views))
                ui.data.views = new Object();
            if(!isObject(ui.data[name]))
                addElement(ui, '<component :is="views.' + name + '" ></component>');
            addVar(obj, "item_name_", name);
            addVar(obj, "view_index", ui.data.view_count);
            ui.data.views[name] = build(obj);
            ui.data.view_count++;
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

        var setLabel = function(ui, str) {
            if(!isView(ui) || !isString(str))
                return;
            ui.label = str;
        };

        var setHasSlot = function(ui, flag) {
            if(!isView(ui))
                return;
            ui.isHasSlot = flag;
        };

        var addClass = function(ui, str) {
            if(!isView(ui) || !isString(str))
                return;
            if(!isClassName(ui.class, StringBuffer)) {
                ui.class = new StringBuffer();
                ui.class.Append('class="');
            }
            ui.class.Append(str + ' ');
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
            if(!isString(ui.label))
                ui.label = "div";

            var attribute = isClassName(ui.attribute, StringBuffer) ? ui.attribute.ToString() : "";
            ui.attribute = null;

            addClass(ui, _strUnique(_getClass(ui)));
            addClass(ui, '"');
            var mClass = isClassName(ui.class, StringBuffer) ? ui.class.ToString() : "";

            ui.class = null;

            var tmp =  _htmlToString(ui);
            _html(ui, '<' + ui.label + ' ' + attribute + ' ' + mClass + ' >');
            if(isString(tmp))
                _addHtml(ui, tmp);
            if(isFunction(ui.onBuild))
                ui.onBuild();
            if(ui.isHasSlot)
                _addHtml(ui, "<slot></slot>");
            _addHtml(ui, '</' + ui.label + '>');
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
            addClass: addClass,
            addAttribute: addAttribute,
            setLabel: setLabel,
            setHasSlot: setHasSlot,
            addProps: addProps,
            build: build,
            addMethod: addMethod,
            addWatch: addWatch,
            addComputed: addComputed,
        }
    }
) ();