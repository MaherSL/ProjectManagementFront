import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trole } from '../entity/Trole';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Trole[]>(environment.apiUrl+"/role/rolelist");
  }

  getById(id: number) {
      return this.http.get(environment.apiUrl+"/role/" + id);
  }

  save(Trole: Trole) {
      return this.http.post(environment.apiUrl+"/role/save", Trole);
  }

  update(Trole: Trole) {
      return this.http.put(environment.apiUrl+"/role/" + Trole.idrole, Trole);
  }

  delete(id: number) {
      return this.http.delete(environment.apiUrl+"/role/"+id);
  }
}
