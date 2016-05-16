var svg = d3.select('#someDivId').append('svg');

d3.csv('../datasets/tt.csv', function(data) {
  svg.selectAll('.tt')
  .data(data)
  .enter()
  .append('path')
  .attr('class','tt')});

d3.csv('../datasets/test.csv', function(data) {
  svg.selectAll('.test')
  .data(data)
  .enter()
  .append('path')
  .attr('class','test')});

console.log(function(d) {
  return d.date});