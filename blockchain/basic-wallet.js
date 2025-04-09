const crypto = require("crypto");
const fs = require("fs");

const WALLETPATH = "wallet.pem";

function generateAddress() {
  const { generateKeyPairSync, createHash } = require("crypto");
  const fs = require("fs");

  const { privateKey, publicKey } = generateKeyPairSync("ec", {
    namedCurve: "secp256k1",
  });

  const privateKeyPem = privateKey.export({ type: "pkcs8", format: "pem" });
  fs.writeFileSync("wallet.pem", privateKeyPem);

  const publicKeyDer = publicKey.export({ type: "spki", format: "der" });

  const hash = createHash("sha256").update(publicKeyDer).digest("hex");
  const address = "01" + hash;

  return address;
}

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
