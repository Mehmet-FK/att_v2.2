export default class View {
  constructor(params) {
    this.params = params;
  }

  async getHtml() {
    // const html = await fetch("./pages/view.html").then((response) =>
    //   response.text()
    // );

    let html = ``;

    switch (window.location.pathname) {
      case "/":
        html = `
        <att-layout>
          <att-dashboard>
          </att-dashboard>
        </att-layout>
        `;
        break;

      case "/vermessung":
        html = `
        <att-layout>
          <h1>VERMESSUNG</h1>
        </att-layout>
        `;
        break;

      default:
        break;
    }

    return html;
  }
}
