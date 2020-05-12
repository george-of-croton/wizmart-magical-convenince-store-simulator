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

const cashRegister = (stockRoom) => {
  const account = createAccount(5);
  const sell = (item, wallet, fn) => {
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
