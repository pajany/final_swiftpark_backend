import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { EncryptDecrypt } from './encryptdecrypt';
import { AuthModel } from '../_models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class StorageConfiguration {

    constructor(private encryptDecrypt: EncryptDecrypt) { }

    public token = 'token';
    public id = 'id';
    public name = 'name';
    public role = 'role';
    public currentlogin = 'currentlogin';
    public password = 'password';
    public user_Info = 'user_Info';
    public menushow = 'adminmenushow';
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    sessionSetItem(key, value) {
        localStorage.setItem(this.encryptDecrypt.encrypt(key), this.encryptDecrypt.encrypt(value));
    }

    sessionGetItem(key) {
        let decryptedValue = localStorage.getItem(this.encryptDecrypt.encrypt(key));
        return decryptedValue != null ? this.encryptDecrypt.decrypt(decryptedValue) : null;
    }

    sessionRemoveItem(key) {
        localStorage.removeItem(this.encryptDecrypt.encrypt(key));
    }

    setAuthFromLocalStorage(auth: AuthModel): boolean {
        // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
        if (auth && auth.authToken) {
            localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
            return true;
        }
        return false;
    }
}
