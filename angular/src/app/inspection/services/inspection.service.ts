import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/shared/services/service-helper';
import { Inspection } from '../models/inspection.model';

@Injectable()
export class InspectionService {
  readonly inspectionUrl = 'api/inspections';
  readonly inspectionByIdUrl = (id: number | string) => `api/inspections/${id}`;

  constructor(private readonly serviceHelper: ServiceHelper) {}

  getInspections$(): Observable<Inspection[]> {
    return this.serviceHelper.get$<Inspection[]>(this.inspectionUrl);
  }

  saveInspections$(data: Inspection[]): Observable<Inspection[]> {
    return this.serviceHelper.post$(`${this.inspectionUrl}/save`, data);
  }

  deleteInspection$(id: number): Observable<void> {
    return this.serviceHelper.delete$(this.inspectionByIdUrl(id));
  }
}
