


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
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);



//  API query URL
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Grab the data with d3
d3.json(url).then(function(response) {

  const geoData = response;
  const quakes = geoData['features'];


  // get max depth for color function
  var a = 0;

  // getColor function decides the color based on the value
  function getColor(depth) {
    return  depth > 300 ? '#FF0D0D' :
            depth > 180  ? '#FF4E11' :
            depth > 120  ? '#FF8E15' :
            depth > 60  ? '#FAB733' :
            depth > 30   ? '#FD8D3C' :
            depth > 10   ? '#ACB334' :
                            '#FFEDA0';
}






  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < quakes.length; i++) {

    var this_long = quakes[i].geometry.coordinates[0];
    var this_lat = quakes[i].geometry.coordinates[1];
    var magnitude = quakes[i].properties.mag;

    L.circleMarker([this_lat,this_long], {
      fillOpacity: 0.85,
      color: 'white',
      fillColor: getColor(quakes[i].geometry.coordinates[2]),
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: magnitude * 4
    })
    .bindPopup(
      "<h1>" + quakes[i].properties.place + "</h1> <hr> " +
      "<h3>Magnitude: " + magnitude + " km</h3>"+
      "<h3>Depth: " + quakes[i].geometry.coordinates[2] + " km</h3>")
    .addTo(myMap);

  }

  

});