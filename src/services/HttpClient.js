class HttpClient {
  async get(url) {
    console.log(url);
    try {
      const response = await fetch(url);
      this.checkResponseStatus(response);
      return await response.json();
    } catch (error) {
      console.error("Error during GET request:", error);
      throw error;
    }
  }

  async post(url, makeData) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-BAASIC-API-KEY": "sata",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(makeData),
      });
      console.log("post response", response);
      this.checkResponseStatus(response);
      return await response.json();
    } catch (error) {
      console.error("Error during POST request:", error);
      throw error;
    }
  }

  async put(url, makeData) {
    console.log(url, makeData, "httpclient url i makeData");
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "X-BAASIC-API-KEY": "sata",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(makeData),
      });
      this.checkResponseStatus(response);
      return await response.json();
    } catch (error) {
      console.error("Error during PUT request:", error);
      throw error;
    }
  }

  async delete(url) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      this.checkResponseStatus(response);
      return await response.json();
    } catch (error) {
      console.error("Error during DELETE request:", error);
      throw error;
    }
  }

  checkResponseStatus(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }
}

const httpClient = new HttpClient();
export default httpClient;
