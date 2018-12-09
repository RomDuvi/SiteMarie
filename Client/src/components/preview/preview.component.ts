import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() currentPath: string;

  constructor() { }

  ngOnInit() {
  }

  hidePreview(): void {
    $('.card-columns').removeAttr('hidden');
    $('#preview').attr('hidden', 'hidden');
  }

}
