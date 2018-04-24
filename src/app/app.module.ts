import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CustomCheckboxesWidgetsModule } from './custom-widgets/custom-checkboxes-widgets.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import {
  JsonSchemaFormModule, Bootstrap4FrameworkModule, JsonSchemaFormService, MaterialDesignFramework, MaterialDesignFrameworkModule
} from 'angular2-json-schema-form';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialDesignFrameworkModule,
    MaterialModule,
    JsonSchemaFormModule.forRoot(MaterialDesignFrameworkModule),
    CustomCheckboxesWidgetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
