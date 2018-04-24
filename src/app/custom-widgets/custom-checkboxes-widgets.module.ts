import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxesWidget } from './checkboxes-widget.component';
import { JsonSchemaFormService } from 'angular2-json-schema-form';
import { MaterialModule } from '../material.module';


@NgModule({
    declarations: [
        CheckboxesWidget
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        CheckboxesWidget
    ],
    entryComponents: [
        CheckboxesWidget
    ],
    providers: [ JsonSchemaFormService ]
})
export class CustomCheckboxesWidgetsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CheckboxesWidget,
            providers: [ JsonSchemaFormService ] }
    }
}