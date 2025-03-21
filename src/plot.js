import * as d3 from "d3";

const colors = [
  "#800000",
  "#000080",
  "#ff7f50",
  "#ff8c00",
  "#ff00ff",
  "#9acd32",
  "#ff0000",
  "#008000",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff1493",
  "#8a2be2",
  "#5f9ea0",
  "#7fff00",
  "#dc143c",
  "#00ced1",
  "#ff4500",
  "#2e8b57",
  "#ff69b4",
  "#1e90ff",
  "#dda0dd",
  "#8b0000",
  "#2f4f4f",
  "#00fa9a",
  "#ff6347",
  "#4682b4",
  "#ffdab9",
  "#7b68ee",
  "#adff2f",
  "#f4a460",
  "#6a5acd",
  "#32cd32",
  "#ffb6c1",
  "#a52a2a",
  "#ffdead",
  "#b8860b",
  "#40e0d0",
  "#ff00ff",
  "#66cdaa",
  "#8b4513",
  "#20b2aa",
  "#808000",
  "#6495ed",
  "#d2691e",
  "#ffcc00",
  "#ba55d3",
  "#7f00ff",
  "#228b22",
  "#c71585",
];

const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

export default function getPlot({ xd, yd }) {
  const xa = d3
    .scaleLinear()
    .domain(xd)
    .range([marginLeft, width - marginRight]);

  const ya = d3
    .scaleLinear()
    .domain(yd)
    .range([height - marginBottom, marginTop]);

  const svg = d3.create("svg").attr("width", width).attr("height", height);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height - marginBottom})`)
    .call(d3.axisBottom(xa));
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft}, 0)`)
    .call(d3.axisLeft(ya));

  const drawPoint = ({ x, y, rad, color }) => {
    svg
      .append("circle")
      .attr("cx", xa(x))
      .attr("cy", ya(y))
      .attr("r", rad)
      .attr("fill", color);
  };

  const node = svg.node();
  node.style.display = "block";

  return {
    node,
    clear: () => {
      svg.selectAll("circle").remove();
    },
    draw: (clusters) => {
      for (let i = 0; i < clusters.length; i++) {
        drawPoint({
          x: clusters[i].centroid.x,
          y: clusters[i].centroid.y,
          rad: 10,
          color: colors[i],
        });
        for (const point of clusters[i].points) {
          drawPoint({
            x: point.x,
            y: point.y,
            rad: 3,
            color: colors[i],
          });
        }
      }
    },
  };
}
