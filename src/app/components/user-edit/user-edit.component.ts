import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id: string = '';
  user: IUserModel | undefined;
  isEdit: boolean=true;
  constructor(
    private route: ActivatedRoute,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe({
    //   next: (params) => {
    //     this.id = params['id'];
    //     this.userService.get(this.id).subscribe({
    //       next: (response) => {
    //         this.user = response;            
    //       },
    //     });
    //   },
    // });
  }
}
