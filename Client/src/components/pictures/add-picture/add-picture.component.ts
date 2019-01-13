import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PictureService } from '../../app/services/picture.service';
import { isNumeric } from 'jquery';
import { Category } from 'src/models/category.model';
import { CategoryService } from '../../app/services/category.service';


@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPictureComponent implements OnInit {
  pictureForm: FormGroup;
  submitted = false;
  error;
  progressValue;
  progressMessage = '';
  categories: Category[];
  dropDownCategories: Category[];
  dropDownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: true
  };

  constructor(private fb: FormBuilder,
      protected pictureService: PictureService,
      protected categoryService: CategoryService,
      private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.categories = [];
    this.progressValue = 0;
    this.pictureForm = this.fb.group({
      displayName: ['', Validators.required],
      description: ['', Validators.required],
      categories: this.categories,
      file: ['', Validators.required],
      fileName: [''],
      type: ['']
    });
    this.categoryService.getCategories().subscribe(data => {
      this.dropDownCategories = data.filter(cat => cat.id > 1);
    });
  }

  get f() { return this.pictureForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.progressValue = 0;
    this.error = '';
    if (this.pictureForm.invalid) {
      return;
    }
    this.pictureService.addPicture(this.pictureForm.value, (message: any) => this.onLoadEvent(message), () => this.last());
  }

  onLoadEvent(message: any) {
    this.submitted = false;
    if (isNumeric(message)) {
      this.progressValue = +message;
    }
    this.progressMessage = message;
    this.cd.detectChanges();
  }

  last() {
    this.pictureForm.reset();
  }

  isNumeric(num: any) {
    return !isNaN(num);
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsBinaryString(file);
      reader.onload = () => {
        this.pictureForm.patchValue({
          fileName: file.name,
          file: reader.result,
          type: file.type
       });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  onCategorySelect(item: any) {
    this.categories.push(item);
  }
  onCategoryAll(items: any) {
    this.categories = this.dropDownCategories;
  }
}
