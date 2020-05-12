const { stockRoom } = require("./stockRoom");
const { cashRegister } = require("./account");
exports.shop = (clock) => {
  const register = cashRegister();
  const stock = stockRoom();

  return {
    register,
    stock,
  };
};
