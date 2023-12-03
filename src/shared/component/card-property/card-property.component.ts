import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/shared/model/Property';
import { Router } from '@angular/router';

import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { LandlordDetailsComponent } from '../landlord-details/landlord-details.component';

import { UserService } from 'src/shared/service/user/user.service';
import { LoginComponent } from '../login/login.component';
import { User } from 'src/shared/model/User';
@Component({
  selector: 'app-card-property',
  templateUrl: './card-property.component.html',
  styleUrls: ['./card-property.component.scss'],
})
export class CardPropertyComponent implements OnInit {
  @Input() propertyData: Property = {} as Property;
  currentImage = '';
  currentIndex = 0;
  showToast = false;
  toastMessage= '';
  headerMessage= '';
  currentUserId=''
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  handlePrev(): void {
    if (this.propertyData && this.propertyData.propertyGallery) {
      this.currentIndex =
        (this.currentIndex - 1 + this.propertyData.propertyGallery.length) %
        this.propertyData.propertyGallery.length;
    }
  }
  
  handleNext(): void {
    if (this.propertyData && this.propertyData.propertyGallery) {
      this.currentIndex =
        (this.currentIndex + 1) % this.propertyData.propertyGallery.length;
    }
  }
  
  ngOnInit(): void {
    if (this.propertyData && this.propertyData.propertyGallery) {
      this.currentImage = this.propertyData.propertyGallery[this.currentIndex];
    }
  
    this.userService.handleGetUserData().subscribe(
      (response: User) => {
        if (response && response.id) {
          this.currentUserId = response.id;
        }
      },
      (error) => {
        console.error("Error fetching user data:", error);
      }
    );
  }
  
  handleGetOwnerDetails() {
    if(this.userService.userExists===false)
    {
    this.toastMessage = `Login to access Landlord Details.`;
    this.headerMessage = 'Hey?!';
    this.showAndHideToast();
    setTimeout(() => {
      this.openDialog('login');
    }, 2000);
   
  }
  else
  {
    const landlordDetails = this.propertyData.landlordDetails;


    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { landlordDetails };

    this.dialog.open(LandlordDetailsComponent, dialogConfig);
  }
}
  handleGetBhkType(bhkType: string | undefined): string {
    switch (bhkType) {
      case '1_BHK':
        return '1 BHK';
      case '2_BHK':
        return '2 BHK';
      case '3_BHK':
        return '3 BHK';
      case '4_BHK':
        return '4 BHK';
      case '4plus_BHK':
        return '4+ BHK';
      default:
        return 'Unknown BHK Type';
    }
  }

  handleOpenDetail() {
    this.router.navigate(['./details'], { state: { data: this.propertyData } });
  }
  handleParking(parkingType: string | undefined): string {
    if (!parkingType) {
      return 'Not available';
    }

    switch (parkingType.toLowerCase()) {
      case 'both':
        return 'Car and Bike';
      case 'car':
        return 'Only Car';
      case 'bike':
        return 'Only Bike';
      default:
        return 'Not available';
    }
  }

  handleFurnishing(furnishingType: string | undefined): string {
    if (!furnishingType) {
      return 'Not available';
    }

    const lowercaseFurnishingType = furnishingType.toLowerCase();

    switch (lowercaseFurnishingType) {
      case 'unfurnished':
        return 'Unfurnished';
      case 'semi furnished':
        return 'Semi-furnished';
      case 'fully furnished':
        return 'Fully furnished';
      default:
        return 'Not available';
    }
  }

  handlePropertyAge(ageType: string | undefined): string {
    if (!ageType) {
      return 'Not available';
    }

    const lowercaseAgeType = ageType.toLowerCase();

    switch (lowercaseAgeType) {
      case '1_to_3_years':
        return '1 to 3 years';
      case 'less_than_1_year':
        return 'Less than 1 year';
      case '3_to_5_years':
        return '3 to 5 years';
      case 'more_than_5_years':
        return 'More than 5 years';
      default:
        return 'Not available';
    }
  }

  showAndHideToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000); // Hide the toast after 3 seconds
  }

  openDialog(action: string) {
    console.log('dialog triggered in navbar');
    console.log(action);
    

    this.dialog.open(LoginComponent);
  }

  handleChat() {
    if(this.userService.userExists===false)
    {
    this.toastMessage = `Login before you start a conversation.`;
    this.headerMessage = 'Hey?!';
    this.showAndHideToast();
    setTimeout(() => {
      this.openDialog('login');
    }, 2000);
   
  }
  else
  {
    // const chat: Chat = {
    //   personAId: this.currentUserId!,
    //   personBId: this.propertyData.landlordDetails?.id!,
    // };

    const recieverName =
      this.propertyData.landlordDetails?.firstName +
      ' ' +
      this.propertyData.landlordDetails?.lastName;
    const recieverImage = this.propertyData.landlordDetails?.profilePicture;

    console.log(this.userService.handleGetUserData());

    this.router.navigate(['chat'], {
      state: {
        data: [
          this.propertyData.landlordDetails?.id,
          this.currentUserId,
          recieverName,
          recieverImage,
        ],
      },
    });
  }
  }
}
