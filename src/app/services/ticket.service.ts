
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tticket } from '../entity/Tticket';
import { SearchCriteria } from '../class/SearchCriteria';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Tticket[]>(environment.apiUrl + "/ticket/ticketlist");
  }

  getById(id: number) {
    return this.http.get<Tticket>(environment.apiUrl + "/ticket/" + id);
  }

  getByEntity(tticket: Tticket) {
    return this.http.post<Tticket[]>(environment.apiUrl + "/ticket/ticketlist2", tticket);
  }

  save(Trole: Tticket) {
    return this.http.post<Tticket>(environment.apiUrl + "/ticket/save", Trole);
  }

  getByCriterias(criterias: SearchCriteria[]) {
    return this.http.post<Tticket[]>(environment.apiUrl + "/ticket/searchbycriteria", criterias);
  }

  /*update(Trole: Tticket) {
    return this.http.put(environment.apiUrl + "/ticket/" + Trole.idview, Trole);
  }*/

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/ticket/" + id);
  }

}
