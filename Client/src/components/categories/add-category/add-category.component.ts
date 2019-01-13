import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [CategoryService]
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  submitted: boolean;
  error: string;
  loading: boolean;

  constructor(public modal: NgbActiveModal,
    private fb: FormBuilder,
    protected categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() { return this.categoryForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.categoryForm.invalid) {
      return;
    }
    this.loading = true;
    this.categoryService.addCategory(this.categoryForm.value).subscribe(data => {
      this.loading = false;
      this.modal.close();
    });
  }
}
