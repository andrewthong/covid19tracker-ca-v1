var map;
console.log(window.location)
var isAdvancedMap = window.location.indexOf('advanced') > -1;

function makeMap(data) {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFwc3RlcnRlY2giLCJhIjoiY2s4M2U4eGJmMWJlejNsb3EyOXV4Zm1zaiJ9.aLWnB4UTvCto0wF5_9fePg';
  map = new mapboxgl.Map({
    container: 'map', // container id
    style: isAdvancedMap ? 'mapbox://styles/mapbox/light-v10' : 'mapbox://styles/mapbox/empty-v8', // stylesheet location
    bounds : [
      [-142.43651641653042, 39.03798923031434],
      [-48.30904150845262, 68.77550837439571]
    ]
  });

  console.log(data);

  map.on('load', () => {
    addProvinces(data);
    if(isAdvancedMap) {
      addIndividualCases(data);
    }
  })
}

function addIndividualCases(data) {

  // Fetch static file to compare against for most results, if there is another then geocode it
  // var cityList = [];
  fetch('./assets/data/locations.json').then(response => response.json()).then(resp => {
    console.log(resp);

    var high = 0;

    resp.features.forEach(feature => {
      var theseCases = data.individualCases.filter(covidCase => covidCase.city===feature.properties.city&&covidCase.province===feature.properties.province);
      feature.properties.total_cases = theseCases.length;
      feature.properties.cases = theseCases;
      if(high < theseCases.length) {
        high = theseCases.length;
      }
    })

    console.log(high);
    var radiusPaint = [
      'interpolate',
      ['linear'],
      ["number", ['get', 'total_cases']],
      1, 5,
      high, 20
    ];

    map.addSource('covid-cases', {
      type : 'geojson',
      data : resp
    })
    map.addLayer({
      id : 'covid-cases',
      source : 'covid-cases',
      type : 'circle',
      paint : {
        'circle-color' : '#eee',
        'circle-radius' : radiusPaint,
        'circle-stroke-color' : '#333',
        'circle-stroke-width' : 2
      },
      layout : {
      }
    })

  })
}

function addProvinces(data) {

  fetch('./assets/data/provinces.json').then(resp => resp.json()).then(response => {
    console.log(response);

    var centroidGeoJSON = { type : "FeatureCollection", features : [] };
    var fillRange = [];

    response.features.forEach((feature) => {
      feature.id = feature.properties.cartodb_id;
      var provinceData = data.totalCaseProvince.filter(item => item.province===feature.properties.name);
      feature.properties.province_cases_total = provinceData.length>0 ? provinceData[0].cases : '';
      feature.properties.province_cases_per_population = provinceData.length>0 ? provinceData[0].cases/feature.properties.population : 0;
      if(data.deathsByProvince[feature.properties.name]) {
        feature.properties.province_deaths_total = data.deathsByProvince[feature.properties.name];
      } else {
        feature.properties.province_deaths_total = 0;
      }
      // Making centroids
      var centroidFeature = JSON.parse(JSON.stringify(feature));
      centroidFeature.geometry.coordinates = feature.properties.label_coords;
      centroidFeature.geometry.type = "Point";
      centroidGeoJSON.features.push(centroidFeature);

      if(fillRange.length === 0 || fillRange[0]>feature.properties.province_cases_per_population) {
        fillRange[0] = parseFloat(feature.properties.province_cases_per_population);
      }
      if(fillRange.length === 1 || fillRange[1]<feature.properties.province_cases_per_population) {
        fillRange[1] = parseFloat(feature.properties.province_cases_per_population);
      }

    })

    map.addSource('provinces', {
      type : 'geojson',
      data : response
    });
    map.addSource('provinces-centroids', {
      type : 'geojson',
      data : centroidGeoJSON
    });

    var fillColor = [
      'interpolate',
      ['linear'],
      ["number", ['get', 'province_cases_per_population']],
      fillRange[0], '#007000',
      fillRange[1]*0.3, '#238823',
      fillRange[1]*0.6, '#FFbF00',
      fillRange[1]*0.9, '#D2222D'
    ];

    document.getElementById('map-overlay').innerHTML = `
      <strong>Cases Per Capita</strong>
      <ul>
        <li><div class="color-swatch" style="background-color: #007000"></div> Low</li>
        <li><div class="color-swatch" style="background-color: #FFbF00"></div> Mid</li>
        <li><div class="color-swatch" style="background-color: #D2222D"></div> High</li>
      </ul>
      <p>See more on <a href="advanced.html">Advanced Map</a>.</p>
    `;

    map.addLayer({
      id : 'provinces-fill',
      type : 'fill',
      source : 'provinces',
      paint : {
        'fill-color' : fillColor,
        'fill-opacity' : [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.5,
          0.3
        ]
      }
    })

    map.addLayer({
      id : 'provinces-label',
      type : 'symbol',
      source : 'provinces-centroids',
      layout : {
        'text-field' : ["get", "abbreviation"],
        'text-size' : 15,
        'text-offset' : [0, -0.6],
        // 'text-allow-overlap' : true,
        // 'text-ignore-placement' : true
      },
      paint : {
        'text-color' : '#333',
        'text-halo-color' : '#FFF',
        'text-halo-width' : 2
      }
    })
    map.addLayer({
      id : 'provinces-cases',
      type : 'symbol',
      source : 'provinces-centroids',
      layout : {
        'text-field' : ["get", "province_cases_total"],
        'text-size' : 12,
        'text-offset' : [0, 0.6],
        // 'text-allow-overlap' : true,
        'text-ignore-placement' : true
      },
      paint : {
        'text-color' : '#b22525',
        'text-halo-color' : '#FFF',
        'text-halo-width' : 2
      }
    })

    map.addLayer({
      id : 'provinces-line',
      type : 'line',
      source : 'provinces',
      paint : {
        'line-color' : '#000',
        'line-opacity' : [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.5,
          0.3
        ]
      }
    })

    var hoveredStateId = false;
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })
    map.on('mousemove', 'provinces-fill', (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId) {
          map.setFeatureState(
            { source: 'provinces', id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
          { source: 'provinces', id: hoveredStateId },
          { hover: true }
        );
      }

      var properties = e.features[0].properties;
      popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(`
        <center><strong>${properties.name}</strong><br />
        Total Cases : ${properties.province_cases_total} <br />
        Total Deaths : ${properties.province_deaths_total} </center>
      `).addTo(map);
    })
    map.on('mouseleave', 'provinces-fill', function() {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: 'provinces', id: hoveredStateId },
          { hover: false }
        );
      }
      popup.remove();
      hoveredStateId = null;
    });
  })
}


// Code for converting and creating files

// City geoJSON
/*
var locationsGeoJSON = { type : "FeatureCollection", features: [] };
for(var city in resp) {
  var cityCases = data.individualCases.filter(item => city === item.city + ' ' + item.province);
  if(cityCases.length>0) {
    var properties = {};
    locationsGeoJSON.features.push({
      type : "Feature",
      properties : {
        province : cityCases[0].province,
        city : cityCases[0].city,
        search_result : cityCases[0].place_name
        // cases : cityCases,
        // casesNumber : cityCases.length
      },
      geometry : {
        type : "Point",
        coordinates : resp[city].center
      }
    })
  }
}

console.log(locationsGeoJSON);
*/

// List of cities
/*


// var cityObject = {};
//
// cityList.forEach((city, index) => {
  // if(index < 3) {
    // var count = 0;
    // setTimeout(() => {
    //   fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+JSON.stringify(city)+'.json?types=place,region,district&country=ca&access_token=pk.eyJ1IjoibWFyaGxlbiIsImEiOiJjODQ3ZWRkMDdlOGQ3MmVhZGZkYTBjYTMwNzkwNzNjMyJ9.01tMkp2ZYFM7MLRshJRIJQ').then(response => response.json()).then(resp => {
    //     // console.log(resp);
    //     if(resp.features.length>0) {
    //       cityObject[city] = {
    //         id : resp.features[0].id,
    //         text : resp.features[0].text,
    //         place_name : resp.features[0].place_name,
    //         bbox : resp.features[0].bbox,
    //         center : resp.features[0].center
    //       }
    //       count += 1;
    //       console.log(cityObject);
    //       if(count === cityList.length-1) {
    //         console.log(cityObject);
    //         console.log('DONE');
    //       }
    //     }
    //   })
    // }, 1000*index);
  // }
// })
*/
