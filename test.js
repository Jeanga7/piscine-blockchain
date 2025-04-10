const getAccount = require("./get-account");

getAccount().then(account => {
  console.log("Premier compte local :", account);
});