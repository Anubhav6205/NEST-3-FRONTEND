"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var signup_component_1 = require("../signup/signup.component");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, userService, dialogRef, dialog) {
        this.fb = fb;
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.showToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.rememberMe = false;
        this.loginForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required]],
            firstName: '',
            lastName: '',
            role: '',
            contact: ''
        });
    }
    /**
     * @function Creates a User object with email and password ,data is sent to backend to authorise and authenticate user
     *
     */
    LoginComponent.prototype.handleUserLogin = function () {
        var _this = this;
        console.log(this.loginForm);
        var user = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };
        user.email = user.email.toLowerCase();
        this.userService.handleUserLogin(user).subscribe(function (response) {
            var status = response.status;
            console.log("user data after logging in ");
            console.log(response);
            if (status === 'true') {
                console.log("setting in local");
                var name = response.userData.firstName;
                _this.toastMessage = "Hey! " + name;
                _this.headerMessage = "Built your Nest yet?";
                _this.showAndHideToast();
                localStorage.setItem('userData', response.userData);
                setTimeout(function () {
                    _this.dialogRef.close(true);
                }, 2000);
            }
            else {
                console.log("status false");
                _this.toastMessage = "Wrong Credentials";
                _this.headerMessage = "Damn!";
                _this.showAndHideToast();
            }
            _this.userService.handleUserDataResponse(response);
            if (_this.rememberMe === false) {
                localStorage.removeItem('userData');
            }
        });
    };
    /**
     * @function Helps to track user data being stored in local storage or not
     */
    LoginComponent.prototype.toggleRememberMe = function () {
        this.rememberMe = !this.rememberMe;
    };
    LoginComponent.prototype.showAndHideToast = function () {
        var _this = this;
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000);
    };
    /**
     * @function Closes current dialog and opens signup dialog
     */
    LoginComponent.prototype.handleSignup = function () {
        this.dialogRef.close();
        this.dialog.open(signup_component_1.SignupComponent);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
