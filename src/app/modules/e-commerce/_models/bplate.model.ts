import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Bplate extends BaseModel {
  id: number;
  lot_no:string;
  plate_no: string;
 }
