const { AES, enc } = require("crypto-js");

class Secure {
    private encryptKey: string = '';

    init(encryptKey: string) {
        this.encryptKey = encryptKey;
    }

    aesEncrypt(rawData: any) {
      const ciphertext = AES.encrypt(JSON.stringify(rawData), this.encryptKey).toString();
  
      return ciphertext;
    }
  
    aesDecrypt(encryptedData: string) {
      if (Object.keys(encryptedData).length == 0) return encryptedData;
  
      const bytes = AES.decrypt(encryptedData, this.encryptKey);
      const rawData = JSON.parse(bytes.toString(enc.Utf8));
  
      return rawData;
    }

    aesEncryptUseKey(key: string, rawData: any) {
      const ciphertext = AES.encrypt(
        JSON.stringify(rawData),
        key
      ).toString();
      return ciphertext;
    }
  
    aesDecryptUseKey(key: string, encryptedData: any) {
      const bytes = AES.decrypt(encryptedData, key);
      const rawData = JSON.parse(bytes.toString(enc.Utf8));
  
      return rawData;
    }
  }

  const secure = new Secure();
  export default secure;
  