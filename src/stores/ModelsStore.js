// stores/MakesStore.js
import { makeObservable, observable, action } from "mobx";

class ModelsStore {
  models = [];

  constructor() {
    makeObservable(this, {
      models: observable,
      setModels: action,
    });
  }

  async fetchMakes() {
    try {
      const response = await fetch("");
      const data = await response.json();

      this.setMakes(data);
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  }

  setModels(models) {
    this.models = models;
  }
}

const modelsStore = new ModelsStore();
export default modelsStore;
