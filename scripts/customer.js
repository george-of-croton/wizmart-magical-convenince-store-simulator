const stockItems = require("./stockItems");
const { createAccount } = require("./account");
const { nameToItemId } = require("./utils");
customer = (balance, shop) => {
  const account = createAccount(balance);
  const numberOfActions = Math.floor((Math.random() * 10) / 2);
  const affordableItems = stockItems.wholesale.filter(
    ({ price, markup }) => price * markup < balance
  );
  const actionList = Array(numberOfActions)
    .fill(Math.floor(Math.random() * 10))
    .reduce((acc, cur) => {
      const item = affordableItems[cur];

      if (item) {
        return [item, ...acc];
      }
      return acc;
    }, []);

  const receipt = [];

  for (const action of actionList) {
    const item = shop.stock.hasItem(nameToItemId(action.name));
    if (!item) {
      return;
    }
    shop.register.sell(item.id, account);
    receipt.push(item);
  }

  return receipt;
};

exports.createCustomer = (shop) => {
  const initialBalance = Math.max(
    1,
    (2 ** 32 / (Math.random() * 1e8 + 1)) * (1 - 0.01)
  );
  customer(initialBalance, shop);
};
