import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../profile.model';
import { FormGroup, FormControl} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  message = '';

  // create the form using reactive forms
  editUserForm = new FormGroup({
    username: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA)
    public user: User
    ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUserEdit() {
    const newUsername = this.editUserForm.value.username;
    this.userService.updateUser(newUsername).subscribe(res => {
      if (res.status === 'success') {
        this.message = 'Username changed';
      } else {
        this.message = 'Username change failed';
      }
    });
  }

}
