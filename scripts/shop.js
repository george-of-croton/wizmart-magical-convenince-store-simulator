const { stockRoom } = require("./stockRoom");
const { cashRegister } = require("./account");
const stockItems = require("./stockItems");
exports.shop = (clock) => {
  const stock = stockRoom(stockItems.wholesale);
  const register = cashRegister(stock);

  return {
    register,
    stock,
  };
};
