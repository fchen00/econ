var margin = {top: 20, right: 20, bottom: 30, left: 300},
    width = 1220 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

var valueline = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.Export); });
  
var valueline2 = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.Import); });
  
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("../datasets/test.csv", function(error, data) {
  data.forEach(function(d) {
    d.Employment = +d.Employment;
    d.Export = +d.Export;
    d.Import = +d.Import;
  });

  // Scale the range of the data
  x.domain([0, d3.max(data, function(d) { return d.Employment; })+150000]);
  y.domain([-0.3, d3.max(data, function(d) { return Math.max(d.Export, d.Import); })]);

  var foodEx = svg.append("path")    // Add the valueline path.
    .attr("class", "line")
    .attr("d", valueline(data))
    .on("mouseover", function(){d3.select(this).style("stroke-width", 5);
                                d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");})
    .on("mouseout", function(){d3.select(this).style("stroke-width", 3);
                                d3.select(this).style("stroke","steelblue");
                                d3.select(this).style("opacity", "0.2");});

  var foodExDot = svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 4)
      .style("stroke", "black")
      .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
      .style("fill", function(d){if(d.Year==2002) {return "yellow";}
                                  else if (d.Year==2009) {return "red";}
                                  else {return "blue";}; })
      .attr("cx", function(d) { return x(d.Employment); })
      .attr("cy", function(d) { return y(d.Export); });

  var foodIm = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "green")
    .attr("d", valueline2(data));

  var foodImDot =svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", 4)
    .style("stroke", "black")
    .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
    .style("fill", function(d){if(d.Year==2002) {return "yellow";}
                                else if (d.Year==2009) {return "red";}
                                else {return "green";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.Import); });



  svg.append("g")     // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")     // Add the Y Axis
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[5].Import) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "green")
    .text("FoodImport");

  svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[5].Export) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "steelblue")
    .text("FoodExport");

console.log(data.length-1);
console.log(data[data.length-1].Export);
console.log(data[0].Export);
console.log(y(data[0].Export));
console.log(y(data[0].Import));

});