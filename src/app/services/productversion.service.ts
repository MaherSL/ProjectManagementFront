
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tproductversion } from '../entity/Tproductversion';

@Injectable({
  providedIn: 'root'
})
export class ProductversionService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Tproductversion[]>(environment.apiUrl + "/productversion/productversionlist");
  }

  getById(id: number) {
    return this.http.get<Tproductversion>(environment.apiUrl + "/productversion/" + id);
  }

  save(Trole: Tproductversion) {
    return this.http.post<Tproductversion>(environment.apiUrl + "/productversion/save", Trole);
  }

  /*update(Trole: Tproduct) {
    return this.http.put(environment.apiUrl + "/product/" + Trole.idview, Trole);
  }*/

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/productversion/" + id);
  }

}
