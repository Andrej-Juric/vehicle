import { makeObservable, observable, action } from "mobx";
import VehicleMakeService from "@/services/VehicleMakeService";

class MakesStore {
  makes = [];
  filteredMakes = [];
  selectedMake = null;
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 5;

  constructor() {
    makeObservable(this, {
      makes: observable,
      selectedMake: observable,
      filteredMakes: observable,
      currentPage: observable,
      itemsPerPage: observable,
      totalPages: observable,
      setSelectedMake: action,
      fetchMakes: action,
      fetchPaginatedMakes: action,
      setMakes: action,
      setFilteredMakes: action,
      setCurrentPage: action,
      setItemsPerPage: action,
      setTotalPages: action,
    });
  }
  async fetchMakes() {
    try {
      const makeData = await VehicleMakeService.get();
      this.setMakes(makeData.item);
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  }

  async fetchPaginatedMakes() {
    try {
      const makeData = await VehicleMakeService.pagination(
        this.currentPage,
        this.itemsPerPage
      );
      console.log(makeData, "fetchPaginatedMakes");
      this.setFilteredMakes(makeData.item);
      this.setTotalPages(makeData.totalPages);
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  }

  async createMakes({ name, abrv }) {
    try {
      const makeData = { abbreviation: abrv, name: name };
      const createMake = await VehicleMakeService.create(makeData);
    } catch (error) {
      console.error("Error creating makes:", error);
    }
  }

  setMakes(makes) {
    this.makes = makes;
  }

  setFilteredMakes(filteredMakes) {
    this.filteredMakes = filteredMakes;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  setItemsPerPage(itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
  }

  setTotalPages(totalPages) {
    this.totalPages = totalPages;
  }

  setSelectedMake(selectedMake) {
    this.selectedMake = selectedMake;
  }
}

const makesStore = new MakesStore();
export default makesStore;
