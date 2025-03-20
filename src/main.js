import { calcNewCentroids, cluster, initClusters } from "./calc.js";
import { button, csvfileInput, numericInput } from "./controls.js";
import getPlot from "./plot.js";

const { node, draw, clear } = getPlot({
  xd: [0, 100],
  yd: [0, 100],
});

let k = 3;
let clusters;
let data;

function initialize() {
  clusters = [];
  clusters = initClusters(k, 100);
  clusters = cluster(clusters, data);
  clear();
  draw(clusters);
}

function doNextIteration() {
  clusters = calcNewCentroids(clusters);
  clusters = cluster(clusters, data);
  clear();
  draw(clusters);
}

document.body.appendChild(node);
document.body.appendChild(
  csvfileInput({
    onLoad: (d) => {
      if (!data) {
        document.body.appendChild(
          button({
            text: "Reset",
            onClick: initialize,
          })
        );
        document.body.appendChild(
          button({
            text: "Next Iteration",
            onClick: doNextIteration,
          })
        );
      }
      data = d;
      initialize();
    },
  })
);
document.body.appendChild(
  numericInput({
    min: 1,
    max: 30,
    dv: 3,
    onInput: (v) => (k = v),
  })
);
