import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {
  @Input('label') label: string;
  @ViewChild('input') input: ElementRef;
  @Input('type') type: string;
  @Input('errors') errors: string[] = [];

  constructor() { }

  get value(): string {
    return this.input.nativeElement.value;
  }

}
