class UI {
  constructor() {
    this.activeCases = document.getElementById("active");
    this.totalCases = document.getElementById("total");
    this.recoveries = document.getElementById("recoveries");
    this.deaths = document.getElementById("deaths");
  }

  addData(data) {
    this.activeCases.innerHTML = `<h6>Active Cases</h6><p>${data.active}</p>`;
    this.totalCases.innerHTML = `<h6>Total Cases</h6><p>${data.cases}</p>`;
    this.recoveries.innerHTML = `<h6>Recovered</h6><p>${data.recovered}</p>`;
    this.deaths.innerHTML = `<h6>Deaths</h6><p>${data.deaths}</p>`;
  }

  addTable(table, reg) {
    const layout = `
      <table class = "">
                                <thead id="head">
                                    <th>District</th>
                                    <th>Cases</th>
                                    <th>Deaths</th>
                                    <th>Recovery</th>
                                </thead>
                                <tbody id= "cases">
                                </tbody>
                            </table>
      `;
    let tableData = "";
    table.features.forEach(function (feature) {
      if (feature.properties.region === reg) {
        tableData += `<tr>
                    <td>${feature.properties.district}</td>
                    <td>${feature.properties.cases}</td>
                    <td>${feature.properties.deaths}</td>
                    <td>${feature.properties.recoveries}</td>
                    </tr>
                    `;
      } else {
      }
      document.getElementById("table").innerHTML = layout;
      document.getElementById("cases").innerHTML = tableData;
    });
  }
}
