import httpClient from "./HttpClient";

export default class VehicleModelService {
  static apiUrl = "https://api.baasic.com/v1/sata/resources/VehicleModel2";

  static async get() {
    console.log(this.apiUrl);
    return await httpClient.get(this.apiUrl);
  }
  static async getByMakeId(makeId) {
    return await httpClient.get(`${this.apiUrl}/${makeId}`);
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
