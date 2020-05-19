const controller = (player, scene, renderSize = 12) => {
  const screenTileHeight = 12;
  const screenTileWidth = 16;
  document.addEventListener("keydown", (e) => {
    const currentMap = scene.getMap();

    const playerAnimations = player.getAnimation();
    const playerDirection = player.getDirection();
    const playerPosition = player.getPosition();
    const worldOffset = scene.getOffset();

    const mapsize = currentMap.mapSize;
    const bigMap = mapsize > 29;

    if (e.key === "ArrowRight" && playerPosition.x < mapsize - 4) {
      if (playerDirection === "L") {
        player.setDirection("R");
        return;
      }
      player.setDirection("R");
      if (currentMap.hasWall(playerPosition.x, playerPosition.y, "right")) {
        console.log("wall");
        return;
      }

      if (
        bigMap &&
        playerPosition.x - worldOffset.x > 5 &&
        playerPosition.x + (renderSize + 1) < mapsize
      ) {
        console.log(scene.getAnimation());
        scene.setOffset({ x: worldOffset.x + 1 });
        scene.setAnimation({ scrolling: true });
      }
      player.setAnimation({
        isAnimating: true,
        type: "walk",
        currentFrame: 0,
        animationFrames: 3,
      });
      player.setPosition({ x: playerPosition.x + 1 });
    }
    if (e.key === "ArrowLeft" && playerPosition.x > 0) {
      if (playerDirection === "R") {
        player.setDirection("L");
        return;
      }
      player.setDirection("L");
      if (currentMap.hasWall(playerPosition.x, playerPosition.y, "left")) {
        console.log("wall");
        return;
      }

      if (bigMap && worldOffset.x > 0 && playerPosition.x - worldOffset.x > 4) {
        scene.setOffset({ x: worldOffset.x - 1 });
        scene.setAnimation({ scrolling: true });
      }
      player.setAnimation({
        isAnimating: true,
        type: "walk",
        currentFrame: 0,
        animationFrames: 3,
      });
      player.setPosition({ x: playerPosition.x - 1 });
      // console.log(player.getPosition(), "dsadsa");
    }

    if (e.key === "ArrowDown" && playerPosition.y < mapsize - 2) {
      console.log("sdas");
      if (playerDirection === "U") {
        player.setDirection("D");
        return;
      }
      player.setDirection("D");
      if (currentMap.hasWall(playerPosition.x, playerPosition.y, "down")) {
        console.log("wall");
        return;
      }

      if (
        bigMap &&
        playerPosition.y - worldOffset.y > screenTileHeight / 2 &&
        worldOffset.y + playerPosition.y - screenTileHeight * 2 < mapsize - 2
      ) {
        scene.setOffset({ y: worldOffset.y + 1 });
        scene.setAnimation({ scrolling: true });
      }
      player.setAnimation({
        isAnimating: true,
        type: "walk",
        currentFrame: 0,
        animationFrames: 3,
      });
      player.setPosition({ y: playerPosition.y + 1 });
      console.log(player.getPosition(), "dsadsa");
    }

    console.log(e.key, playerPosition.y);
    if (e.key === "ArrowUp" && playerPosition.y > 0) {
      console.log("updasdsads");
      if (playerDirection === "D") {
        player.setDirection("U");
        return;
      }
      player.setDirection("U");
      if (currentMap.hasWall(playerPosition.x, playerPosition.y, "up")) {
        console.log("wall");
        return;
      }

      if (bigMap && worldOffset.y > 0 && playerPosition.y - worldOffset.y < 3) {
        scene.setOffset({ y: worldOffset.y - 1 });
        scene.setAnimation({ scrolling: true });
      }
      player.setAnimation({
        isAnimating: true,
        type: "walk",
        currentFrame: 0,
        animationFrames: 3,
      });
      player.setPosition({ y: playerPosition.y - 1 });
    }
  });
};

module.exports = controller;
