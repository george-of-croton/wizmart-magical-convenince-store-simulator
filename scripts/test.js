const debounce = (func, wait, immediate) => {
  let timeout;
  return (args) => {
    const later = () => {
      timeout = null;
      func(args);
    };
    const callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(args);
  };
};

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

// const db = debounce((args) => console.log(args), 1000);

const customer = (balance) => {
  const account = createAccount(balance);
};

const customerFactory = () => {
  const createCustomer = () => {
    const number = parseInt(
      Array(9)
        .fill(Math.ceil(Math.random() * 10))
        .join("")
    );
    const initialBalance = Math.max(1, (2 ** 32 / (number + 1)) * (1 - 0.01));
    return customer(initialBalance);
  };

  createCustomer();
};

customerFactory();
