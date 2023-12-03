import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/shared/model/User';
import { Observable, map } from 'rxjs';
import { TokenResponse } from 'src/shared/model/TokenResponse';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from 'src/shared/model/Appointment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'https://nest-2-backend-production.up.railway.app/user';
  userData: User={} as User;
  private userDataBS: BehaviorSubject<User>;
  userExists: boolean = false;

  //helps to track value for userDataBS
  //created a BS with initial value

  /**
   * @constructor Initialises userData and BehaviourSubject userDataBs
   * @param http Helps to use HttpClientModule methods
   */
  constructor(private http: HttpClient) {
    if(localStorage.getItem('userData'))
    {
      const localStorageData = localStorage.getItem('userData');
      console.log('localStorageData:', localStorageData);
      this.userData = localStorageData ? JSON.parse(localStorageData) : null;
      
    }

    this.userDataBS = new BehaviorSubject<User>(this.userData);

    const userDataInLocalStorage = JSON.parse(
      localStorage.getItem('userData')!
    );
    console.log('userD in local');
    console.log(userDataInLocalStorage);
    

    if (userDataInLocalStorage && userDataInLocalStorage.id !== '') {
      console.log("user exists");
      
      this.userExists = true;
    }
  }

  /**
   *
   * @returns Empty sting values for User Model
   */
  handleEmptyUserValues(): User {
    const emptyUser: User = {
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: '',
      contactNumber: '',
    };

    return emptyUser;
  }

  /**
   * @Function Add User Data to Database and Signup user
   * @param user User data that needs to be added to Database
   * @returns Observable of response containing Token and UserData
   */

  handleUserSignup(user: User): Observable<any> {
    this.handleSetUserData(user);
    this.userExists = true;
    return this.http.post<any>(`${this.baseUrl}/signup`, user);
  }

  /**
   * @function check user credentials in database and login user
   * @param user User credentials that needs to login
   * @returns Observable of response containing Token and UserData
   */

  handleUserLogin(user: User): Observable<any> {
    this.userExists = true;

    this.handleSetUserData(user);
    return this.http.post<any>(`${this.baseUrl}/login`, user); // update the URL to match the backend URL
  }

  /**
   * @function sets token, role and user data
   * @param response Response from backend containing token, role and userData
   * @returns Boolean value according to user credentials
   */
  handleUserDataResponse(response: TokenResponse): boolean {
    if (response.status === 'true') {
      this.handleSetUserData(response.userData!);

      this.handleSetToken(response.token!);
      this.handleSetRole(this.handleGetToken());

      return true;
    } else {
      return false;
    }
  }

  /**
   * @function Sets current token in local storage
   * @param token User's token
   */
  handleSetToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   *
   * @returns User token
   */
  handleGetToken(): string {
    const token: string = JSON.stringify(localStorage.getItem('token'));
    return token.substring(1, token.length - 1);
  }

  /**
   * @function Decodes token to extract user's role and sets role in local storage
   * @param token Current User's token
   */
  handleSetRole(token: string): void {
    const base64pl = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(base64pl));
    const role = decodedPayload.role;
    localStorage.setItem('role', role);
  }

  /**
   * @function Gets current user's role from userData and returns it
   * @returns Current User's role
   */
  handleGetRole(): string {
    // const role = JSON.stringify(localStorage.getItem('role'));
    const role: string = this.userData.role as string;
    return role;
  }

  /**
   * @function Updates current user's data using Behavior Subject and sets in local storage
   * @param userData  Current user's data
   */

  handleSetUserData(userData: User): void {
    console.log('setting user data');
    if (userData && userData.id) {
      this.userDataBS.next(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }


/**
 * @function Takes User Token as input,calls handleGetUserDataFromBackend function  and returns the data 
 * @returns Current User's data
 */

  handleGetUserData(): Observable<User> {
   

    return this.handleGetUserDataFromBackend(this.handleGetToken()).pipe(
      map((response: any) => {
        return response.userData as User;
      })
    );
  }

  /**
   * 
   * @function Takes User's token as input, passes it in header and returns current user's data
   * @param token User's unique JWT Token
   * @returns User's data
   */

  handleGetUserDataFromBackend(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.baseUrl}/get`, { headers });
  }

  //this acts as delivery guy to deliver new values of userData

  /**
   * Obserable for userData to manage userData's value in other components
   */
  get userDataObservable(): Observable<User> {
    return this.userDataBS.asObservable();
  }


  /**
   * 
   * @param appointmentDataId Unique id for any appointment of current user
   * @returns The value for the appointment based on ID
   */
  handleConvertAppointmentIds(appointmentDataId: Appointment): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/appointment/get`,
      appointmentDataId
    );
  }


  /**
   * 
   * @function Updates current user's data in backend
   * @param user Current User's updated data
   * @returns Success status code 
   */
  handleUserUpdate(user: User): Observable<any> {
    this.handleSetUserData(user);
    return this.http.post<any>(`${this.baseUrl}/update`, user);
  }


/**
 * 
 * @returns Array of appointments for current user
 */
  handleGetAppointmentDetails(): Appointment[] {
    const appointmentDetails: Appointment[] = this.userData.appointmentDetails!;
    return appointmentDetails;
  }

  /**
   * 
   * @param id Any User's id
   * @returns Details for user whose ID is passed
   */

  handleGetUserById(id: string): Observable<any> {
    const currentUserMap = {
      currentUserId: id,
    };
    return this.http.post<any>(`${this.baseUrl}/get/id`, currentUserMap);
  }
}
