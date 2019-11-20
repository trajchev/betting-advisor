import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatPaginatorModule,
        MatSnackBarModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatPaginatorModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }
