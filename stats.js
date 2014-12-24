

function initialize() {

  // var mapOptions = {
  //   center: new google.maps.LatLng(37.701560, -122.432415),
  //   zoom:13
  // };
  // var map = new google.maps.Map(d3.select('#map').node(),
  //     mapOptions);
  // };
  var map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 8,
    center: new google.maps.LatLng(37.76487, -122.41948),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
};
//google.maps.event.addDomListener(window, 'load', initialize);

d3.json("sfCrime.json", function(data) {
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
// var map = d3.select('body').append('svg')
//           .attr('width', 1600)
//           .attr('height', 1600)
//           .attr('class', 'map');

// var dragMove = function(){

//   var x = d3.event.x;
//   var y = d3.event.y;
//   d3.select('.player').data([{cx: x, cy:y, r: 2}])
//     .attr('cx', x).attr('cy', y);
// }

// //define drag behavior
// var drag = d3.behavior.drag().on("drag", dragMove);

// map.selectAll('.player').data([{cx: 800, cy:800, r: 2}])
//   .enter().append('circle')
//   .attr('class', 'player')
//   .attr('cx', function(d){return d.cx})
//   .attr('cy', function(d){return d.cy})
//   .attr('r', function(d){return d.r})
//   .attr('fill','red').call(drag);

// var locationConverter = function (lat, lon) {

// }
