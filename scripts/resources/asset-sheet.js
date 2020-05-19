const store = require("../../assets/store.png");
const pyramid = require("../../assets/pyramid.png");
const wizmart = require("../../assets/wizmart.png");
const diamond = require("../../assets/diamond.png");
const counter = require("../../assets/counter.png");
const wall = require("../../assets/wizmart.png");
const loadAsset = (path) => {
  const asset = new Image();
  asset.src = path;
  return asset;
};

module.exports = {
  store: loadAsset(store),
  pyramid: loadAsset(pyramid),
  wizmart: loadAsset(wizmart),
  diamond: loadAsset(diamond),
  counter: loadAsset(counter),
  wall: loadAsset(wall),
};
