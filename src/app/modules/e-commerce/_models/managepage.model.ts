import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface ManagePage extends BaseModel {
  id: number;
  page_content: string;
  pheader:string;
  ptitle:string;
  slug:string;
  ch_main_menu:string;
  main_menu_name:string;
}
