import CryptoJS from "crypto-js";

const encrypt = (text) => {
  const passphrase = process.env.REACT_APP_SECRET_KEY;
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decrypt = (cipherText) => {
  const passphrase = process.env.REACT_APP_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(cipherText, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const cryptoConverter = {
  encrypt,
  decrypt,
};

export default cryptoConverter;
