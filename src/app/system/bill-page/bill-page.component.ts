import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'u-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css']
})
export class BillPageComponent implements OnInit, OnDestroy {
  constructor(private billService: BillService, private title: Title) {
    title.setTitle('Счет');
  }

  isLoaded: boolean = false;
  bill: Bill;
  currency: any;

  sub1: Subscription;
  sub2: Subscription;

  ngOnInit() {
    this.sub1 = combineLatest(this.billService.getBill(), this.billService.getCurrency())
      .subscribe((date: [Bill, any]) => {
        this.bill = date[0];
        this.currency = date[1];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  onRefresh() {
    this.sub2 = this.billService.getCurrency()
      .subscribe((date: any) => {
        this.currency = date;
        this.isLoaded = true;
      })
  }

}
