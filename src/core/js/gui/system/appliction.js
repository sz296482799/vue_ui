'use strict'

var Appliction = (
    function() {
        var _store = new Object();
        var _router = new Object();
        var _funcList = new Object();
        var isStart = false;
        var vue;
        var aid = 1;

        document.onkeyup = null;
        document.onkeydown = null;

        var onAppKeyUp = function() {
    
        };

        var onAppKeyDown = function() {
    
        };

        var start = function(id) {
            var _jqhtml;
            var store, router, computed;

            if(isStart || !isString(id))
                return;
            
            _jqhtml = $("#" + id);
            _jqhtml.css({
                //"order": "0",
                "display": "flex",
                "flex-flow": "column",
                //"justify-content": "flex-start",
                //"align-items": "stret ch",
                //"flex": "auto"
            });
            _jqhtml.addClass("app");

            if(isArray(_router.routes) && _router.routes.length > 0) {
                _jqhtml.append("<router-view></router-view>");
            }

            store = new Vuex.Store(_store);
            router = new VueRouter(_router);

            computed = Vuex.mapState(["appliction"]);

            isStart = true;

            vue = new Vue({
                store: store,
                router: router,
                computed: computed,
                created: function () {
                    document.onkeyup = onAppKeyUp;
                    document.onkeydown = onAppKeyDown;
                },
            });
            vue.$mount('#' + id);
        };

        var setState = function(name, value) {
            if(isStart)
                return;

            if(!isString(name))
                return;

            if(!_store.state)
                _store.state = new Object();

            _store.state[name] = value;
        };

        var setMutations = function(name, dbname, func) {
            if(isStart)
                return;

            if(!isString(name) || !isString(dbname) || !isFunction(func))
                return;

            _funcList[dbname] = func;

            if(!_store.mutations)
                _store.mutations = new Object();

            _store.mutations[name] = function(state) {
                var cmd = new StringBuffer();

                cmd.Append("_funcList[dbname](state[dbname]");
                for(var i = 1; i < arguments.length; i++)
                    cmd.Append(", arguments[" + i + "]");
                cmd.Append(")");
                var temp = cmd.ToString();
                eval(cmd.ToString());
            };
        };

        var setRoute = function(path, template) {
            if(isStart)
                return;

            if(!path) path = '';
            if(!isString(path) || (!isString(template) && !isObject(template)))
                return;

            if(!_router.routes)
                _router.routes = new Array();

            var component;
            if(isString(template))
                component = { template: template,  data: function() {return {_activity_path: path}}};
            else if(isObject(template)) {
                Vue_Contorller.addVar(template, "_activity_path", path);
                component = Vue_Contorller.build(template);
            }

            var route = {
                path: path, component: component,
            };
            _router.routes.push(route);
        };

        var tiggerFunc = function(func) {
            if(!isStart)
                return;

            if(!isString(func))
                return;
            var cmd = new StringBuffer();

            cmd.Append("vue.$store.commit(func");
            for(var i = 1; i < arguments.length; i++)
                cmd.Append(", arguments[" + i + "]");
            cmd.Append(")");
            var temp = cmd.ToString();
            eval(cmd.ToString());
        };

        var getActivity = function(path) {
            if(!isString(path) || !isStart || !isObject(vue))
                return;

            if(vue.$children) {
                for (var i = 0; i < vue.$children.length; i++) {
                    if(vue.$children[i]._activity_path === path) {
                        return vue.$children[i];
                    }
                }
            }
        };

        var getID = function() {
            return aid++;
        };

        return {
            // param
            //$vue: vue, 
            isStart: isStart, 

            //function
            start: start, 
            setDatabase: setState, 
            addFunction: setMutations, 
            addActivity: setRoute,
            getActivity: getActivity,
            tiggerFunc: tiggerFunc, 
            requestID: getID,

            // key event
            onAppKeyUp: onAppKeyUp,
            onAppKeyDown: onAppKeyDown,
        }
    }
) ();