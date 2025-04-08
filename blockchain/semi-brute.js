const crypto = require("crypto");

function semiBrute(target) {
  let i = 0;

  while (true) {
    const hash = crypto.createHash("sha256").update(String(i)).digest("hex");
    if (hash.startsWith(target)) {
      return String(i);
    }
    i++;
  }
}
