import { Component } from '@angular/core';
import { PropertyService } from 'src/shared/service/property/property.service';
import { Router } from '@angular/router';
type FurnishType = {
  value: string;
  label: string;
};

// Type for individual item in parkingOptions array
type ParkingOption = {
  value: string;
  label: string;
};


@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss'],
})
export class RentalDetailsComponent  {
   furnishTypes:FurnishType[] = [
    {
      value: "unfurnished",
      label: "Unfurnished",
    },
    {
      value: "semi_furnished",
      label: "Semi-furnished",
    },
    {
      value: "fully_furnished",
      label: "Fully furnished",
    },
  ];
  
   parkingOptions:ParkingOption[] = [
    {
      value: "car",
      label: "Car",
    },
    {
      value: "bike",
      label: "Bike",
    },
    {
      value: "both",
      label: "Both",
    },
    {
      value: "none",
      label: "None",
    },
  ];
  
  constructor(
    public propertyService: PropertyService,
    private router: Router
  ) {}



  /**
   * Navigates to gallery component
   */
  handleRouteToGallery() :void{
    this.propertyService.handleAddRentalDetails();
    this.router.navigate(['./enlistProperty/gallery']);
  }
}
