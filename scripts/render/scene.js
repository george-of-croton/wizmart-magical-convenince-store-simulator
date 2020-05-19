const createScene = ({ initialMap = [], tileMap, tileSize = 64, manager }) => {
  let animation = {
    scrolling: false,
  };
  let offset = {
    x: 0,
    y: 0,
  };

  const map = initialMap;

  const getTileCoords = ({ x, y }, player) => {
    const getTilePosition = (player, coord) => {
      if (animation.scrolling) {
      }
      return coord * tileSize;
    };

    if (animation.scrolling) {
      const playerAnimation = player.getAnimation();
      const playerDirection = player.getDirection();
      const tileOffset =
        (tileSize / playerAnimation.animationFrames) *
        playerAnimation.currentFrame;
      if (playerDirection === "R") {
        return [
          getTilePosition(player, x) - tileOffset,
          getTilePosition(player, y),
        ];
      }
      if (playerDirection === "L") {
        return [
          getTilePosition(player, x - 1) + tileOffset,
          getTilePosition(player, y),
        ];
      }
      if (playerDirection === "U") {
        return [
          getTilePosition(player, x),
          getTilePosition(player, y - 1) + tileOffset,
        ];
      }
      return [
        getTilePosition(player, x),
        getTilePosition(player, y) - tileOffset,
      ];
    }
    return [getTilePosition(player, x), getTilePosition(player, y)];
  };

  const calculateTile = (x, y, player) => {
    const playerDirection = player.getDirection();
    const tileOffsets = (animation.scrolling &&
      playerDirection === "R" && {
        x: -1,
        y: 0,
      }) ||
      (animation.scrolling &&
        playerDirection === "L" && {
          x: 0,
          y: 0,
        }) ||
      (animation.scrolling &&
        playerDirection === "D" && {
          x: 0,
          y: -1,
        }) ||
      (animation.scrolling && {
        x: 0,
        y: 0,
      }) || { x: 0, y: 0 };

    // if (playerDirection === "L") {
    //   console.log(tileOffsets, "L");
    // }

    const mapItem =
      map.map[x + offset.x + tileOffsets.x][y + offset.y + tileOffsets.y];

    const tileAsset = tileMap[mapItem.tile];

    const [xCoords, yCoords] = getTileCoords({ x, y }, player);
    // console.log(xCoords);
    return [tileAsset, xCoords, yCoords, tileSize, tileSize];
  };

  const renderTile = (ctx, x, y, wizard) => {
    const wizardPosition = wizard.getPosition();
    if (map.actionTiles[`${wizardPosition.x}${wizardPosition.y}`]) {
      map.actionTiles[`${wizardPosition.x}${wizardPosition.y}`]();
    }
    return ctx.drawImage(...calculateTile(x, y, wizard));
  };

  const renderAssets = (ctx, player) => {
    const playerDirection = player.getDirection();
    const playerAnimation = player.getAnimation();
    for (const { asset, position, dimensions } of map.assets) {
      if (animation.scrolling) {
        if (playerDirection === "R") {
          ctx.drawImage(
            asset,
            tileSize * position.x -
              tileSize * (offset.x - 1) -
              (tileSize / playerAnimation.animationFrames) *
                playerAnimation.currentFrame,
            tileSize * position.y - tileSize * offset.y,
            dimensions.x,
            dimensions.y
          );
        }
        if (playerDirection === "L") {
          ctx.drawImage(
            asset,
            tileSize * position.x -
              tileSize * (offset.x + 1) +
              (tileSize / playerAnimation.animationFrames) *
                playerAnimation.currentFrame,
            tileSize * position.y - tileSize * offset.y,
            dimensions.x,
            dimensions.y
          );
        }
        if (playerDirection === "D") {
          ctx.drawImage(
            asset,
            tileSize * position.x - tileSize * offset.x,
            tileSize * position.y -
              tileSize * (offset.y - 1) -
              (tileSize / playerAnimation.animationFrames) *
                playerAnimation.currentFrame,
            dimensions.x,
            dimensions.y
          );
        }
        if (playerDirection === "U") {
          ctx.drawImage(
            asset,
            tileSize * position.x - tileSize * offset.x,
            tileSize * position.y -
              tileSize * (offset.y + 1) +
              (tileSize / playerAnimation.animationFrames) *
                playerAnimation.currentFrame,
            dimensions.x,
            dimensions.y
          );
        }
      } else {
        ctx.drawImage(
          asset,
          tileSize * (position.x - offset.x),
          tileSize * (position.y - offset.y),
          dimensions.x,
          dimensions.y
        );
      }
    }
  };

  return {
    renderTile,
    renderAssets,
    getMap: () => map,
    getState: () => map.map,
    setMap: (nextMap) => (map = nextMap),
    getOffset: () => offset,
    setOffset: (nextOffset) => {
      offset = { ...offset, ...nextOffset };
    },
    getAnimation: () => animation,
    setAnimation: (nextAnimation) => {
      animation = {
        ...animation,
        ...nextAnimation,
      };
    },
    calculateTile,
  };
};

// const createSceneManager = ({ scenes = {} }) => {
//   let currentScene = scenes.main;
//   console.log("sddsa");
//   return {
//     getScenes: () => scenes,
//     getCurrentScene: () => currentScene,
//     setScene: (nextScene) => (currentScene = scenes[nextScene]),
//   };
// };

// const mainWorld = createScene({ initialMap: mainMap, tileMap });

// const storeWorld = createScene({ initialMap: storeMap, tileMap });

// const sceneManager = createSceneManager({
//   scenes: {
//     main: mainWorld,
//     store: storeWorld,
//   },
// });

module.exports = {
  createScene,
};
