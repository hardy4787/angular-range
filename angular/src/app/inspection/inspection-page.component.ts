import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, forkJoin, switchMap, tap } from 'rxjs';
import { InspectionType } from './models/inspection-type.model';
import { Inspection } from './models/inspection.model';
import { InspectionTypeService } from './services/inspection-type.service';
import { InspectionService } from './services/inspection.service';

@UntilDestroy()
@Component({
  templateUrl: './inspection-page.component.html',
  styleUrls: ['./inspection-page.component.scss'],
})
export class InspectionPageComponent implements OnInit {
  inspections: Inspection[];
  inspectionTypes: InspectionType[];

  constructor(
    private readonly inspectionService: InspectionService,
    private readonly inspectionTypeService: InspectionTypeService,
    private readonly notify: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.inspectionService.getInspections$(),
      this.inspectionTypeService.getInspectionTypes$(),
    ]).subscribe(([inspections, inspectionTypes]) => {
      this.inspectionTypes = inspectionTypes;
      this.inspections = inspections;
    });
  }

  onSaveInspection(event: Inspection[]): void {
    this.inspectionService
      .saveInspections$(event)
      .pipe(
        tap((inspections) => {
          this.inspections = inspections;
          this.notify.open('Inspections saved.');
        })
      )
      .subscribe();
  }

  onDeleteInspection(event: number): void {
    this.inspectionService
      .deleteInspection$(event)
      .pipe(
        tap(() => {
          this.notify.open('Inspection deleted.');
        })
      )
      .subscribe();
  }
}
