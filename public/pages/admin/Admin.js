import BasePage from "../BasePage.js";
import { Store } from "../../store/Store.js";
export default class AdminModule extends BasePage {
  constructor(params) {
    super();
    this.params = params;
    this.pageUrl = "/pages/admin/admin.html";
  }

  changeDom() {
    const cardContainer = this.html.querySelector("#card-container");
    Store.entityData.forEach((entity) => {
      cardContainer.innerHTML += ` 
      <att-entity-card 
        entity-name= "${entity.name}"
        caption=" ${entity.caption}"
        icon-url = "${entity.iconUrl}"
        created-date="${entity.createdDate}"
        created-by="${entity.createdBy}"
        id=${entity.id}
        >
        </att-entity-card>
       `;
    });
  }
}
