import { InspectionType } from './inspection-type.model';

export interface Inspection {
  id: number;
  status: string;
  comments: string;
  inspectionTypeId: number;
}
