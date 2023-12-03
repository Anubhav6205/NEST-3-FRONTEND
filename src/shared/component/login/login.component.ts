import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { User } from 'src/shared/model/User';
import { UserService } from 'src/shared/service/user/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showToast: boolean = false;
  toastMessage: string = '';
  headerMessage:string='';
  rememberMe:boolean=false;
  constructor(private fb: FormBuilder, private userService: UserService,private dialogRef:MatDialogRef<LoginComponent>,private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      firstName: '',
      lastName: '',
      role: '',
      contactNumber: '',
    });
  }




  /**
   * @function Creates a User object with email and password ,data is sent to backend to authorise and authenticate user
   * 
   */
  handleUserLogin() :void{
    console.log(this.loginForm);
    
    let user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    user.email=user.email.toLowerCase();

   
    
    console.log("befote loggin in ");
    
    this.userService.handleUserLogin(user).subscribe((response: any) => {
      const status = response.status;
      console.log("user data after logging in ");
      console.log(response);
      
      
    
      if (status === 'true') {
        console.log("setting in local");
        const name=response.userData.firstName
        this.toastMessage=`Hey! ${name}`
        this.headerMessage="Built your Nest yet?"
        this.showAndHideToast();
        
        
        localStorage.setItem('userData',response.userData);
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 2000); 

       
        
      } else {
        console.log("status false");
        
        this.toastMessage="Wrong Credentials"
        this.headerMessage="Damn!"
        this.showAndHideToast();

      }

      this.userService.handleUserDataResponse(response);
      if(this.rememberMe===false)
      {
        localStorage.removeItem('userData')
      }

      
      
    });
  }


  /**
   * @function Helps to track user data being stored in local storage or not
   */
  toggleRememberMe() :void{
    this.rememberMe = !this.rememberMe;
  }


  showAndHideToast() :void{
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000); 
  }


  /**
   * @function Closes current dialog and opens signup dialog 
   */
  handleSignup():void{
    this.dialogRef.close();
     this.dialog.open(SignupComponent);
  }
}
