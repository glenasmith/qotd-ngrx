import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Quote} from '../quote';

@Component({
  selector: 'app-quote-editor',
  templateUrl: './quote-editor.component.html',
  styleUrls: ['./quote-editor.component.css']
})
export class QuoteEditorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QuoteEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public quote: Quote) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
