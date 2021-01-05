// document.getElementById("get-map").addEventListener("click", loadMap);

function loadMap() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "covid_data.geojson", true);

  xhr.onload = function () {
    if (this.status === 200) {
      // console.log(JSON.parse(this.responseText));
      let mapData = JSON.parse(this.responseText);
      console.log(mapData.features);
      // initiating map
      let mapOptions = {
        center: [-13.2512161, 34.3015278],
        zoom: 6,
      };

      let map = new L.map("mapid", mapOptions);

      let layer = new L.TileLayer(
        "http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png",
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
          maxZoom: 8,
          minZoom: 6,
        }
      );

      map.addLayer(layer);

      function getColor(d) {
        return d > 2000
          ? "#0A4154"
          : d > 1000
          ? "#295969"
          : d > 100
          ? "#47717F"
          : d > 50
          ? "#668894"
          : d > 25
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
        console.log(layer);

        layer.setStyle({
          weight: 2,
          color: "#316D2E",
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
        // info.update(layer.feature.properties);

        let content = "";

        content = `
                    <div class="detailed">
                      <p> ${layer.feature.properties.district}</p>
                      <p>Cases:${layer.feature.properties.cases}</p>
                      <p>Deaths${layer.feature.properties.deaths}</p>
                      <p>Recoveries:${layer.feature.properties.recoveries}</p>
                    
                    </div>
                    `;

        document.querySelector(".content2").innerHTML = content;
      }

      let geojson;

      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      }

      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        // document.querySelector(".content2").innerHTML = "";
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

      let legend = L.control({ position: "bottomleft" });

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

loadMap();
