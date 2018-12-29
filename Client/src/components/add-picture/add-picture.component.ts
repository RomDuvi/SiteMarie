import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PictureService } from '../app/services/picture.service';
import { isNumeric } from 'jquery';


@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PictureService]
})
export class AddPictureComponent implements OnInit {
  pictureForm: FormGroup;
  submitted = false;
  error;
  progressValue;
  progressMessage = '';

  constructor(private fb: FormBuilder, private pictureService: PictureService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.progressValue = 0;
    this.pictureForm = this.fb.group({
        displayName: ['', Validators.required],
        description: ['', Validators.required],
        file: ['', Validators.required],
        fileName: [''],
        type: ['']
    });
  }

  get f() { return this.pictureForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.pictureForm.invalid) {
      return;
    }
    this.pictureService.addPicture(this.pictureForm.value, (message: any) => this.onLoadEvent(message));
  }

  onLoadEvent(message: any) {
    if (isNumeric(message)) {
      this.progressValue = +message;
    }
    this.progressMessage = message;
    this.cd.detectChanges();
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
}
