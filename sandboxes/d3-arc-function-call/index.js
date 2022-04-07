// The arc function is part of the d3-shape module
import { arc } from "d3-shape";

// The arc function returns a function when its called
const arcGenerator = arc();

// The arcGenerator function that we now have is very handy to build svg path
// You need to provide it the features of your arc:
const firstArc = arcGenerator({
  innerRadius: 0,
  outerRadius: 100,
  startAngle: 0,
  endAngle: Math.PI / 2
});
console.log("The first arc looks like this in svg:", firstArc); // M6.123233995736766e-15,-100A100,100,0,0,1,100,0L0,0Z

// Note that the radius and angles can also be defined as constants
const buildArcWithFixedParameters = arc()
  .innerRadius(0)
  .outerRadius(100)
  .startAngle(0)
  .endAngle(Math.PI / 2);
const secondArc = buildArcWithFixedParameters();
console.log("The second arc looks the same:", secondArc); // M6.123233995736766e-15,-100A100,100,0,0,1,100,0L0,0Z
