// stores/MakesStore.js
import { makeObservable, observable, action } from "mobx";

class MakesStore {
  makes = [];

  constructor() {
    makeObservable(this, {
      makes: observable,
      setMakes: action,
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

  setMakes(makes) {
    this.makes = makes;
  }
}

const makesStore = new MakesStore();
export default makesStore;
