"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardPropertyComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var landlord_details_component_1 = require("../landlord-details/landlord-details.component");
var login_component_1 = require("../login/login.component");
var CardPropertyComponent = /** @class */ (function () {
    function CardPropertyComponent(router, dialog, userService) {
        this.router = router;
        this.dialog = dialog;
        this.userService = userService;
        this.propertyData = {};
        this.currentImage = '';
        this.currentIndex = 0;
        this.showToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.currentUserId = '';
    }
    CardPropertyComponent.prototype.handlePrev = function () {
        if (this.propertyData && this.propertyData.propertyGallery) {
            this.currentIndex =
                (this.currentIndex - 1 + this.propertyData.propertyGallery.length) %
                    this.propertyData.propertyGallery.length;
        }
    };
    CardPropertyComponent.prototype.handleNext = function () {
        if (this.propertyData && this.propertyData.propertyGallery) {
            this.currentIndex =
                (this.currentIndex + 1) % this.propertyData.propertyGallery.length;
        }
    };
    CardPropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.propertyData && this.propertyData.propertyGallery) {
            this.currentImage = this.propertyData.propertyGallery[this.currentIndex];
        }
        this.userService.handleGetUserData().subscribe(function (response) {
            if (response && response.id) {
                _this.currentUserId = response.id;
            }
        }, function (error) {
            console.error("Error fetching user data:", error);
        });
    };
    CardPropertyComponent.prototype.handleGetOwnerDetails = function () {
        var _this = this;
        if (this.userService.userExists === false) {
            this.toastMessage = "Login to access Landlord Details.";
            this.headerMessage = 'Hey?!';
            this.showAndHideToast();
            setTimeout(function () {
                _this.openDialog('login');
            }, 2000);
        }
        else {
            var landlordDetails = this.propertyData.landlordDetails;
            var dialogConfig = new dialog_1.MatDialogConfig();
            dialogConfig.data = { landlordDetails: landlordDetails };
            this.dialog.open(landlord_details_component_1.LandlordDetailsComponent, dialogConfig);
        }
    };
    CardPropertyComponent.prototype.handleGetBhkType = function (bhkType) {
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
    CardPropertyComponent.prototype.handleOpenDetail = function () {
        this.router.navigate(['./details'], { state: { data: this.propertyData } });
    };
    CardPropertyComponent.prototype.handleParking = function (parkingType) {
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
    CardPropertyComponent.prototype.handleFurnishing = function (furnishingType) {
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
    CardPropertyComponent.prototype.handlePropertyAge = function (ageType) {
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
    CardPropertyComponent.prototype.showAndHideToast = function () {
        var _this = this;
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000); // Hide the toast after 3 seconds
    };
    CardPropertyComponent.prototype.openDialog = function (action) {
        console.log('dialog triggered in navbar');
        console.log(action);
        this.dialog.open(login_component_1.LoginComponent);
    };
    CardPropertyComponent.prototype.handleChat = function () {
        var _this = this;
        var _a, _b, _c, _d;
        if (this.userService.userExists === false) {
            this.toastMessage = "Login before you start a conversation.";
            this.headerMessage = 'Hey?!';
            this.showAndHideToast();
            setTimeout(function () {
                _this.openDialog('login');
            }, 2000);
        }
        else {
            // const chat: Chat = {
            //   personAId: this.currentUserId!,
            //   personBId: this.propertyData.landlordDetails?.id!,
            // };
            var recieverName = ((_a = this.propertyData.landlordDetails) === null || _a === void 0 ? void 0 : _a.firstName) +
                ' ' + ((_b = this.propertyData.landlordDetails) === null || _b === void 0 ? void 0 : _b.lastName);
            var recieverImage = (_c = this.propertyData.landlordDetails) === null || _c === void 0 ? void 0 : _c.profilePicture;
            console.log(this.userService.handleGetUserData());
            this.router.navigate(['chat'], {
                state: {
                    data: [
                        (_d = this.propertyData.landlordDetails) === null || _d === void 0 ? void 0 : _d.id,
                        this.currentUserId,
                        recieverName,
                        recieverImage,
                    ]
                }
            });
        }
    };
    __decorate([
        core_1.Input()
    ], CardPropertyComponent.prototype, "propertyData");
    CardPropertyComponent = __decorate([
        core_1.Component({
            selector: 'app-card-property',
            templateUrl: './card-property.component.html',
            styleUrls: ['./card-property.component.scss']
        })
    ], CardPropertyComponent);
    return CardPropertyComponent;
}());
exports.CardPropertyComponent = CardPropertyComponent;
