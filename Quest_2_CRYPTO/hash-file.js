const fs = require("fs/promises");
const crypto = require("crypto");

async function hashFile(fpath) {
  const content = await fs.readFile(fpath);
  const hash = crypto.createHash("sha256");
  hash.update(content);

  return hash.digest("hex");
}

module.exports = { hash160 };
