import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'u-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  billRUB: number;
  billUSD: number;

  constructor() { }

  ngOnInit() {
    this.billRUB = this.bill.number * this.currency.rates['RUB'];
    this.billUSD = this.bill.number * this.currency.rates['USD'];
  }

}
