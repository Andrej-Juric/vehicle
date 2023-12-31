import { Form } from "mobx-react-form";
import makesStore from "@/stores/MakesStore";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

class CreateMakeForm extends Form {
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
          placeholder: "Add vehicle name",
          rules: "required|string|between:5,25",
          value: "",
        },
        {
          name: "abrv",
          label: "Abbreviation",
          placeholder: "Add vehicle abbreviation",
          rules: "required|string|between:3,10",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        alert("Form is valid! Send the request here.");
        const { name, abrv } = form.values();
        makesStore.createMakes({ name, abrv });
        console.log("Form Values!", form.values());

        makesStore.fetchMakes();
      },
      onError(form) {
        alert("Form has errors!");
        console.log("All form errors", form.errors());
      },
    };
  }
}

const createForm = new CreateMakeForm();
export default createForm;
