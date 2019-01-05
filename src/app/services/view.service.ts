import { SearchCriteria } from './../class/SearchCriteria';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tview } from '../entity/Tview';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Tview[]>(environment.apiUrl + "/view/viewlist");
  }

  getByTview(tview: Tview) {
    return this.http.post<Tview[]>(environment.apiUrl + "/view/viewtest3", tview);
  }

  getByCriterias(criterias: SearchCriteria[]) {
    return this.http.post<Tview[]>(environment.apiUrl + "/view/viewtest5", criterias);
  }

  getById(id: number) {
    return this.http.get<Tview>(environment.apiUrl + "/view/" + id);
  }

  getByProgview(progview: string) {
    return this.http.get<Tview>(environment.apiUrl + "/view?progview=" + progview);
  }

//jé changé Trole elle a ete Role*******************************************
  save(tview: Tview) {
    return this.http.post<Tview>(environment.apiUrl + "/view/save", tview);
  }

  /*update(Role: Tview) {
    return this.http.put(environment.apiUrl + "/view/" + Role.idview, Role);
  }*/

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/view/" + id);
  }

}
