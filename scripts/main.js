const { worldClock } = require("./clock");
const { wholesaler } = require("./wholesaler");
const { shop } = require("./shop");
const { createCustomer } = require("./customer");
const cli = require("./cli");

const clock = worldClock();
const mainWholesaler = wholesaler(clock);
const store = shop(clock);
clock.addHandler(() => createCustomer(store), "minutely");
cli(mainWholesaler, store, clock);
