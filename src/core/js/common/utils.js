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

function isNumber(val) {
    if( jQuery.type( val ) === "number" ) {
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

function isExtendsClass(e, n) {
    while(isObject(e)) {
        if(isClassName(e, n))
            return true;
        e = e.extends;
    }
    return false;
}

function isView(ui) {
    return isExtendsClass(ui, View);
}

function isGroupView(ui) {
    return isExtendsClass(ui, GroupView);
}

function isActivity(ui) {
    return isExtendsClass(ui, Activity);
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

function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
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
