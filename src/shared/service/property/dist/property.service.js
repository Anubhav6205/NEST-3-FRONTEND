"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PropertyService = void 0;
var core_1 = require("@angular/core");
var PropertyService = /** @class */ (function () {
    function PropertyService(fb, userService, http) {
        this.fb = fb;
        this.userService = userService;
        this.http = http;
        this.propertyDetails = {};
        this.propertyGallery = [];
        this.rentalDetails = {};
        this.baseUrl = 'https://nest-2-backend-production.up.railway.app/property';
        this.propertyDetailsForm = this.fb.group({
            city: [''],
            locality: [''],
            name: [''],
            apartmentType: [''],
            bhkType: [''],
            floor: [''],
            propertyAge: [''],
            facingDirection: ['']
        });
        this.propertyGalleryForm = this.fb.group({
            propertyPictures: ['']
        });
        this.rentalDetailsForm = this.fb.group({
            expectedRent: [''],
            furnishing: [''],
            parking: ['']
        });
        this.subscribeToFormChanges(this.propertyDetailsForm, this.handleAddPropertyDetails.bind(this));
        this.subscribeToFormChanges(this.rentalDetailsForm, this.handleAddRentalDetails.bind(this));
    }
    PropertyService.prototype.subscribeToFormChanges = function (form, handler) {
        form.valueChanges.subscribe(function () {
            handler();
        });
    };
    // handleEmptyUserValues(): Property {
    //   const emptyProperty: Property = {
    //     id: '',
    //     propertyDetails: {} as PropertyDetails,
    //     propertyGallery: [''],
    //     rentalDetails: {} as RentalDetails,
    //     landlordDetails: {} as User,
    //   };
    //   return emptyProperty;
    // }
    PropertyService.prototype.handleAddPropertyDetails = function () {
        console.log("value changing");
        this.propertyDetails = this.propertyDetailsForm.value;
    };
    PropertyService.prototype.handleAddRentalDetails = function () {
        this.rentalDetails = this.rentalDetailsForm.value;
    };
    PropertyService.prototype.handleAddProperty = function (base64StringsArray) {
        this.propertyGallery = this.propertyGalleryForm.value;
        var finalData = {
            propertyDetails: this.propertyDetails,
            propertyGallery: base64StringsArray,
            rentalDetails: this.rentalDetails,
            landlordDetails: this.userService.handleGetUserData()
        };
        console.log("final data");
        console.log(finalData);
        // localStorage.setItem('finalData', JSON.stringify(finalData));
        return this.http.post(this.baseUrl + "/add", finalData);
    };
    PropertyService.prototype.handleGetProperties = function () {
        return this.http.get(this.baseUrl + "/get/all");
    };
    PropertyService.prototype.handleAddReview = function (review) {
        return this.http.post(this.baseUrl + "/review/add", review);
    };
    PropertyService.prototype.handleAddAppointment = function (appointment) {
        return this.http.post(this.baseUrl + "/appointment/add", appointment);
    };
    PropertyService.prototype.ngOnInit = function () { };
    PropertyService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PropertyService);
    return PropertyService;
}());
exports.PropertyService = PropertyService;
