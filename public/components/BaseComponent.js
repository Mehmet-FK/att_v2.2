export default class extends HTMLElement {
  constructor() {
    super();
  }
  navigate() {
    const anchors = this.shadowRoot.querySelectorAll("a");
    if (anchors.length) {
      anchors.forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          window.history.pushState({ path: a.href }, null, a.href);
        });
      });
    }
  }
}
