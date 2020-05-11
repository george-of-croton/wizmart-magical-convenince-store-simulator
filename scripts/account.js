const cli = require("./cli");
const demoStock = [
  {
    id: "1",
    name: "Chinese Cigarettes",
    price: 3,
    demand: [8, 10],
    expiry: 30 * 12,
  },
  {
    id: "2",
    name: "Chew Dude Gum",
    price: 0.01,
    demand: [2, 2],
    expiry: 30 * 6,
  },
  {
    id: "3",
    name: "Shifty TM Power bank",
    price: 10,
    demand: [0, 10],
  },
  {
    id: "4",
    name: "Big Banana",
    demand: [5, 5],
    price: 0.01,
    expiry: 7,
  },
];

const helpers = {
  toPairs: (object) => {
    const keys = Object.keys(object);
    return keys.map((key) => [key, object[key]]);
  },
  groupBy: (array, key) =>
    array.reduce(
      (acc, cur) => ({
        ...acc,
        [cur[key]]: acc[cur[key]] ? [...acc[cur[key]], cur] : [cur],
      }),
      {}
    ),
  fluctuation: () => {
    const num = Math.random() * 0.1;
    const nums = String(num).split("").map(Number);
    const multiplier = 0.1;
    for (const i = num.length - 1; i >= 0; i--) {
      const cur = nums[i];
      const next = nums[i - 1];

      if (cur - next === 0) {
        multiplier += 0.1;
      } else {
        break;
      }
    }

    const lastDigit = String(num).split("").pop();

    return lastDigit > 4 ? -(num * multiplier) : num * multiplier;
  },
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

const worldClock = () => {
  let time = 0;
  const handlers = {
    daily: [],
  };

  setInterval(() => {
    time += 1;
    if (Math.round(time / 300) > Math.round(time - 1 / 300)) {
      for (const handler of handlers.daily) {
        handler();
      }
    }
  }, 3000);

  const addHandler = (fn, freq) => handlers[freq].push(fn);

  const getTime = () => {
    const day = time / 300;
    const hours = time / 60;

    return {
      day,
      hours,
      minutes: time,
    };
  };

  return { getTime, addHandler };
};

const stockRoom = (initialStock = [], capacity = Infinity) => {
  let stockList = initialStock;

  const addStock = (items) => {
    for (const item in items) {
      if (item in stockList) {
        stocklist.item.push({
          item,
          date,
        });
      } else {
        stockList[item] = [{ item, date }];
      }
    }
  };

  const updateStockList = (nextStockList) => {
    stockList = nextStockList;
  };

  const depleteStock = (item) => {
    const [soldItem, ...rest] = stockList.filter(
      (stockItem) => stockItem.id === item
    );
    const filteredStock = stockList.filter(
      (stockItem) => stockItem.id !== item
    );
    updateStockList([...filteredStock, ...rest]);
    if (!soldItem) {
      console.error("item not found");
    }
    return soldItem;
  };

  const getStockList = () => helpers.groupBy(stockList, "name");

  return {
    getStockList,
    addStock,
    updateStockList,
    depleteStock,
  };
};

const cashRegister = (stockRoom) => {
  const account = createAccount(5);
  const sell = (item, wallet) => {
    const itemDetails = stockRoom.depleteStock(item);
    if (wallet.balance() >= itemDetails.price) {
      account.credit(itemDetails.price);
      wallet.debit(itemDetails.price);
    }
    console.log("insufficient funds", {
      balance: wallet.balance(),
      price,
      price: itemDetails.price,
    });
  };

  return {
    sell,
    account,
  };
};

const wholesaler = (clock) => {
  const wholesaleStockRoom = stockRoom(
    demoStock
      .map((item) => {
        const duplicates = Math.floor(Math.random() * 10);
        return Array(duplicates).fill(item);
      })
      .reduce((acc, cur) => acc.concat(cur), [])
  );

  const calculateDailyPrices = () => {
    const stock = wholesaleStockRoom.getStockList();
    const nextStock = helpers
      .toPairs(stock)
      .map(([key, val]) => {
        console.log(val);
        const [{ price }] = val;
        const fluctuation = helpers.fluctuation();
        return {
          [key]: val.map((item) => ({
            ...item,
            price: price + price * fluctuation,
          })),
        };
      })
      .reduce(
        (acc, cur) => ({
          ...acc,
          ...cur,
        }),
        {}
      );

    wholesaleStockRoom.updateStockList(nextStock);
  };

  clock.addHandler(() => calculateDailyPrices(), "daily");

  const register = cashRegister(wholesaleStockRoom);

  return {
    buy: register.sell,
    stock: wholesaleStockRoom,
    calculateDailyPrices,
  };
};

const customer = (balance) => {
  const account = createAccount(balance);
};

const customerFactory = () => {
  const createCustomer = () => {
    const number = parseInt(Array(8));
    const initialBalance = Math.max(1, (2 ** 32 / (result + 1)) * (1 - 0.01));
    return customer(initialBalance);
  };
  return {
    createCustomer,
  };
};

const shop = (clock) => {
  const register = cashRegister();
  const stock = stockRoom();

  return {
    register,
    stock,
  };
};

const init = async () => {
  const clock = worldClock();
  const mainWholesaler = wholesaler(clock);
  const store = shop(clock);
  cli(mainWholesaler, store, clock);

  await new Promise((res) =>
    setInterval(() => {
      if (false) {
        res();
      }
    }, 5000)
  );
};

init();
