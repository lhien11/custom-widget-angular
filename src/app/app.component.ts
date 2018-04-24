import {Component, OnInit} from '@angular/core';

import { SchemaService } from './services/schema.service';
import { HttpClient } from '@angular/common/http';
import { CheckboxesWidget } from './custom-widgets/checkboxes-widget.component';
import { JsonSchemaFormComponent, WidgetLibraryService, JsonPointer } from 'angular2-json-schema-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    SchemaService,
    HttpClient, 
    JsonSchemaFormComponent,
    JsonPointer
  ]
})
export class AppComponent implements OnInit {
  title = 'JSON Schema Form';
  mySchema;
  myJsonFormLayout;

  liveFormData: any = {};
  formValidationErrors: any;
  formIsValid = null;
  submittedFormData: any = null;

  constructor(
    private schemaService: SchemaService,
    private jsonSchemaFormComponent: JsonSchemaFormComponent,
    private widgetLibraryService: WidgetLibraryService
  ) { }

  public ngOnInit() {
    this.widgetLibraryService.registerWidget('idemia-checkboxes', 
    CheckboxesWidget);
    this.setSchema();
    this.setFormLayout();
  }
  
  onSubmit(data: any) {
    this.submittedFormData = data;
    console.log(this.submittedFormData);
  }

  onChanges(data: any) {
    this.liveFormData = data;
  }

  isValid(isValid: boolean): void {
    this.formIsValid = isValid;
  }

  validationErrors(data: any): void {
    this.formValidationErrors = data;
  }

  get prettyValidationErrors() {
    if (!this.formValidationErrors) { return null; }
    let errorArray = [];
    for (let error of this.formValidationErrors) {
      let message = error.message;
      let dataPathArray = JsonPointer.parse(error.dataPath);
      if (dataPathArray.length) {
        let field = dataPathArray[0];
        for (let i = 1; i < dataPathArray.length; i++) {
          const key = dataPathArray[i];
          field += /^\d+$/.test(key) ? `[${key}]` : `.${key}`;
        }
        errorArray.push(`${field}: ${message}`);
      } else {
        errorArray.push(message);
      }
    }
    return errorArray.join('<br>');
  }

  private setSchema() {
    this.schemaService.getSchema().subscribe(
      data => {
        this.mySchema = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  private setFormLayout() {
    this.schemaService.getFormLayout().subscribe(
      data => {
        this.myJsonFormLayout = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
