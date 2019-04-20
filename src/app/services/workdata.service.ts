import { Tworkvaluedata } from './../entity/Tworkvaluedata';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tworklinedata } from '../entity/Tworklinedata';
import { AuthService } from './auth.service';
import { Tworkcolumndata } from '../entity/Tworkcolumndata';

@Injectable({
  providedIn: 'root'
})
export class WorkdataService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  private url: string = environment.apiUrl + "/workdata";
  private idSession: number = this.authService.currentIdSession();

  getLinesByCodeworkdata(codeworkdata: string) {
    return this.http.get<Tworklinedata>(this.url + "/line/list?idsession=" + this.idSession + "&codeworkdata=" + codeworkdata);
  }

  saveLine(codeworkdata: string, worklinedata: Tworklinedata) {
    worklinedata.idsession = this.idSession;
    if (codeworkdata != null)
      worklinedata.codeworkdata = codeworkdata;
    return this.http.post<Tworklinedata>(this.url + "/line/save", worklinedata);
  }
  saveLines(codeworkdata: string, worklinedata: Tworklinedata[]) {
    if (worklinedata != null) {
      for (var i = 0; i < worklinedata.length; i++) {
        worklinedata[i].idsession = this.idSession;
        if (codeworkdata != null)
          worklinedata[i].codeworkdata = codeworkdata;
      }
    }
    return this.http.post<Tworklinedata[]>(this.url + "/line/saveall", worklinedata);
  }

  getColumnsByCodeworkdata(codeworkdata: string) {
    return this.http.get<Tworkcolumndata>(this.url + "/column/list?idsession=" + this.idSession + "&codeworkdata=" + codeworkdata);
  }

  saveColumn(codeworkdata: string, workcolumndata: Tworkcolumndata) {
    workcolumndata.idsession = this.idSession;
    if (codeworkdata != null)
      workcolumndata.codeworkdata = codeworkdata;
    return this.http.post<Tworkcolumndata>(this.url + "/column/save", workcolumndata);
  }
  saveColumns(codeworkdata: string, workcolumndata: Tworkcolumndata[]) {
    if (workcolumndata != null) {
      for (var i = 0; i < workcolumndata.length; i++) {
        workcolumndata[i].idsession = this.idSession;
        if(codeworkdata!=null)
        workcolumndata[i].codeworkdata = codeworkdata;
      }
    }
    return this.http.post<Tworklinedata[]>(this.url + "/column/saveall", workcolumndata);
  }

  getValuesByCodeworkdata(codeworkdata: string) {
    return this.http.get<Tworkvaluedata>(this.url + "/value/list?idsession=" + this.idSession + "&codeworkdata=" + codeworkdata);
  }


  saveValue(codeworkdata: string,workvaluedata: Tworkvaluedata) {
    workvaluedata.idsession = this.idSession;
    if(codeworkdata!=null)
    workvaluedata.codeworkdata = codeworkdata;
    if (workvaluedata.tworkcolumndata != null) {
      workvaluedata.tworkcolumndata.idsession = this.idSession;
    }
    if (workvaluedata.tworklinedata != null) {
      workvaluedata.tworklinedata.idsession = this.idSession;
    }

    return this.http.post<Tworkvaluedata>(this.url + "/value/save", workvaluedata);
  }
  saveValues(codeworkdata: string, workvaluedata: Tworkvaluedata[]) {
    if (workvaluedata != null) {
      for (var i = 0; i < workvaluedata.length; i++) {
        if (workvaluedata[i].tworkcolumndata != null) {

          workvaluedata[i].tworkcolumndata.idsession = this.idSession;
          if(codeworkdata!=null)
          workvaluedata[i].tworkcolumndata.codeworkdata = codeworkdata;
        }
        if (workvaluedata[i].tworklinedata != null) {
          workvaluedata[i].tworklinedata.idsession = this.idSession;
          if(codeworkdata!=null)
          workvaluedata[i].tworklinedata.codeworkdata = codeworkdata;
        }
      }
    }
    return this.http.post<Tworkvaluedata[]>(this.url + "/value/saveall", workvaluedata);
  }

  deleteAll() {
    return this.http.delete(this.url + "/delete?idsession=" + this.idSession);
  }

  deleteByCodeworkdata(codeworkdata: string) {
    return this.http.delete(this.url + "/delete?idsession=" + this.idSession + "&codeworkdata=" + codeworkdata);
  }


}
