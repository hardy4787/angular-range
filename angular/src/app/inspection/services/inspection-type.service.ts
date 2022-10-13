import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/shared/services/service-helper';
import { InspectionType } from '../models/inspection-type.model';
import { Inspection } from '../models/inspection.model';

@Injectable()
export class InspectionTypeService {
  readonly inspectionTypesUrl = 'api/inspectionTypes';
  readonly inspectionTypeByIdUrl = (id: number | string) =>
    `api/inspectionTypes/${id}`;

  constructor(private readonly serviceHelper: ServiceHelper) {}


  getInspectionTypes$(): Observable<InspectionType[]> {
    return this.serviceHelper.get$(this.inspectionTypesUrl);
  }

  addInspectionType$(data: InspectionType): Observable<InspectionType> {
    return this.serviceHelper.post$(this.inspectionTypesUrl, data);
  }

  updateInspectionType$(id: number, data: InspectionType): Observable<void> {
    return this.serviceHelper.put$(this.inspectionTypeByIdUrl(id), data);
  }

  deleteInspectionTypes(id: number | string) {
    return this.serviceHelper.delete$(this.inspectionTypeByIdUrl(id));
  }
}
