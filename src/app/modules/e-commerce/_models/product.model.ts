import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Product extends BaseModel {
  id: number;
  lot_no: string;
  located: string;
  client_name: string;
  qrcode_img:string;
  address: string;
  note: string;
  city: string;
  state: string;
  zipcode: string;
  timezone: string;
  phone: string;
  fax: string;
  cell: string;
  email: string;
  keycontact: string;
  taxable: string;
 
  month_permit:string;
  day_permit:string;
  hourly_permit:string;
  hourly:string;
  twentyfourhour:string;
  thirtyday:string;
  
  lot_active:any;
  allday_permit_amount:string;
  allday_permit:string;
  allday:string;
  alldaytime:string;

  
  courtesy_charge:string;
  swift_charge:string;
  overnighttime:string;
  overnight:string;
  overnight_permit_amount:string;
  overnight_permit:string;

  tax_amount:string;
  permits_sold:string;
  client_web:string;
  password:string;
  fromdate:Date;
  todate:Date;  
}
