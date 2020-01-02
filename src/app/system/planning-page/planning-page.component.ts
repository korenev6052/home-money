import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/event.service';
import { Category } from '../shared/models/category.model';
import { Bill } from '../shared/models/bill.model';
import { UEvent } from '../shared/models/event.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'u-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.css']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  constructor(
    private billService: BillService,
    private categiriesService: CategoriesService,
    private eventsService: EventService, private title: Title
  ) {
    title.setTitle('Планирование');
  }

  sub1: Subscription;
  bill: Bill;
  categories: Category[];
  events: UEvent[];
  isLoaded = false;

  ngOnInit() {
    this.sub1 = combineLatest(this.billService.getBill(),
      this.categiriesService.getCategories(),
      this.eventsService.getEvents())
      .subscribe((date: [Bill, Category[], UEvent[]]) => {
        this.bill = date[0];
        this.categories = date[1];
        this.events = date[2];
        this.isLoaded = true;
      });
  }

  getCategoryCost(category: Category) {
    let categoryEvents = this.events.filter(item => item.category === category.id && item.type === 'outcome');
    let categoryCost = categoryEvents.reduce((sum, item) => {
      return sum += item.amount;
    }, 0);
    return categoryCost;
  }

  private getCategoryPercentNumber(category: Category) {
    let categoryPercentNumber = this.getCategoryCost(category) / category.capacity * 100;
    if (categoryPercentNumber > 100) {
      categoryPercentNumber = 100;
    }
    return categoryPercentNumber;
  }

  getCategoryPercent(category: Category) {
    let categoryPercent: string = this.getCategoryPercentNumber(category) + '%';
    return categoryPercent;
  }

  getCategoryColor(category) {
    let categoryColor: string;
    let categoryPercentNumber = this.getCategoryPercentNumber(category);
    if (categoryPercentNumber >= 100) {
      categoryColor = 'danger';
    } else {
      if (categoryPercentNumber >= 60) {
        categoryColor = 'warning';
      } else {
        categoryColor = 'success';
      }
    }
    return categoryColor;
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
