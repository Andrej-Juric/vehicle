class HttpClient {
  async get(url) {
    console.log(url);
    const response = await fetch(url);
    return await response.json();
  }

  async post(url, makeData) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-BAASIC-API-KEY": "sata",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makeData),
    });
    return await response.json();
  }

  async put(url, makeData) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "X-BAASIC-API-KEY": "sata",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makeData),
    });
    return await response.json();
  }

  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return await response.json();
  }
}

const httpClient = new HttpClient();
export default httpClient;
