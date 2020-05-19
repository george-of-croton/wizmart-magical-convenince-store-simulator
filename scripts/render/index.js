const { wizard } = require("./player");
const { sceneManager } = require("./scene-manager");
const { mainWorld } = require("../resources/main-world-map");
const { storeWorld } = require("../resources/store-map");
const controller = require("../controller");

const tileSize = 64;

function render(ctx, scene, players) {
  ctx.clearRect(0, 0, 1024, 800);
  const [wizard] = players;
  const wizardPosition = wizard.getPosition();
  document.getElementById("x").innerText = wizardPosition.x;
  document.getElementById("y").innerText = wizardPosition.y;
  const state = scene.getState();
  const renderSize = 19;
  const offset = scene.getOffset();

  for (let x = 0; x < renderSize + 1; x++) {
    for (let y = 0; y < renderSize + 1; y++) {
      try {
        if (state[x + offset.x][y + offset.y].tile) {
          scene.renderTile(ctx, x, y, wizard);
        } else {
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      } catch (e) {
        throw e;
      }
    }
  }
  scene.renderAssets(ctx, wizard);
  const funds = 50;
  for (player of players) {
    player.onTick(ctx, scene);
  }
}

const setup = () => {
  const canvas = document.createElement("canvas");
  var height = 300;
  var width = 300;
  canvas.setAttribute("id", "canvas");
  canvas.setAttribute("height", 800);
  canvas.setAttribute("width", 1024);
  canvas.setAttribute("background-color", "black");

  document.body.appendChild(canvas);
  return canvas.getContext("2d");
};

const init = () => {
  ctx = setup();
  sceneManager.addScene({ main: mainWorld, store: storeWorld });
  sceneManager.setScene("main");
  console.log(sceneManager.getCurrentScene());
  controller(wizard, sceneManager.getCurrentScene());
  setInterval(() => render(ctx, sceneManager.getCurrentScene(), [wizard]), 33);
};

init();
