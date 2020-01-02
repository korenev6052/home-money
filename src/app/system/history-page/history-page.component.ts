import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/event.service';
import { combineLatest, Subscription } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { UEvent } from '../shared/models/event.model';
import * as moment from 'moment';
import { filter } from 'minimatch';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'u-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: UEvent[] = [];
  sub1: Subscription;
  isLoaded: boolean = false;
  chartData: { 'name': string, 'value': number }[] = [];
  isFilterVisible: boolean = false;
  filteredEvents: UEvent[] = [];
  filterApplied: boolean = false;

  constructor(private categoriesService: CategoriesService, private eventService: EventService, private title: Title) {
    title.setTitle('История');
  }

  ngOnInit() {
    combineLatest(this.categoriesService.getCategories(), this.eventService.getEvents())
      .subscribe((date: [Category[], UEvent[]]) => {
        this.categories = date[0];
        this.events = date[1];
        this.setOriginalEvents();
        this.calculateChartData();
        this.isLoaded = true;
      })
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  calculateChartData() {
    this.chartData = [];
    this.categories.forEach((category) => {
      const categoryEvents = this.filteredEvents.filter((event) => category.id === event.category && event.type === 'outcome');
      this.chartData.push({
        'name': category.name,
        'value': categoryEvents.reduce((total, event) => {
          total += event.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(toggle: boolean) {
    this.isFilterVisible = toggle;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  closeFilter() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  applyFilter(filterData) {
    this.toggleFilterVisibility(false);
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    this.setOriginalEvents();

    if (filterData.types.length != 0) {
      this.filteredEvents = this.filteredEvents.filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      });
    }

    if (filterData.categoriesId.length != 0) {
      this.filteredEvents = this.filteredEvents.filter((e) => {
        return filterData.categoriesId.indexOf(e.category.toString()) !== -1
      });
    }

    if (filterData.period != 'all') {
      this.filteredEvents = this.filteredEvents.filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH.mm.ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    }

    this.calculateChartData();
    this.filterApplied = true;
  }

  setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  resetFilter() {
    this.setOriginalEvents();
    this.calculateChartData();
    this.filterApplied = false;
  }

}
