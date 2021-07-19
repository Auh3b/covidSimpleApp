const renderMap = (data) => {
  let mapOptions = {
    center: [-13.2512161, 34.3015278],
    zoom: 6,
  };

  let mapDiv = `
                <div id="map"  style=" margin: auto;">
                </div>
                `;

  document.getElementById("mapid").innerHTML = mapDiv;

  let map = new L.map("map", mapOptions);

  let layer = new L.TileLayer(
    "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.wmflabs.org">WikiMediax</a>',
      maxZoom: 8,
      minZoom: 6,
    }
  );

  map.addLayer(layer);

  function getColor(d) {
    return d > 4000
      ? "#0A4154"
      : d > 2500
      ? "#295969"
      : d > 1000
      ? "#47717F"
      : d > 500
      ? "#668894"
      : d > 150
      ? "#85A0AA"
      : "#A3B8BF";
  }

  function casesOptions(feature) {
    return {
      color: "#225B0B",
      fillColor: getColor(feature.properties.cases),
      weight: 0.5,
      fillOpacity: 0.8,
      dashArray: "1",
    };
  }

  function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
      weight: 2,
      color: "#316D2E",
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  let geojson;

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }
  let layerPopupInfo = (feature) => {
    return `
                          <div class="layerPopupInfo">
                            <p class="lead">${feature.properties.district}</p>
                            <p>Cases: ${feature.properties.cases}</p>
                            <p>Deaths:${feature.properties.deaths}</p>
                            <p>Recoveries: ${feature.properties.recoveries}</p>
                          </div>
                          `;
  };

  function onEachFeature(feature, layer) {
    layer.bindPopup(layerPopupInfo(feature));
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  geojson = L.geoJSON(data, {
    style: casesOptions,
    onEachFeature: onEachFeature,
  }).addTo(map);

  let legend = L.control({ position: "bottomleft" });

  legend.onAdd = function (map) {
    let div = L.DomUtil.create("div", "info legend d-flex"),
      grades = [0, 150, 500, 1000, 2500, 4000],
      labels = [];

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += `<span class="legendItem">
                        <i class="m-0 w-100" style="background: ${getColor(
                          grades[i] + 1
                        )}"></i>  
                        <span class="py-1">${
                          grades[i] +
                          (grades[i + 1] ? "&ndash;" + grades[i + 1] : "+")
                        }</span>         
                      </span>`;
    }

    return div;
  };

  legend.addTo(map);
};

const mapUpdate = new Update();

mapUpdate
  .get("covid_data.geojson")
  .then((data) => {
    renderMap(data);
  })
  .catch((err) => console.log(err));
