import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateUserModel } from 'src/app/models/create-user-model';
import { IUserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  userToEdit: IUserModel | undefined;
  @Input() isEdit: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.isEdit) {
      this.route.params.subscribe({
        next: (params) => {
          this.userService.get(params['id']).subscribe({
            next: (response) => {
              this.userToEdit = response;
              this.fillData();        
            },
          });
        },
      });      
    }
  }
  save():void{
    if (this.isEdit && !!this.userToEdit) {
      this.edit();
    } else{
      this.create();
    }
  }
  private create() {
    const user: ICreateUserModel = {
      name: this.formGroup.controls['name'].value,
      lastName: this.formGroup.controls['lastName'].value,
      age: this.formGroup.controls['age'].value,
      email: this.formGroup.controls['email'].value,
    };
    this.userService.post(user).subscribe({
      next: (response) => {
        if (!!response) {
          this.router.navigate(['list']);
        }
      }
    });
  }

  private edit() {
    const user: IUserModel = {
      id: this.userToEdit?.id ?? '',
      name: this.formGroup.controls['name'].value,
      lastName: this.formGroup.controls['lastName'].value,
      age: this.formGroup.controls['age'].value,
      email: this.formGroup.controls['email'].value,
    };
    this.userService.put(user).subscribe({
      next: (response) => {
        if (!!response) {
          this.router.navigate(['list']);
        }
      }
    });
  }

  fillData():void{
    if (!!this.userToEdit) {
      this.formGroup.controls['name'].setValue(this.userToEdit.name);
      this.formGroup.controls['lastName'].setValue(this.userToEdit.lastName);
      this.formGroup.controls['age'].setValue(this.userToEdit.age);
      this.formGroup.controls['email'].setValue(this.userToEdit.email);
    }
  }
}
