import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { QuoteTableComponent } from './quote-table/quote-table.component';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatPaginatorModule, MatSnackBarModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {QuoteService} from './quote.service';
import {HttpClientModule} from '@angular/common/http';
import { QuoteEditorComponent } from './quote-editor/quote-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteTableComponent,
    QuoteEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [QuoteService],
  bootstrap: [AppComponent],
  entryComponents: [
    QuoteEditorComponent
  ]
})
export class AppModule { }
