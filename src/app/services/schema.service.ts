import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class SchemaService {
  constructor(private http: HttpClient) {}

  schemaUrl = 'assets/schemas/biosamples.json';
  layoutUrl = 'assets/layouts/biosamples-layout.json';

  getSchema() {
    const response = this.http
      .get(this.schemaUrl, {responseType: 'json'});
    return response;
  }

  getFormLayout() {
    const response = this.http
      .get(this.layoutUrl, {responseType: 'json'});
    return response;
  }
}


