"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var login_component_1 = require("../login/login.component");
var signup_component_1 = require("../signup/signup.component");
var core_2 = require("@angular/core");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(dialog, userService, router) {
        this.dialog = dialog;
        this.userService = userService;
        this.router = router;
        this.role = '';
        this.profilePicture = '../../../assets/profile.png';
        this.userExists = false;
        this.showToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.userData = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            role: '',
            contactNumber: '',
            profilePicture: ''
        };
        this.options = [
            { value: 'profile', label: 'Profile' },
            { value: 'appointments', label: 'Appointments' },
            { value: 'properties', label: 'Properties' },
            { value: 'logout', label: 'Log Out' },
        ];
    }
    NavbarComponent.prototype.ngOnInit = function () {
        // this.role=this.userService.handleGetRole();
        var _this = this;
        this.userService.userDataObservable.subscribe(function (response) {
            _this.userData = response;
            if (_this.userData.id != '') {
                _this.userExists = true;
            }
            if (_this.userData.profilePicture != '' && _this.userData.profilePicture != null) {
                _this.profilePicture = _this.userData.profilePicture;
            }
            _this.role = response.role;
            console.log('user data changed in service');
            console.log(_this.userData);
            _this.userService.handleSetUserData(_this.userData);
        });
    };
    NavbarComponent.prototype.openDialog = function (action) {
        var _this = this;
        console.log('dialog triggered in navbar');
        if (action === 'login') {
            var dialogRef = this.dialog.open(login_component_1.LoginComponent);
            dialogRef.afterClosed().subscribe(function (response) {
                console.log(response);
                console.log('4 here');
                if (response != undefined) {
                    _this.userExists = response;
                }
            });
        }
        else {
            var dialogRef = this.dialog.open(signup_component_1.SignupComponent);
        }
    };
    NavbarComponent.prototype.handleLogout = function () {
        this.userData = {};
        this.role = '';
        console.log('1 here');
        this.userExists = false;
        localStorage.removeItem('userData');
        this.userData = {};
        console.log(this.userData.id);
        console.log("is id");
        this.router.navigate(['']);
    };
    NavbarComponent.prototype.handleNavigateToOption = function (selectedOption) {
        var _this = this;
        switch (selectedOption) {
            case 'appointments':
                if (this.userData.id === '' || this.userData.id === undefined) {
                    this.toastMessage = "Login to access your appointments.";
                    this.headerMessage = "Hey?!";
                    this.showAndHideToast();
                    setTimeout(function () {
                        _this.openDialog('login');
                    }, 2000);
                }
                else {
                    this.router.navigate(['/appointments']);
                }
                break;
            case 'properties':
                this.router.navigate(['/properties']);
                break;
            case '3':
                this.router.navigate(['/designer', '3']);
                break;
            case 'profile':
                if (this.userData.id === '' || this.userData.id === undefined) {
                    this.toastMessage = "Login to access your profile.";
                    this.headerMessage = "Hey?!";
                    this.showAndHideToast();
                    setTimeout(function () {
                        _this.openDialog('login');
                    }, 2000);
                }
                else {
                    this.router.navigate(['/profile'], {
                        state: { data: this.userData }
                    });
                }
                break;
            case 'home':
                this.router.navigate(['']);
                break;
            case 'logout':
                this.handleLogout();
                break;
            default:
                break;
        }
    };
    NavbarComponent.prototype.shouldShowOption = function (option) {
        // Add your logic to determine if the option should be shown based on the user's role
        if (option.value === 'properties' && this.role !== 'landlord') {
            return false; // Do not show the 'Properties' option if the user is not a landlord
        }
        if (option.value === 'logout' && this.userExists === false) {
            return false;
        }
        return true; // Show all other options
    };
    NavbarComponent.prototype.showAndHideToast = function () {
        var _this = this;
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000); // Hide the toast after 3 seconds
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss'],
            encapsulation: core_2.ViewEncapsulation.None
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
