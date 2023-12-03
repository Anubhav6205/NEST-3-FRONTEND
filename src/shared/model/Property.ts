import { PropertyDetails } from './Property/PropertyDetails';

import { RentalDetails } from './Property/RentailDetails';
import { Review } from './Review';
import { User } from './User';

export interface Property {
  id?: string;
  propertyDetails?: PropertyDetails;

  propertyGallery?: string[];

  rentalDetails?: RentalDetails;

  landlordDetails?: User;

  reviews?:Review
}
