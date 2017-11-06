import {Component, OnInit, ViewChild} from '@angular/core';
import {Quote} from '../quote';
import {QuoteService} from '../quote.service';
import {MatPaginator, MatSnackBar} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.css']
})
export class QuoteTableComponent implements OnInit {

  quotesDataSource: QuoteDataSource;

  displayedColumns = ['quoteAuthor', 'quoteText'];

  constructor(private quoteService: QuoteService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {

    //this.snackBar.open("Let's load some quotes..", "Opening", {duration:2000});
    this.quotesDataSource = new QuoteDataSource(this.quoteService);
  }


}

class QuoteDataSource extends DataSource<any> {

  constructor(private quoteService: QuoteService) {
    super();
  }

  connect(): Observable<Quote[]> {
    console.log("Datasource is loading..");
    return this.quoteService.getQuotes();
  }

  disconnect() {

  }
}
