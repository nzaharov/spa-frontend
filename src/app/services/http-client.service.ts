import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageModel } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  private readonly URL = 'http://localhost:7181';

  getPage(pageSize: number, pageNumber: number, searchWord: string = ''): Observable<PageModel> {
    const params = new HttpParams()
      .set("size", pageSize.toString())
      .set("page", pageNumber.toString())
      .set("searchWord", searchWord);

    return this.http.get<PageModel>(`${this.URL}/api/data`, { params: params });
  }
}
