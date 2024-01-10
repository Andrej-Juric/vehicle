import httpClient from "./HttpClient";

export default class VehicleModelService {
  static apiUrl = "https://api.baasic.com/v1/sata/resources/VehicleModel2";

  static async get() {
    console.log(this.apiUrl);
    return await httpClient.get(this.apiUrl);
  }
  static async search(searchQuery) {
    return await httpClient.get(`${this.apiUrl}?searchQuery=${searchQuery}`);
  }
  static async pagination(pageNumber, itemsPerPage) {
    return await httpClient.get(
      `${this.apiUrl}?page=${pageNumber}&rpp=${itemsPerPage}`
    );
  }
  static async getById(id) {
    return await httpClient.get(`${this.apiUrl}/${id}`);
  }

  static async create(makeData) {
    return await httpClient.post(this.apiUrl, makeData);
  }

  static async update(id, makeData) {
    return await httpClient.put(`${this.apiUrl}/${id}`, makeData);
  }

  static async delete(id) {
    return await httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
