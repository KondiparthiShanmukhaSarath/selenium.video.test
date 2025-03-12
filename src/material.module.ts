import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    exports: [
        MatSidenavModule,
        MatExpansionModule,
        TextFieldModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
        MatInputModule,
        MatDividerModule,
        MatTooltipModule,
        MatSlideToggleModule,
        ClipboardModule,
        MatRadioModule,
        MatTabsModule,
        MatSnackBarModule,
        MatGridListModule,
        MatTableModule,
        MatChipsModule,
        MatDialogModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSliderModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        DragDropModule,
        MatButtonToggleModule,
        MatMenuModule,
    ],
})
export class MaterialModule {}