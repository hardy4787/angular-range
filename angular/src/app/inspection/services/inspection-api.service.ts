import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/shared/services/service-helper';

@Injectable({
  providedIn: 'root',
})
export class InspectionApiService {
  readonly statusUrl = 'api/status';
  readonly statusByIdUrl = (id: number | string) => `api/status/${id}`;
  readonly inspectionUrl = 'api/inspections';
  readonly inspectionTypesUrl = 'api/inspectionTypes';
  readonly inspectionByIdUrl = (id: number | string) => `api/inspections/${id}`;
  readonly inspectionTypeByIdUrl = (id: number | string) =>
    `api/inspectionTypes/${id}`;

  constructor(private readonly serviceHelper: ServiceHelper) {}

  getInspectionList$(): Observable<any[]> {
    return this.serviceHelper.get$<any[]>(this.inspectionUrl);
  }

  addInspection(data: any) {
    return this.serviceHelper.post$(this.inspectionUrl, data);
  }

  updateInspection(id: number | string, data: any) {
    return this.serviceHelper.put$(this.inspectionByIdUrl(id), data);
  }

  deleteInspection(id: number | string) {
    return this.serviceHelper.delete$(this.inspectionByIdUrl(id));
  }

  getInspectionTypesList$(): Observable<any[]> {
    return this.serviceHelper.get$(this.inspectionTypesUrl);
  }

  addInspectionTypes(data: any) {
    return this.serviceHelper.post$(this.inspectionTypesUrl, data);
  }

  updateInspectionTypes(id: number | string, data: any) {
    return this.serviceHelper.put$(this.inspectionTypeByIdUrl(id), data);
  }

  deleteInspectionTypes(id: number | string) {
    return this.serviceHelper.delete$(this.inspectionTypeByIdUrl(id));
  }

  getStatusList$(): Observable<any[]> {
    return this.serviceHelper.get$<any[]>(this.statusUrl);
  }

  addStatus(data: any) {
    return this.serviceHelper.post$(this.statusUrl, data);
  }

  updateStatus(id: number | string, data: any) {
    return this.serviceHelper.put$(this.statusByIdUrl(id), data);
  }

  deleteStatus(id: number | string) {
    return this.serviceHelper.delete$(this.statusByIdUrl(id));
  }
}
