import { View } from './../entity/View';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ViewService {
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<View[]>(environment.apiUrl+"/view/viewlist");
  }

}
