import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'u-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;
  @Output() returnInterestedCurrency = new EventEmitter();

  interestedCurrency = ['RUB', 'UAH', 'USD', 'BRL', 'BTN'];

  constructor() { }

  ngOnInit() {
    this.returnInterestedCurrency.emit(this.interestedCurrency.join(','));
  }

}
