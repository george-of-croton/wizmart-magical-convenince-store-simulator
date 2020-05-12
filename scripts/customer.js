const stockItems = require("./stockItems");
const { createAccount } = require("./account");
customer = (balance, store) => {
  const account = createAccount(balance);
  const numberOfActions = Math.floor((Math.random() * 10) / 2);
  const affordableItems = stockItems.filter(
    ({ price, markup }) => price * markup < balance
  );
  const actionList = Array(numberOfActions)
    .fill(Math.random() * 10)
    .reduce((acc, cur) => {
      const item = affordableItems[cur];
      if (item) {
        return [cur, ...acc];
      }
      return acc;
    }, []);

  for (const action of actionList) {
    const item = shop.stock.hasItem(action.itemId);
    if (!item) return;
    shop.register.sell(item.id, account);
  }
};

exports.customerFactory = () => {
  const createCustomer = (shop) => {
    const initialBalance = Math.max(1, (2 ** 32 / (result + 1)) * (1 - 0.01));
    return customer(initialBalance, shop);
  };
  return {
    createCustomer,
  };
};
