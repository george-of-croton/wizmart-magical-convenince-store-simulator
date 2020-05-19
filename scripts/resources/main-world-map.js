const { createMap } = require("../render/map");
const tileMap = require("../resources/tile-sheet");
const { store, pyramid, wizmart, diamond } = require("./asset-sheet");
const { sceneManager } = require("../render/scene-manager");
const { createScene } = require("../render/scene");

const mainMapActionTiles = {
  "55": () => {
    sceneManager.setScene("store");
  },
};

const mainMapAssets = [
  {
    asset: store,
    dimensions: { x: 256, y: 256 },
    position: { x: 0, y: 0 },
  },
  {
    asset: pyramid,
    dimensions: { x: 256, y: 256 },
    position: { x: 5, y: 0 },
  },
  {
    asset: wizmart,
    dimensions: { x: 256, y: 512 },
    position: { x: 10, y: 0 },
  },
  {
    asset: diamond,
    dimensions: { x: 128, y: 128 },
    position: { x: 6, y: 12 },
    scale: 2,
  },
];

const mainMap = createMap(
  Infinity,
  Infinity,
  true,
  500,
  mainMapActionTiles,
  mainMapAssets,
  // [],
  [],
  "path"
);

// const createScene()

const mainWorld = createScene({ initialMap: mainMap, tileMap });

module.exports = { mainWorld };
