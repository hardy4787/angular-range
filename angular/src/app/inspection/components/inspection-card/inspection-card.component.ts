import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, filter, Subject } from 'rxjs';
import {
  ConfirmDialog,
  ConfirmDialogComponent,
  TouchedErrorStateMatcher,
  ValidationConstants,
} from 'src/app/shared';
import { InspectionType } from '../../models/inspection-type.model';
import { Inspection } from '../../models/inspection.model';

@UntilDestroy()
@Component({
  selector: 'app-inspection-card',
  templateUrl: './inspection-card.component.html',
  styleUrls: ['./inspection-card.component.scss'],
  providers: [
    { provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionCardComponent implements OnInit, OnChanges {
  form: FormGroup;
  dataSource = new MatTableDataSource<AbstractControl>([]);
  displayedColumns: string[] = ['status', 'comments', 'inspectionType'];
  readonly validationConstants = ValidationConstants;

  @Input() inspectionTypes: InspectionType[];
  @Input() inspections: Inspection[];

  readonly statusTextLimit = 20;

  readonly statusValidations = Validators.compose([
    Validators.maxLength(this.statusTextLimit),
    Validators.required,
  ]);
  readonly commentsTextLimit = 200;

  @ViewChild(MatTable, { static: false }) table: MatTable<Inspection[]>;

  @Output() inspectionDeleted = new EventEmitter<number>();
  @Output() inspectionSaved = new EventEmitter<Inspection[]>();

  private originalFormData: string;
  private formDataChangeObserver$ = new Subject<boolean>();
  private isInitialFormData: boolean;

  get inspectionsFormArray(): FormArray {
    return this.form && (this.form.get('inspections') as FormArray);
  }
  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.detectFormValueChange();
    this.formDataChangeObserver$
      .pipe(untilDestroyed(this))
      .subscribe((isInitialFormData: boolean) => {
        if (isInitialFormData) {
          this.form.markAsPristine();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inspections && changes.inspections.currentValue) {
      this.inspectionsFormArray.clear({ emitEvent: false });
      if (changes.inspections.currentValue.length > 0) {
        this.patchForm(changes.inspections.currentValue);
        this.resetOriginalFormData();
      } else {
        this.resetOriginalFormData();
        this.addDefaultRowAndUpdateGrid();
      }
      // this.form.markAllAsTouched();
    }
  }

  onDeleteRow(index: number): void {
    const control = this.inspectionsFormArray.at(index);
    if (control) {
      const { id, status } = control.value;
      if (id !== null) {
        this.dialog
          .open(ConfirmDialogComponent, {
            data: {
              acceptText: 'Delete',
              rejectText: 'Cancel',
              message: `Delete ${status}?`,
            } as ConfirmDialog,
            width: '328px',
            panelClass: 'mat-dialog-confirm',
          })
          .afterClosed()
          .pipe(untilDestroyed(this), filter(Boolean))
          .subscribe(() => {
            const formAfterRemovedItem = {
              ...this.form.value,
              inspections: this.form.value.inspections.filter(
                (s, i) => i !== index && Boolean(s.id)
              ),
            };
            this.originalFormData = JSON.stringify(formAfterRemovedItem);
            this.inspectionDeleted.emit(id);
            this.removeRowByIndexAndUpdateGrid(index);
          });
      } else {
        this.removeRowByIndexAndUpdateGrid(index);
      }
    }
  }

  addDefaultRowAndUpdateGrid(): void {
    this.addFormRow();
    this.updateGridData();
    requestAnimationFrame(() => {
      this.table.updateStickyColumnStyles();
    });
  }

  addFormRow(item?: Inspection): void {
    const row = item
      ? this.createFormGroupForEdit(item)
      : this.generateDefaultItemFormGroup();
    this.inspectionsFormArray.push(row, { emitEvent: false });
  }

  onSave(): void {
    this.inspectionSaved.emit(this.inspectionsFormArray.value.map);
    this.form.markAsPristine();
  }

  private detectFormValueChange(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((inspection) => {
        if (this.form.dirty) {
          const currentFormData = JSON.stringify(inspection);
          this.compareWithInitialFormData(currentFormData);
        }
      });
  }

  private patchForm(inspections: Inspection[]): void {
    inspections.forEach((inspection) => this.addFormRow(inspection));
    this.updateGridData();
  }

  private removeRowByIndexAndUpdateGrid(index: number): void {
    this.inspectionsFormArray.removeAt(index);
    this.updateGridData();
  }

  private createFormGroupForEdit(inspection: Inspection): FormGroup {
    return Object.entries(inspection).reduce((formGroup, [key, value]) => {
      let validation = null;
      switch (key) {
        case 'status':
          validation = this.statusValidations;
          break;
        case 'comments':
          validation = Validators.maxLength(this.commentsTextLimit);
          break;
        case 'inspectionTypeId':
          validation = Validators.required;
          break;
        default:
          validation = null;
      }
      formGroup.addControl(key, this.fb.control(value, validation));
      return formGroup;
    }, this.fb.group({}));
  }

  private createForm(): void {
    this.form = this.fb.group({
      inspections: this.fb.array([]),
    });
  }

  private generateDefaultItemFormGroup(): FormGroup {
    return this.fb.group({
      id: null,
      status: ['', this.statusValidations],
      comments: ['', Validators.maxLength(this.commentsTextLimit)],
      inspectionTypeId: [null, Validators.required],
    });
  }

  private compareWithInitialFormData(currentFormData: string) {
    if (this.originalFormData != currentFormData) {
      if (this.isInitialFormData) {
        this.formDataChangeObserver$.next(false);
        this.isInitialFormData = false;
      }
    } else {
      this.formDataChangeObserver$.next(true);
      this.isInitialFormData = true;
    }
  }

  private updateGridData(): void {
    this.dataSource = new MatTableDataSource(
      this.inspectionsFormArray.controls
    );
  }

  private resetOriginalFormData() {
    this.originalFormData = JSON.stringify(this.form.value);
    this.formDataChangeObserver$.next(true);
    this.isInitialFormData = true;
  }
}
