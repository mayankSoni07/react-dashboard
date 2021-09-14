import Crypto from "crypto-js";
import { CRYPTO_PUBLIC_KEY } from "variables/common";

// Get Random Number
export const getRandomNumber = () => {
  return parseInt(Math.random() * 1000);
};

// Used to encrypt given text by Crypto JS with the help of Secret key
// Param :
// text : message to encrypt
export const encryption = (text = "") => {
  return Crypto.AES.encrypt(text.toString(), CRYPTO_PUBLIC_KEY).toString();
};

// Used to decrypt given text by Crypto JS with the help of Secret key
// Param :
// cipherText : message to decrypt
export const decryption = (cipherText = "") => {
  return Crypto.AES.decrypt(cipherText.toString(), CRYPTO_PUBLIC_KEY).toString(
    Crypto.enc.Utf8
  );
};
