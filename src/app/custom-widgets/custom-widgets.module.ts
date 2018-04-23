import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaxonWidgetComponent } from './taxon-widget.component';
import { JsonSchemaFormService } from 'angular2-json-schema-form';

@NgModule({
    declarations: [
        TaxonWidgetComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        TaxonWidgetComponent
    ],
    entryComponents: [
        TaxonWidgetComponent
    ],
    providers: [ JsonSchemaFormService ]
})
export class CustomWidgetsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CustomWidgetsModule,
            providers: [ JsonSchemaFormService ] }
    }
}