import modelsStore from "@/stores/ModelsStore";
import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

class EditModelForm extends Form {
  constructor(modelId) {
    super();
    this.modelId = modelId;
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
          placeholder: "Add model name",
          rules: "required|string|between:2,25",
          value: "",
        },
        {
          name: "makeId",
          label: "Make ID",
          rules: "required|string",
          value: "",
        },
        {
          name: "abrv",
          label: "Abbreviation",
          placeholder: "Add vehicle abbreviation",
          rules: "required|string|between:3,10",
          value: "",
        },
        {
          name: "fuelType",
          label: "Fuel Type",
          placeholder: "Add fuel type",
          rules: "required|string|between:3,10",
          value: "",
        },
        {
          name: "wheelType",
          label: "Wheel Type",
          placeholder: "Add wheel type",
          rules: "required|string|between:1,10",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: (form) => {
        console.log(this.modelId, "this.modelId u form.js");
        alert("Form is valid! Send the request here.");
        const { name, abrv, fuelType, wheelType, makeId } = form.values();
        modelsStore.editModels({
          id: this.modelId,
          name,
          abrv,
          fuelType,
          wheelType,
          makeId,
        });
        console.log("Form Values!", form.values());
      },
      onError: (form) => {
        alert("Form has errors!");
        console.log("All form errors", form.errors());
      },
    };
  }
}

const editModelForm = new EditModelForm();
export default editModelForm;
