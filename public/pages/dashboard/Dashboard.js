import BasePage from "../BasePage.js";

export default class Dashboard extends BasePage {
  constructor(params) {
    super();
    this.params = params;
    this.pageUrl = "./pages/dashboard/dashboard.html";
  }
}
