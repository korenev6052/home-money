import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'u-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[];
  isLoaded: boolean = false;

  constructor(private categoriesService: CategoriesService, private title: Title) {
    title.setTitle('Запись');
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((date: Category[]) => {
        this.categories = date;
        this.isLoaded = true;
      })
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const updateIndex: number = this.categories.findIndex(item => item.id === +category.id);
    this.categories[updateIndex] = category;
  }

}
