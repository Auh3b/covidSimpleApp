document.getElementById("get-map").addEventListener("click", loadMap);

function loadMap() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "covid_data.geojson", true);

  xhr.onload = function () {
    if (this.status === 200) {
      // console.log(JSON.parse(this.responseText));
      let mapData = JSON.parse(this.responseText);
      // initiating map
      let mapOptions = {
        center: [-13.2512161, 34.3015278],
        zoom: 7,
      };

      let map = new L.map("mapid", mapOptions);

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
        return d > 2000
          ? "#004c4c"
          : d > 1000
          ? "#006666"
          : d > 500
          ? "#008080"
          : d > 100
          ? "#66b2b2"
          : d > 50
          ? "#b2d8d8"
          : "#C0C0C0";
      }

      function casesOptions(feature) {
        return {
          color: "gray",
          fillColor: getColor(feature.properties.cases),
          weight: 0.5,
          fillOpacity: 0.7,
          dashArray: "1",
        };
      }

      function highlightFeature(e) {
        let layer = e.target;

        layer.setStyle({
          weight: 2,
          color: "#888",
          fillOpacity: 0.7,
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
        info.update(layer.feature.properties);
      }

      let geojson;

      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      }

      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }

      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature,
        });
      }

      geojson = L.geoJSON(mapData, {
        style: casesOptions,
        onEachFeature: onEachFeature,
      }).addTo(map);
      // console.log(cases);

      let info = L.control();

      info.onAdd = function (map) {
        this._div = L.DomUtil.create("div", "info");
        this.update();
        return this._div;
      };

      info.update = function (props) {
        this._div.innerHTML =
          "<h4>Malawi Covid-19 <br> Statistics</h4>" +
          (props
            ? "<h5>" +
              "<b>" +
              props.DISTRICT +
              "</b></h5>" +
              `<p>Case: ${props.cases}` +
              "</p>" +
              `<p>Deaths: ${props.deaths}` +
              "</p>" +
              `<p>Recovery: ${props.recoveries}</p>`
            : "Hover over district");
      };

      info.addTo(map);

      let legend = L.control({ position: "bottomright" });

      legend.onAdd = function (map) {
        let div = L.DomUtil.create("div", "info legend"),
          grades = [0, 50, 100, 500, 1000, 2000],
          labels = [];

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' +
            getColor(grades[i] + 1) +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }

        return div;
      };

      legend.addTo(map);
    }
  };

  xhr.send();
}
