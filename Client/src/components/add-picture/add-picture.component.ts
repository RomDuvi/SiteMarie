import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Picture } from 'src/models/picture.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PictureService } from '../app/services/picture.service';
import saveAs from 'file-saver';

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

  constructor(private fb: FormBuilder, private pictureService: PictureService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
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
    this.pictureService.addPicture(this.pictureForm.value);
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
