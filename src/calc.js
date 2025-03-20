export function calcEuclidianDistance({ x1, y1, x2, y2 }) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y2 - y2, 2));
}

export const initClusters = (k, scale) => {
  const clusters = [];
  for (let i = 0; i < k; i++) {
    clusters.push({
      centroid: {
        x: Math.random() * scale,
        y: Math.random() * scale,
      },
      points: [],
    });
  }
  return clusters;
};

export const cluster = (clusters, data) => {
  for (const cluster of clusters) cluster.points = [];
  for (const datum of data) {
    const dataPoint = { x: datum[0], y: datum[1] };
    let clusterIndex = 0;
    let minDist;
    for (let i = 0; i < clusters.length; i++) {
      const dist = calcEuclidianDistance({
        x1: dataPoint.x,
        y1: dataPoint.y,
        x2: clusters[i].centroid.x,
        y2: clusters[i].centroid.y,
      });
      if (minDist === undefined || minDist > dist) {
        minDist = dist;
        clusterIndex = i;
      }
    }
    clusters[clusterIndex].points.push(dataPoint);
  }
  return clusters;
};

export const calcNewCentroids = (clusters) => {
  for (const cluster of clusters) {
    if (!cluster.points.length) continue;
    const sum = cluster.points.reduce(
      (acc, { x, y }) => ({ x: acc.x + x, y: acc.y + y }),
      { x: 0, y: 0 }
    );
    cluster.centroid = {
      x: sum.x / cluster.points.length,
      y: sum.y / cluster.points.length,
    };
  }
  return clusters;
};
