import { color } from "d3";
import { calcNewCentroids, clusterize, initClusters } from "./calc.js";
import { button, csvfileInput } from "./controls.js";
import getPlot from "./plot.js";

const k = 3;

const colors = ["red", "blue", "green", "yellow"];

let clusters = [];

const { node, drawPoint, drawCentroid, clear } = getPlot({
  xd: [0, 100],
  yd: [0, 100],
});

const draw = () => {
  for (let i = 0; i < clusters.length; i++) {
    drawCentroid({
      x: clusters[i].centroid.x,
      y: clusters[i].centroid.y,
      color: colors[i],
    });
    for (const point of clusters[i].points) {
      drawPoint({ x: point.x, y: point.y, color: colors[i] });
    }
  }
};

let data;

function plot() {
  clusters = initClusters(k, 100);
  clusters = clusterize(clusters, data);
  draw();

  return node;
}

document.body.appendChild(
  csvfileInput({
    onLoad: (d) => {
      data = d;
      document.body.appendChild(plot());
    },
  })
);

document.body.appendChild(button({ text: "Start", onClick: () => {} }));
document.body.appendChild(
  button({
    text: "Next",
    onClick: () => {
      clusters = calcNewCentroids(clusters);
      for (const cluster of clusters) {
        cluster.points = [];
      }
      clear();
      clusters = clusterize(clusters, data);
      draw();
    },
  })
);
