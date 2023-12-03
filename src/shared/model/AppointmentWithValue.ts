import { Property } from "./Property";
import { User } from "./User";

export interface AppointmentWithValue {
    isUser: boolean;
    propertyDetails?: Property;
    landlordDetails?: User;
    userDetails?: User;
    time?: string[];
  }

  
  