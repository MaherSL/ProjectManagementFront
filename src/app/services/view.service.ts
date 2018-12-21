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

  getById(id: number) {
    return this.http.get<Tview>(environment.apiUrl + "/view/" + id);
  }
//jé changé Trole elle a ete Role*******************************************
  save(Role: Tview) {
    return this.http.post<Tview>(environment.apiUrl + "/view/save", Role);
  }

  /*update(Role: Tview) {
    return this.http.put(environment.apiUrl + "/view/" + Role.idview, Role);
  }*/

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/view/" + id);
  }

}
