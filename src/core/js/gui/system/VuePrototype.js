'use strict'

function VuePrototype() {
    
}

VuePrototype.extend = function(extend_ui) {
    VueContorller.extend(this, extend_ui);
};

VuePrototype.build = function() {
    return VueContorller.build(this);
};

VuePrototype.addVar = function(name, value) {
    VueContorller.addVar(this, name, value);
};

VuePrototype.addItem = function(name, obj) {
    VueContorller.addItem(this, name, obj);
};

VuePrototype.syncLoadHtml = function(url, timeout) {
    VueContorller.syncLoadHtml(url, timeout);
};

VuePrototype.addClass = function(classStr) {
    VueContorller.addClass(this, classStr);
};

VuePrototype.addStyle = function(name, styleStr) {
    VueContorller.addStyle(this, name, styleStr);
};

VuePrototype.addAttribute = function(name, str) {
    VueContorller.addAttribute(this, name, str);
};

VuePrototype.addProps = function(name, prop) {
    VueContorller.addProps(this, name, prop);
};

VuePrototype.addMethod = function(name, func) {
    VueContorller.addMethod(this, name, func);
};

VuePrototype.addWatch = function(name, func) {
    VueContorller.addWatch(this, name, func);
};

VuePrototype.addComputed = function(name, func) {
    VueContorller.addComputed(this, name, func);
};