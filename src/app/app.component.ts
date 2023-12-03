import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/shared/component/login/login.component';
import { SignupComponent } from 'src/shared/component/signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Client';

  constructor(private dialog: MatDialog) {}


  /**
   * @function Opens login or signup based on action
   * @param action Can be either login or signup
   */
  openDialog(action: string): void {
    console.log('dialog triggered in navbar');

    if (action === 'login') {
      this.dialog.open(LoginComponent);
    } else {
      this.dialog.open(SignupComponent);
    }
  }
}
