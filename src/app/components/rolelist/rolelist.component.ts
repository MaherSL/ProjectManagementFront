import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Trole } from '../../entity/Trole';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['../../../shared.style.css']
})
export class RolelistComponent implements OnInit {
private rolelist:Trole[];
private error:string;
  constructor(private roleService:RoleService) { }
  

  ngOnInit() {
    this.roleService.getAll().subscribe(
  		res => {this.rolelist=res},
  		error=> {this.error=error;}
  	);
  }

}
