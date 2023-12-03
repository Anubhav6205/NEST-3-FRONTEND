import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from 'src/shared/service/user/user.service';
import { User } from 'src/shared/model/User';
import { Router } from '@angular/router';

import { ViewEncapsulation } from '@angular/core';
import { ThemeService } from 'src/shared/service/theme/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  role: string = '';
  profilePicture: string = '../../../assets/profile.png';
  userExists: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  headerMessage: string = '';
  userData: User = {
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
    contactNumber: '',
    profilePicture: '',
  };
  currentActiveOption: string = '';

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    public themeService: ThemeService
  ) {}


  /**
   * Checking if user exisits
   * Checking if profile picture exists then setting it in a variable
   */
  ngOnInit(): void {
    // this.role=this.userService.handleGetRole();

    this.userService.userDataObservable.subscribe((response) => {
      this.userData = response;
      console.log('user data ');
      console.log(this.userData);
      
      
      if (this.userData.id &&this.userData.id != '') {
        console.log("user existis");
        
        this.userExists = true;
      }
      if (
        this.userData.profilePicture != '' &&
        this.userData.profilePicture != null
      ) {
        this.profilePicture = this.userData.profilePicture;
      }
      this.role = response.role as string;
      // console.log('user data changed in service');
      // console.log(this.userData);

      // this.userService.handleSetUserData(this.userData);
    });
  }


  /**
   * Options for dropdown
   */
  options = [
    { value: 'profile', label: 'Profile' },
    { value: 'appointments', label: 'Appointments' },
    { value: 'properties', label: 'Properties' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'logout', label: 'Log Out' },
  ];


  /**
   * @function Helps to open signup or login dialog boxes
   * @param action Can be either login of signup
   */
  openDialog(action: string):void {
    console.log('dialog triggered in navbar');

    if (action === 'login') {
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe((response) => {
        console.log(response);

        console.log('4 here');
        if (response != undefined) {
          console.log("user exist 3");
          
          this.userExists = response;
        }
      });
    } else {
       this.dialog.open(SignupComponent);
    }
  }



  /**
   * Toggles theme in themeService
   */
  handleThemeToggle() :void{
    console.log('toggling theme');
    this.themeService.handleThemeToggle();
  }


  /**
   * @function Logs out user and deltes its data from local storage , then navigate to home page
   */

  handleLogout() :void{
    this.userData = {} as User;
    this.role = '';
    console.log('1 here');

    this.userExists = false;
    this.userService.userExists = false;
    localStorage.removeItem('userData');

    this.userData = {} as User;
    console.log(this.userData.id);
    console.log('is id');

    this.router.navigate(['']);
  }


  /**
   * @function Manages list of options in menu
   * @param selectedOption One of the options in menu
   */
  handleNavigateToOption(selectedOption: string) :void{
    this.currentActiveOption = selectedOption;
    switch (selectedOption) {
      case 'appointments':
        if (this.userData.id === '' || this.userData.id === undefined) {
          this.toastMessage = `Login to access your appointments.`;
          this.headerMessage = 'Hey?!';
          this.showAndHideToast();
          setTimeout(() => {
            this.openDialog('login');
          }, 2000);
        } else {
          this.router.navigate(['/appointments']);
        }

        break;

      case 'notifications':
        if (this.userData.id === '' || this.userData.id === undefined) {
          this.toastMessage = `You need to Login to see your Notifications.`;
          this.headerMessage = 'Hey?!';
          this.showAndHideToast();
          setTimeout(() => {
            this.openDialog('login');
          }, 2000);
        } else {
          this.router.navigate(['/notifications']);
        }
        break;

      case 'properties':
        this.router.navigate(['/properties']);
        break;
      case 'conversations':
        if (this.userData.id === '' || this.userData.id === undefined) {
          this.toastMessage = `You need to Login to see your conversations.`;
          this.headerMessage = 'Hey?!';
          this.showAndHideToast();
          setTimeout(() => {
            this.openDialog('login');
          }, 2000);
        } else {
          this.router.navigate(['/conversations']);
        }

        break;
      case 'profile':
        if (this.userData.id === '' || this.userData.id === undefined) {
          this.toastMessage = `Login to access your profile.`;
          this.headerMessage = 'Hey?!';
          this.showAndHideToast();
          setTimeout(() => {
            this.openDialog('login');
          }, 2000);
        } else {
          this.router.navigate(['/profile'], {
            state: { data: this.userData },
          });
        }

        break;

      case 'home':
        this.router.navigate(['']);
        break;

      case 'logout':
        this.handleLogout();
        break;

      default:
        break;
    }
  }


  /**
   * 
   * @param option Current option in menu
   * @returns a boolean value based on wheter the value will be shown to user
   */
  shouldShowOption(option: any): boolean {
    // Add your logic to determine if the option should be shown based on the user's role
    if (option.value === 'properties' && this.role !== 'landlord') {
      return false; // Do not show the 'Properties' option if the user is not a landlord
    }

    if (option.value === 'logout' && this.userExists === false) {
      return false;
    }

    return true; // Show all other options
  }

  showAndHideToast() :void{
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000); // Hide the toast after 3 seconds
  }
}
