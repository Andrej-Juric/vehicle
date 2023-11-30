import httpClient from "./HttpClient";

export default class VehicleMakeService {
  static apiUrl = "https://api.baasic.com/v1/sata/resources/vehicleMakes";

  static async get() {
    console.log(this.apiUrl);
    return await httpClient.get(this.apiUrl);
  }
  async getById(id) {
    return await httpClient.get(`${this.apiUrl}/${id}`);
  }

  async create(makeData) {
    return await httpClient.post(this.apiUrl, makeData);
  }

  async update(id, makeData) {
    return await httpClient.put(`${this.apiUrl}/${id}`, makeData);
  }

  async delete(id) {
    return await httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
