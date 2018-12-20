
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tvocab } from '../entity/Tvocab';

@Injectable({
  providedIn: 'root'
})
export class VocabService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Tvocab[]>(environment.apiUrl + "/vocab/vocablist");
  }

  getById(id: number) {
    return this.http.get<Tvocab>(environment.apiUrl + "/vocab/" + id);
  }

  save(Trole: Tvocab) {
    return this.http.post<Tvocab>(environment.apiUrl + "/vocab/save", Trole);
  }

  /*update(Trole: Tvocab) {
    return this.http.put(environment.apiUrl + "/vocab/" + Trole.idview, Trole);
  }*/

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/vocab/" + id);
  }

}
