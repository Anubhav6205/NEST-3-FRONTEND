import { Component, OnInit,HostBinding } from '@angular/core';
import { routeAnimationState } from 'src/shared/animation/slideIn';
import { Appointment } from 'src/shared/model/Appointment';
import { AppointmentWithValue } from 'src/shared/model/AppointmentWithValue';
import { Location } from '@angular/common';
import { User } from 'src/shared/model/User';
import { ThemeService } from 'src/shared/service/theme/theme.service';
import { UserService } from 'src/shared/service/user/user.service';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss'],
  animations:[
    routeAnimationState
  ]
})
export class ListAppointmentsComponent implements OnInit {
  @HostBinding('@routeAnimationTrigger') routeAnimation=true
  appointmentData: AppointmentWithValue[] = [] as AppointmentWithValue[];
  userData: User = {} as User;
  appointmentsPresent: boolean = false;

  constructor(private userService: UserService,public themeService:ThemeService,private location:Location) {}

  ngOnInit(): void {
  this.userService.handleGetUserData().subscribe((response:User)=>{
    this.userData=response
    this.handleGetAppointmentDetails();
  })
  }

  handleGetAppointmentDetails() {
    const appointmentDataIds: Appointment[] =
      this.userData.appointmentDetails!;
    console.log('getting user data ');

    console.log(appointmentDataIds);

    if (appointmentDataIds != null) {
      this.appointmentsPresent = true;
      for (const appointmentDataId of appointmentDataIds) {
        this.userService
          .handleConvertAppointmentIds(appointmentDataId)
          .subscribe((response: any) => {
            console.log('in subs');

            if (response) {
              console.log('Response inside subscription:', response.appointmnent);
              console.log(response.appointmnent.isUser);

              const appointment: AppointmentWithValue = {
                isUser: response.appointmnent.isUser,
                propertyDetails: response.appointmnent.propertyDetails,
                landlordDetails:  response.appointmnent.landlordDetails,
                userDetails:  response.appointmnent.userDetails,
                time:  response.appointmnent.time,
              };

              this.appointmentData.push(appointment);
           
              
              
              // console.log(appointment);
              // console.log('is converted appointments');
              // console.log(appointment.isUser);
            }
          });
      }
    }
  }

  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }

  
}
