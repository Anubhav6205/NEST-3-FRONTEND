import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/shared/model/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/shared/service/user/user.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/shared/service/theme/theme.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent {
  userData: User = {} as User;
  profileForm: FormGroup;
  showToast: boolean = false;
  toastMessage: string = '';
  headerMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private pageRoute: Router,
    public themeService:ThemeService,
    private location:Location
  ) {
    this.userData = history.state.data;
    console.log(this.userData.firstName);

    this.profileForm = this.fb.group({
      contactNumber: [this.userData.contactNumber, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      firstName: [this.userData.firstName, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      role: [this.userData.role, Validators.required],
    });
  }



  /**
   * @function Creates a object of updated user and then hit a post request to backend with updated user to update DB .
   */
  handleUpdateUserData(): void {
    this.toastMessage = `Your Data Updated Successfully!`;
    this.headerMessage = 'Congrats!';
    this.showAndHideToast();

    const updatedUser: User = {
      contactNumber: this.profileForm.get('contactNumber')?.value,
      email: this.profileForm.get('email')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      role: this.profileForm.get('role')?.value,
      appointmentDetails: this.userData.appointmentDetails,
      password: this.userData.password,
      id: this.userData.id,
    };

    this.userService.handleUserUpdate(updatedUser).subscribe((response:any) => {
      console.log('User is updated');
      setTimeout(() => {
        this.pageRoute.navigate(['']);
      }, 2000);
    });
  }
  showAndHideToast():void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }
  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }
}
