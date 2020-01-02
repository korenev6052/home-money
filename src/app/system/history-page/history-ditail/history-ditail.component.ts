import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../shared/services/categories.service';
import { EventService } from '../../shared/services/event.service';
import { UEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'u-history-ditail',
  templateUrl: './history-ditail.component.html',
  styleUrls: ['./history-ditail.component.css']
})
export class HistoryDitailComponent implements OnInit, OnDestroy {

  id: number;
  event: UEvent;
  category: Category;
  isLoaded: boolean = false;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private eventService: EventService, private title: Title) {
    title.setTitle(`Запись #${this.id}`);
  }

  ngOnInit() {
    this.sub1 = this.route.params
      .subscribe((date: any) => {
        this.id = date.id;
        this.sub2 = this.eventService.getEventBuId(this.id)
          .subscribe((date: UEvent) => {
            this.event = date;
            this.sub3 = this.categoriesService.getCategoryBiId(this.event.category)
              .subscribe((date: Category) => {
                this.category = date;
                this.isLoaded = true;
              });
          });
      });
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
  }

}
