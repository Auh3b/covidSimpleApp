// event listeners

// init covid_data
const dailyUpdate = new CovidData();

const table = new CovidData();

// init UI
const ui = new UI();

function update() {
  dailyUpdate
    .getData("https://disease.sh/v3/covid-19/countries/malawi?strict=true")
    .then((data) => {
      ui.addData(data);
    })
    .catch((err) => console.log(err));
}

update();

const url = "json/covid_data.geojson";

function tables() {
  let btns = document.querySelectorAll(".btn");

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      // console.log(btns[i].textContent);
      table
        .getTable(url)
        .then((data) => {
          ui.addTable(data, btns[i].textContent);
        })
        .catch((err) => console.log(err));
    });
  }
}

tables();
