const bcrypt = require('bcrypt');
const bitcoin = require('bitcoinjs-lib');
const ECPairFactory = require('ecpair').default || require('ecpair'); // CommonJS support
const ecc = require('tiny-secp256k1');
const crypto = require('crypto');

const ECPair = ECPairFactory(ecc);

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
};

const isPasswordMatch = async (password, dbPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, dbPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Failed to compare passwords");
  }
};

const encryptPrivateKey = (privateKey, secretHex) => {
  const key = Buffer.from(secretHex, 'hex'); // convert hex string to buffer
  const iv = crypto.randomBytes(16); // random 16-byte IV

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(privateKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Include the IV along with the encrypted data (you'll need it for decryption)
  return iv.toString('hex') + ':' + encrypted;
};

const decryptPrivateKey = (encryptedData, secretHex) => {
  const [ivHex, encrypted] = encryptedData.split(':');

  const key = Buffer.from(secretHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

const generateUserKeypair = async () => {
  console.log("in generateUserKeyPair");
  try {
    // Use ECPair from ecpair package with tiny-secp256k1
    const keyPair = ECPair.makeRandom();
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: bitcoin.networks.bitcoin,
    });

    const privateKeyWIF = keyPair.toWIF();
    const publicKeyHex = keyPair.publicKey.toString('hex');

    const encryptedPrivateKey = encryptPrivateKey(privateKeyWIF, process.env.PRIVATE_SECRET_KEY);
    console.log("finished generateUserKeyPair");

    return {
      privateKey: encryptedPrivateKey,
      publicKey: publicKeyHex,
      address,
    };
  } catch (error) {
    console.log("Error in generateUserKeypair:", error);
    throw error;
  }
};

module.exports = { hashPassword, isPasswordMatch, generateUserKeypair, encryptPrivateKey, decryptPrivateKey };
