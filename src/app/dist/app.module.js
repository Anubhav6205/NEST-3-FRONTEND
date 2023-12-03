"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var google_maps_1 = require("@angular/google-maps");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("src/shared/component/navbar/navbar.component");
var login_component_1 = require("src/shared/component/login/login.component");
var signup_component_1 = require("src/shared/component/signup/signup.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var home_component_1 = require("../shared/component/home/home.component");
var select_1 = require("@angular/material/select");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var dialog_1 = require("@angular/material/dialog");
var button_1 = require("@angular/material/button");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
var menu_1 = require("@angular/material/menu");
var radio_1 = require("@angular/material/radio");
var checkbox_1 = require("@angular/material/checkbox");
var icon_1 = require("@angular/material/icon");
var angular_1 = require("@coreui/angular");
var property_details_component_1 = require("../shared/component/addProperty/property-details/property-details.component");
var rental_details_component_1 = require("../shared/component/addProperty/rental-details/rental-details.component");
var property_gallery_component_1 = require("../shared/component/addProperty/property-gallery/property-gallery.component");
var property_component_1 = require("../shared/component/addProperty/property/property.component");
var search_result_component_1 = require("../shared/component/search-result/search-result.component");
var details_component_1 = require("../shared/component/details/details.component");
var landlord_details_component_1 = require("src/shared/component/landlord-details/landlord-details.component");
var appointment_component_1 = require("../shared/component/appointment/appointment.component");
var list_appointments_component_1 = require("../shared/component/list-appointments/list-appointments.component");
var list_properties_component_1 = require("../shared/component/list-properties/list-properties.component");
var profile_edit_component_1 = require("../shared/component/profile-edit/profile-edit.component");
var toast_component_1 = require("../shared/component/toast/toast.component");
var toast_icon_component_1 = require("../shared/component/toast-icon/toast-icon.component");
var card_appointment_component_1 = require("../shared/component/card-appointment/card-appointment.component");
var card_property_component_1 = require("../shared/component/card-property/card-property.component");
var map_component_1 = require("../shared/component/map/map.component");
var chat_component_1 = require("../shared/component/chat/chat.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                home_component_1.HomeComponent,
                property_details_component_1.PropertyDetailsComponent,
                rental_details_component_1.RentalDetailsComponent,
                property_gallery_component_1.PropertyGalleryComponent,
                property_component_1.PropertyComponent,
                search_result_component_1.SearchResultComponent,
                details_component_1.DetailsComponent,
                landlord_details_component_1.LandlordDetailsComponent,
                appointment_component_1.AppointmentComponent,
                list_appointments_component_1.ListAppointmentsComponent,
                list_properties_component_1.ListPropertiesComponent,
                profile_edit_component_1.ProfileEditComponent,
                toast_component_1.ToastComponent,
                toast_icon_component_1.ToastIconComponent,
                card_appointment_component_1.CardAppointmentComponent,
                card_property_component_1.CardPropertyComponent,
                map_component_1.MapComponent,
                chat_component_1.ChatComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                datepicker_1.MatDatepickerModule,
                core_2.MatNativeDateModule, button_1.MatButtonModule,
                menu_1.MatMenuModule,
                radio_1.MatRadioModule,
                checkbox_1.MatCheckboxModule,
                icon_1.MatIconModule,
                angular_1.ToastModule,
                angular_1.ProgressModule,
                angular_1.DropdownModule,
                google_maps_1.GoogleMapsModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
