const prompt = async () =>
  new Promise((res, rej) => {
    process.stdin.on("data", (data) => {
      return res(data.toString().trim());
    });
    process.stdin.on("error", rej);
  });

const cli = async (wholesaler, store, clock, customerFactory) => {
  console.log(`
    commands:
    - ws: warehouse stock
    - ss: shop stock
    - buy: buy an item
    - bal: get shop balance
    - time: get world time
  `);
  const input = await prompt();
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

  return cli(wholesaler, store, clock);
};

module.exports = cli;
