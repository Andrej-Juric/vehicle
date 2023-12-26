import httpClient from "./HttpClient";

export default class VehicleMakeService {
  static apiUrl = "https://api.baasic.com/v1/sata/resources/vehicleMakes";

  static async get() {
    console.log(this.apiUrl);
    return await httpClient.get(this.apiUrl);
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

  async delete(id) {
    return await httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
