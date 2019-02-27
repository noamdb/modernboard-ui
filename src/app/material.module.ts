import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatExpansionModule

  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatExpansionModule

  ],
  declarations: []
})
export class MaterialModule {
}
