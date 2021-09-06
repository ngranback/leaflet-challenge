


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

  // getColor function decides the color based on the value
  function getColor(x) {
    return  x > 7.5 ? '#FF0D0D' :
            x > 6  ? '#FF4E11' :
            x > 4.5  ? '#FF8E15' :
            x > 3.5  ? '#FAB733' :
            x > 2   ? '#ACB334' :
                            '#69B34C';
  }

  // getSized function decides the color based on the value
  function getSized(depth) {
    return Math.sqrt(depth) * 2;
  }


  // Add a legend to explain the color scheme
  var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        mags = [0, 2, 3.5, 4.5, 6, 7.5];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < mags.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
                mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');}
    return div;
  };
  legend.addTo(myMap);



  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < quakes.length; i++) {

    var this_long = quakes[i].geometry.coordinates[0];
    var this_lat = quakes[i].geometry.coordinates[1];
    var magnitude = quakes[i].properties.mag;
    var depth = quakes[i].geometry.coordinates[2];

    L.circleMarker([this_lat,this_long], {
      fillOpacity: 0.85,
      color: 'white',
      // Color will be based on magnitude because it is more eye catching
      // and magnitude feels like a better gauge for how bad a quake is
      fillColor: getColor(magnitude),
      
      // Radius will be based on depth
      radius: getSized(depth)
    })
    .bindPopup(
      "<h1>" + quakes[i].properties.place + "</h1> <hr> " +
      "<h3>Magnitude: " + magnitude + "</h3>"+
      "<h3>Depth: " + depth + " km</h3>")
    .addTo(myMap);

  }

  

});




