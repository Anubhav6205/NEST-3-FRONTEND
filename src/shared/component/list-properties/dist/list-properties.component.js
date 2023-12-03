"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListPropertiesComponent = void 0;
var core_1 = require("@angular/core");
var ListPropertiesComponent = /** @class */ (function () {
    function ListPropertiesComponent(userService, themeService, location) {
        this.userService = userService;
        this.themeService = themeService;
        this.location = location;
        this.landlordProperties = [];
    }
    /**
     * Sends current user as parameter and gets its properties Details
     */
    ListPropertiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('before properties getting');
        this.userService.handleGetUserData().subscribe(function (response) {
            _this.landlordProperties = response.propertiesDetails;
            console.log(_this.landlordProperties);
            console.log('gettig user properties');
        });
        // this.currentImage = this.landlordProperties.propertyGallery![this.currentIndex];
        // this.userService.handleGetUserData().subscribe((response:User)=>{
        //   this.currentUserId=response.id!;
        // })
    };
    ListPropertiesComponent.prototype.handleNavigateBack = function () {
        // this.router.navigateBack();
        this.location.back();
    };
    ListPropertiesComponent = __decorate([
        core_1.Component({
            selector: 'app-list-properties',
            templateUrl: './list-properties.component.html',
            styleUrls: ['./list-properties.component.scss']
        })
    ], ListPropertiesComponent);
    return ListPropertiesComponent;
}());
exports.ListPropertiesComponent = ListPropertiesComponent;
