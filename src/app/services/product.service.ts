
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tproduct } from '../entity/Tproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Tproduct[]>(environment.apiUrl + "/product/productlist");
  }

  getById(id: number) {
    return this.http.get<Tproduct>(environment.apiUrl + "/product/" + id);
  }

  save(Trole: Tproduct) {
    return this.http.post<Tproduct>(environment.apiUrl + "/product/save", Trole);
  }

  /*update(Trole: Tproduct) {
    return this.http.put(environment.apiUrl + "/product/" + Trole.idview, Trole);
  }*/

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/product/" + id);
  }

}
