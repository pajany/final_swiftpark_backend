import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface CourtesyCard extends BaseModel {
  id: number;
  lot_no:string;
  card_no: string;
  card_start_no:string;
  card_end_no:string;
  card_pin:string;
  calls: string;
  defaultcalls:number;
  amount:string;
  card_type: string;
  card_vaild: string;
  status: string;
}



export interface UpdateCourtesyCard extends BaseModel {
  id: [];
  lot_no:string;
  card_pin:string;
  calls: string;
  defaultcalls:number;
  amount:string;
  card_type: string;
  card_vaild: string;
  status: string;
}
