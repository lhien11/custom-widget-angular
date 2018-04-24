import { TitleMapItem } from './../../lib/src/json-schema-form.service';

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from 'angular2-json-schema-form';
import {  buildFormGroup, buildTitleMap, hasOwn, JsonPointer } from '../.././lib/src/shared';

  
@Component({
  selector: 'idemia-checkboxes',
  template: `
  <div>


  <ul class="checkbox-list" [class.horizontal-list]="horizontalList">
  <div *ngIf="!options?.disableAll">
  <li>
  <mat-checkbox type="checkbox"
  [checked]="allChecked"
  [color]="options?.color || 'primary'"
  [disabled]="controlDisabled || options?.readonly"
  [indeterminate]="someChecked"
  [name]="options?.name"
  (blur)="options.showErrors = true"
  (change)="updateAllValues($event)">
  <span class="checkbox-name" [innerHTML]="options?.name"></span>
</mat-checkbox>

  <label *ngIf="options?.title"
  class="title"
  [class]="options?.labelHtmlClass || ''"
  [style.display]="options?.notitle ? 'none' : ''"
  [innerHTML]="options?.title">

  </label>
  </li>
  </div>
    <li *ngFor="let checkboxItem of checkboxList"
      [class]="options?.htmlClass || ''">
      <mat-checkbox type="checkbox"
        [(ngModel)]="checkboxItem.checked"
        [color]="options?.color || 'primary'"
        [disabled]="controlDisabled || options?.readonly"
        [name]="checkboxItem?.name"
        (blur)="options.showErrors = true"
        (change)="updateValue()">
        <span class="checkbox-name" [innerHTML]="checkboxItem?.name"></span>
      </mat-checkbox>
    </li>
  </ul>
  <mat-error *ngIf="options?.showErrors && options?.errorMessage"
    [innerHTML]="options?.errorMessage"></mat-error>
    </div>`,
styles: [`

.title { font-weight: italic; }
.checkbox-list { list-style-type: none;  }
.horizontal-list > li { align: left; display: inline-block; margin-right: 10px; zoom: 1; }
.checkbox-name { white-space: nowrap; }
mat-error { font-size: 75%; }
mat-checkbox-frame { border: none important!}
`],

})
export class CheckboxesWidget implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  horizontalList = false;
  formArray: AbstractControl;
  checkboxList: TitleMapItem[] = [];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    console.log("this.otions: ", this.options);
    this.horizontalList = this.layoutNode.type === 'checkboxes-inline' ||
      this.layoutNode.type === 'checkboxbuttons';
    this.jsf.initializeControl(this);
    this.checkboxList = buildTitleMap(
      this.options.titleMap || this.options.enumNames, this.options.enum, true
    );
    if (this.boundControl) {
      const formArray = this.jsf.getFormControl(this);
      for (let checkboxItem of this.checkboxList) {
        checkboxItem.checked = formArray.value.includes(checkboxItem.value);
      }
    }
  }

  get allChecked(): boolean {
    //console.log("I am in the allChecked()");
    // console.log("checked: ", this.checkboxList)
    return this.checkboxList.filter(t => t.checked).length === this.checkboxList.length;
  }

  get someChecked(): boolean {
    const checkedItems = this.checkboxList.filter(t => t.checked).length;
    return checkedItems > 0 && checkedItems < this.checkboxList.length;
  }

  updateValue() {
    this.options.showErrors = true;
    if (this.boundControl) {
      this.jsf.updateArrayCheckboxList(this, this.checkboxList);
    }
  }

  updateAllValues(event: any) {
    this.options.showErrors = true;
    this.checkboxList.forEach(t => t.checked = event.checked);
    this.updateValue();
  }
}
