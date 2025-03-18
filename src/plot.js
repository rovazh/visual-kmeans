import * as d3 from "d3";

let svg;
let xa;
let ya;

export default function getPlot({ xd, yd }) {
  if (!svg || xa || ya) {
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;
    xa = d3
      .scaleLinear()
      .domain(xd)
      .range([marginLeft, width - marginRight]);
    ya = d3
      .scaleLinear()
      .domain(yd)
      .range([height - marginBottom, marginTop]);
    svg = d3.create("svg").attr("width", width).attr("height", height);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(xa));
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(ya));
  }

  return {
    node: svg.node(),
    point: ({ x, y }) => {
      svg
        .append("circle")
        .attr("class", "circle")
        .attr("cx", xa(x))
        .attr("cy", ya(y))
        .attr("r", 5)
        .attr("fill", "red");
    },
    centroid: ({ x, y }) => {
      const { svg, xAxis, yAxis } = getPlot();
      svg
        .append("circle")
        .attr("cx", xAxis(x))
        .attr("cy", yAxis(y))
        .attr("r", 10)
        .attr("fill", "blue");
    },
    edge: ({ x1, y1, x2, y2 }) => {
      const { svg, xAxis, yAxis } = getPlot();
      svg
        .append("line")
        .attr("x1", xAxis(x1))
        .attr("y1", yAxis(y1))
        .attr("x2", xAxis(x2))
        .attr("y2", yAxis(y2))
        .attr("stroke", "red")
        .attr("stroke-width", 1);
    },
  };
}
