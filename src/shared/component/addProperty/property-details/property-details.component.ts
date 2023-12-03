import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/shared/service/property/property.service';
import { ThemeService } from 'src/shared/service/theme/theme.service';

type BHKType = {
  value: string;
  label: string;
};

type PropertyAge = {
  value: string;
  label: string;
};
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})


export class PropertyDetailsComponent {
  localities: string[] = [];
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

 
  bhkTypes:BHKType[] = [
    {
      value: "1_BHK",
      label: "1 BHK",

    },
    {
      value: "2_BHK",
      label: "2 BHK",
     
    },
    {
      value: "3_BHK",
      label: "3 BHK",
   
    },
    {
      value: "4_BHK",
      label: "4 BHK",

    },
    {
      value: "4_PLUS_BHK",
      label: "4+ BHK",

    },
  ];

   apartmentTypes:string[] = ["Gated Community Villa", "Independent House", "Apartment"];


    floors:number[] = [...Array(100).keys()].map((i) => i + 1);

     propertyAges:PropertyAge[] = [
      {
        value: "less_than_1_year",
        label: "Less than 1 year",
     
      },
      {
        value: "1_to_3_years",
        label: "1 to 3 years",
      
      },
      {
        value: "3_to_5_years",
        label: "3 to 5 years",
        
      },
      {
        value: "more_than_5_years",
        label: "More than 5 years",
       
      },
    ];
    

     facingDirections:string[] = ["North", "East", "West", "South"];




  

  constructor(
    public propertyService: PropertyService,
    private router: Router,
    public themeService:ThemeService
  ) {}

 

  /**
   * Navigates to next form page i.e Rental Details page
   */
  handleRouteToRental() :void{
    this.propertyService.handleAddPropertyDetails();
    this.router.navigate(['./enlistProperty/rental']);
  }


  /**
   * @function Sets localities based on current city
   * @param event Current selected city
   */
  handleLocalityChange(event: Event) {
    const city: string = (event.target as HTMLInputElement).value;
    console.log(city);
  
    this.localities = this.handleGetLocalitiesForCity(city);
  }
  


  /**
   * 
   * @param city name
   * @returns  For every city retuns 5 localityes
   */
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
}
