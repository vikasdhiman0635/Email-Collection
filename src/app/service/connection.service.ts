import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  baseURL = "https://email-collection-5a6f3-default-rtdb.firebaseio.com/email-collections/";

  constructor(
    private http: HttpClient
  ) { }

  putData(data: any): Observable<any> {
    let editURL = this.baseURL + "" + data.date + "/" + data.email.split("@")[0].replace(".", "_") + "_" + data.compnayName + ".json";
    return this.http.put(editURL, data);
  }

}