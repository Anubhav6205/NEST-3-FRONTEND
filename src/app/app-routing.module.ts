import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailsComponent } from 'src/shared/component/addProperty/property-details/property-details.component';
import { PropertyGalleryComponent } from 'src/shared/component/addProperty/property-gallery/property-gallery.component';
import { PropertyComponent } from 'src/shared/component/addProperty/property/property.component';
import { RentalDetailsComponent } from 'src/shared/component/addProperty/rental-details/rental-details.component';

import { ChatComponent } from 'src/shared/component/chat/chat.component';
import { ConversationsComponent } from 'src/shared/component/conversations/conversations.component';
import { DetailsComponent } from 'src/shared/component/details/details.component';
import { HomeComponent } from 'src/shared/component/home/home.component';
import { ListAppointmentsComponent } from 'src/shared/component/list-appointments/list-appointments.component';
import { ListNotificationsComponent } from 'src/shared/component/list-notifications/list-notifications.component';
import { ListPropertiesComponent } from 'src/shared/component/list-properties/list-properties.component';
import { PaymentSuccessComponent } from 'src/shared/component/payment-success/payment-success.component';
import { ProfileEditComponent } from 'src/shared/component/profile-edit/profile-edit.component';
import { SearchResultComponent } from 'src/shared/component/search-result/search-result.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "enlistProperty",
    component: PropertyComponent,
    children: [
      {
        path: "",
        component: PropertyDetailsComponent
      },
      {
        path: "rental",
        component: RentalDetailsComponent,
      },
      {
        path: "gallery",
        component: PropertyGalleryComponent
      }
    ]
  },
  {
    path:"search",
    component:SearchResultComponent
  },
  {
    path:"details",
    component:DetailsComponent
  },
  {
    path:"paymentsuccess",
    component:PaymentSuccessComponent

  },
  {
    path:"appointments",
    component:ListAppointmentsComponent
  },
  {
    path:"properties",
    component:ListPropertiesComponent
  },
  {
    path:"conversations",
    component:ConversationsComponent
  },
  {
    path:"profile",
    component:ProfileEditComponent
  },
  {
    path:"chat",
    component:ChatComponent
  },
  {
    path:"notifications",
    component:ListNotificationsComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
