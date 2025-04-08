
function increment(hex) {
  const number = parseInt(hex, 16);

  let hexResult = (number + 1).toString(16);

  if (hexResult.length % 2 !== 0) {
    hexResult = "0" + hexResult;
  }

  console.log(hexResult)
  return Buffer.from(hexResult);
}

