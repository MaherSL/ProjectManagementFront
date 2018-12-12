import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../entity/role';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.css']
})
export class RolelistComponent implements OnInit {
private rolelist:Role[];
private error:string;
  constructor(private roleService:RoleService) { }
  

  ngOnInit() {
    this.roleService.getAll().subscribe(
  		res => {this.rolelist=res},
  		error=> {this.error=error;}
  	);
  }

}
