const { worldClock } = require("./clock");
const { wholesaler } = require("./wholesaler");
const { shop } = require("./shop");
const cli = require("./cli");

const clock = worldClock();
const mainWholesaler = wholesaler(clock);
const store = shop(clock);
cli(mainWholesaler, store, clock);
