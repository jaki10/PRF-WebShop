import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Itransaction } from '../interfaces/itransaction';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _endPoint = environment.springUrl;

  constructor(private _http: HttpClient) { }

  getTransactions(): Observable<Itransaction[]> {
    return this._http.get(this._endPoint + "/transactions").pipe(map(res => <Itransaction[]> res));
  }

  create(param: Itransaction): Observable<Itransaction> {
    return this._http.post(this._endPoint + "/transaction", param, {responseType: 'json'}).pipe(map(res => <Itransaction> res));
  }

}
