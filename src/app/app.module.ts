import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CustomWidgetsModule } from './custom-widgets/custom-widgets.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import {
  JsonSchemaFormModule, Bootstrap4FrameworkModule, JsonSchemaFormService, MaterialDesignFramework, MaterialDesignFrameworkModule
} from 'angular2-json-schema-form';

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
    JsonSchemaFormModule.forRoot(MaterialDesignFrameworkModule),
    CustomWidgetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
