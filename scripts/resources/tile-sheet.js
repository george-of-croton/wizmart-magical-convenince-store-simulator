const TILE_SIZE = 64;
const grass = require("../../assets/grass.png");
const tile = require("../../assets/tile.png");
const mat = require("../../assets/mat.png");
const planks = require("../../assets/planks.png");

const loadTile = (src) => {
  const tile = new Image();
  tile.src = src;
  return tile;
};
// const
// let wizmart = new Image(100, 100);
// wizmart.src = "../../assets/wizmart.png";
// let path = new Image(TILE_SIZE, TILE_SIZE);
// path.src = grass;
// let planks = new Image(TILE_SIZE, TILE_SIZE);
// planks.src = "../../assets/planks.png";
// let tile = new Image(TILE_SIZE, TILE_SIZE);
// tile.src = tile;
// let mat = new Image(TILE_SIZE, TILE_SIZE);
// mat.src = "../../assets/mat.png";
// let tree = new Image(TILE_SIZE, TILE_SIZE);
// tree.src = "../../assets/tree.png";

module.exports = {
  // tree: tree,
  path: loadTile(grass),
  tile: loadTile(tile),
  mat: loadTile(mat),
  // wizmart,
  planks: loadTile(planks),
};
