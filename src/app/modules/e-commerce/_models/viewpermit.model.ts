import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface ViewPermit extends BaseModel {
  id: number;
  lot_no: string;
  permit_type:string;
  payment_type: string;
  permit_no:number;
  quantity:string;
  subtotal: string;
  taxamount: string;
  totalamount: string;
  license: string;
  email: string;
  phone: string;
  courtesy_number: string;
  pin: string;
  user_ip: string;
  created_by: string;
  expires_date: string;
}
