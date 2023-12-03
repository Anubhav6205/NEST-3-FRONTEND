"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var property_details_component_1 = require("src/shared/component/addProperty/property-details/property-details.component");
var property_gallery_component_1 = require("src/shared/component/addProperty/property-gallery/property-gallery.component");
var property_component_1 = require("src/shared/component/addProperty/property/property.component");
var rental_details_component_1 = require("src/shared/component/addProperty/rental-details/rental-details.component");
var chat_component_1 = require("src/shared/component/chat/chat.component");
var details_component_1 = require("src/shared/component/details/details.component");
var home_component_1 = require("src/shared/component/home/home.component");
var list_appointments_component_1 = require("src/shared/component/list-appointments/list-appointments.component");
var list_properties_component_1 = require("src/shared/component/list-properties/list-properties.component");
var profile_edit_component_1 = require("src/shared/component/profile-edit/profile-edit.component");
var search_result_component_1 = require("src/shared/component/search-result/search-result.component");
var routes = [
    {
        path: "",
        component: home_component_1.HomeComponent
    },
    {
        path: "enlistProperty",
        component: property_component_1.PropertyComponent,
        children: [
            {
                path: "",
                component: property_details_component_1.PropertyDetailsComponent
            },
            {
                path: "rental",
                component: rental_details_component_1.RentalDetailsComponent
            },
            {
                path: "gallery",
                component: property_gallery_component_1.PropertyGalleryComponent
            }
        ]
    },
    {
        path: "search",
        component: search_result_component_1.SearchResultComponent
    },
    {
        path: "details",
        component: details_component_1.DetailsComponent
    },
    {
        path: "appointments",
        component: list_appointments_component_1.ListAppointmentsComponent
    },
    {
        path: "properties",
        component: list_properties_component_1.ListPropertiesComponent
    },
    {
        path: "profile",
        component: profile_edit_component_1.ProfileEditComponent
    },
    {
        path: "chat",
        component: chat_component_1.ChatComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
