import { csvfileInput } from "./controls.js";
import getPlot from "./plot.js";

function plot(data) {
  const { node, point } = getPlot({ xd: [0, 100], yd: [0, 100] });
  for (const datum of data) {
    point({ x: datum[0], y: datum[1] });
  }
  return node;
}

document.body.appendChild(
  csvfileInput({
    onLoad: (data) => {
      document.body.appendChild(plot(data));
    },
  })
);
