import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'u-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit {

  @Input() categories: Category[];
  @Output() filterCancel = new EventEmitter();
  @Output() filterApply = new EventEmitter<any>();

  types: { 'type': string, 'lable': string }[] = [{
    'type': 'income',
    'lable': 'Доход'
  }, {
    'type': 'outcome',
    'lable': 'Расход'
  }]

  periods: { 'type': string, 'lable': string }[] = [{
    'type': 'all',
    'lable': 'Все время'
  }, {
    'type': 'd',
    'lable': 'День'
  }, {
    'type': 'w',
    'lable': 'Неделя'
  }, {
    'type': 'M',
    'lable': 'Месяц'
  }];
  selectedPeriod: string = 'all';
  selectedTypes: string[] = [];
  selectedCategoriesId: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  onFilterCancel() {
    this.selectedPeriod = 'all';
    this.selectedTypes = [];
    this.selectedCategoriesId = [];
    this.filterCancel.emit();
  }

  onFilterApply() {/*
    if (this.selectedCategoriesId.length === 0) {
      this.selectedCategoriesId = this.categories.map((c) => {
        return c.id.toString();
      });
    }

    if (this.selectedTypes.length === 0) {
      this.selectedTypes = this.types.map((t) => {
        return t.type;
      });
    }*/

    this.filterApply.emit({
      'period': this.selectedPeriod,
      'types': this.selectedTypes,
      'categoriesId': this.selectedCategoriesId
    });
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      if (this[field].indexOf(value) === -1) {
        this[field].push(value);
      }
    } else {
      this[field] = this[field].filter(c => c != value);
    }
  }

  handleChangeCategories({ checked, value }) {
    this.calculateInputParams('selectedCategoriesId', checked, value);
  }

  handleChangeTypes({ checked, value }) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

}

