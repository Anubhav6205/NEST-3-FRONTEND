"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetailsComponent = void 0;
var core_1 = require("@angular/core");
var landlord_details_component_1 = require("../../component/landlord-details/landlord-details.component");
var dialog_1 = require("@angular/material/dialog");
var appointment_component_1 = require("../../component/appointment/appointment.component");
var login_component_1 = require("../../component/login/login.component");
var slideIn_1 = require("src/shared/animation/slideIn");
var DetailsComponent = /** @class */ (function () {
    function DetailsComponent(route, fb, propertyService, dialog, userService, chatServce, navigateRoute, themeService, location, router) {
        var _this = this;
        this.route = route;
        this.fb = fb;
        this.propertyService = propertyService;
        this.dialog = dialog;
        this.userService = userService;
        this.chatServce = chatServce;
        this.navigateRoute = navigateRoute;
        this.themeService = themeService;
        this.location = location;
        this.router = router;
        this.routeAnimation = true;
        this.propertyData = {};
        this.reviews = [];
        this.currentIndex = 0;
        this.currentImage = '';
        this.isTransitioning = false;
        this.showToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.userData = {};
        this.reviewForm = this.fb.group({
            review: ['']
        });
        this.userService.handleGetUserData().subscribe(function (response) {
            _this.userData = response;
            console.log("current user is");
            console.log(_this.userData);
        });
    }
    DetailsComponent.prototype.ngOnInit = function () {
        this.propertyData = history.state.data;
        this.currentImage = this.propertyData.propertyGallery[this.currentIndex];
        console.log(this.propertyData);
        console.log('before reviews');
        //CHecking if reviews is array before assinging values
        if (Array.isArray(this.propertyData.reviews)) {
            this.reviews = this.propertyData.reviews;
            console.log(this.reviews);
            console.log('are reviews');
        }
        this.startAutomaticSlideShow();
        // this.propertyData=this.route.snapshot.state.data;
    };
    DetailsComponent.prototype.handlePrev = function () {
        var _this = this;
        this.isTransitioning = true;
        this.currentImage = this.propertyData.propertyGallery[this.currentIndex];
        setTimeout(function () {
            _this.isTransitioning = false;
            _this.currentIndex =
                (_this.currentIndex - 1 + _this.propertyData.propertyGallery.length) %
                    _this.propertyData.propertyGallery.length;
            _this.currentImage = _this.propertyData.propertyGallery[_this.currentIndex];
        }, 500); // Adjust the delay as needed
    };
    DetailsComponent.prototype.startAutomaticSlideShow = function () {
        var _this = this;
        setInterval(function () {
            _this.handleNext();
        }, 4000);
    };
    DetailsComponent.prototype.handleNext = function () {
        var _this = this;
        this.isTransitioning = true;
        this.currentImage = this.propertyData.propertyGallery[this.currentIndex];
        setTimeout(function () {
            _this.isTransitioning = false;
            _this.currentIndex =
                (_this.currentIndex + 1) % _this.propertyData.propertyGallery.length;
            _this.currentImage = _this.propertyData.propertyGallery[_this.currentIndex];
        }, 500);
    };
    DetailsComponent.prototype.handleReviewSubmit = function () {
        var _this = this;
        var _a, _b;
        if (this.userService.userExists === false) {
            this.toastMessage = "Login to add review.";
            this.headerMessage = 'What?!';
            this.showAndHideToast();
            setTimeout(function () {
                _this.openDialog('login');
            }, 2000);
        }
        else {
            this.toastMessage = "Review Submitted.";
            this.headerMessage = 'Great!';
            this.showAndHideToast();
            var currentUser = this.userData;
            var review = {
                review: this.reviewForm.value.review,
                property: (_a = this.propertyData.id) !== null && _a !== void 0 ? _a : '',
                userId: (_b = currentUser.id) !== null && _b !== void 0 ? _b : ''
            };
            console.log(review);
            console.log("is review");
            console.log(this.propertyData);
            console.log("is property data ");
            this.propertyService.handleAddReview(review).subscribe(function (response) {
                console.log('is reponse to review');
                console.log(response);
                setTimeout(function () {
                    _this.router.navigate(['']);
                }, 2000);
            });
        }
        this.reviewForm.setValue({
            review: ''
        });
        setTimeout(function () {
            // this.navigateRoute.navigate([''])
        }, 2000);
    };
    DetailsComponent.prototype.handleGetOwnerDetails = function () {
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
            //Condig a dialog
            var dialogConfig = new dialog_1.MatDialogConfig();
            dialogConfig.data = { landlordDetails: landlordDetails };
            this.dialog.open(landlord_details_component_1.LandlordDetailsComponent, dialogConfig);
        }
    };
    DetailsComponent.prototype.handleScheduleAppointment = function () {
        var _this = this;
        if (this.userService.userExists === false) {
            this.toastMessage = "Login to schedule appointment.";
            this.headerMessage = 'What?!';
            this.showAndHideToast();
            setTimeout(function () {
                _this.openDialog('login');
            }, 2000);
        }
        else {
            var propertyDetails = this.propertyData;
            var dialogConfig = new dialog_1.MatDialogConfig();
            dialogConfig.data = { propertyDetails: propertyDetails };
            console.log(propertyDetails);
            this.dialog.open(appointment_component_1.AppointmentComponent, dialogConfig);
        }
    };
    DetailsComponent.prototype.handleGetBhkType = function (bhkType) {
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
    DetailsComponent.prototype.handleParking = function (parkingType) {
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
    DetailsComponent.prototype.handleFurnishing = function (furnishingType) {
        if (!furnishingType) {
            return 'Unfurnished';
        }
        var lowercaseFurnishingType = furnishingType.toLowerCase();
        switch (lowercaseFurnishingType) {
            case 'unfurnished':
                return 'Unfurnished';
            case 'semi-furnished':
                return 'Semi-furnished';
            case 'fully furnished':
                return 'Fully furnished';
            default:
                return 'Unfurnished';
        }
    };
    DetailsComponent.prototype.showAndHideToast = function () {
        var _this = this;
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000); // Hide the toast after 3 seconds
    };
    DetailsComponent.prototype.handlePropertyAge = function (ageType) {
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
    DetailsComponent.prototype.handleNavigateBack = function () {
        // this.router.navigateBack();
        this.location.back();
    };
    DetailsComponent.prototype.handleRent = function (rent) {
        if (rent === null) {
            return 'Rent not available';
        }
        var rentAmount = parseInt(rent, 10);
        if (!isNaN(rentAmount)) {
            if (rentAmount >= 100000) {
                var rentInLakhs = rentAmount / 100000;
                return rentInLakhs.toFixed(0) + " L";
            }
            else {
                var rentInThousands = rentAmount / 1000;
                return rentInThousands.toFixed(0) + " K";
            }
        }
        else {
            return 'Invalid rent format';
        }
    };
    DetailsComponent.prototype.scrollToReviewsSection = function () {
        var _this = this;
        if (this.userService.userExists === false) {
            this.toastMessage = "Login to add review.";
            this.headerMessage = 'What?!';
            this.showAndHideToast();
            setTimeout(function () {
                _this.openDialog('login');
            }, 2000);
        }
        else if (this.reviewsSection) {
            this.reviewsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    DetailsComponent.prototype.openDialog = function (action) {
        console.log('dialog triggered in navbar');
        console.log(action);
        this.dialog.open(login_component_1.LoginComponent);
    };
    DetailsComponent.prototype.handleChat = function () {
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
            //   personAId: this.userData.id!,
            //   personBId: this.propertyData.landlordDetails?.id!,
            // };
            var recieverName = ((_a = this.propertyData.landlordDetails) === null || _a === void 0 ? void 0 : _a.firstName) +
                ' ' + ((_b = this.propertyData.landlordDetails) === null || _b === void 0 ? void 0 : _b.lastName);
            var recieverImage = (_c = this.propertyData.landlordDetails) === null || _c === void 0 ? void 0 : _c.profilePicture;
            console.log(this.userService.handleGetUserData());
            this.navigateRoute.navigate(['chat'], {
                state: {
                    data: [
                        (_d = this.propertyData.landlordDetails) === null || _d === void 0 ? void 0 : _d.id,
                        this.userData.id,
                        recieverName,
                        recieverImage,
                    ]
                }
            });
        }
    };
    DetailsComponent.prototype.handleBuyClick = function () {
        var _a, _b, _c, _d;
        console.log("Expected rent:");
        console.log((_a = this.propertyData.rentalDetails) === null || _a === void 0 ? void 0 : _a.expectedRent);
        var rent = parseInt((_d = (_c = (_b = this.propertyData.rentalDetails) === null || _b === void 0 ? void 0 : _b.expectedRent) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '') * 100;
        var RozarpayOptions = {
            description: 'RazorPay integration',
            currency: 'INR',
            amount: rent,
            name: this.userData.firstName + " " + this.userData.lastName,
            key: 'rzp_test_eCDOgM8X9KyW2g',
            image: 'https://avatars.githubusercontent.com/u/7713209?s=280&v=4',
            prefill: {
                name: 'Anubhav Gupta',
                email: 'anubhavgupta@gmail.oom',
                phone: '987654321'
            },
            theme: {
                color: '#6466e3'
            },
            modal: {
                ondismiss: function () {
                    console.log('dismissed');
                }
            }
        };
        var successCallback = function (paymentid) {
            console.log(paymentid);
        };
        var failureCallback = function (e) {
            console.log(e);
        };
        Razorpay.open(RozarpayOptions, successCallback, failureCallback);
    };
    __decorate([
        core_1.HostBinding('@routeAnimationTrigger')
    ], DetailsComponent.prototype, "routeAnimation");
    __decorate([
        core_1.ViewChild('reviewsSection')
    ], DetailsComponent.prototype, "reviewsSection");
    DetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-details',
            templateUrl: './details.component.html',
            styleUrls: ['./details.component.scss'],
            animations: [
                slideIn_1.routeAnimationState
            ]
        })
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
