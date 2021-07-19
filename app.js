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

  data.sort((a, b) => {
    return b.numberOfConfirmedCases - a.numberOfConfirmedCases;
  });
  data.forEach((i) => {
    tableData += `<tr>
    <td>${i.districtName}</td>
    <td>${i.numberOfActiveCases}</td>
    <td>${i.numberOfConfirmedCases}</td>
    <td>${i.numberOfConfirmedDeaths}</td>
    <td>${i.numberOfRecoveredPatients}</td>
    </tr>
    `;
  });
  $("#table").append(tableStr);
  $("#cases").append(tableData);
};

// scrolling
$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 100) {
    $("#backer").fadeIn();
  } else {
    $("#backer").fadeOut();
  }
});

// copyright date
$(document).ready(() => {
  let date = new Date();
  $(".copy-date").text(date.getFullYear());

  let url = "https://covid19.health.gov.mw:3000/api/v0/districts/aggregates";

  $.getJSON(url, (data) => {
    let update = new Date(data.lastUpdate);

    $(".updated").append(update);

    let quickStats = data.districts;

    let stats = [
      {
        category: "totalCases",
        stat: quickStats
          .map((i) => {
            return i.numberOfConfirmedCases;
          })
          .reduce((i, l) => i + l),
      },
      {
        category: "activeCases",
        stat: quickStats
          .map((i) => {
            return i.numberOfActiveCases;
          })
          .reduce((i, l) => i + l),
      },
      {
        category: "deaths",
        stat: quickStats
          .map((i) => {
            return i.numberOfConfirmedDeaths;
          })
          .reduce((i, l) => i + l),
      },
      {
        category: "recovered",
        stat: quickStats
          .map((i) => {
            return i.numberOfRecoveredPatients;
          })
          .reduce((i, l) => i + l),
      },
    ];

    let newStat = ({ category, stat }) => {
      return `<div class='card card-${category}'>
                <h3 class='title py-1 px-2'>${category}</h3>
                <hr class='w-50 mx-auto'/>
                <p class="stat py-1">${stat}</p>
              </div>`;
    };

    $.each(stats, (i, l) => {
      $(".card-deck").append(newStat(l));
    });

    tablelize(quickStats);
  });
});
