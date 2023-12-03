"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PropertyDetailsComponent = void 0;
var core_1 = require("@angular/core");
var PropertyDetailsComponent = /** @class */ (function () {
    function PropertyDetailsComponent(propertyService, router) {
        this.propertyService = propertyService;
        this.router = router;
        this.localities = [];
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
        this.bhkTypes = [
            {
                value: "1_BHK",
                label: "1 BHK"
            },
            {
                value: "2_BHK",
                label: "2 BHK"
            },
            {
                value: "3_BHK",
                label: "3 BHK"
            },
            {
                value: "4_BHK",
                label: "4 BHK"
            },
            {
                value: "4_PLUS_BHK",
                label: "4+ BHK"
            },
        ];
        this.apartmentTypes = ["Gated Community Villa", "Independent House", "Apartment"];
        this.floors = __spreadArrays(Array(100).keys()).map(function (i) { return i + 1; });
        this.propertyAges = [
            {
                value: "less_than_1_year",
                label: "Less than 1 year"
            },
            {
                value: "1_to_3_years",
                label: "1 to 3 years"
            },
            {
                value: "3_to_5_years",
                label: "3 to 5 years"
            },
            {
                value: "more_than_5_years",
                label: "More than 5 years"
            },
        ];
        this.facingDirections = ["North", "East", "West", "South"];
        this.handleGetLocalitiesForCity = function (city) {
            switch (city) {
                case 'Hyderabad':
                    return [
                        'Secunderabad',
                        'Kukatpally',
                        'Gachibowli',
                        'Banjara Hills',
                        'Ameerpet',
                    ];
                case 'Bangalore':
                    return [
                        'Whitefield',
                        'Koramangala',
                        'HSR Layout',
                        'Indiranagar',
                        'Electronic City',
                    ];
                case 'Pune':
                    return ['Kothrud', 'Hinjewadi', 'Kalyaninagar', 'Baner', 'Viman Nagar'];
                case 'Ranchi':
                    return ['Morabadi', 'Harmu', 'Bariatu', 'Hinoo', 'Church Road'];
                case 'Delhi':
                    return [
                        'Connaught Place',
                        'Karol Bagh',
                        'Rajouri Garden',
                        'Paharganj',
                        'South Extension',
                    ];
                case 'Goa':
                    return ['Panjim', 'Calangute', 'Baga', 'Anjuna', 'Palolem'];
                case 'Kolkata':
                    return ['Park Street', 'New Market', 'Salt Lake', 'Alipore', 'Howrah'];
                case 'Bhubaneshwar':
                    return [
                        'Nayapalli',
                        'Saheed Nagar',
                        'Patia',
                        'Khandagiri',
                        'Vani Vihar',
                    ];
                default:
                    return [];
            }
        };
    }
    PropertyDetailsComponent.prototype.ngOnInit = function () { };
    PropertyDetailsComponent.prototype.handleRouteToRental = function () {
        this.propertyService.handleAddPropertyDetails();
        this.router.navigate(['./enlistProperty/rental']);
    };
    PropertyDetailsComponent.prototype.handleLocalityChange = function (event) {
        var city = event.target.value;
        console.log(city);
        this.localities = this.handleGetLocalitiesForCity(city);
    };
    PropertyDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-property-details',
            templateUrl: './property-details.component.html',
            styleUrls: ['./property-details.component.scss']
        })
    ], PropertyDetailsComponent);
    return PropertyDetailsComponent;
}());
exports.PropertyDetailsComponent = PropertyDetailsComponent;
