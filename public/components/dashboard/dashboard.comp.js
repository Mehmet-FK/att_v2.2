import BaseComponent from "../BaseComponent.js";
import { Store } from "../Store.js";

const dashboardTemplate = document.createElement("template");
dashboardTemplate.innerHTML = `
<style> @import url(./components/dashboard/dashboard.css) </style>
<div class="container">
    <div class="grid-container">

        
    </div>
</div>
`;

class Dashboard extends BaseComponent {
  static _data;
  static page;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(dashboardTemplate.content.cloneNode(true));
  }

  prepareCards = (modules) => {
    const container = this.shadowRoot.querySelector(".grid-container");

    modules.forEach((module) => {
      const card = document.createElement("att-card");
      card.setAttribute("title", module.groupTitle);
      card.setAttribute("description", module.groupTitle);
      card.setAttribute("image", module.img);

      module.subModules.forEach((item) => {
        const btn = document.createElement("card-btn");
        btn.setAttribute("color", item.color);
        btn.setAttribute("icon", item.icon);
        btn.setAttribute("name", item.name);

        card.shadowRoot.querySelector(".btn-wrapper").append(btn);
      });
      container.append(card);
    });
  };

  connectedCallback() {
    const layout = document.querySelector("att-layout");
    console.log("first");
    layout.addEventListener("data-fetched", (e) => {
      this._data = Store.data.dashboard;
      console.log(Store.data.dashboard);
      this.prepareCards(Store.data.dashboard);
    });
  }
}

customElements.define("att-dashboard", Dashboard);

const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
<style> @import url(./components/dashboard/dashboard.css) </style>
        <div class="card">
            <div class="card bg-img"></div>
            <div class="info">
              <h3></h3>
              <p></p>
            </div>
         <div class="card modules-wrapper">
              <div class="btn-wrapper">
     
            </div> 
          </div>

`;

class Card extends BaseComponent {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(
      "div.bg-img"
    ).style.backgroundImage = `url(${this.getAttribute("image")}`;
    this.shadowRoot.querySelector("h3").innerHTML = this.getAttribute("title");
    this.shadowRoot.querySelector("p").innerHTML =
      this.getAttribute("description");
  }
}

customElements.define("att-card", Card);

const moduleBtnTemplate = document.createElement("template");
moduleBtnTemplate.innerHTML = `
<style> @import url(./components/dashboard/dashboard.css)</style>
<a href="">
              <div class="module-btn">
                      <img src="">
                      <p></p>
              </div>
</a>
`;
class ModuleButton extends BaseComponent {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(moduleBtnTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".module-btn").style.backgroundColor =
      this.getAttribute("color");
    this.shadowRoot.querySelector("a").href = this.getAttribute("name")
      .toLowerCase()
      .replace(" ", "-");
    this.shadowRoot
      .querySelector("img")
      .setAttribute("src", this.getAttribute("icon"));
    this.shadowRoot.querySelector("p").innerHTML = this.getAttribute("name");
    this.navigate();
  }
}
customElements.define("card-btn", ModuleButton);
