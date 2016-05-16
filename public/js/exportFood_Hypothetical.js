var margin = {top: 20, right: 20, bottom: 30, left: 300},
    width = 1220 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
var xValue2 = function(d) { return d.HypotheticalEmployment / 1000000;}, // data -> value, in millions
    xScale2 = d3.scale.linear().range([0, width]), // value -> display
    xMap2 = function(d) { return xScale2(xValue2(d));}, // data -> display
    xAxis2 = d3.svg.axis().scale(xScale2).orient("bottom");

// setup y
var yValue2 = function(d) { return d.HypotheticalImport / 10000;}, // data -> value, in 10 billions $
    yScale2 = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale2(yValue2(d));}, // data -> display
    yAxis2 = d3.svg.axis().scale(yScale2).orient("left");

// setup fill color2
var cValue2 = function(d) { return d.Year;},
    color2 = d3.scale.linear()
            .domain([1997, 1998, 1999, 2000, 2001, 2002,
                     2003, 2004, 2005, 2006, 2007, 2008, 
                     2009, 2010, 2011, 2012, 2013, 2014])
            .range(["#f0e636", "#f0e636", "#f0e636", "#f0e636", "#f0e636", "#f0e636",
                    "#f0e636", "#f0e636", "#f0e636", "#f0e636", "#f0e636", "#f0e636",
                    "#f0e636", "#f0e636", "#f0e636", "#f0e636", "#f0e636"]);

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data
d3.csv("../datasets/food.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.HypotheticalEmployment = +d.HypotheticalEmployment;
    d["HypotheticalExport"] = +d["HypotheticalExport"];
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale2.domain([d3.min(data, xValue2)-1, d3.max(data, xValue2)+1]);
  yScale2.domain([d3.min(data, yValue2)-1, d3.max(data, yValue2)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis2)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("HypotheticalEmployment (in millions)");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Export Amount (in 10 billion $)");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 8)
      .attr("cx", xMap2)
      .attr("cy", yMap)
      .style("fill", function(d) { return color2(cValue2(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html("Year: " + d["Year"] + "<br/>" + "HypotheticalEmployment (in millions): " + xValue2(d) 
          + "<br/>" + "Export (in billions $): " + yValue2(d) * 10)
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px")
               .style("text-align", "center")
               .style("background", "lightblue")
               .style("border-radius", "2px")
               .style("height", "40px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color2.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend color2ed rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color2);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
});



