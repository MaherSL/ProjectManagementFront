
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tworkdata } from '../entity/Tworkdata';

@Injectable({
  providedIn: 'root'
})
export class WorkdataService {
  constructor(private http: HttpClient) { }

  
  save(tworkdata: Tworkdata) {
    return this.http.post<Tworkdata>(environment.apiUrl + "/workdata/save", tworkdata);
  }
  saveAll(tworkdata: Tworkdata[]) {
    return this.http.post<Tworkdata[]>(environment.apiUrl + "/workdata/saveall", tworkdata);
  }


}
