import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tvocabword } from '../entity/Tvocabword';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VocabwordService {

  constructor(private http: HttpClient) { }

  getByCodevocab(codevocab: string) {
    return this.http.get<Tvocabword[]>(environment.apiUrl + "/vocabword?codevocab=" + codevocab.toUpperCase());
  }
}
