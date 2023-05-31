import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface FileDispute extends BaseModel {
  id: number;
  plate_no: string;
  ticket_no:string;
  issue_date:string;
  address:string;
  permit_no:string;
  date_obtained:string;
 }
