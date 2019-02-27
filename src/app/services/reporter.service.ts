import { Injectable } from '@angular/core';
import { Treporter } from '../entity/Treporter';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReporterService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Treporter[]>(environment.apiUrl + "/reporter/reporterlist");
  }
}
