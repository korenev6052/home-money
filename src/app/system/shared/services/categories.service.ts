import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable()

export class CategoriesService {

  constructor(private http: HttpClient) {

  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`http://localhost:3000/categories/${category.id}`, category);
  }

  getCategoryBiId(id: number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/categories/${id}`);
  }

}