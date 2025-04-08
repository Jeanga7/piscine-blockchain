const crypto = require("crypto");

function hash160(entry) {
  const sha256 = crypto
    .createHash("sha256")
    .update(Buffer.from(entry))
    .digest();
  const ripemd160 = crypto.createHash("ripemd160").update(sha256).digest();
  return ripemd160;
}
