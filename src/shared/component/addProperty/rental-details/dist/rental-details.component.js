"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RentalDetailsComponent = void 0;
var core_1 = require("@angular/core");
var RentalDetailsComponent = /** @class */ (function () {
    function RentalDetailsComponent(propertyService, router) {
        this.propertyService = propertyService;
        this.router = router;
        this.furnishTypes = [
            {
                value: "unfurnished",
                label: "Unfurnished"
            },
            {
                value: "semi_furnished",
                label: "Semi-furnished"
            },
            {
                value: "fully_furnished",
                label: "Fully furnished"
            },
        ];
        this.parkingOptions = [
            {
                value: "car",
                label: "Car"
            },
            {
                value: "bike",
                label: "Bike"
            },
            {
                value: "both",
                label: "Both"
            },
            {
                value: "none",
                label: "None"
            },
        ];
    }
    RentalDetailsComponent.prototype.ngOnInit = function () { };
    RentalDetailsComponent.prototype.handleRouteToGallery = function () {
        this.propertyService.handleAddRentalDetails();
        this.router.navigate(['./enlistProperty/gallery']);
    };
    RentalDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-rental-details',
            templateUrl: './rental-details.component.html',
            styleUrls: ['./rental-details.component.scss']
        })
    ], RentalDetailsComponent);
    return RentalDetailsComponent;
}());
exports.RentalDetailsComponent = RentalDetailsComponent;
