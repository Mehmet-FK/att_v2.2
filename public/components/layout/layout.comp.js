import { router } from "../../router/router.js";
import BaseComponent from "../BaseComponent.js";
import { Store, dummyModules } from "../../store/Store.js";

// const ASSETS_PATH = `${location.origin}/public/assets`;

const layoutTemplate = document.createElement("template");

// <att-loading></att-loading>
layoutTemplate.innerHTML = `
<style>@import url(/components/layout/layout.css)</style>
        <div class="layout">
            <nav class="navbar">
            
                <div class="navbar-container">
                  <div class="logo-wrapper">
                    <img class="open-icon" src="/assets/hamburger.svg" data-open="false" />
                    <a href="/admin" data-link >
                      <img class="navbar-logo" alt="logo" src="/assets/attensam-logo.svg" />
                    </a>
                  </div>
                </div>
            </nav>
            <div class="space">
              <img class="close-icon" src="/assets/expand.svg" data-open="false" />
            </div>
            <aside class="sidebar">
                <div class="container"></div>
            </aside>
            <div class="content">
                <slot>
              <!-- PAGES -->    

             

                </slot>
            </div>
           
        </div>


`;

class Layout extends BaseComponent {
  static observedAttributes = ["isopen", "url"];
  static _data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(layoutTemplate.content.cloneNode(true));
    this.setAttribute("url", window.location.pathname);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "url") {
      this.setLoading(true);

      this.getData().then((data) => {
        const event = new CustomEvent("data-fetched", { detail: { data } });
        this.dispatchEvent(event);
      });
      router();
      this.setLoading(false);
    }
  }

  setLoading(value) {
    const loading = document.querySelector("att-loading");
    loading.setAttribute("isloading", value);
  }

  async getData() {
    document.querySelector("att-loading").setAttribute("isloading", "true");

    const data = await fetch(
      "https://pbsolutions.dev/atina/api/AtinaMobileBookings?showPagination=true&pageNumber=1&pageSize=100"
    ).then((res) => res.json());
    const link =
      this.getAttribute("url") === "/"
        ? "/dashboard"
        : this.getAttribute("url");

    if (link === "/dashboard") {
      this._data = dummyModules;
    } else {
      this._data = dummyModules;
      // this._data = data?.entries;
    }
    Store.addData(link.replace("/", ""), this._data);
    return this._data;
  }

  openSidebar() {
    this.setAttribute("isopen", "true");

    const sidebar = this.shadowRoot.querySelector(".sidebar");
    const navbar = this.shadowRoot.querySelector(".navbar");
    const main = this.shadowRoot.querySelector(".content");
    const openBtn = this.shadowRoot.querySelector(".open-icon");
    const closeBtn = this.shadowRoot.querySelector(".close-icon");

    sidebar.style.width = "var(--sidebar-open-width)";
    navbar.style.left = "var(--sidebar-open-width)";
    main.style.marginLeft = "var(--sidebar-open-width)";

    openBtn.style.visibility = "hidden";
    closeBtn.style.visibility = "visible";
  }

  closeSidebar() {
    this.setAttribute("isopen", "false");

    const main = this.shadowRoot.querySelector(".content");
    const sidebar = this.shadowRoot.querySelector(".sidebar");
    const navbar = this.shadowRoot.querySelector(".navbar");
    const openBtn = this.shadowRoot.querySelector(".open-icon");
    const closeBtn = this.shadowRoot.querySelector(".close-icon");

    navbar.style.left = "0";
    sidebar.style.width = "var(--sidebar-close-width)";
    main.style.marginLeft = "var(--sidebar-close-width)";

    openBtn.style.visibility = "visible";
    closeBtn.style.visibility = "hidden";
  }

  connectedCallback() {
    this.navigate();
    this.getData().then((data) => {
      const event = new CustomEvent("data-fetched", { detail: { data } });
      this.dispatchEvent(event);
    });

    //** Sidebar event handler */

    const openBtn = this.shadowRoot.querySelector(".open-icon");
    const closeBtn = this.shadowRoot.querySelector(".close-icon");
    openBtn.addEventListener("click", (e) => this.openSidebar());
    closeBtn.addEventListener("click", (e) => this.closeSidebar());
  }

  render() {}
}

customElements.define("att-layout", Layout);
