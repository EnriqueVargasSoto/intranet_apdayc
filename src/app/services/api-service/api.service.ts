import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base_url: string = 'https://apdayc-doc-query.atiendo.pe/api/';//'http://127.0.0.1:9000/api/';

  constructor(private http: HttpClient) { }

  async consulta(url: String,method: String,body?: any): Promise<any> {
    switch (method) {
      case 'get':
        return await this.http.get(this.base_url+url).toPromise();
        break;

      case 'post':
        return await this.http.post(this.base_url+url, body).toPromise();
        break;

      case 'patch':
        return await this.http.patch(this.base_url+url, body).toPromise();
        break;

      case 'delete':
        return await this.http.delete(this.base_url+url).toPromise();
        break;

      default:
        return await this.http.get(this.base_url+url).toPromise();
        break;
    }
  }
}
