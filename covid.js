class Update {
  async get(url) {
    const respnse = await fetch(url);
    const resData = await respnse.json();
    return resData;
  }
}
