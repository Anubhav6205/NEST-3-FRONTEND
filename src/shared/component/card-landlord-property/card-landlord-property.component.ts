import { Component, Input } from '@angular/core';
import { Property } from 'src/shared/model/Property';
import { ThemeService } from 'src/shared/service/theme/theme.service';

@Component({
  selector: 'app-card-landlord-property',
  templateUrl: './card-landlord-property.component.html',
  styleUrls: ['./card-landlord-property.component.scss'],
})
export class CardLandlordPropertyComponent {
  @Input() property: Property = {} as Property;
  currentImage= '';
  currentIndex = 0;

  constructor(public themeService:ThemeService) {}

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

  handlePrev(): void {
    if (this.property && this.property.propertyGallery && this.property.propertyGallery.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.property.propertyGallery.length) %
        this.property.propertyGallery.length;
    } else {
      console.error('Invalid property or propertyGallery.');
    }
  }
  
  handleNext(): void {
    if (this.property && this.property.propertyGallery && this.property.propertyGallery.length > 0) {
      this.currentIndex =
        (this.currentIndex + 1) % this.property.propertyGallery.length;
    } else {
      console.error('Invalid property or propertyGallery.');
    }
  }
  
}
