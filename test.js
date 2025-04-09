const { generateAddress, createTransaction } = require('./basic-wallet');

// Génère une nouvelle adresse et affiche-la
console.log("🔐 Génération d'une nouvelle adresse...");
const wallet = generateAddress();
console.log("Adresse générée :", wallet.address);
console.log("Clé privée :\n", wallet.privateKey);
console.log("Clé publique :\n", wallet.publicKey);

// Crée une transaction vers une adresse fictive
const dummyRecipient = '01ffa17f4e0bbb2f049f5d1f9d4ab9fad967e6b0ed9a8fc94563d0b4e47b62e169';
const amount = 200;
console.log("\n💸 Création d'une transaction...");
const transaction = createTransaction(amount, dummyRecipient);
console.log("Transaction générée :\n", transaction);

// Vérifie la structure de la transaction
console.log("\n📦 Détails de la transaction :");
console.log("Longueur totale :", transaction.length);
console.log("Sender :", transaction.slice(0, 66));
console.log("Recipient :", transaction.slice(66, 132));
console.log("Montant hexadécimal :", transaction.slice(132, 134 + amount.toString(16).length));
console.log("Signature :", transaction.slice(134 + amount.toString(16).length));
