import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Role } from '../../entity/role';

@Component({
    selector: 'app-formi',
    templateUrl: './formi.component.html',
    styleUrls: ['./formi.component.css']
})

export class FormiComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    private rolelist:Role[];
    private error:string;

    constructor(private formBuilder: FormBuilder,private roleService:RoleService) { }

    ngOnInit() {
      this.roleService.getAll().subscribe(
        res => {this.rolelist=res},
        error=> {this.error=error;}
      );
        this.registerForm = this.formBuilder.group({
            identifiant: ['', [Validators.required, Validators.minLength(6)]],
            nameRole: ['', [Validators.required, Validators.minLength(6)]],
            descRole: ['', [Validators.required]
           // lastName: ['', Validators.required],
            //email: ['', [Validators.required, Validators.email]],
            //password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)')
    }
}
