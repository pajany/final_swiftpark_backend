import { Injectable } from '@angular/core';
import { StorageConfiguration } from './storage-configuration';


@Injectable({
    providedIn: 'root'
    })
export class SessionRemove {

    constructor(
        private storageConfiguration: StorageConfiguration
    ) {

    }
    clearLabelSession() {
         this.storageConfiguration.sessionRemoveItem(this.storageConfiguration.checkChemicalLabelGeneration);
        this.storageConfiguration.sessionRemoveItem(this.storageConfiguration.checkComponentLabelGeneration);
        this.storageConfiguration.sessionRemoveItem(this.storageConfiguration.checkEquipmentLabelGeneration);
        this.storageConfiguration.sessionRemoveItem(this.storageConfiguration.checkBatchLabelGeneration);
    }
}



