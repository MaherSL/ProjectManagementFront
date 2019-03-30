import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import { AlertService } from 'src/app/services/alert.service';
import { WorkdataService } from 'src/app/services/workdata.service';
import { Tworklinedata } from 'src/app/entity/Tworklinedata';
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
  constructor(private excelService: ExcelService, private alertService: AlertService, private workdataService: WorkdataService) {
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }
  onFileChange(evt: any) {
    this.excelService.saveSingleFileToWorkLineData(evt, true);
  }

}



