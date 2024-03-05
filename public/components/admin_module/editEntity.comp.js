import { Store } from "../../store/Store.js";
import { AddEntity, AddEntityForm, AddField } from "./addEntity.comp.js";

class EditEntity extends AddEntity {
  constructor() {
    super();
  }

  setEntityValues() {
    const urlId = location.pathname.split("/").pop(-1); // Get the ID from URL path
    const [entity] = Store.entityData?.filter((item) => item.id === urlId);
    this.querySelector("[name='name']").setAttribute("value", entity.name);
    this.querySelector("[name='caption']").setAttribute(
      "value",
      entity.caption
    );
    this.querySelector("[name='iconURL']").setAttribute(
      "value",
      entity.iconUrl
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.setEntityValues();
  }
}

class EditField extends AddField {
  constructor() {
    super();
  }

  createFieldGroups() {
    const urlId = location.pathname.split("/").pop(-1); // Get the ID from URL path

    const fieldsFromStore = Store.entityData?.filter(
      (item) => item.id === urlId
    )[0].fields;
    fieldsFromStore.forEach((item) => {
      const fieldObject = super.createFieldGroup(item.id);
      const element = fieldObject.htmlElement;
      element.querySelector("[name='name']").setAttribute("value", item.name);
      element
        .querySelector("[name='caption']")
        .setAttribute("value", item.caption);
      element
        .querySelector("[name='length']")
        .setAttribute("value", item.length);
      element.querySelector("[name='type']").setAttribute("value", item.type);
      this._childs.push({ id: item.id, htmlElement: element });
    });
  }
  connectedCallback() {
    this.createFieldGroups();
    super.connectedCallback();
  }
}

class EditEntityForm extends AddEntityForm {
  constructor() {
    super();
  }

  setFormChilds() {
    this.shadowRoot.querySelector(".forms-wrapper").innerHTML = `
    <att-editentity header="entity form"></att-editentity>
    <att-editfield header="field form"></att-editfield>
    `;
  }

  handleSubmit() {
    const entityValues = this.getEntityValues("att-editentity");
    const fieldValues = this.getFieldValues("att-fieldgroup");
    //TODO: Do something with these values
    console.log(entityValues);
    console.log(fieldValues);
  }
}

//* COMPONENTS REGISTRATION
customElements.define("att-editentityform", EditEntityForm);

customElements.define("att-editentity", EditEntity);
customElements.define("att-editfield", EditField);

//* COMPONENTS REGISTRATION
