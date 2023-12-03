import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { GoogleMapsModule } from '@angular/google-maps';

import { NgxParallaxModule } from '@yoozly/ngx-parallax';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/shared/component/navbar/navbar.component';
import { LoginComponent } from 'src/shared/component/login/login.component';
import { SignupComponent } from 'src/shared/component/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../shared/component/home/home.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { MatBadgeModule } from '@angular/material/badge';

import { ToastModule, ProgressModule, DropdownModule } from '@coreui/angular';

import { PropertyDetailsComponent } from '../shared/component/addProperty/property-details/property-details.component';
import { RentalDetailsComponent } from '../shared/component/addProperty/rental-details/rental-details.component';
import { PropertyGalleryComponent } from '../shared/component/addProperty/property-gallery/property-gallery.component';
import { PropertyComponent } from '../shared/component/addProperty/property/property.component';
import { SearchResultComponent } from '../shared/component/search-result/search-result.component';
import { DetailsComponent } from 'src/shared/component/details/details.component';

import { LandlordDetailsComponent } from 'src/shared/component/landlord-details/landlord-details.component';
import { AppointmentComponent } from '../shared/component/appointment/appointment.component';
import { ListAppointmentsComponent } from '../shared/component/list-appointments/list-appointments.component';
import { ListPropertiesComponent } from '../shared/component/list-properties/list-properties.component';
import { ProfileEditComponent } from '../shared/component/profile-edit/profile-edit.component';
import { ToastComponent } from '../shared/component/toast/toast.component';
import { ToastIconComponent } from '../shared/component/toast-icon/toast-icon.component';
import { CardAppointmentComponent } from '../shared/component/card-appointment/card-appointment.component';
import { CardPropertyComponent } from '../shared/component/card-property/card-property.component';
import { MapComponent } from '../shared/component/map/map.component';
import { ChatComponent } from '../shared/component/chat/chat.component';
import { ConversationsComponent } from '../shared/component/conversations/conversations.component';
import { CardLandlordPropertyComponent } from '../shared/component/card-landlord-property/card-landlord-property.component';
import { ListNotificationsComponent } from '../shared/component/list-notifications/list-notifications.component';
import { CardNotificationsComponent } from '../shared/component/card-notifications/card-notifications.component';
import { PaymentSuccessComponent } from '../shared/component/payment-success/payment-success.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,

    PropertyDetailsComponent,
    RentalDetailsComponent,
    PropertyGalleryComponent,
    PropertyComponent,
    SearchResultComponent,
    DetailsComponent,

    LandlordDetailsComponent,
    AppointmentComponent,
    ListAppointmentsComponent,
    ListPropertiesComponent,
    ProfileEditComponent,
    ToastComponent,
    ToastIconComponent,
    CardAppointmentComponent,
    CardPropertyComponent,
    MapComponent,
    ChatComponent,
    ConversationsComponent,
    CardLandlordPropertyComponent,
    ListNotificationsComponent,
    CardNotificationsComponent,
    PaymentSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,

    ToastModule,
    ProgressModule,
    DropdownModule,

    GoogleMapsModule,

    NgxParallaxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
