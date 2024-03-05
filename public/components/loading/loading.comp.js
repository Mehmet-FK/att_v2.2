const loadingTemplate = document.createElement("template");

loadingTemplate.innerHTML = `
<style>@import url(/components/loading/loading.css)</style>

        <div class="loading-background">

        <img src="/assets/loading.svg" />
            
        </div>

`;

class Loading extends HTMLElement {
  static observedAttributes = ["isloading"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(loadingTemplate.content.cloneNode(true));
    this.setAttribute("isloading", true);
  }

  dataFetchedEvent = () => {
    this.setAttribute("isloading", false);
  };

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name + " : " + oldValue + " => " + newValue);
    if (this.getAttribute("isloading") == "true") {
      this.style.display = "block";
    } else {
      setTimeout(() => {
        this.style.display = "none";
      }, 750);
    }
  }

  connectedCallback() {
    const layout = document.querySelector("att-layout");
    layout.addEventListener("data-fetched", this.dataFetchedEvent);
  }
  disconnectedCallback() {
    const layout = document.querySelector("att-layout");
    layout.removeEventListener("data-fetched", this.dataFetchedEvent);
  }
}

customElements.define("att-loading", Loading);
