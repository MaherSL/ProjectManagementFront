import { Component, OnInit } from '@angular/core';
import { Role } from '../../entity/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-formc',
  templateUrl: './formc.component.html',
  styleUrls: ['./formc.component.css']
})
export class FormcComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  private rolelist:Role[];
  role = new Role();
  private error:string;




  constructor(private formBuilder: FormBuilder,private roleService:RoleService) { }

  ngOnInit() {
    this.roleService.getAll().subscribe(
      res => {this.rolelist=res},
      error=> {this.error=error;}
    )}
  
    
 

  /*onsubmit() { 
    this.submitted = true; 
  }*/


}
