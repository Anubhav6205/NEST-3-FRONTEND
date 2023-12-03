
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/shared/model/Property';
import { PropertyDetails } from 'src/shared/model/Property/PropertyDetails';
import { PropertyService } from 'src/shared/service/property/property.service';
import { ThemeService } from 'src/shared/service/theme/theme.service';
import { Location } from '@angular/common';

type FurnishType = {
  value: string;
  label: string;
};

// Type for individual item in parkingOptions array
type ParkingOption = {
  value: string;
  label: string;
};

type PropertyAge = {
  value: string;
  label: string;
};

type BHKType = {
  value: string;
  label: string;
};

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  // animations:[

  //   trigger('listAnimation',[
  //     transition('void=>*',[
  //       query(':enter',style({opacity:0}),{optional:true}),

  //       query(":enter",stagger('300ms',[
  //  animate('is ease-in',keyframes([
  //   style({opacity:0,transform:'translateY(-75px)',offset:0}),
  //   style({opacity:.5,transform:'translateY(-35px)',offset:0.3}),
  //   style({opacity:3,transform:'translateY(0)',offset:3}),
  //  ]))
  //       ]))
  //     ])
  //   ])
  // ]
})


export class SearchResultComponent implements OnInit {
  propertiesData: Property[] = {} as Property[];
  filteredPropertiesData: Property[] = {} as Property[];
  activeFilters: any = {};
  currentBHK: string = '';
  currentType:string='';
  currentAge:string='';
  currentFurnishing:string='';
  currentDirection:string='';
  currentParking:string='';
  filtersVisible:boolean=true;
  bhkTypes: BHKType[] = [
    {
      value: '1_BHK',
      label: '1 BHK',
    },
    {
      value: '2_BHK',
      label: '2 BHK',
    },
    {
      value: '3_BHK',
      label: '3 BHK',
    },
    {
      value: '4_BHK',
      label: '4 BHK',
    },
    {
      value: '4_PLUS_BHK',
      label: '4+ BHK',
    },
  ];

  apartmentTypes: string[] = [
    'Gated Community Villa',
    'Independent House',
    'Apartment',
  ];

  propertyAges: PropertyAge[] = [
    {
      value: 'less_than_1_year',
      label: 'Less than 1 year',
    },
    {
      value: '1_to_3_years',
      label: '1 to 3 years',
    },
    {
      value: '3_to_5_years',
      label: '3 to 5 years',
    },
    {
      value: 'more_than_5_years',
      label: 'More than 5 years',
    },
  ];

  furnishTypes: FurnishType[] = [
    {
      value: 'unfurnished',
      label: 'Unfurnished',
    },
    {
      value: 'semi_furnished',
      label: 'Semi-furnished',
    },
    {
      value: 'fully_furnished',
      label: 'Fully furnished',
    },
  ];

  parkingOptions: ParkingOption[] = [
    {
      value: 'car',
      label: 'Car',
    },
    {
      value: 'bike',
      label: 'Bike',
    },
    {
      value: 'both',
      label: 'Both',
    },
    {
      value: 'none',
      label: 'None',
    },
  ];

  facingDirections: string[] = ['North', 'East', 'West', 'South'];

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    public themeService:ThemeService,
    private location:Location
  ) {}


  /**
   * @function Get properties data from history after using router.navigate
   * Slice() to duplicate propertiesData
   */
  ngOnInit(): void {
    this.propertiesData = history.state.data;
    this.filteredPropertiesData = this.propertiesData.slice();
    console.log(this.propertiesData);
  }

  /**
   * 
   * @param filterType Current filter type 
   * @param value Filter's value in db
   */

  applyFilter(filterType: string, value: string):void {
    this.activeFilters[filterType] = value;
    this.updateFilteredProperties();
  }

  /**
   * 
   * @param filterType Filter to be deleted on reclicking it 
   */

  removeFilter(filterType: string):void {
    delete this.activeFilters[filterType];
    this.updateFilteredProperties();
  }


  /**
   * Iterates for every activate filters  , store sits current value (using label) and returns true for matching property Data
   * so We get only that value whic matches the filter value
   */
  updateFilteredProperties():void{
    this.filteredPropertiesData = this.propertiesData.filter((property) => {
      return Object.keys(this.activeFilters).every((activeFilter) => {
        const value = this.activeFilters[activeFilter];
        return (
          property.propertyDetails &&
          property.propertyDetails[activeFilter as keyof PropertyDetails] ===
            value
        );
      });
    });
  }


  /**
   * 
   * @param bhkType Current bhk type to add or delete
   */
  handleBhkType(bhkType: string):void {
    if (this.currentBHK === bhkType) {
      this.currentBHK = '';
    } else {
      this.currentBHK = bhkType;
    }
    if (this.activeFilters['bhkType'] === bhkType) {
      this.removeFilter('bhkType');
    } else {
      this.applyFilter('bhkType', bhkType);
    }
  }

  handleApartmentType(apartmentType: string):void {
    if(this.currentType === apartmentType)
    {
      this.currentType='';
    }
    else
    {
    this.currentType=apartmentType;
    }
    if (this.activeFilters['apartmentType'] === apartmentType) {
      this.removeFilter('apartmentType');
    } else {
      this.applyFilter('apartmentType', apartmentType);
    }
  }

  handlePropertyAge(propertyAge: string):void {

    if(this.currentAge === propertyAge)
    {
      this.currentAge='';
    }
    else
    {
      this.currentAge=propertyAge;
    }
    if (this.activeFilters['propertyAge'] === propertyAge) {
      this.removeFilter('propertyAge');
    } else {
      this.applyFilter('propertyAge', propertyAge);
    }
  }

  handleFurnishTypes(furnishType: string):void {

    if(this.currentFurnishing === furnishType)
    {
      this.currentFurnishing='';
    }
    else
    {
      this.currentFurnishing=furnishType;
    }
    if (this.activeFilters['furnishing'] === furnishType) {
      this.removeFilter('furnishing');
    } else {
      this.applyFilter('furnishing', furnishType);
    }
  }

  handleParkingOption(parkingOption: string):void {
 
    if(this.currentParking === parkingOption)
    {
      this.currentParking='';
    }
    else
    {
      this.currentParking=parkingOption;
    }
    if (this.activeFilters['parking'] === parkingOption) {
      this.removeFilter('parking');
    } else {
      this.applyFilter('parking', parkingOption);
    }
  }

  handleFacingDirection(facingDirection: string):void {

    
    if(this.currentDirection === facingDirection)
    {
      this.currentDirection='';
    }
    else
    {
      this.currentDirection=facingDirection;
    }
    if (this.activeFilters['facingDirection'] === facingDirection) {
      this.removeFilter('facingDirection');
    } else {
      this.applyFilter('facingDirection', facingDirection);
    }
  }

  // handleOpenDetail(propertyData: Property) {
  //   this.router.navigate(['./details'], { state: { data: propertyData } });
  // }

  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }
}
