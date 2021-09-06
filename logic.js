


// Create a map object

let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);







// Assemble API query URL
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Grab the data with d3
d3.json(url).then(function(response) {

  const geoData = response;
  const quakes = geoData['features'];


  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize(population) {
  return Math.sqrt(population) / 40;
  }

  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < quakes.length; i++) {

    var this_lat = quakes[i].geometry.coordinates[0];
    var this_long = quakes[i].geometry.coordinates[1];

    L.circleMarker([this_lat,this_long], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: quakes[i].geometry.coordinates[2]
    })
    .bindPopup("<h1>" + quakes[i].title + "</h1> <hr> <h3>Depth: " + quakes[i].geometry.coordinates[2] + "</h3>")
    .addTo(myMap);

  }

  

});