 import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class EncryptDecrypt {

    encrypt(inputEncrypt) {
        let key = crypto.enc.Utf8.parse('7061737323313244');
        let iv = crypto.enc.Utf8.parse('7061737323313244');
        let encrypted = crypto.AES.encrypt(crypto.enc.Utf8.parse(inputEncrypt), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: crypto.mode.CBC,
                padding: crypto.pad.Pkcs7
            });
        return encrypted.toString();
    }

    decrypt(inputDecrypt) {
        let key = crypto.enc.Utf8.parse('7061737323313244');
        let iv = crypto.enc.Utf8.parse('7061737323313244');

        let decrypted = crypto.AES.decrypt(inputDecrypt, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        });

        return decrypted.toString(crypto.enc.Utf8);
    }
}
