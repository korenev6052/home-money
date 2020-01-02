import { Pipe, PipeTransform, OnInit } from "@angular/core";

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(items: any, value: string, field: string) {
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter((item) => {

      const newItem = Object.assign({}, item);

      if (field === 'amount') {
        newItem[field] += '';
      }

      if (field === 'type') {
        newItem[field] = newItem[field] === 'income' ? 'Доход' : 'Расход';
      }

      if (field === 'category') {
        field = 'categoryName';
      }

      return newItem[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  constructor() { }

}