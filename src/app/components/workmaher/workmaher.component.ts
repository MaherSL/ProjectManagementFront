import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import { AlertService } from 'src/app/services/alert.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-workmaher',
  templateUrl: './workmaher.component.html',
  styleUrls: ['./workmaher.component.css']
})
export class WorkmaherComponent implements OnInit {
  ngOnInit(): void {

  }
  private data2: any[][] = [];
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
  constructor(private excelService: ExcelService,private alertService:AlertService) {
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.data2 = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.alertService.success('Data='+JSON.stringify(this.data2));
      var s:string='columns2=';
      this.data2.forEach(element => {
        s+=element[1]+",";
      });
      this.alertService.success(s);

    };
    reader.readAsBinaryString(target.files[0]);
  }
}


