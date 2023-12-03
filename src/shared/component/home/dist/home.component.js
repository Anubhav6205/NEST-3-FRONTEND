"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var AOS = require("aos");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(dialog, router, propertyService, fb, userService) {
        this.dialog = dialog;
        this.router = router;
        this.propertyService = propertyService;
        this.fb = fb;
        this.userService = userService;
        this.showToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.userPresent = false;
        this.locations = [
            'Hyderabad',
            'Bangalore',
            'Pune',
            'Ranchi',
            'Delhi',
            'Goa',
            'Kolkata',
            'Bhubaneshwar',
        ];
        this.propertiesData = {};
        this.searchPropertyForm = this.fb.group({
            city: [''],
            locality: ['']
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.handleGetProperties();
        AOS.init();
    };
    // openDialog(action :String)
    // {
    //   console.log("dialog triggered in navbar");
    //   if(action==='login')
    //   {
    //     const dialogRef=this.dialog.open(LoginComponent);
    //   }
    //   else
    //   {
    //     const dialogRef=this.dialog.open(SignupComponent);
    //   }
    // }
    HomeComponent.prototype.handlePropertyAdd = function () {
        this.router.navigate(['enlistProperty']);
    };
    HomeComponent.prototype.handleSearchProperty = function () {
        var city = this.searchPropertyForm.value.city;
        var locality = this.searchPropertyForm.value.locality.toLowerCase();
        var localityArray = locality.split(',');
        if (city === '') {
            this.toastMessage = "Select a City.";
            this.headerMessage = "Which City are you Searching for?";
            this.showAndHideToast();
            return;
        }
        if (locality === '') {
            this.toastMessage = "Add a few locality names.";
            this.headerMessage = "Unlock Locality Potential: Name it!";
            this.showAndHideToast();
            return;
        }
        var filteredPropertiesData = this.propertiesData.filter(function (property) {
            var _a, _b, _c, _d;
            return ((_b = (_a = property.propertyDetails) === null || _a === void 0 ? void 0 : _a.city) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === city.toLowerCase() &&
                localityArray.includes((_d = (_c = property.propertyDetails) === null || _c === void 0 ? void 0 : _c.locality) === null || _d === void 0 ? void 0 : _d.toLowerCase());
        });
        this.propertiesData = filteredPropertiesData;
        this.router.navigate(['./search'], {
            state: { data: this.propertiesData }
        });
    };
    HomeComponent.prototype.handleGetProperties = function () {
        var _this = this;
        this.propertyService.handleGetProperties().subscribe(function (response) {
            _this.propertiesData = response.properties;
            // console.log(this.propertiesData);
            // console.log("is complete property data from backend");
        });
    };
    HomeComponent.prototype.showAndHideToast = function () {
        var _this = this;
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
