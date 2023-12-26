import makesStore from "@/stores/MakesStore";
import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

class EditMakeForm extends Form {
  constructor(makeId) {
    super();
    this.makeId = makeId;
  }

  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }

  setup() {
    return {
      fields: [
        {
          name: "name",
          label: "Name",
          placeholder: "Name",
          rules: "required|string|between:4,25",
          value: "",
        },
        {
          name: "abrv",
          label: "Abbreviation",
          placeholder: "Abrv",
          rules: "required|string|between:3,10",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: (form) => {
        console.log(this.makeId, "this.makeId u form.js");
        alert("Form is valid! Send the request here.");
        const { name, abrv } = form.values();
        makesStore.editMakes({ id: this.makeId, name, abrv });
        console.log("Form Values!", form.values());
      },
      onError: (form) => {
        alert("Form has errors!");
        console.log("All form errors", form.errors());
      },
    };
  }
}

const editMakeForm = new EditMakeForm();
export default editMakeForm;
