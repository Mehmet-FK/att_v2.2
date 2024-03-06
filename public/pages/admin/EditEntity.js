import BasePage from "/pages/BasePage.js";

export default class EditEntity extends BasePage {
  constructor(params) {
    super();
    this.params = params;
    this.pageUrl = "/pages/admin/edit-entity.html";
  }
}
