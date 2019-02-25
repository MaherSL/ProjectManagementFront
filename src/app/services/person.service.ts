import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tperson } from '../entity/Tperson';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Tperson[]>(environment.apiUrl + "/person/personlist");
  }

  getById(id: number) {
    return this.http.get<Tperson>(environment.apiUrl + "/person?id=" + id);
  }

  save(Trole: Tperson) {
    return this.http.post<Tperson>(environment.apiUrl + "/person/save", Trole);
  }

  /*update(Trole: Tproduct) {
    return this.http.put(environment.apiUrl + "/product/" + Trole.idview, Trole);
  }*/

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/person/" + id);
  }

  getByName(nameperson: string) {
    return this.http.get<Tperson>(environment.apiUrl + "/person?nameperson=" + nameperson);
  }
}
