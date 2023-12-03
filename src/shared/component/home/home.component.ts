import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertyService } from 'src/shared/service/property/property.service';
import { Property } from 'src/shared/model/Property';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as AOS from 'aos';

// import AOS from 'aos';
// import 'aos/dist/aos.css';
import { UserService } from 'src/shared/service/user/user.service';
import { routeAnimationState } from 'src/shared/animation/slideIn';
import { ThemeService } from 'src/shared/service/theme/theme.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimationState],
})
export class HomeComponent implements OnInit {
  searchPropertyForm: FormGroup;
  showToast: boolean = false;
  toastMessage: string = '';
  headerMessage: string = '';
  userPresent: boolean = false;
  localitites: string[] = [];
  sellerImage: string = '../../../assets/man1.png';
  fade: boolean = false;

  locations: string[] = [
    'Hyderabad',
    'Bangalore',
    'Pune',
    'Ranchi',
    'Delhi',
    'Goa',
    'Kolkata',
    'Bhubaneshwar',
  ];

  handleGetLocalitiesForCity = (city: string): string[] => {
    switch (city) {
      case 'Hyderabad':
        return [
          'Secunderabad',
          'Kukatpally',
          'Gachibowli',
          'Banjara Hills',
          'Ameerpet',
        ];
      case 'Bangalore':
        return [
          'Whitefield',
          'Koramangala',
          'HSR Layout',
          'Indiranagar',
          'Electronic City',
        ];
      case 'Pune':
        return ['Kothrud', 'Hinjewadi', 'Kalyaninagar', 'Baner', 'Viman Nagar'];
      case 'Ranchi':
        return ['Morabadi', 'Harmu', 'Bariatu', 'Hinoo', 'Church Road'];
      case 'Delhi':
        return [
          'Connaught Place',
          'Karol Bagh',
          'Rajouri Garden',
          'Paharganj',
          'South Extension',
        ];
      case 'Goa':
        return ['Panjim', 'Calangute', 'Baga', 'Anjuna', 'Palolem'];
      case 'Kolkata':
        return ['Park Street', 'New Market', 'Salt Lake', 'Alipore', 'Howrah'];
      case 'Bhubaneshwar':
        return [
          'Nayapalli',
          'Saheed Nagar',
          'Patia',
          'Khandagiri',
          'Vani Vihar',
        ];
      default:
        return [];
    }
  };

  propertiesData: Property[] = {} as Property[];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private propertyService: PropertyService,
    private fb: FormBuilder,
    public userService: UserService,
    public themeService: ThemeService
  ) {
    this.searchPropertyForm = this.fb.group({
      city: [''],
      locality: [''],
    });
  }

  ngOnInit(): void {
    this.handleSellerImageChange();
    this.handleGetProperties();
    AOS.init();

  
    
    
    this.searchPropertyForm.valueChanges.subscribe(() => {
      this.localitites = this.handleGetLocalitiesForCity(
        this.searchPropertyForm.value.city
      );
      const localityArray = this.searchPropertyForm.value.locality.split(',');

      const latestLocality = localityArray[localityArray.length - 1];
      if (latestLocality !== '') {
        this.localitites = this.localitites.filter((locality) => {
          return locality
            .toLowerCase()
            .startsWith(latestLocality.toLowerCase());
        });
      }
      console.log(this.localitites);
      console.log("are localties");
    });
  }

  handleSellerImageChange() {
    setInterval(() => {
      this.fade = true;
      setTimeout(() => {
        if (this.sellerImage === '../../../assets/man1.png') {
          this.sellerImage = '../../../assets/man2.png';
        } else {
          this.sellerImage = '../../../assets/man1.png';
        }
        this.fade = false;
      }, 500);
    }, 2000);
  }

  // openDialog(action :string)
  // {
  //   console.log("dialog triggered in navbar");

  //   if(action==='login')
  //   {
  //     const dialogRef=this.dialog.open(LoginComponent);

  //   }
  //   else
  //   {
  //     const dialogRef=this.dialog.open(SignupComponent);

  //   }
  // }

  handleAutoFill(locality: string) {
    console.log('auto fill');

    const currentLocality = this.searchPropertyForm.value.locality;

    if (currentLocality.includes(',')) {
      const lastCommaIndex = currentLocality.lastIndexOf(',');

      this.searchPropertyForm.setValue({
        locality: currentLocality.substring(0, lastCommaIndex + 1) + locality,
        city: this.searchPropertyForm.value.city,
      });
    } else {
      this.searchPropertyForm.setValue({
        locality: locality,
        city: this.searchPropertyForm.value.city,
      });
    }

    console.log('set the value');
  }

  handlePropertyAdd() {
    this.router.navigate(['enlistProperty']);
  }

  handleSearchProperty() {
    const city = this.searchPropertyForm.value.city;
    const locality = this.searchPropertyForm.value.locality.toLowerCase();
    const localityArray = locality.split(',');
    if (city === '') {
      this.toastMessage = `Select a City.`;
      this.headerMessage = 'Which City are you Searching for?';
      this.showAndHideToast();
      return;
    }
    if (locality === '') {
      this.toastMessage = `Add a few locality names.`;
      this.headerMessage = 'Unlock Locality Potential: Name it!';
      this.showAndHideToast();
      return;
    }

    const filteredPropertiesData = this.propertiesData.filter(
      (property) =>
        property.propertyDetails?.city?.toLowerCase() === city.toLowerCase() &&
        localityArray.includes(
          property.propertyDetails?.locality?.toLowerCase()
        )
    );
    this.propertiesData = filteredPropertiesData;

    this.router.navigate(['./search'], {
      state: { data: this.propertiesData },
    });
  }

  handleGetProperties() {
    this.propertyService.handleGetProperties().subscribe((response: any) => {
      this.propertiesData = response.properties;
      // console.log(this.propertiesData);
      // console.log("is complete property data from backend");
    });
  }

  showAndHideToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }
}
