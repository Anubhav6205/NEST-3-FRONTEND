"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardLandlordPropertyComponent = void 0;
var core_1 = require("@angular/core");
var CardLandlordPropertyComponent = /** @class */ (function () {
    function CardLandlordPropertyComponent(themeService) {
        this.themeService = themeService;
        this.property = {};
        this.currentImage = '';
        this.currentIndex = 0;
    }
    CardLandlordPropertyComponent.prototype.handleGetBhkType = function (bhkType) {
        switch (bhkType) {
            case '1_BHK':
                return '1 BHK';
            case '2_BHK':
                return '2 BHK';
            case '3_BHK':
                return '3 BHK';
            case '4_BHK':
                return '4 BHK';
            case '4plus_BHK':
                return '4+ BHK';
            default:
                return 'Unknown BHK Type';
        }
    };
    CardLandlordPropertyComponent.prototype.handleParking = function (parkingType) {
        if (!parkingType) {
            return 'Not available';
        }
        switch (parkingType.toLowerCase()) {
            case 'both':
                return 'Car and Bike';
            case 'car':
                return 'Only Car';
            case 'bike':
                return 'Only Bike';
            default:
                return 'Not available';
        }
    };
    CardLandlordPropertyComponent.prototype.handlePropertyAge = function (ageType) {
        if (!ageType) {
            return 'Not available';
        }
        var lowercaseAgeType = ageType.toLowerCase();
        switch (lowercaseAgeType) {
            case '1_to_3_years':
                return '1 to 3 years';
            case 'less_than_1_year':
                return 'Less than 1 year';
            case '3_to_5_years':
                return '3 to 5 years';
            case 'more_than_5_years':
                return 'More than 5 years';
            default:
                return 'Not available';
        }
    };
    CardLandlordPropertyComponent.prototype.handleFurnishing = function (furnishingType) {
        if (!furnishingType) {
            return 'Not available';
        }
        var lowercaseFurnishingType = furnishingType.toLowerCase();
        switch (lowercaseFurnishingType) {
            case 'unfurnished':
                return 'Unfurnished';
            case 'semi furnished':
                return 'Semi-furnished';
            case 'fully furnished':
                return 'Fully furnished';
            default:
                return 'Not available';
        }
    };
    CardLandlordPropertyComponent.prototype.handlePrev = function () {
        if (this.property && this.property.propertyGallery && this.property.propertyGallery.length > 0) {
            this.currentIndex =
                (this.currentIndex - 1 + this.property.propertyGallery.length) %
                    this.property.propertyGallery.length;
        }
        else {
            console.error('Invalid property or propertyGallery.');
        }
    };
    CardLandlordPropertyComponent.prototype.handleNext = function () {
        if (this.property && this.property.propertyGallery && this.property.propertyGallery.length > 0) {
            this.currentIndex =
                (this.currentIndex + 1) % this.property.propertyGallery.length;
        }
        else {
            console.error('Invalid property or propertyGallery.');
        }
    };
    __decorate([
        core_1.Input()
    ], CardLandlordPropertyComponent.prototype, "property");
    CardLandlordPropertyComponent = __decorate([
        core_1.Component({
            selector: 'app-card-landlord-property',
            templateUrl: './card-landlord-property.component.html',
            styleUrls: ['./card-landlord-property.component.scss']
        })
    ], CardLandlordPropertyComponent);
    return CardLandlordPropertyComponent;
}());
exports.CardLandlordPropertyComponent = CardLandlordPropertyComponent;
