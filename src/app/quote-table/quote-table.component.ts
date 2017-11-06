import {Component, OnInit, ViewChild} from '@angular/core';
import {Quote} from '../quote';
import {QuoteService} from '../quote.service';
import {MatDialog, MatPaginator, MatSnackBar} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/combineLatest';
import {QuoteEditorComponent} from '../quote-editor/quote-editor.component';


@Component({
  selector: 'app-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.css']
})
export class QuoteTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  quotesDataSource: QuoteDataSource;

  dbSize = 1000;

  displayedColumns = ['quoteAuthor', 'quoteText'];

  constructor(private quoteService: QuoteService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {


  }

  ngOnInit() {

    this.quotesDataSource = new QuoteDataSource(this.quoteService, this.paginator);

  }


  openDialog(): void {
    let dialogRef = this.dialog.open(QuoteEditorComponent, {
      height: '300px',
      width: '400px',
      data: { quoteAuthor: "Some Author", quoteText: "This is some quote" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.quote = result;
    });
  }

}

class QuoteDataSource extends DataSource<any> {

  constructor(private quoteService: QuoteService, private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Quote[]> {
    console.log('Datasource is loading..');

    let quotes$ = this.quoteService.getQuotes();
    let pagination$ = this.paginator.page.startWith({pageIndex: 0, pageSize: 10});


    return Observable.combineLatest(quotes$, pagination$).map((value) => {
      console.log('Something emitted', value[0].length);
      let quotesDb = value[0];
      let pageInfo = value[1];

      this.paginator.length = quotesDb.length; //TODO: Must be a better way to lazily do this...

      const startIndex = pageInfo.pageIndex * pageInfo.pageSize;
      const newData = quotesDb.slice(startIndex, startIndex + pageInfo.pageSize);
      return newData;
    });


  }

  disconnect() {

  }
}
