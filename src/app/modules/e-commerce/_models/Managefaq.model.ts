import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Managefaq extends BaseModel {
  id: number;
  faq_question: string;
  faq_answer: string;
   
}
