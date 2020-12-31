document.getElementById("button").addEventListener("click", update);

document.getElementById("get-more").addEventListener("click", getMore);

// get update
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
      console.log(data.countryInfo.flag);

      const output = `
                
                <li>Country: ${data.country} <img src="${data.countryInfo.flag}"/> </li>
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

// get table
function getMore(e) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "covid_data.geojson", true);

  xhr.onload = function () {
    if (this.status === 200) {
      const cases = JSON.parse(this.responseText);
      console.log(cases.features);
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

      cases.features.forEach(function (number) {
        dataset += `<tr>
                    <td>${number.properties.district}</td>
                    <td>${number.properties.cases}</td>
                    <td>${number.properties.deaths}</td>
                    <td>${number.properties.recoveries}</td>
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

// scrolling
$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 800) {
    $("#backer a").fadeIn();
  } else {
    $("#backer a").fadeOut();
  }
});
