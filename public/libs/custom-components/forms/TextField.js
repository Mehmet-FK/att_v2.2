const inputTemplate = document.createElement("template");
inputTemplate.innerHTML = `
<style>@import url("/libs/custom-components/forms/forms.css") </style>
  <div class="textfield">
    <input type="text" id="" class="outlined-textfield" >
    <label for="">Outlined TextField</label>
  </div>
`;

export default class TextFieldBase extends HTMLElement {
  static observedAttributes = [
    "width",
    "height",
    "label",
    "type",
    "name",
    "value",
    "required",
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(inputTemplate.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const el = this.shadowRoot.querySelector(".textfield");
    const input = this.shadowRoot.querySelector("input");
    const label = this.shadowRoot.querySelector("label");
    if (name == "width") {
      el.style.width = newValue;
    } else if (name == "height") {
      el.style.height = newValue;
    } else if (name == "label") {
      label.innerText = newValue;
    } else if (name == "type") {
      el.style.borderRadius = newValue;
    } else if (name == "value") {
      input.value = newValue;
      el.classList.add(newValue ? "focused" : "");
    }
  }

  inputOnChangeEvent(e) {
    this.setAttribute("value", e.target.value);
    this.onChange(e);
  }

  onChange(e) {}

  setInputAttributes() {
    const el = this.shadowRoot.querySelector(".textfield");
    const input = this.shadowRoot.querySelector("input");
    const label = this.shadowRoot.querySelector("label");
    const inputID = `id-${Math.random().toString(36).substr(2, 5)}`;
    el.style.width = this.getAttribute("width") || "100%";
    el.style.height = this.getAttribute("height");
    input.type = this.getAttribute("type") || "text";
    input.name = this.getAttribute("name");
    input.value = this.getAttribute("value");
    input.setAttribute(
      "required",
      this.getAttribute("required") ? true : false
    );
    input.setAttribute("id", inputID);
    label.setAttribute("for", inputID);
    label.innerText = this.getAttribute("label");
  }

  focusIn(textField) {
    textField.classList.add("focused");
  }

  focusOut(textField) {
    if (!textField.querySelector("input").value) {
      textField.classList.remove("focused");
    }
  }
  connectedCallback() {
    this.setInputAttributes();
    const input = this.shadowRoot.querySelector("input");
    const textField = this.shadowRoot.querySelector(".textfield");

    input.addEventListener("change", (e) => this.inputOnChangeEvent(e));

    textField.addEventListener("focusin", (e) => this.focusIn(textField));
    textField.addEventListener("focusout", (e) => this.focusOut(textField));
  }
  disconnectedCallback() {
    const textField = this.shadowRoot.querySelector(".textfield");
    const input = this.shadowRoot.querySelector("input");

    input.removeEventListener("change", (e) => this.inputOnChangeEvent(e));

    textField.removeEventListener("focusin", () => this.focusIn(textField));
    textField.removeEventListener("focusout", () => this.focusOut(textField));
  }
}
