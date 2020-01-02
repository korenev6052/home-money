import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { UEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { EventService } from '../../shared/services/event.service';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'u-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[];

  types: { type: string, label: string }[] = [{
    type: 'income', label: 'Доход'
  }, {
    type: 'outcome', label: 'Расход'
  }]

  bill: Bill;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  message: Message = new Message('', 'danger');

  constructor(private billService: BillService, private eventService: EventService) { }

  ngOnInit() {
    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        this.bill = bill;
      })
  }

  onSubmit(form: NgForm) {
    let { type, amount, category, description } = form.value;
    let uEvent = new UEvent(type, amount, +category, moment().format('DD.MM.YYYY HH.mm.ss'), description);

    if (type == 'income') {
      this.sub2 = this.eventService.addEvent(uEvent).
        subscribe(() => {
          this.bill.number = this.bill.number + amount;
          this.updateBill(this.bill);
        });
    } else {
      if (amount <= this.bill.number) {
        this.sub3 = this.eventService.addEvent(uEvent).
          subscribe(() => {
            this.bill.number = this.bill.number - amount;
            this.updateBill(this.bill);
          });
      } else {
        this.message.text = 'Недостаточно средств!';
        setTimeout(() => {
          this.message.text = '';
        }, 5000);
        return;
      }
    }
  }

  updateBill(bill: Bill) {
    this.sub4 = this.billService.updateBill(bill)
      .subscribe();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
    if (this.sub4) {
      this.sub4.unsubscribe();
    }
  }

}
