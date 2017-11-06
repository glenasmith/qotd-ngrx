import {Component, OnInit, ViewChild} from '@angular/core';
import {Quote} from '../quote';
import {QuoteService} from '../quote.service';
import {MatPaginator, MatSnackBar} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';


@Component({
  selector: 'app-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.css']
})
export class QuoteTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  quotesDataSource: QuoteDataSource;

  dbSize = 10;

  displayedColumns = ['quoteAuthor', 'quoteText'];

  constructor(private quoteService: QuoteService,
              private snackBar: MatSnackBar) {


  }

  ngOnInit() {

    this.quotesDataSource = new QuoteDataSource(this.quoteService, this.paginator);

  }


}

class QuoteDataSource extends DataSource<any> {

  constructor(private quoteService: QuoteService, private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Quote[]> {
    console.log('Datasource is loading..');


    return Observable.combineLatest(this.quoteService.getQuotes(), this.paginator.page).map((value) => {
      console.log('Something emitted', value);
      let quotesDb = value[0];
      let pageInfo = value[1];

      this.paginator.length = quotesDb.length;

      // Grab the page's slice of data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return quotesDb.splice(startIndex, this.paginator.pageSize);
    });


  }

  disconnect() {

  }
}
