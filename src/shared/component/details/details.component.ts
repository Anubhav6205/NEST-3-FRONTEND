import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/shared/model/Property';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PropertyService } from 'src/shared/service/property/property.service';
import { Review } from 'src/shared/model/Review';
import { LandlordDetailsComponent } from '../../component/landlord-details/landlord-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/shared/service/user/user.service';
import { User } from 'src/shared/model/User';
import { AppointmentComponent } from '../../component/appointment/appointment.component';

import { Location } from '@angular/common';
import { ChatService } from 'src/shared/service/chat/chat.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../../component/login/login.component';
import { routeAnimationState } from 'src/shared/animation/slideIn';
import { ThemeService } from 'src/shared/service/theme/theme.service';

declare let Razorpay: any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [routeAnimationState],
})
export class DetailsComponent implements OnInit {
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
  @ViewChild('reviewsSection') reviewsSection: any;
  propertyData: Property = {} as Property;
  reviews: Review[] | undefined = [];
  currentIndex: number = 0;
  currentImage: string = '';
  reviewForm: FormGroup;
  isTransitioning: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  headerMessage: string = '';
  userData: User = {} as User;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private dialog: MatDialog,
    private userService: UserService,
    private chatServce: ChatService,
    private navigateRoute: Router,
    public themeService: ThemeService,
    private location: Location,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      review: [''],
    });

    this.userService.handleGetUserData().subscribe((response: User) => {
      this.userData = response;
      console.log('current user is');
      console.log(this.userData);
    });
  }

  ngOnInit(): void {
    this.propertyData = history.state.data;
    this.currentImage = this.propertyData.propertyGallery![this.currentIndex];
    console.log(this.propertyData);

    console.log('before reviews');

    //CHecking if reviews is array before assinging values
    if (Array.isArray(this.propertyData.reviews)) {
      this.reviews = this.propertyData.reviews;
      console.log(this.reviews);
      console.log('are reviews');
    }

    this.startAutomaticSlideShow();

    // this.propertyData=this.route.snapshot.state.data;
  }

  handlePrev(): void {
    this.isTransitioning = true;

    this.currentImage = this.propertyData.propertyGallery![this.currentIndex];

    setTimeout(() => {
      this.isTransitioning = false;
      this.currentIndex =
        (this.currentIndex - 1 + this.propertyData.propertyGallery!.length) %
        this.propertyData.propertyGallery!.length;
      this.currentImage = this.propertyData.propertyGallery![this.currentIndex];
    }, 500); // Adjust the delay as needed
  }

  startAutomaticSlideShow(): void {
    setInterval(() => {
      this.handleNext();
    }, 4000);
  }

  handleNext(): void {
    this.isTransitioning = true;
    this.currentImage = this.propertyData.propertyGallery![this.currentIndex];

    setTimeout(() => {
      this.isTransitioning = false;
      this.currentIndex =
        (this.currentIndex + 1) % this.propertyData.propertyGallery!.length;
      this.currentImage = this.propertyData.propertyGallery![this.currentIndex];
    }, 500);
  }

  handleReviewSubmit() {
    if (this.userService.userExists === false) {
      this.toastMessage = `Login to add review.`;
      this.headerMessage = 'What?!';
      this.showAndHideToast();
      setTimeout(() => {
        this.openDialog('login');
      }, 2000);
    } else {
      this.toastMessage = `Review Submitted.`;
      this.headerMessage = 'Great!';
      this.showAndHideToast();

      const currentUser: User = this.userData;
      const review: Review = {
        review: this.reviewForm.value.review,

        property: this.propertyData.id ?? '',
        userId: currentUser.id ?? '',
      };
      console.log(review);
      console.log('is review');

      console.log(this.propertyData);
      console.log('is property data ');

      this.propertyService
        .handleAddReview(review)
        .subscribe((response: any) => {
          console.log('is reponse to review');
          console.log(response);
          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);
        });
    }

    this.reviewForm.setValue({
      review: '',
    });

    setTimeout(() => {
      // this.navigateRoute.navigate([''])
    }, 2000);
  }

  handleGetOwnerDetails() {
    if (this.userService.userExists === false) {
      this.toastMessage = `Login to access Landlord Details.`;
      this.headerMessage = 'Hey?!';
      this.showAndHideToast();
      setTimeout(() => {
        this.openDialog('login');
      }, 2000);
    } else {
      const landlordDetails = this.propertyData.landlordDetails;

      //Condig a dialog
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { landlordDetails };

      this.dialog.open(LandlordDetailsComponent, dialogConfig);
    }
  }

  handleScheduleAppointment() {
    if (this.userService.userExists === false) {
      this.toastMessage = `Login to schedule appointment.`;
      this.headerMessage = 'What?!';
      this.showAndHideToast();
      setTimeout(() => {
        this.openDialog('login');
      }, 2000);
    } else {
      const propertyDetails = this.propertyData;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { propertyDetails };
      console.log(propertyDetails);

      this.dialog.open(AppointmentComponent, dialogConfig);
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
      return 'Unfurnished';
    }

    const lowercaseFurnishingType = furnishingType.toLowerCase();

    switch (lowercaseFurnishingType) {
      case 'unfurnished':
        return 'Unfurnished';
      case 'semi-furnished':
        return 'Semi-furnished';
      case 'fully furnished':
        return 'Fully furnished';
      default:
        return 'Unfurnished';
    }
  }

  showAndHideToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000); // Hide the toast after 3 seconds
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

  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }

  handleRent(rent: string | null): string {
    if (rent === null) {
      return 'Rent not available';
    }

    const rentAmount = parseInt(rent, 10);

    if (!isNaN(rentAmount)) {
      if (rentAmount >= 100000) {
        const rentInLakhs = rentAmount / 100000;
        return `${rentInLakhs.toFixed(0)} L`;
      } else {
        const rentInThousands = rentAmount / 1000;
        return `${rentInThousands.toFixed(0)} K`;
      }
    } else {
      return 'Invalid rent format';
    }
  }

  scrollToReviewsSection() {
    if (this.userService.userExists === false) {
      this.toastMessage = `Login to add review.`;
      this.headerMessage = 'What?!';
      this.showAndHideToast();
      setTimeout(() => {
        this.openDialog('login');
      }, 2000);
    } else if (this.reviewsSection) {
      this.reviewsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openDialog(action: string) {
    console.log('dialog triggered in navbar');
    console.log(action);

    this.dialog.open(LoginComponent);
  }

  handleChat() {
    if (this.userService.userExists === false) {
      this.toastMessage = `Login before you start a conversation.`;
      this.headerMessage = 'Hey?!';
      this.showAndHideToast();
      setTimeout(() => {
        this.openDialog('login');
      }, 2000);
    } else {
      // const chat: Chat = {
      //   personAId: this.userData.id!,
      //   personBId: this.propertyData.landlordDetails?.id!,
      // };

      const recieverName =
        this.propertyData.landlordDetails?.firstName +
        ' ' +
        this.propertyData.landlordDetails?.lastName;
      const recieverImage = this.propertyData.landlordDetails?.profilePicture;

      console.log(this.userService.handleGetUserData());

      this.navigateRoute.navigate(['chat'], {
        state: {
          data: [
            this.propertyData.landlordDetails?.id,
            this.userData.id,
            recieverName,
            recieverImage,
          ],
        },
      });
    }
  }

  handleBuyClick() {
    console.log('Expected rent:');
    console.log(this.propertyData.rentalDetails?.expectedRent);
    const rent =
      parseInt(
        this.propertyData.rentalDetails?.expectedRent?.toString() ?? ''
      ) * 100;

    const RozarpayOptions = {
      description: 'RazorPay integration',
      currency: 'INR',
      amount: rent,
      name: this.userData.firstName + ' ' + this.userData.lastName,
      key: 'rzp_test_eCDOgM8X9KyW2g',
      image: 'https://avatars.githubusercontent.com/u/7713209?s=280&v=4',
      prefill: {
        name: 'Anubhav Gupta',
        email: 'anubhavgupta@gmail.oom',
        phone: '987654321',
      },
      theme: {
        color: '#6466e3',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        },

        
       
      },

      handler:(response:any)=>{
        this.router.navigate(['paymentsuccess'],{
          state:{
            userData:this.userData,
            propertyData:this.propertyData
          }
          
        });
        
      }
    
    };

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
      console.log('payment success');
    };

    const failureCallback = (e: any) => {
      console.log(e);
    };

    Razorpay.open(RozarpayOptions, successCallback, failureCallback);
  }
}
