const { createMap } = require("../render/map");
const { createScene } = require("../render/scene");
const { counter, wall } = require("./asset-sheet");
const tileMap = require("../resources/tile-sheet");

const storeWalls = [
  {
    dimensions: { x: 64, y: 64 * 5 },
    position: { x: 5, y: 4 },
  },
  {
    dimensions: { x: 64 * 5, y: 64 },
    position: { x: 6, y: 3 },
  },
  {
    dimensions: { x: 64, y: 64 * 5 },
    position: { x: 11, y: 4 },
  },
  {
    dimensions: { x: 64 * 6, y: 64 },
    position: { x: 5, y: 10 },
  },
];

const storeMap = createMap(
  7,
  5,
  false,
  28,
  {},
  [
    {
      dimensions: { x: 64 * 4, y: 64 },
      position: { x: 6, y: 5 },
      asset: counter,
    },
    {
      dimensions: { x: 64 * 5, y: 64 * 2 },
      position: { x: 6, y: 2 },
      asset: wall,
    },
  ],
  storeWalls
);

const storeWorld = createScene({ initialMap: storeMap, tileMap });

module.exports = { storeWorld };
