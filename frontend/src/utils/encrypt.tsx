// src/utils/crypto-utils.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_COOKIE_SECRET_KEY || 'default-secret-key'; // use uma variável de ambiente segura

export function encryptData(data: object): string {
  const stringifiedData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY).toString();
}

export function decryptData(cipherText: string): any {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
}