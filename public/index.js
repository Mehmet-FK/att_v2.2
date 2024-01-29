import "./components/layout/layout.comp.js";
import "./components/dashboard/dashboard.comp.js";
import "./components/Store.js";
import "./router/router.js";
import "./components/BaseComponent.js";
import View from "./pages/View.js";
import { router } from "./router/router.js";

window.addEventListener("popstate", () => {
  document
    .querySelector("att-layout")
    .setAttribute("url", window.location.pathname);
  router();
});

let currentState = window.history.state;

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (currentState?.path !== window.history.state?.path) {
      currentState = window.history.state;
      document
        .querySelector("att-layout")
        .setAttribute("url", window.location.pathname);
    }
  });

  router(View);
});
