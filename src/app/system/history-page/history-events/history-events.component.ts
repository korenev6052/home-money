import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { UEvent } from '../../shared/models/event.model';

@Component({
  selector: 'u-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.css']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[];
  @Input() events: UEvent[];

  searchField: string = 'amount';
  searchPlaceholder: string = 'Сумма';
  searchValue: string = '';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.categoryName = this.categories.find(c => c.id === e.category).name;
    })
  }

  changeCriteria(field: string) {
    const namesMap = {
      'amount': 'Сумма',
      'date': 'Дата',
      'category': 'Категория',
      'type': 'Тип'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
