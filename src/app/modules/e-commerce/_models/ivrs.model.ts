import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface IvrsPage extends BaseModel {
  id: number;
  lot_no: number;
  name: string;
  pin: number;
}
