import { AuthModel } from './auth.model';

export class CustomerModel extends AuthModel {
    id: number;
    lot_no: string;
    client_name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    timezone: string;
    phone: string;
    fax: string;
    cell: string;
    email: string;
    keycontact: string;
    client_web: string;
    lot_active: boolean;
    msg: string;
    error_code: string; 
}
