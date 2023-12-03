import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenResponse } from 'src/shared/model/TokenResponse';
import { User } from 'src/shared/model/User';
import { UserService } from 'src/shared/service/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  profilePicture: string = '';
  showToast: boolean = false;
  toastMessage: string = '';
  headerMessage: string = '';
  yourForm: FormGroup;
  imageAdded: boolean = false;
  passwordRegexValue: string = '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', []],
      role: ['', [Validators.required]],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      profilePicture: ['', [Validators.required]],
      contact: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });

    this.yourForm = this.fb.group({
      role: ['', Validators.required],
    });

    this.signupForm.controls['password'].valueChanges.subscribe((response) => {
      this.passwordRegexValue = this.regexPassword(response);
    });
  }

  regexPassword(value: string): string {
    const currentPassword: string = value;
    let currentPasswordRegexValue = '';
    if (!this.hasNumber(currentPassword)) {
      if (currentPasswordRegexValue.length > 0) {
        currentPasswordRegexValue += ', ';
      }
      currentPasswordRegexValue += 'a number';
    }

    if (!this.hasUppercaseAlpha(currentPassword)) {
      if (currentPasswordRegexValue.length > 0) {
        currentPasswordRegexValue += ', ';
      }
      currentPasswordRegexValue += 'a uppercase alphabet';
    }

    if (!this.hasLowercaseAlpha(currentPassword)) {
      if (currentPasswordRegexValue.length > 0) {
        currentPasswordRegexValue += ', ';
      }
      currentPasswordRegexValue += 'a lowercase alphabet';
    }

    if (!this.hasEightLetter(currentPassword)) {
      if (currentPasswordRegexValue.length > 0) {
        currentPasswordRegexValue += ', ';
      }
      currentPasswordRegexValue += 'minimum 8 letters';
    }

    if (currentPasswordRegexValue === '') {
      currentPasswordRegexValue = 'Great!';
    } else {
      currentPasswordRegexValue = 'Add ' + currentPasswordRegexValue;
    }

    return currentPasswordRegexValue;
  }

  hasNumber(password: string): boolean {
    return /[0-9]/.test(password);
  }

  hasUppercaseAlpha(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasLowercaseAlpha(password: string): boolean {
    return /[a-z]/.test(password);
  }

  hasEightLetter(password: string): boolean {
    return password.length >= 8;
  }

  /**
   * @function Converts path event to base64
   * @param event Event from input file
   */

  handleImageToBase64(event: any): void {
    this.imageAdded = true;
    const image = event?.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.profilePicture = reader.result as string;
    };
  }

  /**
   * @function Creates a user object with form , checks for empty credentials then calls the userSignup function
   */
  handleUserSignup(): void {
    let user: User = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      role: this.signupForm.value.role,
      contactNumber: this.signupForm.value.contact,
      profilePicture: this.profilePicture,
    };
    console.log(this.signupForm);
    
    
    user.email = user.email.toLowerCase();
    if (this.checkEmpty(user)) {
      this.toastMessage = `Fill all credentials to continue`;
      this.headerMessage = 'Hey?!';
      this.showAndHideToast();
    } else {
      const name = user.firstName;
      this.userService
        .handleUserSignup(user)
        .subscribe((response: TokenResponse) => {
          this.userService.handleUserDataResponse(response);
        });
      this.toastMessage = `Welcome! ${name}`;
      this.headerMessage = 'Start building your Nest asap?';
      this.showAndHideToast();
      setTimeout(() => {
        this.dialogRef.close(true);
      }, 2000);
    }
  }

  checkEmpty(user: User): boolean {
    return user.email === '';
  }

  /**
   * Toggle to hide and show toast
   */
  showAndHideToast(): void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }
}
