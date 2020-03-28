var map;
var popup;
var data;
var allLocations;
var isAdvancedMap = window.location.href.indexOf('advanced') > -1;

function makeMap(cases) {
  data = cases;
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFwc3RlcnRlY2giLCJhIjoiY2s4M2U4eGJmMWJlejNsb3EyOXV4Zm1zaiJ9.aLWnB4UTvCto0wF5_9fePg';
  map = new mapboxgl.Map({
    container: 'map', // container id
    style: isAdvancedMap ? 'mapbox://styles/mapbox/light-v10' : 'mapbox://styles/mapbox/empty-v8', // stylesheet location
    bounds : [
      [-142.43651641653042, 39.03798923031434],
      [-48.30904150845262, 68.77550837439571]
    ]
  });
  popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  })

  map.on('load', () => {
    addProvinces();
    if(isAdvancedMap) {
      getLocations();
      addCountries();
    }
  })
}

function getLocations() {
    fetch(url+'api/controller/locations.php').then(response => response.json()).then(resp => {
      allLocations = resp.locations;
      addIndividualCases();
      addSearch();
    });
}

function addCountries() {
    fetch('./assets/data/countries.json').then(response => response.json()).then(resp => {
        allCountries = {};
        resp.features.forEach(feature => {
            allCountries[feature.properties.name] = feature;
        })
    });
}

function addSearch() {
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search cases near you'
    })
    map.addControl(geocoder, 'top-left');
}

function addIndividualCases() {
  // var cityList = [];
  var high = 0;

  var cityGeoJSON = { type: "FeatureCollection", features: [] };

  allLocations.forEach(location => {
    var theseCases = data.individualCases.filter(covidCase => covidCase.city+' '+covidCase.province === location.original_text);
    if(theseCases.length>0) {
      if(high < theseCases.length) {
        high = theseCases.length;
      }
      cityGeoJSON.features.push({
        type : "Feature",
        id : Math.random()*100,
        properties : {
          city : theseCases[0].city,
          total_cases : theseCases.length,
          cases : theseCases
        },
        geometry : {
          type : "Point",
          coordinates : JSON.parse(location.coordinates)
        }
      })
    }
  })

  var radiusPaint = [
    'interpolate',
    ['linear'],
    ["number", ['get', 'total_cases']],
    1, 1,
    high, 20
  ];

  console.log(cityGeoJSON)

  map.addSource('covid-cases', {
    type : 'geojson',
    data : cityGeoJSON
  })
  map.addLayer({
    id : 'covid-cases',
    source : 'covid-cases',
    type : 'circle',
    paint : {
      'circle-color' : [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#fff',
        '#eee'
      ],
      'circle-radius' : radiusPaint,
      'circle-stroke-color' : '#000',
      'circle-stroke-width' : 1
    },
    layout : {
    }
  })

  var hoveredStateId = false;
  map.on('mousemove', 'covid-cases', (e) => {
    if (e.features.length > 0) {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: 'covid-cases', id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        { source: 'covid-cases', id: hoveredStateId },
        { hover: true }
      );
    }

    var properties = e.features[0].properties;
    popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(`
      <center><strong>${properties.city}</strong><br />
      Total Cases : ${properties.total_cases} <br />
    `).addTo(map);
  })
  map.on('mouseleave', 'covid-cases', function() {
    if (hoveredStateId) {
      map.setFeatureState(
        { source: 'covid-cases', id: hoveredStateId },
        { hover: false }
      );
    }
    popup.remove();
    hoveredStateId = null;
  });
  /*
  map.on('click', 'covid-cases', (e) => {
    if (e.features.length > 0) {
      console.log(e.features[0].properties);
      var theseCases = JSON.parse(e.features[0].properties.cases);
      var matchedLocations = [];
      var matchedFeatures = [];
      theseCases.forEach(thisCase => {
        if(matchedLocations.indexOf(thisCase.travel_history)===-1) {
          console.log(allCountries, thisCase.travel_history)
          if(allCountries[thisCase.travel_history]) {
            var thisFeature = JSON.parse(JSON.stringify(allCountries[thisCase.travel_history]));
            thisFeature.properties.number_of_cases = 1;
            matchedLocations.push(thisCase.travel_history);
          }
        } else {
          matchedFeatures.forEach(thisFeature => {
            if(thisFeature.properties.name === thisCase.travel_history) {
              thisFeature.properties.number_of_cases += 1;
            }
          })
        }
      })
      console.log(matchedFeatures);
    }
  })
  */
}

function addProvinces() {

    fetch('./assets/data/provinces.json').then(resp => resp.json()).then(response => {

        var centroidGeoJSON = {
            type: "FeatureCollection",
            features: []
        };
        var fillRange = [];

        response.features.forEach((feature) => {
            feature.id = feature.properties.cartodb_id;
            var provinceData = data.totalCaseProvince.filter(item => item.province === feature.properties.name);
            feature.properties.province_cases_total = provinceData.length > 0 ? provinceData[0].cases : '';
            feature.properties.province_cases_per_population = provinceData.length > 0 ? provinceData[0].cases / (feature.properties.population / 100000) : 0;
            if (data.deathsByProvince[feature.properties.name]) {
                feature.properties.province_deaths_total = data.deathsByProvince[feature.properties.name];
            } else {
                feature.properties.province_deaths_total = 0;
            }
            // Making centroids
            var centroidFeature = JSON.parse(JSON.stringify(feature));
            centroidFeature.geometry.coordinates = feature.properties.label_coords;
            centroidFeature.geometry.type = "Point";
            centroidGeoJSON.features.push(centroidFeature);

            if (fillRange.length === 0 || fillRange[0] > feature.properties.province_cases_per_population) {
                fillRange[0] = parseFloat(feature.properties.province_cases_per_population);
            }
            if (fillRange.length === 1 || fillRange[1] < feature.properties.province_cases_per_population) {
                fillRange[1] = parseFloat(feature.properties.province_cases_per_population);
            }

        })

        map.addSource('provinces', {
            type: 'geojson',
            data: response
        });
        map.addSource('provinces-centroids', {
            type: 'geojson',
            data: centroidGeoJSON
        });

        var fillColor = [
            'interpolate',
            ['linear'],
            ["number", ['get', 'province_cases_per_population']],
            fillRange[0], '#007000',
            fillRange[1] * 0.3, '#238823',
            fillRange[1] * 0.6, '#FFbF00',
            fillRange[1] * 0.9, '#D2222D'
        ];

        var mapHTML = `
      <strong>Cases Per 100,000</strong>
      <div class="gradient-swatch"></div>
      <ul>
        <li style="text-align:left;">${fillRange[0].toFixed(1)}</li>
        <li style="text-align:center;">${(fillRange[1]*0.5).toFixed(1)}</li>
        <li style="text-align: right;">${fillRange[1].toFixed(1)}</li>
      </ul>
      <p>Total cases to date in red.</p>
      <p>See more on <a href="advanced.html">Advanced Map</a>.</p>
    `;
        if (isAdvancedMap) {
            mapHTML = `
        <strong>Map In Progress</strong>
        <p style="font-size:14px;">Click on any shape for more information.</p>
        <hr />
        <div style="display:flex;"><div class="circle-swatch"></div> <p>Affected Cities</p></div>
      `;
        }

        document.getElementById('map-overlay').innerHTML = mapHTML;

        map.addLayer({
            id: 'provinces-fill',
            type: 'fill',
            source: 'provinces',
            paint: {
                'fill-color': fillColor,
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    0.5,
                    0.3
                ]
            }
        }, map.getSource('covid-cases') ? 'covid-cases' : null)

        map.addLayer({
            id: 'provinces-cases',
            type: 'symbol',
            source: 'provinces-centroids',
            layout: {
                'text-field': ["get", "province_cases_total"],
                'text-size': 12,
                'text-offset': [0, 0.6],
                // 'text-allow-overlap' : true,
                // 'text-ignore-placement' : true
            },
            paint: {
                'text-color': '#b22525',
                'text-halo-color': '#FFF',
                'text-halo-width': 2
            }
        })
        map.addLayer({
            id: 'provinces-label',
            type: 'symbol',
            source: 'provinces-centroids',
            layout: {
                'text-field': ["get", "abbreviation"],
                'text-size': 15,
                'text-offset': [0, -0.6],
                // 'text-allow-overlap' : true,
                'text-ignore-placement': true
            },
            paint: {
                'text-color': '#333',
                'text-halo-color': '#FFF',
                'text-halo-width': 2
            }
        })

        map.addLayer({
            id: 'provinces-line',
            type: 'line',
            source: 'provinces',
            paint: {
                'line-color': '#000',
                'line-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    0.5,
                    0.3
                ]
            }
        })

        var hoveredStateId = false;
        map.on('mousemove', 'provinces-fill', (e) => {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState({
                        source: 'provinces',
                        id: hoveredStateId
                    }, {
                        hover: false
                    });
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState({
                    source: 'provinces',
                    id: hoveredStateId
                }, {
                    hover: true
                });
            }


            if (!isAdvancedMap) {
                var properties = e.features[0].properties;
                popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(`
          <center><strong>${properties.name}</strong><br />
          Total Cases : ${properties.province_cases_total} <br />
          Total Deaths : ${properties.province_deaths_total} </center>
        `).addTo(map);
            }
        })
        map.on('mouseleave', 'provinces-fill', function() {
            if (hoveredStateId) {
                map.setFeatureState({
                    source: 'provinces',
                    id: hoveredStateId
                }, {
                    hover: false
                });
            }
            if (!isAdvancedMap) {
                popup.remove();
            }
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


  // var cityObject = [];
  // var citiesDone = [];
  // fetch('./assets/data/toconvert.json').then(response => response.json()).then(cityList => {
  //   var count = 0;
  //   cityList.forEach((city, index) => {
  //     if(citiesDone.indexOf(city.city + ' ' + city.province) === -1) {
  //       setTimeout(() => {
  //         fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+JSON.stringify(city.city + ' ' + city.province)+'.json?types=place,region,district&country=ca&access_token=pk.eyJ1IjoibWFyaGxlbiIsImEiOiJjODQ3ZWRkMDdlOGQ3MmVhZGZkYTBjYTMwNzkwNzNjMyJ9.01tMkp2ZYFM7MLRshJRIJQ').then(response => response.json()).then(resp => {
  //           // console.log(resp);
  //           if(resp.features.length>0) {
  //             var newLocationObject = {
  //               id : resp.features[0].id,
  //               text : resp.features[0].text,
  //               place_name : resp.features[0].place_name,
  //               center : resp.features[0].center,
  //               original_text : city.city + ' ' + city.province
  //             }
  //             // count += 1;
  //             cityObject.push(newLocationObject);
  //             console.log(cityObject);
  //             // if(count === cityList.length-1) {
  //             //   console.log(cityObject);
  //             //   console.log('DONE');
  //             // }
  //           }
  //         })
  //       }, 1000*count);
  //       count += 1;
  //     }
  //     citiesDone.push(city.city + ' ' + city.province);
  //   })
  // })
*/
