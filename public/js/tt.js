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
  .y(function(d) { return y(d.FoodEx); });
  
var valueline2 = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.CapitalEx); });

var governmentLineEx = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.GovernmentEx); });

  
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("../datasets/overview.csv", function(error, data) {
  data.forEach(function(d) {
    d.Employment = +d.Employment;
    d.FoodEx = +d.FoodEx;
    d.CapitalEx = +d.CapitalEx;
    d.GovernmentEx = +d.GovernmentEx;
  });

  // Scale the range of the data
  x.domain([10000000, d3.max(data, function(d) { return d.Employment; })+300000]);
  y.domain([-0.3, d3.max(data, function(d) { return Math.max(d.FoodEx, d.CapitalEx, d.GovernmentEx); })]);


  //Food export chart
  var foodExLine = svg.append("path")    // Add the valueline path.
    .attr("class", "line")
    .attr("d", valueline(data))
    .on("mouseover", function(){d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");})
    .on("mouseout", function(){d3.select(this).style("stroke","steelblue");
                                d3.select(this).style("opacity", "0.2");});

  var foodExDot = svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 2)
      .style("stroke", "black")
      .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
      .style("fill", function(d){if(d.Year==2002) {return "yellow";}
                                  else if (d.Year==2009) {return "red";}
                                  else {return "blue";}; })
      .attr("cx", function(d) { return x(d.Employment); })
      .attr("cy", function(d) { return y(d.FoodEx); });


  //Capital Export Chart
  var capitalExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "green")
    .attr("d", valueline2(data))
    .on("mouseover", function(){d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");})
    .on("mouseout", function(){d3.select(this).style("stroke","steelblue");
                                d3.select(this).style("opacity", "0.2");});

  var capitalExDot =svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", 2)
    .style("stroke", "black")
    .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
    .style("fill", function(d){if(d.Year==2002) {return "yellow";}
                                else if (d.Year==2009) {return "red";}
                                else {return "green";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.CapitalEx); });

  
  //Government Export Chart
  var governmentExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "brown")
    .attr("d", governmentLineEx(data))
    .on("mouseover", function(){d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");})
    .on("mouseout", function(){ d3.select(this).style("stroke","brown");
                                d3.select(this).style("opacity", "0.2");});

  var governmentExDot =svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", 2)
    .style("stroke", "black")
    .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
    .style("fill", function(d){if(d.Year==2002) {return "yellow";}
                                else if (d.Year==2009) {return "red";}
                                else {return "brown";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.GovernmentEx); });




  svg.append("g")     // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")     // Add the Y Axis
    .attr("class", "y axis")
    .call(yAxis);


  svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[17].FoodEx) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "steelblue")
    .text("FoodExport");

  svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[17].CapitalEx) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "green")
    .text("CapitalEx");

  svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[17].GovernmentEx) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "brown")
    .text("GovermentEx");

console.log(data.length-1);
console.log(data[data.length-1].FoodEx);
console.log(data[0].FoodEx);
console.log(y(data[0].FoodEx));
console.log(y(data[0].CapitalEx));



});