import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/shared/model/User';

@Component({
  selector: 'app-landlord-details',
  templateUrl: './landlord-details.component.html',
  styleUrls: ['./landlord-details.component.scss']
})
export class LandlordDetailsComponent {
  landlordData:User={} as User;

  constructor(@Inject(MAT_DIALOG_DATA) public data:{landlordDetails:User})
  {
    this.landlordData=data.landlordDetails;
    console.log(this.landlordData);
    
 
    
    

  }

}
