import { makeObservable, observable, action } from "mobx";
import VehicleModelService from "@/services/VehicleModelService";
import makesStore from "@/stores/MakesStore";

class ModelsStore {
  models = [];
  selectedModel = null;
  fuelTypes = [];
  selectedFuelType = null;
  wheelTypes = [];
  selectedWheelType = null;
  editModelId = null;

  constructor() {
    makeObservable(this, {
      models: observable,
      selectedModel: observable,
      fuelTypes: observable,
      selectedFuelType: observable,
      wheelTypes: observable,
      selectedWheelType: observable,
      editModelId: observable,
      fetchModels: action,
      setModels: action,
      setSelectedModel: action,
      setFuelTypes: action,
      setSelectedFuelType: action,
      setWheelTypes: action,
      setSelectedWheelType: action,
      setEditModelId: action,
    });
  }

  async fetchModels() {
    try {
      let modelData;

      if (makesStore.selectedMake) {
        modelData = await VehicleModelService.search(makesStore.selectedMake);
      } else {
        modelData = await VehicleModelService.get();
      }

      this.setModels(modelData.item);
      this.setFuelAndWheelTypes(modelData.item);
    } catch (error) {
      console.error("Error fetching models data:", error);
    }
  }

  async fetchModels() {
    try {
      if (makesStore.selectedMake) {
        console.log(makesStore.selectedMake, "selectedMake");

        const modelData = await VehicleModelService.search(
          makesStore.selectedMake
        );
        this.setModels(modelData.item);
      } else {
        const modelData = await VehicleModelService.get();
        this.setModels(modelData.item);
      }
    } catch (error) {
      console.error("Error fetching models data:", error);
    }
  }

  async createModels({ name, abrv, fuelType, wheelType, makeId }) {
    try {
      const modelData = {
        abbreviation: abrv,
        name: name,
        fuel_type: fuelType,
        wheel_type: wheelType,
        makeId: makeId,
      };
      const createModel = await VehicleModelService.create(modelData);
    } catch (error) {
      console.error("Error creating models:", error);
    }
  }

  async editModels({ name, abrv, wheelType, fuelType, makeId }) {
    try {
      const makeData = {
        abbreviation: abrv,
        name: name,
        fuel_type: fuelType,
        wheel_type: wheelType,
        makeId: makeId,
      };
      await VehicleModelService.update(this.editModelId, makeData);
    } catch (error) {
      console.error("Error editing makes:", error);
    }
  }

  async fetchModelById(id) {
    try {
      console.log(id, "id u fetchModelbyId");
      const makeData = await VehicleModelService.getById(id);
      console.log(makeData, "modelData u fetchmakebyid");
      this.setSelectedModel(makeData);
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  }

  async deleteModel(id) {
    try {
      await VehicleModelService.delete(id);
    } catch (error) {
      console.error("Error editing makes:", error);
    }
  }

  setModels(models) {
    this.models = models;
  }

  setSelectedModel(model) {
    this.selectedModel = model;
  }

  setFuelAndWheelTypes(models) {
    const fuelTypes = [];
    const wheelTypes = [];

    models.forEach((data) => {
      if (!fuelTypes.includes(data.fuel_type)) {
        fuelTypes.push(data.fuel_type);
      }

      if (!wheelTypes.includes(data.wheel_type)) {
        wheelTypes.push(data.wheel_type);
      }
    });

    this.setFuelTypes(fuelTypes);
    this.setWheelTypes(wheelTypes);
  }

  setFuelTypes(fuelTypes) {
    this.fuelTypes = fuelTypes;
  }

  setSelectedFuelType(fuelType) {
    this.selectedFuelType = fuelType;
  }

  setWheelTypes(wheelTypes) {
    this.wheelTypes = wheelTypes;
  }

  setSelectedWheelType(wheelType) {
    this.selectedWheelType = wheelType;
  }

  setEditModelId(id) {
    this.editModelId = id;
  }
}

const modelsStore = new ModelsStore();
export default modelsStore;
