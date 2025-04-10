const crypto = require("crypto");
const fs = require("fs");

const WALLETPATH = "wallet.pem";

function generateAddress() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1",
  });

  const privateKeyPem = privateKey.export({
    type: "pkcs8",
    format: "pem",
  });
  fs.writeFileSync(WALLETPATH, privateKeyPem);

  const publicKeyDer = publicKey.export({
    type: "spki",
    format: "der",
  });

  const hash = crypto.createHash("sha256").update(publicKeyDer).digest("hex");

  const address = "01" + hash;

  return address;
}

function createTransaction(amount, recipient) {
  const privateKeyPem = fs.readFileSync("wallet.pem", "utf-8");
  const privateKey = crypto.createPrivateKey(privateKeyPem);

  const publicKey = crypto.createPublicKey(privateKey);
  const publicKeyDer = publicKey.export({ type: "spki", format: "der" });

  const sender =
    "01" + crypto.createHash("sha256").update(publicKeyDer).digest("hex");

  const hexAmount = amount.toString(16);

  const message = sender + recipient + hexAmount;

  const sign = crypto.createSign("sha256");
  sign.update(message);
  sign.end();
  const signature = sign.sign(privateKey).toString("hex");

  return message + signature;
}
