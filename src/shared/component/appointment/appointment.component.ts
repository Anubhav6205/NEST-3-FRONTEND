import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { routeAnimationState } from 'src/shared/animation/slideIn';
import { Property } from 'src/shared/model/Property';
import { User } from 'src/shared/model/User';
import { PropertyService } from 'src/shared/service/property/property.service';
import { UserService } from 'src/shared/service/user/user.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  animations: [routeAnimationState],
})
export class AppointmentComponent implements OnInit {
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
  appointmentSchedule: string[] = [''];
  morningSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'];
  landlordDetails: User = {} as User;
  userDetails: User = {} as User;
  propertyDetails: Property = {} as Property;
  activeTimeSlot: string | null = null;

  howToast = false;
  toastMessage = '';
  headerMessage = '';
  showToast= false;

  afternoonSlots = [
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
    '05:00 PM',
    '05:30 PM',
    '06:00 PM',
  ];

  eveningSlots = ['06:30 PM', '07:00 PM'];

  constructor(
    public dialogRef: MatDialogRef<AppointmentComponent>,
    private propertyService: PropertyService,
    private userService: UserService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: { propertyDetails: Property }
  ) {
    this.propertyDetails = data.propertyDetails;
    this.landlordDetails = data.propertyDetails.landlordDetails!;
  }

  ngOnInit(): void {
    this.userService.handleGetUserData().subscribe((userData: User) => {
      this.userDetails = userData;
    });
  }

  handleAppointmentDate(selectedDate: MatDatepickerInputEvent<Date>) {
    this.appointmentSchedule = selectedDate.value!
      .toString()
      .split(' ')
      .slice(0, 4);
  }

  handleAppointmentTime(selectedTime: string) {
    this.activeTimeSlot = selectedTime;
    this.appointmentSchedule[4] = selectedTime;
  }

  handleSubmitAppointment() {

      setTimeout(() => {
        const appointment = {
          time: this.appointmentSchedule,
          propertyDetails: this.propertyDetails.id as string,
          userDetails: this.userDetails.id as string,
          landlordDetails: this.landlordDetails.id as string,
        };
        this.propertyService
          .handleAddAppointment(appointment)
          .subscribe(() => {
            // console.log(response);
            // console.log('is reponse after submitting appointment');
           
            
            
          });

        setTimeout(()=>{
          this.router.navigate(['']);
        },2000)
        this.dialogRef.close();

      })
  
    
  }

  showAndHideToast() {
    console.log("showing toast");
    
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }
}
