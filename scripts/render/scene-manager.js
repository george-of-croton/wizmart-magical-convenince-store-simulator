// const createScene = require("./scene");
const tileMap = require("../resources/tile-sheet");
// const mainMap = require("../resources/main-world-map");
// const storeMap = require("../resources/store-map");

const createSceneManager = ({ scenes = {} }) => {
  let currentScene;
  let sceneList = scenes;
  return {
    addScene: (scene) => {
      sceneList = { ...sceneList, ...scene };
    },
    getScenes: () => sceneList,
    getCurrentScene: () => currentScene,
    setScene: (nextScene) => (currentScene = sceneList[nextScene]),
  };
};

const sceneManager = createSceneManager({});
//
exports.sceneManager = sceneManager;
