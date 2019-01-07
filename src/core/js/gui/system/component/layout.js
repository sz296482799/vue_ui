'use strict'

function LinearLayout(orientation, type) {
    extendStaticFunc(this, VuePrototype);
    if(!isFunction(type))
        type = GroupView;
    this.extend(new type());

    var ori = "v";//vertical
    if(orientation === "horizontal")
        ori = "h";
    this.addVar("orientation", ori);

    this.addWatch('indexFource', function(index, oldIndex) {
        if(isFunction(this.list_select)) {
            if(oldIndex !== -1)
                this.list_select(oldIndex, false);
            if(index !== -1)
                this.list_select(index, true);
        }
    })
}

LinearLayout.prototype.onCreate = function() {
    console.log("View onCreate");
    this.addClass("linear_layout_" + this.orientation);
}

LinearLayout.prototype.onKeyDown = function(event) {

    if(!this._isMounted) {
        return false;
    }
    var ret = false;
    var index = -1;

    var upLeft, downRight;
    var scrollWidth, clientWidth;
    var scrollStart, clientStart;

    if(this.orientation === "h") {
        upLeft = event.keyCode === 37;
        downRight = event.keyCode === 39;

        scrollWidth = "scrollWidth";
        clientWidth = "clientWidth";
        scrollStart = "scrollLeft";
        clientStart = "offsetLeft";
    }
    else {
        upLeft = event.keyCode === 38;
        downRight = event.keyCode === 40;

        scrollWidth = "scrollHeight";
        clientWidth = "clientHeight";
        scrollStart = "scrollTop";
        clientStart = "offsetTop";
    }

    if(upLeft) {
        index = (this.indexFource - 1);
        index = this.$children.length > index ? index : this.$children.length - 1;
        index = index >= 0 ? index : this.$children.length - 1;
    
        if(isFunction(this.getChildren)) {
            var children = this.getChildren(index);
            ret = isObject(children) ? isFunction(children.tryFocus) && children.tryFocus() : false;
        }
    }
    else if(downRight) {
        index = (this.indexFource + 1) % this.$children.length;
        index = this.$children.length > index ? index : this.$children.length - 1;
        
        if(isFunction(this.getChildren)) {
            var children = this.getChildren(index);
            ret = isObject(children) ? isFunction(children.tryFocus) && children.tryFocus() : false;
        }
    }

    if(index != -1) {
        var linerEl = this.$el;
        var itemEl = this.$children[index].$el;
        var scrollTop = linerEl[scrollStart];
        var offsetTop = itemEl[clientStart];

        var offset = offsetTop + itemEl[scrollWidth] - (scrollTop + linerEl[clientWidth]);
        if (offset > 0) {
            linerEl[scrollStart] += offset;
        }

        offset = scrollTop - offsetTop;
        if (offset > 0) {
            linerEl[scrollStart] -= offset;
        }
    }
    
    return ret;
}

