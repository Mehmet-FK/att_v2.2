const tableTemplate = document.createElement("template");

tableTemplate.innerHTML = `
<style>@import url(./components/layout/layout.css)</style>

    <table></table>

`;

class Table extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tableTemplate.content.cloneNode(true));
  }
}

const tableHeadTemplate = document.createElement("template");

tableHeadTemplate.innerHTML = `
<style>@import url(./components/layout/layout.css)</style>

    <thead></thead>

`;

class TableHead extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tableHeadTemplate.content.cloneNode(true));
  }
}

const tableBodyTemplate = document.createElement("template");

tableBodyTemplate.innerHTML = `
<style>@import url(./components/layout/layout.css)</style>

    <tbody></tbody>

`;

class TableBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tableBodyTemplate.content.cloneNode(true));
  }
}

const tableRowTemplate = document.createElement("template");

tableRowTemplate.innerHTML = `
<style>@import url(./components/layout/layout.css)</style>

    <tr></tr>
`;
class TableRow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tableRowTemplate.content.cloneNode(true));
  }
}

const tableCellTemplate = document.createElement("template");

tableCellTemplate.innerHTML = `
<style>@import url(./components/layout/layout.css)</style>

    <td></td>

`;

class TableCell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tableCellTemplate.content.cloneNode(true));
  }
}
