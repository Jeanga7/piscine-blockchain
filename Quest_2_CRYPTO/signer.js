const crypto = require("crypto");

let privateKey;

function init() {
  const { publicKey, privateKey: priv } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1",
  });
  privateKey = priv;
  return publicKey;
}

function signer(message) {
  const sign = crypto.createSign("sha256");
  sign.update(message);
  sign.end();
  return sign.sign(privateKey);
}

function verifier(message, pubKey, signature) {
  const verify = crypto.createVerify("sha256");
  verify.update(message);
  verify.end();
  return verify.verify(pubKey, signature);
}
