import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/models/category.model';
import { CategoryService } from '../app/services/category.service';
import { Router } from '@angular/router';
import { AuthService } from '../app/services/guard/auth.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild(AddCategoryComponent) addCategory: AddCategoryComponent;
  categories: Category[];
  isAdmin = false;

  constructor(protected categoryService: CategoryService,
    private router: Router,
    private auth: AuthService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.isAdmin = this.auth.isAdminLogged();
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  displayCategory(id: number) {
    this.router.navigate(['/pictures', id]);
  }

  open() {
    this.modalService.open(AddCategoryComponent, { size: 'lg' }).result.then((result) => {
      this.ngOnInit();
    });
  }

  deleteCategory($event: any, index: number) {
    $event.stopPropagation();
    if (!this.isAdmin) {
      return;
    }
    this.categoryService.deleteCategory(this.categories[index]).subscribe(data => {
      this.categories.splice(index, 1);
    });
  }

  editCategory($event: any) {
    $event.stopPropagation();
    if (!this.isAdmin) {
      return;
    }
  }
}
