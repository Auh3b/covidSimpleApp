document.getElementById("get-more").addEventListener("click", getMore);

function update() {
  const dailyUpdate = new Update();

  dailyUpdate
    .get("https://disease.sh/v3/covid-19/countries/malawi?strict=true")
    .then((data) => {
      const daily = ` 
                        <div class="card"  >
                        <h5  class="negative">
                            Total Cases
                        </h5>
                        <p>
                            ${data.cases}
                            <span class="clr-neg">(
                            <i class="fas fa-caret-up"></i>
                            ${data.todayCases}
                            )</span>
                        </p>
                        </div>           
                        <div class="card" >
                        <h5 class="negative">
                            Active Cases
                        </h5>
                        <p>
                            ${data.active} 
                            <span class="clr-neg">(
                            <i class="fas fa-caret-up"></i>
                            ${data.todayCases}
                            )</span>
                        </p>
                        </div> 

                        <div class="card" >
                        <h5 class="positive">
                            Total Recovered
                        </h5>
                        <p>
                            ${data.recovered}
                            <span class="clr-pos">(
                            <i class="fas fa-caret-up"></i>
                            ${data.todayRecovered}
                            )</span>
                        </p>
                        </div>
                        
                        <div class="card" >
                        <h5 class="negative">
                            Total Deaths
                        </h5>
                        <p>
                            ${data.deaths}
                            <span class="clr-neg">(
                            <i class="fas fa-caret-up"></i>
                            ${data.todayDeaths}
                            )</span>
                        </p>
                        </div> 
        `;
      document.getElementById("content").innerHTML = daily;
    })
    .catch((err) => console.log(err));
}

update();

function getMore() {
  const table = new Update();

  table
    .get("covid_data.geojson")
    .then((data) => {
      const tableStr = `<table class = "u-full-width">
                                <thead>
                                    <th>District</th>
                                    <th>Cases</th>
                                    <th>Deaths</th>
                                    <th>Recovery</th>
                                </thead>
                                <tbody id= "cases">
                                </tbody>
                            </table>`;
      let tableData = "";
      data.features.forEach(function (feature) {
        tableData += `<tr>
              <td>${feature.properties.district}</td>
              <td>${feature.properties.cases}</td>
              <td>${feature.properties.deaths}</td>
              <td>${feature.properties.recoveries}</td>
              </tr>
              `;
      });
      document.getElementById("table").innerHTML = tableStr;
      document.getElementById("cases").innerHTML = tableData;

      const updateDate = "Last Update:<em> 19/01/2021</em>";
      document.getElementById("update-date").innerHTML = updateDate;
    })
    .catch((err) => console.log(err));
}

// add graph
// function getChart(e) {
//   let chart =
//     '<iframe width="950" height="600" frameborder="0" scrolling="no" src="//plotly.com/~robChiko/28.embed"></iframe>';

//   document.getElementById("chart").innerHTML = chart;
// }
// getChart();

// get table

// scrolling
$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 800) {
    $("#backer a").fadeIn();
  } else {
    $("#backer a").fadeOut();
  }
});
