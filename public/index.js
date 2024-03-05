import "./components/layout/layout.comp.js";
import "./components/loading/loading.comp.js";
import "./components/dashboard/dashboard.comp.js";
import "./components/admin_module/admin.comp.js";
import "./components/admin_module/addEntity.comp.js";
import "./components/admin_module/editEntity.comp.js";
import "./store/Store.js";
import { router } from "./router/router.js";

let currentState = window.history.state;

window.addEventListener("popstate", () => {
  if (currentState?.path !== window.history.state?.path) {
    currentState = window.history.state;
    document
      .querySelector("att-layout")
      .setAttribute("url", window.location.pathname);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#root").addEventListener("click", (e) => {
    if (currentState?.path !== window.history.state?.path) {
      currentState = window.history.state;
      document
        .querySelector("att-layout")
        .setAttribute("url", window.location.pathname);
    }
  });

  router();
});
