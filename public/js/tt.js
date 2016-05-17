var margin = {top: 20, right: 20, bottom: 30, left: 300},
    width = 1220 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

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

var industrialLineEx = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.IndustrialEx); });

var transportationLineEx = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.TransportationEx); });
  
var travelLineEx = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.TravelEx); });

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
    d.TransportationEx= +d.TransportationEx;
  });

  // Scale the range of the data
  x.domain([11000000, d3.max(data, function(d) { return d.Employment; })+300000]);
  y.domain([-0.3, d3.max(data, function(d) { return Math.max(d.FoodEx, d.CapitalEx, d.IndustrialEx, d.TransportationEx); })]);


  //Food export chart
  var foodExLine = svg.append("path")    // Add the valueline path.
    .attr("class", "line")
    .attr("d", valueline(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "5");
                                foodText.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");
                                foodText.style("opacity","0.25");});

  var foodExDot = svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; })
      // .style("stroke", "black")
      .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
      .style("fill", function(d){if(d.Year==2002) {return "black";}
                                  else if (d.Year==2009) {return "red";}
                                  else {return "blue";}; })
      .attr("cx", function(d) { return x(d.Employment); })
      .attr("cy", function(d) { return y(d.FoodEx); });


  //Capital Export Chart
  var capitalExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "green")
    .attr("d", valueline2(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "4");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");});

  var capitalExDot =svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; })
    // .style("stroke", "black")
    .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
    .style("fill", function(d){if(d.Year==2002) {return "black";}
                                else if (d.Year==2009) {return "red";}
                                else {return "green";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.CapitalEx); });

  
  //Government Export Chart
  var governmentExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "brown")
    .attr("d", governmentLineEx(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "4");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");});

  var governmentExDot =svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; })
    // .style("stroke", "black")
    .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
    .style("fill", function(d){if(d.Year==2002) {return "black";}
                                else if (d.Year==2009) {return "red";}
                                else {return "brown";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.GovernmentEx); });



  //Industrial Export Chart
  var industrialExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "purple")
    .attr("d", industrialLineEx(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "4");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");});

  var industrialExDot =svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; })
    // .style("stroke", "black")
    .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
    .style("fill", function(d){if(d.Year==2002) {return "black";}
                                else if (d.Year==2009) {return "red";}
                                else {return "gray";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.IndustrialEx); });




  //Transportation Export Chart
  var transportationExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "orange")
    .attr("d", transportationLineEx(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "4");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");});

  var transportationExDot =svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; })
    // .style("stroke", "black")
    .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
    .style("fill", function(d){if(d.Year==2002) {return "black";}
                                else if (d.Year==2009) {return "red";}
                                else {return "organge";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.TransportationEx); });




    //Travel Export Chart
  var travelExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", travelLineEx(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "4");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");});

  var travelExDot =svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; })
    // .style("stroke", "black")
    .style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; })
    .style("fill", function(d){if(d.Year==2002) {return "black";}
                                else if (d.Year==2009) {return "red";}
                                else {return "organge";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.TravelEx); });





  svg.append("g")     // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")     // Add the Y Axis
    .attr("class", "y axis")
    .call(yAxis);


  foodText=svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[5].FoodEx) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "steelblue")
    .style("opacity","0.25")
    .text("FoodExport");

  capitalText=svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[5].CapitalEx) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "green")
    .style("opacity","0.25")
    .text("CapitalEx");

  governmentText=svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[5].GovernmentEx) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "brown")
    .style("opacity","0.25")
    .text("GovermentEx");

  industrialText=svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[5].IndustrialEx) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "purple")
    .style("opacity","0.25")
    .text("IndustrialEx");

  transportationText=svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + y(data[5].TransportationEx) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "orange")
    .style("opacity","0.25")
    .text("TransportationEx");

  travelText= svg.append("text")
    .attr("transform", "translate(" + (width-50) + "," + (y(data[5].TravelEx)-10) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "red")
    .style("opacity","0.25")
    .text("TravelEx");


console.log(data.length-1);
console.log(data[data.length-1].FoodEx);
console.log(data[0].FoodEx);
console.log(y(data[0].FoodEx));
console.log(y(data[0].CapitalEx));



});