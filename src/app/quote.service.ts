import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Quote} from './quote';


const quoteUrl = './assets/quotes.json';

@Injectable()
export class QuoteService {

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<Quote[]> {

    return this.http.get(quoteUrl) as Observable<Quote[]>;

  }

}
