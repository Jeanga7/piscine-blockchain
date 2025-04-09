const crypto = require("crypto");
const fs = require("fs");

function generateAddress() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1",
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
  });

  fs.writeFileSync("wallet.pem", privateKey);

  const pubKeyDer = crypto.createPublicKey(publicKey).export({
    type: "spki",
    format: "der",
  });

  const hash = crypto.createHash("sha256").update(pubKeyDer).digest("hex");

  const address = "01" + hash;

  return {
    privateKey,
    publicKey,
    address,
  };
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
