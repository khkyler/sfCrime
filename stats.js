

$(document).ready(function(){
  var map = initializeMap();


});





function initializeMap() {
  var map = new google.maps.Map(d3.select("#map-canvas").node(), {
    zoom: 13,
    center: new google.maps.LatLng(37.762111, -122.439488),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  return map;
};


d3.xhr('https://sfcrime.firebaseio.com/-JdyczTmHqiiMaU0uVqX', function(data) {
  var overlay = new google.maps.OverlayView();

  overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayLayer).append("div")
          .attr("class", "crimes");
  overlay.draw = function() {
        var projection = this.getProjection(),
            padding = 10;

        var marker = layer.selectAll("svg")
            .data(d3.entries(data))
            .each(transform) // update existing markers
          .enter().append("svg:svg")
            .each(transform)
            .attr("class", "marker");

        // Add a circle.
        marker.append("svg:circle")
            .attr("r", 4.5)
            .attr("cx", padding)
            .attr("cy", padding);

        // Add a label.
        marker.append("svg:text")
            .attr("x", padding + 7)
            .attr("y", padding)
            .attr("dy", ".31em")
            .text(function(d) { return d.key; });

        function transform(d) {
          d = new google.maps.LatLng(d.value[1], d.value[0]);
          d = projection.fromLatLngToDivPixel(d);
          return d3.select(this)
              .style("left", (d.x - padding) + "px")
              .style("top", (d.y - padding) + "px");
        }
      };
  };
});

overlay.setMap(map);
