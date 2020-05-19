const { wizard: wizardSprite } = require("../resources/sprite-sheet");

const createPlayableSprite = ({ x, y }, { spriteMap, tileSize = 64 }) => {
  let position = {
    x,
    y,
  };

  const getPosition = () => position;
  const setPosition = (nextPosition) =>
    (position = { ...position, ...nextPosition });

  let direction = "L";

  const getDirection = () => direction;
  const setDirection = (nextDirection) => (direction = nextDirection);

  let animation = {
    isAnimating: false,
    type: null,
    currentFrame: 0,
    animationFrames: 0,
  };

  const getAnimationPosition = (renderData) => {
    const nextRenderData = renderData;
    const animationFrame = animation.animationFrames - animation.currentFrame;
    const coordArr = [];
    if (direction === "R") {
      return {
        ...nextRenderData,
        x:
          nextRenderData.x +
          1 -
          (tileSize / animation.animationFrames) * animationFrame,
      };
    }
    if (direction === "L") {
      return {
        ...nextRenderData,
        x:
          nextRenderData.x -
          1 +
          (tileSize / animation.animationFrames) * animationFrame,
      };
    }
    if (direction === "U") {
      return {
        ...nextRenderData,
        y:
          nextRenderData.y +
          1 +
          (tileSize / animation.animationFrames) * animationFrame,
      };
    }

    return {
      ...nextRenderData,
      y:
        nextRenderData.y -
        1 -
        (tileSize / animation.animationFrames) * animationFrame,
    };
  };

  const getRender = ({ scene }) => {
    const offset = scene.getOffset();
    const sceneAnimation = scene.getAnimation();

    const renderData = {
      asset: spriteMap.wizard,
      x: (position.x - offset.x) * tileSize,
      y: (position.y - offset.y) * tileSize,
      sizeX: tileSize,
      sizeY: tileSize,
    };
    if (sceneAnimation.scrolling) {
      return Object.values(renderData);
    }
    if (animation.isAnimating) {
      const animationRender = getAnimationPosition(renderData);
      return Object.values(animationRender);
    }
    return Object.values(renderData);
  };

  const getAnimation = () => animation;
  const setAnimation = (nextAnimation) => {
    animation = {
      ...animation,
      ...nextAnimation,
    };
  };

  const onTick = (ctx, scene) => {
    const map = scene.getMap();

    if (map.actionTiles[`${position.x}${position.y}`]) {
      console.log(map.actionTiles);
    }
    ctx.drawImage(...getRender({ scene }));
    animation.currentFrame += 1;
    if (
      animation.isAnimating &&
      animation.currentFrame === animation.animationFrames
    ) {
      animation = {
        isAnimating: false,
        type: null,
        currentFrame: 0,
        animationFrames: 0,
      };

      scene.setAnimation({ scrolling: false });
    }
  };

  return {
    getPosition,
    setPosition,
    getDirection,
    setDirection,
    getAnimation,
    setAnimation,
    getRender,
    onTick,
  };
};

module.exports = {
  wizard: createPlayableSprite(
    { x: 5, y: 6 },
    { spriteMap: { wizard: wizardSprite } }
  ),
};
