'use strict'

function isObject(val) {
    if( jQuery.type(val) === "object" ) {
        return true;
    }
    return false;
}

function isArray(val) {
    if( jQuery.type(val) === "array" ) {
        return true;
    }
    return false;
}

function isString(val) {
    if( jQuery.type(val) === "string" ) {
        return true;
    }
    return false;
}

function isFunction(val) {
    if( jQuery.type(val) === "function" ) {
        return true;
    }
    return false;
}

function isUndefined(val) {
    if( jQuery.type( val ) === "undefined" ) {
        return true;
    }
    return false;
}

function isClassName(obj, name) {
    if(obj instanceof name) {
        return true;
    }
    return false;
}

function extend(Child, Parent) {
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}

function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (isObject(p[i])) {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

function StringBuffer() {
    this.__strings__ = [];
};
StringBuffer.prototype.Append = function (str) {
    this.__strings__.push(str);
    return this;
};
StringBuffer.prototype.AppendFormat = function (str) {
    for (var i = 1; i < arguments.length; i++) {
        var parent = "\\{" + (i - 1) + "\\}";
        var reg = new RegExp(parent, "g")
        str = str.replace(reg, arguments[i]);
    }
 
    this.__strings__.push(str);
    return this;
}
StringBuffer.prototype.ToString = function () {
    return this.__strings__.join('');
};
StringBuffer.prototype.clear = function () {
    this.__strings__ = [];
}
StringBuffer.prototype.size = function () {
    return this.__strings__.length;
}
