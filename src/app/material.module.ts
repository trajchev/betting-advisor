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
        MatIconModule
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
        MatIconModule
    ]
})
export class MaterialModule { }
