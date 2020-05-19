const tileSize = 64;
const createWalls = (assets) =>
  assets.reduce((acc, asset) => {
    const tilesx = asset.dimensions.x / tileSize;
    const tilesY = asset.dimensions.y / tileSize;
    const tiles = {};
    for (let x = 0; x < tilesx; x++) {
      for (let y = 0; y < tilesY; y++) {
        tiles[
          String(asset.position.x + x) + "-" + String(asset.position.y + y)
        ] = true;
      }
    }
    return {
      ...tiles,
      ...acc,
    };
  }, {});

const createMap = (
  height,
  width,
  large,
  worldSize = 50,
  actionTiles,
  assets = [],
  walls = [],
  defaultTile = "planks",
  screenTileWidth = 16,
  screenTileHeight = 12
) => {
  const map = [];
  const xOffset = width < screenTileWidth ? (screenTileWidth - width) / 2 : 0;
  const yOffset =
    height < screenTileWidth ? (screenTileHeight - height) / 2 : 0;
  for (let x = 0; x < worldSize; x++)
    for (let y = 0; y < worldSize; y++) {
      if (!map[x]) {
        map[x] = [];
      }
      map[x][y] = {};
      if (xOffset) {
        if (
          x > xOffset &&
          x < screenTileWidth - xOffset &&
          y > yOffset &&
          y < screenTileHeight - yOffset
        ) {
          console.log("tile");
          map[x][y].tile = defaultTile;
        }
      } else {
        map[x][y].tile = defaultTile;
      }
      if (actionTiles[[x, y].join("")]) {
        map[x][y].tile = "mat";
      }
    }

  const mapWalls = createWalls([...assets, ...walls]);
  const hasWall = (x, y, direction) => {
    const dirMap = {
      up: String(x) + "-" + String(y - 1),
      down: String(x) + "-" + String(y + 1),
      left: String(x - 1) + "-" + String(y),
      right: String(x + 1) + "-" + String(y),
    };
    return Boolean(mapWalls[dirMap[direction]]);
  };
  return {
    map,
    mapSize: worldSize,
    assets,
    actionTiles,
    mapWalls: createWalls([...assets, ...walls]),
    hasWall,
    // mapWalls: createWalls([...assets, ...walls]),
  };
};

module.exports = {
  createMap,
};
