import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

const EMPTY_ELEMENT_DATA: PeriodicElement = { position: 0, name: '', weight: 0, symbol: '' };

const materialModules = [
  MatProgressBarModule,
];


@Component({
  selector: 'app-testuipage-misc',
  imports: [...materialModules],
  templateUrl: './testuipage-misc.component.html',
  styleUrls: ['./testuipage-misc.component.less']
})
export class TestuipageMiscComponent implements OnInit {

  public isLinear = true;

  @Output()
  public reloadMisc = new EventEmitter();

  public username!: string;
  public password!: string;

  public showLoginSpinner = false;
  public isLoginSuccessfull = false;

  public readonly firstFormGroup: unknown;

  public readonly secondFormGroup: unknown;

  public authenticateCreds(): void {
    this.showLoginSpinner = true;

    setTimeout(() => {
      this.showLoginSpinner = false;
      this.isLoginSuccessfull = this.username === 'username' && this.password === 'password';
    }, 3000);

  }

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [''],
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  public displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  public dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public deleteSelected(): void {
    this.selection.selected.forEach(row => {
      const position = ELEMENT_DATA.indexOf(row);

      position !== -1 && ELEMENT_DATA.splice(position, 1);
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.selection = new SelectionModel<PeriodicElement>(true, []);
    })
  }

  public addElements(): void {
    const newElement: PeriodicElement = { ...EMPTY_ELEMENT_DATA };

    ELEMENT_DATA.push(newElement);

    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.selection.select(newElement);
  }

  public dragPosition = { x: 0, y: 0 };
  public showProgressBar = false

  public dragEnd($event: CdkDragEnd) {
    const x = $event.source.getFreeDragPosition().x;

    if (x > 390) {
      this.showProgressBar = true;

      setTimeout(() => {
        this.showProgressBar = false;
      }, 5000);
    }
  }

  public reloadMiscHandler(): void {
    this.reloadMisc.emit();
  }
}
