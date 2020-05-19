const wizardSprite = require("../../assets/pix-wiz-left.png");
const loadSprite = (filePath) => {
  const sprite = new Image();
  sprite.src = filePath;
  return sprite;
};

module.exports = {
  wizard: loadSprite(wizardSprite),
};
