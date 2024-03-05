import AddEntity from "../pages/admin/AddEntity.js";
import EditEntity from "../pages/admin/EditEntity.js";
import AdminModule from "../pages/admin/Admin.js";
import Dashboard from "../pages/dashboard/Dashboard.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

// export const navigateTo = (url) => {
//   history.pushState(null, null, url);
//   router();
// };

export const router = async () => {
  // console.log("/edit-entity/asdasd".match(/^\/edit-entity\/(.+)$/));
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/admin", view: AdminModule },
    { path: "/add-entity", view: AddEntity },
    { path: "/edit-entity/:id", view: EditEntity },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );
  console.log(getParams(match));

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }
  const view = new match.route.view(getParams(match));

  //? document.querySelector("#root").innerHTML = await view.getHtml();
  const layout = document.querySelector("att-layout");
  const newPage = await view.getHtml();
  const oldPage = layout.querySelector(".page");
  if (oldPage) {
    layout.replaceChild(newPage, oldPage);
  } else {
    layout.append(newPage);
  }
};
