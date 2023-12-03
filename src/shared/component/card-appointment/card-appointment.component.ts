import { Component, Input, OnInit } from '@angular/core';
import { AppointmentWithValue } from 'src/shared/model/AppointmentWithValue';
import { ThemeService } from 'src/shared/service/theme/theme.service';


@Component({
  selector: 'app-card-appointment',
  templateUrl: './card-appointment.component.html',
  styleUrls: ['./card-appointment.component.scss']
})
export class CardAppointmentComponent implements OnInit {
  @Input()  appointment:AppointmentWithValue={} as AppointmentWithValue;
  time='';
  
  constructor(public themeService:ThemeService){

  }


  ngOnInit(): void {

    console.log(this.appointment);

    // Check if this.appointment and this.appointment.time are not null or undefined
    if (this.appointment && this.appointment.time) {
      console.log(this.appointment.time);
    
      // Access the properties without the non-null assertion operator
      this.time = this.appointment.time[2] + ' ' + this.appointment.time[1] + ',' + this.appointment.time[3] + ' at ' + this.appointment.time[4];
    } else {
      console.error('Either this.appointment or this.appointment.time is null or undefined.');
    }
    

    
    
    
  
   
  }
}
