import * as d3 from "d3";

// Create an svg path using the arc function
const arcGenerator = d3.arc();
const arcPath = arcGenerator({
  innerRadius: 40,
  outerRadius: 100,
  startAngle: 0,
  endAngle: Math.PI
});

// Add a path to the DOM with d3
d3.select("#my_dataviz")
  .append("g")
  .attr("transform", "translate(100, 100)")
  .append("path")
  .attr("d", arcPath)
  .attr("fill", "#69b3a2")
  .attr("stroke", "black");
