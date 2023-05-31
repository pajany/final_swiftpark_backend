import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface ManagePermit extends BaseModel {
  id: number;
  lot_no: string;
  permit_type:string;
  payment_type:string;
  permit_no:string;
  quantity:string;
  subtotal:string;
  taxamount:string;
  totalamount:string;
  license:string;
  email:string;
  phone:string;
  courtesy_number:string;
  pin:string;
  expires_date:string;
  Address:string;
}
