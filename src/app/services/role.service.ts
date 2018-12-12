import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../entity/Role';



@Injectable({
  providedIn: 'root'
})
export class RoleService {
    private url:string="http://localhost:8181/role"
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Role[]>(this.url+"/roleList");
  }

  /*getById(id: number) {
      return this.http.get(`${config.apiUrl}/Roles/` + id);
  }

  register(Role: Role) {
      return this.http.post(`${config.apiUrl}/Roles/register`, Role);
  }

  update(Role: Role) {
      return this.http.put(`${config.apiUrl}/Roles/` + Role.idrole, Role);
  }

  delete(id: number) {
      return this.http.delete(`${config.apiUrl}/Roles/` + id);
  }*/
}
