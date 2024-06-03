'use server';
import { config } from '@/config';
import localforage from 'localforage';
import CryptoJS from 'crypto-js';

class Storage {
    private store: LocalForage;
    private encryptionKey: string;
    constructor(storeName:string) {
        this.store = localforage.createInstance({
            name: "dbportalrevendedor",
            storeName: storeName // Esta será a "tabela"
        });
        this.encryptionKey = config.senhaDb;
    }

    async setItem(key:string, value:any) {
        // Criptografar os dados antes de salvá-los
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), this.encryptionKey).toString();
        await this.store.setItem(key, encryptedData);
    }

    async getItem(key:string) {
        // Recuperar os dados e descriptografá-los
        const encryptedData = await this.store.getItem(key);
        if (!encryptedData) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedData as any, this.encryptionKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    async removeItem(key: string): Promise<void> {
        await this.store.removeItem(key);
      }
}

export default Storage;


