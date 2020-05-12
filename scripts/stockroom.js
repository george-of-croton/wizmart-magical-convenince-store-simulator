const { groupBy, toPairs, fromPairs } = require("./utils");
exports.stockRoom = (initialStock = [], capacity = Infinity) => {
  let stockNumber = 1;
  let stockList = initialStock.map((item) => ({
    id: String(stockNumber++),
    itemId: item.name.split(" ").join("_"),
    ...item,
  }));

  const addStock = (items) => {
    console.log({ items });
    stockList = stockList.concat(items);
    console.log(stockList);
  };

  const updateStockList = (nextStockList) => {
    stockList = nextStockList;
  };

  const depleteStock = (item) => {
    console.log({ item });
    console.log(stockList);
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

  const getStockList = (group = "name") => groupBy(stockList, group);
  const getStockReport = () => {
    const pairs = toPairs(getStockList()).map(([k, v]) => {
      const reducedStock = v.reduce((acc, cur) => {
        return {
          price: cur.price,
          ids: acc.ids ? acc.ids + "," + cur.id : cur.id,
        };
      }, {});
      return [k, reducedStock];
    });
    return fromPairs(pairs);
  };
  const hasItem = (itemId) => {
    const [item] = getStockList("itemId")[itemId];
    if (item) {
      return item;
    }
    return false;
  };

  return {
    getStockList,
    getStockReport,
    addStock,
    updateStockList,
    depleteStock,
    hasItem,
  };
};
