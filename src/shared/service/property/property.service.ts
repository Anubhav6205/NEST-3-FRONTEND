import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropertyDetails } from 'src/shared/model/Property/PropertyDetails';

import { RentalDetails } from 'src/shared/model/Property/RentailDetails';
import { UserService } from '../user/user.service';
import { Property } from 'src/shared/model/Property';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/shared/model/User';
import { Review } from 'src/shared/model/Review';
import { Appointment } from 'src/shared/model/Appointment';
@Injectable({
  providedIn: 'root',
})
export class PropertyService implements OnInit {
  propertyDetailsForm: FormGroup;
  propertyGalleryForm: FormGroup;
  rentalDetailsForm: FormGroup;

  propertyDetails: PropertyDetails = {} as PropertyDetails;
  propertyGallery: string[] = [];
  rentalDetails: RentalDetails = {} as RentalDetails;
  baseUrl: string = 'https://nest-2-backend-production.up.railway.app/property';

  userData: User = {} as User;

  notifications: Property[] = [] as Property[];
  currentProperties: Property[] = [];
  /**
   *
   * @param fb Initialises FormBuilder
   * @param userService Initialises UserService
   * @param http Initialises HTTP Module
   * Binding to rental Details form and Property Details form to track its value on changing the page
   * Initialising Current properties to track notification service by comparing with latest value of properties
   *
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.propertyDetailsForm = this.fb.group({
      city: [''],
      locality: [''],
      name: [''],
      apartmentType: [''],
      bhkType: [''],
      floor: [''],
      propertyAge: [''],
      facingDirection: [''],
    });

    this.propertyGalleryForm = this.fb.group({
      propertyPictures: [''],
    });

    this.rentalDetailsForm = this.fb.group({
      expectedRent: [''],
      furnishing: [''],
      parking: [''],
    });

    this.subscribeToFormChanges(
      this.propertyDetailsForm,
      this.handleAddPropertyDetails.bind(this)
    );
    this.subscribeToFormChanges(
      this.rentalDetailsForm,
      this.handleAddRentalDetails.bind(this)
    );

    this.handleGetProperties().subscribe((response: any) => {
      // console.log(response);
      // console.log('are notification');
      const properties: Property[] = response.properties;

      this.currentProperties = properties;
    });

   

 

  }

  /**
   * Initialising userData through handleGetUserData() function
   */

  ngOnInit(): void {
    this.userService.handleGetUserData().subscribe((response: User) => {
      this.userData = response;
      console.log(this.userData);
      console.log('in ng on init');
    });
  }



  /**
   *
   * @param form Handles the changes in formGroup
   * @param handler
   */

  private subscribeToFormChanges(form: FormGroup, handler: () => void): void {
    form.valueChanges.subscribe(() => {
      handler();
    });
  }


  handleGetNotifications(): Observable<any> {
    const notificationsSubject = new Subject<any>(); 
  
    this.handleGetProperties().subscribe((response: Property[]) => {
      const newProperties = this.handleGetNewProperties(response); 
      this.notifications = [...this.notifications, ...newProperties]; 
  
  
      notificationsSubject.next(this.notifications);
    });
  
    return notificationsSubject.asObservable(); 
  }
  
  /**
   * @function Compares old properties with new ones and use them for notifications
   * @param response Latest properties
   * @returns New properties as notifications
   */
  handleGetNewProperties(response: any): Property[] {
    const propertiesArray = response.properties || [];

    // Ensure this.currentProperties is an array
    if (!Array.isArray(this.currentProperties)) {
      console.log('is not array');

      this.currentProperties = [];
    }
    console.log(this.currentProperties);
    console.log('is curr props');

    const newProperties = propertiesArray.filter((responseProperty) => {
      let isNew = true;

      for (const currentProperty of this.currentProperties) {
        if (currentProperty.id === responseProperty.id) {
          isNew = false;
          break;
        }
      }

      return isNew;
    });
    this.currentProperties = propertiesArray;

    return newProperties;
  }



  /**
   * Setting values for all the formGroups
   */
  handleAddPropertyDetails() {
    console.log('value changing');

    this.propertyDetails = this.propertyDetailsForm.value;
  }

  handleAddRentalDetails() {
    this.rentalDetails = this.rentalDetailsForm.value;
  }
  handleAddProperty(
    base64stringsArray: string[],
    userData: User
  ): Observable<any> {
    this.propertyGallery = this.propertyGalleryForm.value;
    console.log(userData);
    console.log('is data in landlord while adding property');

    const finalData: Property = {
      propertyDetails: this.propertyDetails,
      propertyGallery: base64stringsArray,
      rentalDetails: this.rentalDetails,
      landlordDetails: userData,
    };

    console.log('final data');
    console.log(finalData);

    // localStorage.setItem('finalData', JSON.stringify(finalData));
    return this.http.post<any[]>(`${this.baseUrl}/add`, finalData);
  }


/**
 * 
 * @returns All properties in database
 */
  handleGetProperties(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/all`);
  }

  handleAddReview(review: Review): Observable<any> {
    console.log('adding review in frontned');
    console.log(review);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any[]>(`${this.baseUrl}/review/add`, review, {
      headers: headers,
    });
  }


  /**
   * 
   * @param appointment takes an appointment as input and adds it to user 
   * @returns Success status code 
   */
  handleAddAppointment(appointment: Appointment): Observable<any> {
    return this.http.post<any[]>(
      `${this.baseUrl}/appointment/add`,
      appointment
    );
  }
}
