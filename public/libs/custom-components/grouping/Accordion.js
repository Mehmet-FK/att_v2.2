const accordionTemplate = document.createElement("template");
accordionTemplate.innerHTML = `
<style>@import url("/libs/custom-components/grouping/grouping.css") </style>
<div class="dropdown-container open">
    <header>
        <h5>Group Title</h5>
        <span class="expand">✖</span>
    </header>
    <div class="content">
        <div class="content-inner">
        </div>

    </div>
</div>
`;

export default class AccordionBase extends HTMLElement {
  /**
   * Stores the children HTML elements.
   * To use it properly it is needed to create an element and push into this array
   */
  _childs = [];
  _template = accordionTemplate;

  constructor() {
    super();
    this.appendChild(accordionTemplate.content.cloneNode(true));
  }

  createStyle(content) {
    const style = document.createElement("style");
    style.innerHTML = content;
    return { htmlElement: style };
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  /**
   * Selects content container div  where will be added the child nodes.
   *
   */
  appendChildElements() {
    if (!this._childs) return;
    const contentInner = this.querySelector(".content-inner");
    this._childs.forEach((el) => contentInner.appendChild(el.htmlElement));
  }
  /**
   * Gets the attributes and sets them in a property of the component.
   * If there are no attributes then it sets defaults
   */

  setAttributes() {
    const title = this.querySelector("header h5");

    // set header title
    title.innerText = this.getAttribute("header") || "Title";
  }

  //EVENTS
  handleAccordion() {
    const container = this.querySelector(".dropdown-container");
    const isOpen = container.classList.contains("open");
    const content = container.querySelector(".content");

    if (isOpen) {
      container.classList.remove("open");
      // content.style.maxHeight = "0px";
    } else {
      container.classList.add("open");
      // content.style.maxHeight = "8000vh";
    }
  }

  connectedCallback() {
    const header = this.querySelector("header");

    this.setAttributes();

    header.addEventListener("click", () => this.handleAccordion());
    this.appendChildElements();
  }
  disconnectedCallback() {
    const header = this.querySelector("header");
    header.removeEventListener("click", () => this.handleAccordion());
  }
}
