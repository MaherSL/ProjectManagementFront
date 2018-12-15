import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../entity/Role';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Role[]>(environment.apiUrl+"/role/rolelist");
  }

  getById(id: number) {
      return this.http.get(environment.apiUrl+"/role/" + id);
  }

  save(Role: Role) {
      return this.http.post(environment.apiUrl+"/role/save", Role);
  }

  update(Role: Role) {
      return this.http.put(environment.apiUrl+"/role/" + Role.idrole, Role);
  }

  delete(id: number) {
      return this.http.delete(environment.apiUrl+"/role/"+id);
  }
}
