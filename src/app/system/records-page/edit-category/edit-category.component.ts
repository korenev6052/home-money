import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'u-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  currentCategoryId: number = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('', 'success');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    let capacity: number = form.value.capacity;
    if (capacity < 0) {
      capacity *= -1;
    }
    const category = new Category(form.value.name, capacity, this.currentCategoryId);
    this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория обновлена'
        setTimeout(() => {
          this.message.text = '';
        }, 5000);
      })
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(item => item.id === +this.currentCategoryId);
  }

}
