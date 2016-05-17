var margin = {top: 50, right: 20, bottom: 30, left: 200},
    width = 1300 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

var valueline = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.FoodIm); });
  
var valueline2 = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.CapitalIm); });

var governmentLineEx = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.GovernmentIm); });

var industrialLineEx = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.IndustrialIm); });

var transportationLineEx = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.TransportationIm); });
  
var travelLineEx = d3.svg.line()
  .x(function(d) { return x(d.Employment); })
  .y(function(d) { return y(d.TravelIm); });

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
    d.FoodIm = +d.FoodIm;
    d.CapitalIm = +d.CapitalIm;
    d.GovernmentIm = +d.GovernmentIm;
    d.TransportationIm= +d.TransportationIm;
    d.TravelIm = +d.TravelIm;
  });

  // Scale the range of the data
  x.domain([11000000, d3.max(data, function(d) { return d.Employment; })+300000]);
  y.domain([-0.5, d3.max(data, function(d) { return Math.max(d.FoodIm, d.CapitalIm, d.IndustrialIm, d.TransportationIm); })]);


  //Food export chart
  var foodExLine = svg.append("path")    // Add the valueline path.
    .attr("class", "line")
    .attr("d", valueline(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "5");
                                foodText.style("opacity","1");
                                foodExDot.attr("r",6);
                                foodExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");
                                foodText.style("opacity","0.25");
                                foodExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                foodExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );});

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
      .attr("cy", function(d) { return y(d.FoodIm); });


  //Capital Export Chart
  var capitalExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "green")
    .attr("d", valueline2(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "5");
                                capitalText.style("opacity","1");
                                capitalExDot.attr("r",6);
                                capitalExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");
                                capitalText.style("opacity","0.25");
                                capitalExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                capitalExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );});

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
    .attr("cy", function(d) { return y(d.CapitalIm); });

  
  //Government Export Chart
  var governmentExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "brown")
    .attr("d", governmentLineEx(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "5");
                                governmentText.style("opacity","1");
                                governmentExDot.attr("r",6);
                                governmentExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");
                                governmentText.style("opacity","0.25");
                                governmentExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                governmentExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );});

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
                                else if (d.Year==2009) {return "#003380";}
                                else {return "brown";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.GovernmentIm); });



  //Industrial Export Chart
  var industrialExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "purple")
    .attr("d", industrialLineEx(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "5");
                                industrialText.style("opacity","1");
                                industrialExDot.attr("r",6);
                                industrialExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");
                                industrialText.style("opacity","0.25");
                                industrialExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                industrialExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );});

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
                                else {return "purple";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.IndustrialIm); });




  //Transportation Export Chart
  var transportationExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "orange")
    .attr("d", transportationLineEx(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "5");
                                transportationText.style("opacity","1");
                                transportationExDot.attr("r",6);
                                transportationExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");
                                transportationText.style("opacity","0.25");
                                transportationExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                transportationExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );});

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
                                else {return "orange";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.TransportationIm); });




    //Travel Export Chart
  var travelExLine = svg.append("path")    // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "#5EF1F2")
    .attr("d", travelLineEx(data))
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                d3.select(this).style("stroke-width", "5");
                                travelText.style("opacity","1");
                                travelExDot.attr("r",6);
                                travelExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                d3.select(this).style("stroke-width", "3");
                                travelText.style("opacity","0.25");
                                travelExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                travelExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );});

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
                                else {return "#5EF1F2";}; })
    .attr("cx", function(d) { return x(d.Employment); })
    .attr("cy", function(d) { return y(d.TravelIm); });





  svg.append("g")     // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")     // Add the Y Axis
    .attr("class", "y axis")
    .call(yAxis);


  foodText=svg.append("text")
    .attr("transform", "translate(" + (width-70) + "," + y(data[5].FoodIm) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "steelblue")
    .style("opacity","0.25")
    .text("FoodExport")
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                foodExLine.style("stroke-width", "5");
                                foodExLine.style("opacity","1");
                                foodExDot.attr("r",6);
                                foodExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                foodExLine.style("stroke-width", "3");
                                foodExLine.style("opacity","0.25");
                                capitalExLine.style("opacity","0.25");
                                foodExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                foodExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );
                              });


  capitalText=svg.append("text")
    .attr("transform", "translate(" + (width-70) + "," + y(data[5].CapitalIm) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "green")
    .style("opacity","0.25")
    .text("CapitalEx")
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                capitalExLine.style("stroke-width", "5");
                                capitalExLine.style("opacity","1");
                                capitalExDot.attr("r",6);
                                capitalExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                capitalExLine.style("stroke-width", "3");
                                capitalExLine.style("opacity","0.25");
                                capitalExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                capitalExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );
                              });

  governmentText=svg.append("text")
    .attr("transform", "translate(" + (width-70) + "," + y(data[5].GovernmentIm) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "brown")
    .style("opacity","0.25")
    .text("GovermentEx")
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                governmentExLine.style("stroke-width", "5");
                                governmentExLine.style("opacity","1");
                                governmentExDot.attr("r",6);
                                governmentExDot.style("opacity","1");
                              })
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                governmentExLine.style("stroke-width", "3");
                                governmentExLine.style("opacity","0.25");
                                governmentExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                governmentExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );
                              });

  industrialText=svg.append("text")
    .attr("transform", "translate(" + (width-70) + "," + y(data[5].IndustrialIm) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "purple")
    .style("opacity","0.25")
    .text("IndustrialEx")
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                industrialExLine.style("stroke-width", "5");
                                industrialExLine.style("opacity","1");
                                industrialExDot.attr("r",6);
                                industrialExDot.style("opacity","1");
                              })
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                industrialExLine.style("stroke-width", "3");
                                industrialExLine.style("opacity","0.25");
                                industrialExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                industrialExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );
                              });

  transportationText=svg.append("text")
    .attr("transform", "translate(" + (width-70) + "," + (y(data[5].TransportationIm)-30) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "orange")
    .style("opacity","0.25")
    .text("TransportationEx")
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                transportationExLine.style("stroke-width", "5");
                                transportationExLine.style("opacity","1");
                                transportationExDot.attr("r",6);
                                transportationExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                transportationExLine.style("stroke-width", "3");
                                transportationExLine.style("opacity","0.25");
                                transportationExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                transportationExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );
                              });

  travelText= svg.append("text")
    .attr("transform", "translate(" + (width-70) + "," + (y(data[5].TravelIm)-10) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "red")
    .style("opacity","0.25")
    .text("TravelEx")
    .on("mouseover", function(){//d3.select(this).style("stroke","orange");
                                d3.select(this).style("opacity", "1");
                                travelExLine.style("stroke-width", "5");
                                travelExLine.style("opacity","1");
                                travelExDot.attr("r",6);
                                travelExDot.style("opacity","1");})
    .on("mouseout", function(){//d3.select(this).style("stroke","green");
                                d3.select(this).style("opacity", "0.25");
                                travelExLine.style("stroke-width", "3");
                                travelExLine.style("opacity","0.25");
                                travelExDot.attr("r",function(d){if(d.Year==2002 || d.Year==2009) {return 4;}
                           else {return 1;}; });
                                travelExDot.style("opacity", function(d){if(d.Year==2002) {return 1;}
                                  else if (d.Year==2009) {return 1;}
                                  else {return 0.3;}; } );
                              }
                                );


  labelxaxis= svg.append("text")
    .attr("transform", "translate(" + (width) + "," + (height-10) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .style("fill", "black")
    .style("font-weight", "bold")
    .style("font-size", 20)
    .text("Employment")

  labelyaxis= svg.append("text")
    .attr("transform", "translate(" + (10) + "," + (10) + ")" +"rotate(90)")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    //.style("transform", "rotate(90)")
    .style("fill", "black")
    .style("font-weight", "bold")
    .style("font-size", 20)
    .text("Imports(Percent Diff with 1997 as Base)")


  labelyaxis= svg.append("text")
    .attr("transform", "translate(" + (10) + "," + (height-6) + ")" )
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    //.style("transform", "rotate(90)")
    .style("fill", "black")
    .style("font-size", "13px")
    .text("(0 can be ignored)")

console.log(data.length-1);
console.log(data[data.length-1].FoodEx);
console.log(data[0].FoodEx);
console.log(y(data[0].FoodEx));
console.log(y(data[0].CapitalEx));



});