import BaseComponent from "../BaseComponent.js";
import { Store } from "../../store/Store.js";

//? ================================================ */
//! PAGE UTILITY BAR
//? ================================================ */

const utilBarTemplate = document.createElement("template");
utilBarTemplate.innerHTML = `
<style>@import url("./components/admin_module/admin-module.css") </style>
    <div class="utilbar-container" >
        <div class="searchbar-wrapper">
            <span class="icon-wrapper">
                <img src="./assets/icons/search.svg" alt="search-icon" />
            </span>
            <input type="text" class="searchbar" placeholder="Suchbegriff eingeben" />
        </div>
    <a href="/add-entity" class="btn btn-primary w-25" id="add-new-btn">Neu Anlegen</a>   
    </div>
`;

class UtilityBar extends BaseComponent {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(utilBarTemplate.content.cloneNode(true));
    this.searchbar = this.shadowRoot.querySelector(".searchbar");
  }
  addNewEvent = () => {
    console.log("CLICKED");
  };

  connectedCallback() {
    const btn = this.shadowRoot.getElementById("add-new-btn");
    btn.addEventListener("click", this.addNewEvent);
  }

  disconnectedCallback() {
    const btn = this.shadowRoot.getElementById("add-new-btn");
    btn.removeEventListener("click", this.addNewEvent);
  }
}

//? ================================================ */
//! ENTITY CARD COMPONENT
//? ================================================ */

const entityCardTemplate = document.createElement("template");
entityCardTemplate.innerHTML = `
<style> @import url("/components/admin_module/admin-module.css") </style>
<a href="/edit-entity" >
  <div class="card" >
      <div class="card-body"> 
          <h5 class="card-title pb-3">Entity Name</h5>
          <img src="https://cdn-icons-png.flaticon.com/512/14373/14373736.png" class="card-icon" alt="icon" />
          <h6 class="card-subtitle mb-2 text-body-secondary">Entity subtitle</h6>
          <span class="created-date">Created Date</span>
          <span class="created-by">By <username></span>
      </div>
  </div>
</a>
`;
class EntityCard extends BaseComponent {
  _fields = ["asdas"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(entityCardTemplate.content.cloneNode(true));
  }
  setAttributes() {
    const entityName = this.getAttribute("entity-name");
    const iconUrl = this.getAttribute("icon-url");
    const createdDate = this.getAttribute("created-date");
    const createdBy = this.getAttribute("created-by");

    const cardBody = this.shadowRoot.querySelector(".card-body");

    cardBody.querySelector("h5").innerText = entityName || "Entity Name";
    cardBody.querySelector(".card-icon").src = iconUrl;
    cardBody.querySelector(".card-icon").alt = entityName + " icon";
    cardBody.querySelector(".created-date").innerText =
      "Created Date: " + (createdDate || "");
    cardBody.querySelector(".created-by").innerText =
      "Created By: " + (createdBy || "");

    cardBody.closest("a").href = "/edit-entity" + "/" + this.getAttribute("id");
  }

  connectedCallback() {
    // Set Component Attributes
    this.setAttributes();
    // Set grid layout classes
    this.className = "col-xl-4 col-lg-6";
  }
}

//* COMPONENTS REGISTRATION
customElements.define("att-utilbar", UtilityBar);
customElements.define("att-entity-card", EntityCard);

//* COMPONENTS REGISTRATION
