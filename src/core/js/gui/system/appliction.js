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

        var onAppKeyUp = function(event) {
            var activity = getActivity();

            if(!isObject(activity) || !isFunction(activity.touchKeyUp) || !activity.touchKeyUp(event)) {
                
            }
        };

        var onAppKeyDown = function(event) {
            var activity = getActivity();

            if(!isObject(activity) || !isFunction(activity.touchKeyDown) || !activity.touchKeyDown(event)) {
                
            }
        };

        var start = function(id) {
            var _jqhtml;
            var store, router, computed;

            if(isStart || !isString(id))
                return;
            
            _jqhtml = $("#" + id);
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
                eval(cmd.ToString());
            };
        };

        var setRoute = function(path, data) {
            if(isStart)
                return;

            if(!path) path = '';
            if(!isString(path) || (!isString(data) && !isObject(data)))
                return;

            if(!_router.routes)
                _router.routes = new Array();

            var component;
            if(isString(data))
                component = { template: data,  data: function() {return {_activity_path: path}}};
            else if(isActivity(data)) {
                data.addVar("_activity_path", path);
                component = data.build();
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
            if(!isStart || !isObject(vue))
                return;

            if(!isString(path) && isObject(vue._route) && isString(vue._route.path))
                path = vue._route.path;
            else
                return;

            if(vue.$children) {
                for (var i = 0; i < vue.$children.length; i++) {
                    if(vue.$children[i]._data._activity_path === path) {
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