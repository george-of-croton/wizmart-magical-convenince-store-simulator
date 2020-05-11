const prompt = async () =>
  new Promise((res, rej) => {
    process.stdin.on("data", (data) => {
      return res(data.toString().trim());
    });
    process.stdin.on("error", rej);
  });

const cli = async (wholesaler, store, clock) => {
  console.log("awaiting cmd");
  const input = await prompt();
  if (input === "list") {
    const list = wholesaler.stock.getStockList();
    console.log(list);
  }

  if (input === "buy") {
    console.log("item name:");
    const itemName = await prompt();
    wholesaler.buy(itemName, store.register.account);
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
