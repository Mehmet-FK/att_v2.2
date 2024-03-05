export default class BasePage {
  html;
  pageUrl;
  constructor(params) {
    this.params = params;
  }

  /**
   * Runs right after the HTML content is loaded
   * use it to manipulate the html elements on the current page
   *   */
  changeDom() {}

  async getHtml() {
    await fetch(this.pageUrl)
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();

        const doc = parser.parseFromString(html, "text/html");
        this.html = doc.querySelector("main.page");
        this.changeDom();
      })
      .catch((err) => console.log(err));

    return this.html;
  }
}
