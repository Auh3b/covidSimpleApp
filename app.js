// document.getElementById("get-more").addEventListener("click", getMore);

function update() {
  const dailyUpdate = new Update();

  dailyUpdate
    .get("https://disease.sh/v3/covid-19/countries/malawi?strict=true")
    .then((data) => {
      const totalCases = document.getElementById("totalCases");
      const active = document.getElementById("active");
      const recovery = document.getElementById("recovery");
      const deaths = document.getElementById("deaths");

      totalCases.innerHTML = `<p>
                                ${data.cases}
                                <span class="clr-neg">(
                                <i class="fa fa-caret-up"></i>
                                ${data.todayCases}
                                )</span>
                            </p>
                            `;

      active.innerHTML = `
                            <p>
                            ${data.active} 
                            <span class="clr-neg">(
                            <i class="fa fa-caret-up"></i>
                            ${data.todayCases}
                            )</span>
                        </p>
                          `;
      recovery.innerHTML = `
                            <p>
                            ${data.recovered}
                            <span class="clr-pos">(
                            <i class="fa fa-caret-up"></i>
                            ${data.todayRecovered}
                            )</span>
                        </p>
                            `;
      deaths.innerHTML = `
                          <p>
                            ${data.deaths}
                            <span class="clr-neg">(
                            <i class="fa fa-caret-up"></i>
                            ${data.todayDeaths}
                            )</span>
                        </p>
                          `;
    })
    .catch((err) => console.log(err));
}

update();

const table = new Update();

const tablelize = (data) => {
  const tableStr = `<table class = "table table-striped table-responsive-sm mx-auto p-sm-0">
      <thead class="thead-dark">
          <th>District</th>
          <th>Active Cases</th>
          <th>Total Cases</th>
          <th>Total Deaths</th>
          <th>Total Recovery</th>
      </thead>
      <tbody id= "cases">
      </tbody>
    </table>`;
  let tableData = "";

  data.districts.sort((a, b) => {
    return b.numberOfConfirmedCases - a.numberOfConfirmedCases;
  });
  data.districts.forEach(function (feature) {
    tableData += `<tr>
    <td>${feature.districtName}</td>
    <td>${feature.numberOfActiveCases}</td>
    <td>${feature.numberOfConfirmedCases}</td>
    <td>${feature.numberOfConfirmedDeaths}</td>
    <td>${feature.numberOfRecoveredPatients}</td>
    </tr>
    `;
  });
  document.getElementById("table").innerHTML = tableStr;
  document.getElementById("cases").innerHTML = tableData;
};

const lastUpdated = (data) => {
  let date = new Date(data.lastUpdate);

  document.querySelector(
    ".updated"
  ).textContent = `Last Update: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `;
};

table
  .get("https://covid19.health.gov.mw:3000/api/v0/districts/aggregates")
  .then((data) => {
    tablelize(data);
    lastUpdated(data);
  })
  .catch((err) => console.log(err));

// scrolling
$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 500) {
    $("#backer").fadeIn();
  } else {
    $("#backer").fadeOut();
  }
});
