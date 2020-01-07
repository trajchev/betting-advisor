import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tickets;
  user;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    // this.showTickets();
    this.user = this.userService.getActiveUser().subscribe(res => {
      this.user = res.data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '360px',
      data: {username: this.user.username}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    });
  }
}
