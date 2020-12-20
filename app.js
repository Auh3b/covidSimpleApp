document.getElementById("button").addEventListener("click", update);

document.getElementById("get-more").addEventListener("click", getMore);

function update(e) {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://disease.sh/v3/covid-19/countries/malawi?strict=true",
    true
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      console.log(data);

      const output = `
                <img src:${data.countryInfo.flag}>
                <li>Country: ${data.country}</li>
                <li>Cases: ${data.cases}</li>
                <li>Recovery: ${data.recovered}</li>
                <li>Deaths: ${data.deaths}</li>
                
                `;

      document.getElementById("content").innerHTML = output;
    }
  };

  xhr.send();

  e.preventDefault();
}

function getMore(e) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "covid_data.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      const cases = JSON.parse(this.responseText);
      console.log(cases);
      const output2 = `<table class = "u-full-width">
                  <thead>
                      <th>District</th>
                      <th>Cases</th>
                      <th>Deaths</th>
                      <th>Recovery</th>
                  </thead>
                  <tbody id= "cases">
                  </tbody>
              </table>`;

      let dataset = "";

      cases.forEach(function (number) {
        dataset += `<tr>
                    <td>${number.district}</td>
                    <td>${number.cases}</td>
                    <td>${number.deaths}</td>
                    <td>${number.recoveries}</td>
                    </tr>
                    `;
      });

      document.getElementById("table").innerHTML = output2;
      document.getElementById("cases").innerHTML = dataset;
    }
  };

  xhr.send();

  e.preventDefault();
}
