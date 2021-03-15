class CovidData {
  constructor(url) {
    this.url = url;
  }

  async getData(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }

  async getTable(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }
}
