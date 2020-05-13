const { nameToItemId } = require("./utils");
const createAccount = (initialBalance) => {
  let balance = initialBalance;

  const ledger = {
    credit: [],
    debit: [],
  };

  credit = (amount, ref) => {
    balance = balance + amount;
    ledger.credit.push([amount, ref]);
  };

  debit = (amount, ref) => {
    console.log("sdas");
    balance = balance - amount;
    console.log("balance", balance);
    console.log(balance);
    ledger.debit.push([amount, ref]);
    return balance;
  };

  return {
    balance: () => balance,
    credit,
    debit,
    ledger,
  };
};

const cashRegister = (stockRoom, initialBalance = 50) => {
  const account = createAccount(initialBalance);
  const sell = (item, wallet, fn) => {
    console.log(item);
    const itemInStock = stockRoom.hasItem(item, "id");
    if (!itemInStock) {
      console.log(item, "item unvailable");
      return;
    }
    const itemDetails = stockRoom.depleteStock(item);
    if (!wallet.balance() >= itemDetails.price) {
      console.log("insufficient funds", {
        balance: wallet.balance(),
        price: itemDetails.price,
      });
      return;
    }
    account.credit(itemDetails.price);
    wallet.debit(itemDetails.price);
    if (fn) {
      fn([itemDetails]);
    }
  };

  return {
    sell,
    account,
  };
};

module.exports = {
  cashRegister,
  createAccount,
};
