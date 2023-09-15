import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BapService {

  constructor(private http: HttpClient) { }

  onBAPSelectCall(url: any, req: any): Observable<any> {
    return this.http.post(url, req);
  }
  onBAPSearchCall(url:any) : Observable<any> {
    return this.http.get(url);
  }
  onBAPinitCall(url: any, req: any): Observable<any> {
    return this.http.post(url, req);
  }
}
