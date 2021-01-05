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
      console.log(data);

      const output = `
                
                <div class="card"  >
                  <h4  class="negative">
                    Total Cases
                  </h4>
                  <p>
                    ${data.cases}
                    <span class="clr-neg">(
                      <i class="fas fa-caret-up"></i>
                      ${data.todayCases}
                      )</span>
                  </p>
                </div>           

                <div class="card" >
                  <h4 class="negative">
                    Active Cases
                  </h4>
                  <p>
                    ${data.active} 
                    <span class="clr-neg">(
                    <i class="fas fa-caret-up"></i>
                    ${data.todayCases}
                    )</span>
                  </p>
                </div> 

                <div class="card" >
                  <h4 class="positive">
                    Total Recovered
                  </h4>
                  <p>
                    ${data.recovered}
                    <span class="clr-pos">(
                      <i class="fas fa-caret-up"></i>
                      ${data.todayRecovered}
                      )</span>
                  </p>
                </div>
                
                <div class="card" >
                  <h4 class="negative">
                    Total Deaths
                  </h4>
                  <p>
                    ${data.deaths}
                    <span class="clr-neg">(
                      <i class="fas fa-caret-up"></i>
                      ${data.todayDeaths}
                      )</span>
                  </p>
                </div> 

                `;

      document.getElementById("content").innerHTML = output;
    }
  };

  xhr.send();

  e.preventDefault();
}

update();

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
