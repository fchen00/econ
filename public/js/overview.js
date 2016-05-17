// Set the dimensions of the canvas / graph


var margin = {top: 20, right: 20, bottom: 30, left: 300},
    width = 1220 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.Employment); })
    .y(function(d) { return y(d["Export"]); });

var valuelineim = d3.svg.line()
    .x(function(d) { return x(d.Employment); })
    .y(function(d) { return y(d["Import"]); });

    
// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");


// Get the data
d3.csv("../datasets/test.csv", function(error, data) {
    data.forEach(function(d) {
        d.Employment = +d.Employment;
        d["Export"] = +d["Export"];
    });

    // Scale the range of the data (So it doesn't start at the line)
    x.domain([0, d3.max(data, function(d) { return d.Employment; })]);
    y.domain([-0.5, 0.5]);

    // Add the valueline path.
    var labelline = svg.append("path")
                    .attr("stroke", "blue")
                    .attr("class", "line")
                    .attr("d", valueline(data));
    labelline.append("text")
    .attr("dx",100)
    .attr("dy",".35em")
    .text("Food")


    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.Employment); })
        .attr("cy", function(d) { return y(d["Export"]); });


    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});

d3.csv("../datasets/test.csv", function(error, data) {
    data.forEach(function(d) {
        d.Employment = +d.Employment;
        d["Import"] = +d["Import"];
    });

    // Scale the range of the data (So it doesn't start at the line)
    x.domain([0, d3.max(data, function(d) { return d.Employment; })]);
    y.domain([-0.5, 0.5]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("stroke", "red")
        .attr("d", valuelineim(data));

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.Employment); })
        .attr("cy", function(d) { return y(d["Import"]); });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});