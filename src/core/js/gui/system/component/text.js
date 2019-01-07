'use strict'

function Text(text, css) {
    extendStaticFunc(this, VuePrototype);
    this.extend(new View());

    this.addVar("text", text);
    this.addVar("css", css);

    this.addAttribute("v-text", "text");
    this.addAttribute(":class", "css");
}