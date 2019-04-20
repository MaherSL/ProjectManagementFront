import { AlertService } from 'src/app/services/alert.service';
import { WorkdataService } from 'src/app/services/workdata.service';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Tworklinedata } from '../entity/Tworklinedata';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(private workdataService: WorkdataService, private alertService: AlertService) { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

  saveSingleFileToWorkLineData(evt: any, withmessage: boolean) {
    var data: any[][] = [];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      //this.alertService.success('Data=' + JSON.stringify(this.data2));
      var s: string = 'columns2=';
      var worklinedataList: Tworklinedata[] = [];
      var worklinedata: Tworklinedata;
      var line = 0;
      var nbrcolumns = 0;
      data.forEach(element => {
        this.alertService.success("dd="+JSON.stringify(element));
        s += element[1] + ",";
        line++;
        worklinedata = new Tworklinedata();
        if (element.length > 10) {
          nbrcolumns = 10;
        }
        else {
          nbrcolumns = element.length;
        }
        for (var i = 0; i < nbrcolumns; i++) {
          switch (i) {
            case 0: worklinedata.c1 = element[i]; break;
            case 1: worklinedata.c2 = element[i]; break;
            case 2: worklinedata.c3 = element[i]; break;
            case 3: worklinedata.c4 = element[i]; break;
            case 4: worklinedata.c5 = element[i]; break;
            case 5: worklinedata.c6 = element[i]; break;
            case 6: worklinedata.c7 = element[i]; break;
            case 7: worklinedata.c8 = element[i]; break;
            case 8: worklinedata.c9 = element[i]; break;
            case 9: worklinedata.c10 = element[i]; break;
            default: worklinedata.c1 = "aaaaaa"; break;
          }
        }
        //        worklinedata.c1 = element[0];
        //worklinedata.c2 = element[1];
        worklinedata.codeworkdata = "id2";
        worklinedata.lineworkdata = line;
        worklinedataList.push(worklinedata);
      });
      //this.alertService.success(s);
      this.workdataService.deleteAll()
        .subscribe(
          data => {
            this.workdataService.saveLines(null,worklinedataList)
              .subscribe(
                data => {
                  if (withmessage){}
                    //this.alertService.success('Enregistrement fait avec succèssss');
                },
                error => {
                  throw new Error(JSON.stringify(error));
                  //this.alertService.error(JSON.stringify(error));
                });
          },
          error => {
            throw new Error(JSON.stringify(error));
            //this.alertService.error(JSON.stringify(error));
          });


    };
  }
}

