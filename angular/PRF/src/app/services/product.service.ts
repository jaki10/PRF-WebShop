import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PusherService } from './pusher.service';
import { Observable } from 'rxjs';
import { Iproduct } from '../interfaces/iproduct';
import { map } from 'rxjs/operators';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _endPoint = environment.serverUrl + "/product";
  private _channel: any;

  constructor(private _http: HttpClient, private _pusherService: PusherService) {
    this._channel = this._pusherService.getPusher().subscribe('product');
   }

  /**
  * @return product's channel for the different event available under product
  */
  getChannel () {
    return this._channel;
  }

  getProducts(): Observable<Iproduct[]> {
    return this._http.get(this._endPoint).pipe(map(res => <Iproduct[]> res));
  }

  geProductFromId(id: number): Observable<Iproduct> {
    return this._http.get(this._endPoint + "/" + id, {responseType: 'json'}).pipe(map(res => <Iproduct> res));
  }

  create(param: Iproduct): Observable<Iproduct> {
    return this._http.post(this._endPoint, param, {responseType: 'json'}).pipe(map(res => <Iproduct> res));
  }

  update(param: Iproduct): Observable<Iproduct> {
    return this._http.put(this._endPoint + "/" + param.id, param, {responseType: 'json'}).pipe(map(res => <Iproduct> res));
  }

  delete(product: Iproduct): Observable<Iproduct> {
    return this._http.delete(this._endPoint + "/" + product.id, {responseType: 'text'}).pipe(mapTo(product));
  }
}
