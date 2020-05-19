const { toPairs, fluctiation } = require("./utils");
const { stockRoom } = require("./stockroom");
const { cashRegister } = require("./account");
const stockItems = require("./stockItems");

exports.wholesaler = (clock) => {
  const wholesaleStockRoom = stockRoom(
    stockItems.wholesale
      .map((item) => {
        const duplicates = Math.floor(Math.random() * 10);
        return Array(duplicates).fill(item);
      })
      .reduce((acc, cur) => acc.concat(cur), [])
  );

  const calculateDailyPrices = () => {
    const stock = wholesaleStockRoom.getStockList();
    const nextStock = toPairs(stock)
      .map(([key, val]) => {
        const [{ price }] = val;
        const fluctuation = fluctuation();
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
