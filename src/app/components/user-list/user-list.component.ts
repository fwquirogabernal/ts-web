import { Component, OnInit } from '@angular/core';
import { IUserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { IDeleteUserModel } from 'src/app/models/delete-user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  trashIcon=faTrash;
  editIcon=faPencilAlt;
  addIcon=faPlus;
  data:IUserModel[]=[];
  open:boolean=false;
  constructor(private readonly userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
  private getUsers() {
    this.userService.get().subscribe({
      next: response => {
        this.data = response;
      }
    });
  }

  create():void{
    this.router.navigate(['create']);
  }
  edit(user:IUserModel):void{
    this.router.navigate([`edit/${user.id}`]);
  }
  delete(user:IUserModel):void{
    if (confirm('Are you sure you want to delete this user?')) {
      const userDelete:IDeleteUserModel={
        id:user.id
      }
      this.userService.delete(userDelete).subscribe({
        next: (response) => {
          console.log('Deleted');
          this.getUsers();
        }
      })
    }    
  }  
}
