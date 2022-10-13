import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/shared/services/service-helper';
import { Inspection } from '../models/inspection.model';
import { Status } from '../models/status.model';

@Injectable()
export class StatusService {
  readonly statusUrl = 'api/status';
  readonly statusByIdUrl = (id: number | string) => `api/status/${id}`;

  constructor(private readonly serviceHelper: ServiceHelper) {}

  getStatusList$(): Observable<Status[]> {
    return this.serviceHelper.get$<Status[]>(this.statusUrl);
  }

  addStatus$(data: Status): Observable<Status> {
    return this.serviceHelper.post$(this.statusUrl, data);
  }

  updateStatus$(id: number, data: Status): Observable<Status> {
    return this.serviceHelper.put$(this.statusByIdUrl(id), data);
  }

  deleteStatus$(id: number): Observable<void> {
    return this.serviceHelper.delete$(this.statusByIdUrl(id));
  }
}
