import { Form } from "mobx-react-form";
import modelsStore from "@/stores/ModelsStore";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

class CreateModelForm extends Form {
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
          label: "Make",
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
      onSuccess(form) {
        alert("Form is valid! Send the request here.");
        const { name, abrv, fuelType, wheelType } = form.values();
        const makeId = form.$("makeId").value;

        if (!makeId) {
          alert("Please select a Make");
          return;
        }
        modelsStore.createModels({
          name,
          abrv,
          fuelType,
          wheelType,
          makeId,
        });
        console.log("Form Values!", form.values());

        modelsStore.fetchModels();
      },
      onError(form) {
        alert("Form has errors!");
        console.log("All form errors", form.errors());
      },
    };
  }
}

const createModelForm = new CreateModelForm();
export default createModelForm;
