import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../models/bill.model';
import { Observable } from 'rxjs';


@Injectable()

export class BillService {

  constructor(private http: HttpClient) { }

  getBill(): Observable<Bill> {
    return this.http.get<Bill>('http://localhost:3000/bill');
  }

  getCurrency(): Observable<any> {
    return this.http.get<any>('http://data.fixer.io/api/latest?access_key=ac9d8e97e53a3e1a6bb3e529c825a98e&format=1');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>('http://localhost:3000/bill', bill);
  }

}