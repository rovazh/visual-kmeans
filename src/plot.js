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
    clear: () => {
      svg.selectAll("circle").remove();
    },
    drawPoint: ({ x, y, color }) => {
      svg
        .append("circle")
        .attr("cx", xa(x))
        .attr("cy", ya(y))
        .attr("r", 5)
        .attr("fill", color);
    },
    drawCentroid: ({ x, y, color }) => {
      svg
        .append("circle")
        .attr("cx", xa(x))
        .attr("cy", ya(y))
        .attr("r", 10)
        .attr("fill", color);
    },
    edge: ({ x1, y1, x2, y2, color }) => {
      svg
        .append("line")
        .attr("x1", xa(x1))
        .attr("y1", ya(y1))
        .attr("x2", xa(x2))
        .attr("y2", ya(y2))
        .attr("stroke", color)
        .attr("stroke-width", 1);
    },
  };
}
