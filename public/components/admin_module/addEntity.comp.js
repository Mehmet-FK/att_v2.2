import AccordionBase from "../../libs/custom-components/grouping/Accordion.js";
import TextFieldBase from "../../libs/custom-components/forms/TextField.js";
import SelectBase from "../../libs/custom-components/forms/Select.js";
import BaseComponent from "../BaseComponent.js";

//
//
//==============================================================
//* Entity form to create Entities
//==============================================================
//
//
export class AddEntity extends AccordionBase {
  static observedAttributes = ["submitted"];
  _inputVal = {};
  constructor() {
    super();
    const styleElement = this.createStyle(
      `@import url("/components/admin_module/admin-module.css")`
    );
    this._childs.push(styleElement);
    const entityForm = this.createEntityForm();
    this._childs.push(entityForm);
  }

  onSubmit() {
    const inputs = this.querySelectorAll("att-textfield");
    for (const input of inputs) {
      const name = input.getAttribute("name");
      const value = input.getAttribute("value");
      this._inputVal = { ...this._inputVal, [name]: value };
    }
    return this._inputVal;
  }

  /**
   * Creates Entity Form (3x att-textfield elements)
   * @returns HTMLElement => div with textfields
   */

  createEntityForm() {
    // Create new form
    const newForm = document.createElement("div");
    // Add bootstrap classes
    newForm.classList.add("row", "g-1", "mb-3");
    newForm.innerHTML = `
    <att-textfield type="text" label="Name" required="true" class="col-4" name="name"> </att-textfield>
    <att-textfield type="text" label="Caption" required="true" class="col-4" name="caption"> </att-textfield>
    <att-textfield type="text" label="Icon URL" required="true" class="col-4" name="iconURL"> </att-textfield>
    `;
    return {
      htmlElement: newForm,
    };
  }
}
//
//
//==============================================================
//* Field Group Component
//==============================================================
//
//

const fieldGroupTemplate = document.createElement("template");
fieldGroupTemplate.innerHTML = `
  <div class = "row gx-1 gy-2 mb-2 rounded pb-4 px-3 field-info">
    <div class="form-close-btn-wrapper">
      <span class="form-close-btn" data-gid="">✖</span> 
    </div>
    <att-textfield type="text" label="Name" required="true" class="col-4"  name="name"> </att-textfield>
    <att-textfield type="text" label="Caption" required="true" class="col-4" name="caption"> </att-textfield>
    <att-textfield type="text" label="Länge" required="true" class="col-4" name="length"> </att-textfield>
    <att-select label="Typ" class="col-4" name="type"></att-select>
  </div>
`;

class FieldGroup extends HTMLElement {
  _inputVal = {};
  constructor() {
    super();
    this.appendChild(fieldGroupTemplate.content.cloneNode(true));
  }

  initializeGroup() {
    const closeBtn = this.querySelector(".form-close-btn");
    closeBtn.setAttribute("data-gid", this.getAttribute("id"));
  }

  onSubmit() {
    const inputs = this.querySelectorAll("att-textfield");
    const selects = this.querySelectorAll("att-select");
    for (const input of inputs) {
      const name = input.getAttribute("name");
      const value = input.getAttribute("value");
      this._inputVal = { ...this._inputVal, [name]: value };
    }
    for (const select of selects) {
      const name = select.getAttribute("name");
      const value = select.getAttribute("value");
      this._inputVal = { ...this._inputVal, [name]: value };
    }

    return this._inputVal;
  }

  connectedCallback() {
    this.initializeGroup();
  }
}

//
//
//==============================================================
//* FIELDS FORM to create fields  for entities
//==============================================================
//
//

export class AddField extends AccordionBase {
  _formValue = [];

  constructor() {
    super();
  }

  createFieldGroup(id) {
    //assign group id to determine
    const groupID = `id-${Math.random().toString(36).substr(2, 10)}`;
    //Since it is problematic to create custom elements directly a temporary container is necessary
    const newFieldGroup = document.createDocumentFragment();
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = `<att-fieldgroup id=${
      id ? id : groupID
    }></att-fieldgroup>`;
    newFieldGroup.appendChild(tempContainer.firstChild);
    return {
      id: groupID,
      htmlElement: newFieldGroup,
    };
  }

  //************************
  //EVENTS
  //************************

  //ADD NEW FIELD GROUP

  handleAddField() {
    const fieldObject = this.createFieldGroup();
    this._childs.push(fieldObject);
    const container = this.querySelector(".content-inner");
    //Append to the container
    container.appendChild(fieldObject.htmlElement);
  }

  //DELETE FIELD GROUP
  handleDeleteField(e) {
    const isCloseBtn = e.target.getAttribute("data-gid") !== null;
    if (!isCloseBtn) return;

    // Get the field group NodeList
    const fields = e.target
      .closest(".content-inner")
      .querySelectorAll(".field-info");

    // Convert NodeList to Array
    const fieldsArray = Array.from(fields);

    const targetID = e.target.getAttribute("data-gid");

    // Update _childs array
    this._childs = fieldsArray.filter((f) => f.id !== targetID);
    // Remove Group
    e.target.closest(`#${targetID}`).remove();
  }

  connectedCallback() {
    const styleElement = this.createStyle(
      `@import url("/components/admin_module/admin-module.css")`
    );
    const fieldGroup = this.createFieldGroup();
    this._childs.push(styleElement);
    this._childs.push(fieldGroup);
    super.connectedCallback();

    // Select fields container
    const fieldsContainer = this.querySelector(".content-inner");

    // Create addField button
    const addBtn = document.createElement("span");
    addBtn.classList.add("btn", "btn-primary", "mb-3", "me-3", "add-field-btn");
    addBtn.textContent = "+";
    this.querySelector(".content").appendChild(addBtn);

    // add event to the addField button
    addBtn.addEventListener("click", () => this.handleAddField());
    // Add event to the fields container
    fieldsContainer.addEventListener("click", (e) => this.handleDeleteField(e));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    //Select elements
    const fieldsContainer = this.querySelector(".content-inner");
    const addBtn = this.querySelector(".add-field-btn");

    //Remove Event Listeners
    addBtn.removeEventListener("click", () => this.handleAddField());
    fieldsContainer.addEventListener("click", (e) => this.handleDeleteField(e));
  }
}
//
//
//==============================================================
//* ADD ENTITY FORM (FORM WRAPPER)
//==============================================================
//
//

const addEntityFormTemplate = document.createElement("template");

addEntityFormTemplate.innerHTML = `
<style> @import url("/components/admin_module/admin-module.css") </style>
<div class="form-container container p-3 min-vh-75">
  <div class="forms-wrapper">
    
  </div>
  <div class="submit-wrapper">
    <button>speichern</button>
  </div>
</div>
`;
export class AddEntityForm extends BaseComponent {
  _inputVal = {
    entity: {},
    fields: [],
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(addEntityFormTemplate.content.cloneNode(true));
  }

  getFieldValues(fieldComponent) {
    const fieldValues = [];
    const fieldGroups = this.shadowRoot.querySelectorAll(fieldComponent);

    for (const group of fieldGroups) {
      const groupValues = group.onSubmit();
      fieldValues.push(groupValues);
    }
    return fieldValues;
  }
  getEntityValues(entityComponent) {
    const entity = this.shadowRoot.querySelector(entityComponent);
    const entityValue = entity.onSubmit();
    return entityValue;
  }

  handleSubmit() {
    const entityValues = this.getEntityValues("att-addentity");
    const fieldValues = this.getFieldValues("att-fieldgroup");
    //TODO: Do something with these values
    console.log(entityValues);
    console.log(fieldValues);
  }

  /**
   * this class will be used as a superclass of EditEnitity class. therefore children has to be dynamically appended via this method
   */
  setFormChilds() {
    this.shadowRoot.querySelector(".forms-wrapper").innerHTML = `
    <att-addentity header="entity form"></att-addentity>
    <att-addfield header="field form"></att-addfield>
    `;
  }

  connectedCallback() {
    this.setFormChilds();
    const submitBtn = this.shadowRoot.querySelector(".submit-wrapper button");
    submitBtn.addEventListener("click", () => this.handleSubmit());
  }

  disconnectedCallback() {
    const submitBtn = this.shadowRoot.querySelector(".submit-wrapper button");
    submitBtn.removeEventListener("click", () => this.handleSubmit());
  }
}

class InputField extends TextFieldBase {
  constructor() {
    super();
  }
}

class SelectInput extends SelectBase {
  constructor() {
    super();
  }
}

//* COMPONENTS REGISTRATION

customElements.define("att-addentityform", AddEntityForm);
customElements.define("att-fieldgroup", FieldGroup);
customElements.define("att-addentity", AddEntity);
customElements.define("att-addfield", AddField);

customElements.define("att-textfield", InputField);
customElements.define("att-select", SelectInput);

//* COMPONENTS REGISTRATION
