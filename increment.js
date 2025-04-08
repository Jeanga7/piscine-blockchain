function increment(hex) {
    const number = parseInt(hex, 16);
  
    let hexResult = (number + 1).toString(16);
  
    return Buffer.from(hexResult, "hex");
  }
  