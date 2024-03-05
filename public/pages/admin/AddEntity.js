import BasePage from "../BasePage.js";

export default class AddEntity extends BasePage {
  constructor(params) {
    super();
    this.params = params;
    this.pageUrl = "./pages/admin/add-entity.html";
  }
}
