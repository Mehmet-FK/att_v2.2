const selectTemplate = document.createElement("template");
selectTemplate.innerHTML = `
<style>@import url("/libs/custom-components/forms/forms.css") </style>
    <div class="basic-select">
        <select id="select">
                <option value="" selected disabled hidden></option>
        </select>
        <label for="select">Select</label>
        <span class="select-arrow">▼</span>
    </div>
`;

export default class SelectBase extends HTMLElement {
  static observedAttributes = ["value", "width", "height"];
  _optionsData = [
    {
      value: "varchar",
      text: "varchar",
      disabled: false,
      selected: false,
      hidden: false,
    },
    {
      value: "integer",
      text: "integer",
      disabled: false,
      selected: false,
      hidden: false,
    },
    {
      value: "boolean",
      text: "boolean",
      disabled: false,
      selected: false,
      hidden: false,
    },
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(selectTemplate.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const container = this.shadowRoot.querySelector(".basic-select");
    const select = this.shadowRoot.querySelector("select");
    if (name == "width") {
      container.style.width = newValue;
    } else if (name == "height") {
      container.style.height = newValue;
    } else if (name == "value") {
      select.value = newValue;
      container.classList.add(newValue ? "focused" : "");
    }
  }

  createOptions() {
    const select = this.shadowRoot.querySelector("select");

    this._optionsData.map((opt) => {
      const element = document.createElement("option");
      element.setAttribute("value", opt.value);
      element.textContent = opt.text;
      element.disabled = opt.disabled ? true : false;
      element.selected = opt.selected ? true : false;
      element.hidden = opt.hidden ? true : false;
      select.appendChild(element);
    });
  }

  setAttributes() {
    const selectID = `id-${Math.random().toString(36).substr(2, 5)}`;
    const container = this.shadowRoot.querySelector(".basic-select");
    const select = this.shadowRoot.querySelector("select");
    const label = this.shadowRoot.querySelector("label");

    // set width and height
    container.style.width = this.getAttribute("width") || "100%";
    container.style.height = this.getAttribute("height");

    //set for and id attributes
    label.setAttribute("for", selectID);
    select.setAttribute("id", selectID);

    // set name
    select.setAttribute("name", this.getAttribute("name"));

    // set value
    select.setAttribute("value", "");

    //set label
    label.innerText = this.getAttribute("label");

    //set default option
    if (this.getAttribute("default-option")) {
      const defaultOption = {
        value: "",
        text: this.getAttribute("default-option"),
        disabled: true,
        selected: true,
        hidden: true,
      };
      this._optionsData.splice(0, 0, defaultOption);
    }
  }

  //EVENTS
  onChange(e) {
    this.setAttribute("value", e.target.value);
  }

  focusIn(select) {
    select.querySelector(".select-arrow").classList.add("select-open");
    select.classList.add("focused");
  }

  focusOut(select) {
    select.querySelector(".select-arrow").classList.remove("select-open");
    if (!this.getAttribute("value")) {
      select.classList.remove("focused");
    }
  }

  connectedCallback() {
    this.setAttributes();
    this.createOptions();
    const select = this.shadowRoot.querySelector("select");
    select.addEventListener("change", (e) => this.onChange(e));
    select.addEventListener("focusin", (e) =>
      this.focusIn(select.parentElement)
    );
    select.addEventListener("focusout", (e) =>
      this.focusOut(select.parentElement)
    );
  }
  disconnectedCallback() {
    const select = this.shadowRoot.querySelector("select");
    select.removeEventListener("change", this.onChange);
    select.removeEventListener("focusin", () =>
      this.focusIn(select.parentElement)
    );
    select.removeEventListener("focusout", () =>
      this.focusOut(select.parentElement)
    );
  }
}
