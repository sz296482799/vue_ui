'use strict'

function HtmlView() {
    this._html = new StringBuffer();
}

HtmlView.prototype.html = function(str) {
    this._html.clear();
    if(isString(str))
        this.appendHtml(str);
};

HtmlView.prototype.appendHtml = function(str) {
    if(isString(str))
         this._html.Append(str);
};

HtmlView.prototype.htmlToString = function() {
    this.template = this._html.ToString();
    this.html();
};