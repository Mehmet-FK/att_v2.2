const iconTemplate = document.createElement("template");
iconTemplate.innerHTML = `
<img src="" alt=""/>

`;

class Icon extends HTMLElement {
  static observedAttributes = [
    "width",
    "height",
    "src",
    "radius",
    "border",
    "padding",
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(iconTemplate.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const el = this.shadowRoot.querySelector("img");
    if (name == "width") {
      el.style.width = newValue;
    } else if (name == "height") {
      el.style.height = newValue;
    } else if (name == "url") {
      el.setAttribute("src", newValue);
    } else if (name == "radius") {
      el.style.borderRadius = newValue;
    } else if (name == "border") {
      el.style.border = newValue;
    } else if (name == "padding") {
      el.style.padding = newValue;
    }
  }

  connectedCallback() {
    const el = this.shadowRoot.querySelector("img");
    el.style = `
    width: ${this.getAttribute("width")}; 
    height:${this.getAttribute("height")}; 
    background-image: url(${this.getAttribute("url")});
    border: ${this.getAttribute("border") || "none"};
    border-radius: ${this.getAttribute("radius") || "0%"};
    padding: ${this.getAttribute("padding") || "0"};`;

    el.setAttribute("src", this.getAttribute("src"));
  }
  disconnectedCallback() {}
}

customElements.define("att-icon", Icon);
