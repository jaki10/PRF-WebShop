import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.request('get',environment.serverUrl + "/product", {responseType: 'json', withCredentials: true}); //aszinkronitas
  }
}
