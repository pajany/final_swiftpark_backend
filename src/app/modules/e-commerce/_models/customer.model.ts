import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Customer extends BaseModel {
  id: number;
  username: string;
  lastname:string;
  email:string;
  password: string;
  pin:string;
  admin_usertype: string;
  status: string;

}
