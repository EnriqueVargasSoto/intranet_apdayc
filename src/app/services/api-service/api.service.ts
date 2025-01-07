import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base_url: string = 'https://apdayc-doc-query.atiendo.pe/api/';//'http://127.0.0.1:9000/api/';//

  constructor(private http: HttpClient) { }

  consulta(url: String,method: String,body?: any): Observable<any> {
    switch (method) {
      case 'get':
        return this.http.get(this.base_url+url);
        break;

      case 'post':
        return this.http.post(this.base_url+url, body);
        break;

      case 'patch':
        return this.http.patch(this.base_url+url, body);
        break;

      case 'delete':
        return this.http.delete(this.base_url+url);
        break;

      default:
        return this.http.get(this.base_url+url);
        break;
    }
  }
}
