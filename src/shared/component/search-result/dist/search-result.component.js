"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchResultComponent = void 0;
var core_1 = require("@angular/core");
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(propertyService, router, themeService, location) {
        this.propertyService = propertyService;
        this.router = router;
        this.themeService = themeService;
        this.location = location;
        this.propertiesData = {};
        this.filteredPropertiesData = {};
        this.activeFilters = {};
        this.currentBHK = '';
        this.currentType = '';
        this.currentAge = '';
        this.currentFurnishing = '';
        this.currentDirection = '';
        this.currentParking = '';
        this.filtersVisible = true;
        this.bhkTypes = [
            {
                value: '1_BHK',
                label: '1 BHK'
            },
            {
                value: '2_BHK',
                label: '2 BHK'
            },
            {
                value: '3_BHK',
                label: '3 BHK'
            },
            {
                value: '4_BHK',
                label: '4 BHK'
            },
            {
                value: '4_PLUS_BHK',
                label: '4+ BHK'
            },
        ];
        this.apartmentTypes = [
            'Gated Community Villa',
            'Independent House',
            'Apartment',
        ];
        this.propertyAges = [
            {
                value: 'less_than_1_year',
                label: 'Less than 1 year'
            },
            {
                value: '1_to_3_years',
                label: '1 to 3 years'
            },
            {
                value: '3_to_5_years',
                label: '3 to 5 years'
            },
            {
                value: 'more_than_5_years',
                label: 'More than 5 years'
            },
        ];
        this.furnishTypes = [
            {
                value: 'unfurnished',
                label: 'Unfurnished'
            },
            {
                value: 'semi_furnished',
                label: 'Semi-furnished'
            },
            {
                value: 'fully_furnished',
                label: 'Fully furnished'
            },
        ];
        this.parkingOptions = [
            {
                value: 'car',
                label: 'Car'
            },
            {
                value: 'bike',
                label: 'Bike'
            },
            {
                value: 'both',
                label: 'Both'
            },
            {
                value: 'none',
                label: 'None'
            },
        ];
        this.facingDirections = ['North', 'East', 'West', 'South'];
    }
    /**
     * @function Get properties data from history after using router.navigate
     * Slice() to duplicate propertiesData
     */
    SearchResultComponent.prototype.ngOnInit = function () {
        this.propertiesData = history.state.data;
        this.filteredPropertiesData = this.propertiesData.slice();
        console.log(this.propertiesData);
    };
    /**
     *
     * @param filterType Current filter type
     * @param value Filter's value in db
     */
    SearchResultComponent.prototype.applyFilter = function (filterType, value) {
        this.activeFilters[filterType] = value;
        this.updateFilteredProperties();
    };
    /**
     *
     * @param filterType Filter to be deleted on reclicking it
     */
    SearchResultComponent.prototype.removeFilter = function (filterType) {
        delete this.activeFilters[filterType];
        this.updateFilteredProperties();
    };
    /**
     * Iterates for every activate filters  , store sits current value (using label) and returns true for matching property Data
     * so We get only that value whic matches the filter value
     */
    SearchResultComponent.prototype.updateFilteredProperties = function () {
        var _this = this;
        this.filteredPropertiesData = this.propertiesData.filter(function (property) {
            return Object.keys(_this.activeFilters).every(function (activeFilter) {
                var value = _this.activeFilters[activeFilter];
                return (property.propertyDetails &&
                    property.propertyDetails[activeFilter] ===
                        value);
            });
        });
    };
    /**
     *
     * @param bhkType Current bhk type to add or delete
     */
    SearchResultComponent.prototype.handleBhkType = function (bhkType) {
        if (this.currentBHK === bhkType) {
            this.currentBHK = '';
        }
        else {
            this.currentBHK = bhkType;
        }
        if (this.activeFilters['bhkType'] === bhkType) {
            this.removeFilter('bhkType');
        }
        else {
            this.applyFilter('bhkType', bhkType);
        }
    };
    SearchResultComponent.prototype.handleApartmentType = function (apartmentType) {
        if (this.currentType === apartmentType) {
            this.currentType = '';
        }
        else {
            this.currentType = apartmentType;
        }
        if (this.activeFilters['apartmentType'] === apartmentType) {
            this.removeFilter('apartmentType');
        }
        else {
            this.applyFilter('apartmentType', apartmentType);
        }
    };
    SearchResultComponent.prototype.handlePropertyAge = function (propertyAge) {
        if (this.currentAge === propertyAge) {
            this.currentAge = '';
        }
        else {
            this.currentAge = propertyAge;
        }
        if (this.activeFilters['propertyAge'] === propertyAge) {
            this.removeFilter('propertyAge');
        }
        else {
            this.applyFilter('propertyAge', propertyAge);
        }
    };
    SearchResultComponent.prototype.handleFurnishTypes = function (furnishType) {
        if (this.currentFurnishing === furnishType) {
            this.currentFurnishing = '';
        }
        else {
            this.currentFurnishing = furnishType;
        }
        if (this.activeFilters['furnishing'] === furnishType) {
            this.removeFilter('furnishing');
        }
        else {
            this.applyFilter('furnishing', furnishType);
        }
    };
    SearchResultComponent.prototype.handleParkingOption = function (parkingOption) {
        if (this.currentParking === parkingOption) {
            this.currentParking = '';
        }
        else {
            this.currentParking = parkingOption;
        }
        if (this.activeFilters['parking'] === parkingOption) {
            this.removeFilter('parking');
        }
        else {
            this.applyFilter('parking', parkingOption);
        }
    };
    SearchResultComponent.prototype.handleFacingDirection = function (facingDirection) {
        if (this.currentDirection === facingDirection) {
            this.currentDirection = '';
        }
        else {
            this.currentDirection = facingDirection;
        }
        if (this.activeFilters['facingDirection'] === facingDirection) {
            this.removeFilter('facingDirection');
        }
        else {
            this.applyFilter('facingDirection', facingDirection);
        }
    };
    // handleOpenDetail(propertyData: Property) {
    //   this.router.navigate(['./details'], { state: { data: propertyData } });
    // }
    SearchResultComponent.prototype.handleNavigateBack = function () {
        // this.router.navigateBack();
        this.location.back();
    };
    SearchResultComponent = __decorate([
        core_1.Component({
            selector: 'app-search-result',
            templateUrl: './search-result.component.html',
            styleUrls: ['./search-result.component.scss']
        })
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
