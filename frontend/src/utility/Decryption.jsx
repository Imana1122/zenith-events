import CryptoJS from 'crypto-js';

export const decryptData = (encryptedData) => {
  const payload = encryptedData;
  const key = 'base64:3pZDHCKxVG+uCVQtBq6fr3GoySFtZv++2Tuomn1T83g=';
  console.log(payload);

  const encryptData = JSON.parse(payload);
  const iv = CryptoJS.enc.Base64.parse(encryptData.iv);
  const ciphertext = CryptoJS.enc.Base64.parse(encryptData.value).toString(CryptoJS.enc.Utf8);
console.log(ciphertext)


  const decrypted = CryptoJS.AES.decrypt(
    ciphertext,  // Pass the ciphertext directly
   key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
console.log(decrypted.words)
  const numberString = String(decrypted.words[0]);
const paddedString = numberString.padStart(10, '0');
const fourDigitNumber = paddedString.slice(-4);

console.log(fourDigitNumber);



  return fourDigitNumber;
};
