const { createCustomer } = require("./customer");
const getPrompt = () => {
  const stdin = process.stdin;
  return async () =>
    new Promise((res, rej) => {
      stdin.on("data", (data) => {
        res(data.toString().trim());
        stdin.removeAllListeners();
      });
      stdin.on("error", rej);
    });
};

const prompt = getPrompt();

const cli = async (wholesaler, store, clock) => {
  // console.clear();
  console.log(`
    commands:
    - ws: warehouse stock
    - ss: shop stock
    - buy: buy an item
    - bal: get shop balance
    - time: get world time
    - cust: create a customer event
  `);
  const input = await prompt();
  console.clear();
  if (input === "ws") {
    const list = wholesaler.stock.getStockReport();
    console.table(list);
  }

  if (input === "ss") {
    const list = store.stock.getStockList();
    console.log(list);
  }

  if (input === "buy") {
    console.log("item name:");
    const itemName = await prompt();
    wholesaler.buy(itemName, store.register.account, store.stock.addStock);
  }

  if (input === "bal") {
    console.log(store.register.account.balance());
  }

  if (input === "time") {
    console.log(clock.getTime());
  }

  if (input === "cust") {
    createCustomer(store);
  }
  return cli(wholesaler, store, clock);
};

module.exports = cli;
