'use strict'

function Image(src, css) {
    extendStaticFunc(this, VuePrototype);
    this.extend(new View());

    this.addVar("tag", "img");
    this.addVar("src", src);
    this.addVar("css", css);

    this.addAttribute(":src", "src");
    this.addAttribute(":class", "css");
}
