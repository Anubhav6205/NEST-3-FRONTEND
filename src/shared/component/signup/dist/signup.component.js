"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(fb, userService, dialogRef) {
        var _this = this;
        this.fb = fb;
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.profilePicture = '';
        this.showToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.imageAdded = false;
        this.passwordRegexValue = '';
        this.signupForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required]],
            firstName: ['', [forms_1.Validators.required]],
            lastName: ['', []],
            role: ['', [forms_1.Validators.required]],
            contactNumber: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(10),
                    forms_1.Validators.maxLength(10),
                ],
            ],
            profilePicture: ['', [forms_1.Validators.required]],
            contact: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(10),
                    forms_1.Validators.maxLength(10),
                ],
            ]
        });
        this.yourForm = this.fb.group({
            role: ['', forms_1.Validators.required]
        });
        this.signupForm.controls['password'].valueChanges.subscribe(function (response) {
            _this.passwordRegexValue = _this.regexPassword(response);
        });
    }
    SignupComponent.prototype.regexPassword = function (value) {
        var currentPassword = value;
        var currentPasswordRegexValue = '';
        if (!this.hasNumber(currentPassword)) {
            if (currentPasswordRegexValue.length > 0) {
                currentPasswordRegexValue += ', ';
            }
            currentPasswordRegexValue += 'a number';
        }
        if (!this.hasUppercaseAlpha(currentPassword)) {
            if (currentPasswordRegexValue.length > 0) {
                currentPasswordRegexValue += ', ';
            }
            currentPasswordRegexValue += 'a uppercase alphabet';
        }
        if (!this.hasLowercaseAlpha(currentPassword)) {
            if (currentPasswordRegexValue.length > 0) {
                currentPasswordRegexValue += ', ';
            }
            currentPasswordRegexValue += 'a lowercase alphabet';
        }
        if (!this.hasEightLetter(currentPassword)) {
            if (currentPasswordRegexValue.length > 0) {
                currentPasswordRegexValue += ', ';
            }
            currentPasswordRegexValue += 'minimum 8 letters';
        }
        if (currentPasswordRegexValue === '') {
            currentPasswordRegexValue = 'Great!';
        }
        else {
            currentPasswordRegexValue = 'Add ' + currentPasswordRegexValue;
        }
        return currentPasswordRegexValue;
    };
    SignupComponent.prototype.hasNumber = function (password) {
        return /[0-9]/.test(password);
    };
    SignupComponent.prototype.hasUppercaseAlpha = function (password) {
        return /[A-Z]/.test(password);
    };
    SignupComponent.prototype.hasLowercaseAlpha = function (password) {
        return /[a-z]/.test(password);
    };
    SignupComponent.prototype.hasEightLetter = function (password) {
        return password.length >= 8;
    };
    /**
     * @function Converts path event to base64
     * @param event Event from input file
     */
    SignupComponent.prototype.handleImageToBase64 = function (event) {
        var _this = this;
        this.imageAdded = true;
        var image = event === null || event === void 0 ? void 0 : event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
            _this.profilePicture = reader.result;
        };
    };
    /**
     * @function Creates a user object with form , checks for empty credentials then calls the userSignup function
     */
    SignupComponent.prototype.handleUserSignup = function () {
        var _this = this;
        var user = {
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
            firstName: this.signupForm.value.firstName,
            lastName: this.signupForm.value.lastName,
            role: this.signupForm.value.role,
            contactNumber: this.signupForm.value.contactNumber,
            profilePicture: this.profilePicture
        };
        console.log(this.signupForm);
        user.email = user.email.toLowerCase();
        if (this.checkEmpty(user)) {
            this.toastMessage = "Fill all credentials to continue";
            this.headerMessage = 'Hey?!';
            this.showAndHideToast();
        }
        else {
            var name = user.firstName;
            this.userService
                .handleUserSignup(user)
                .subscribe(function (response) {
                _this.userService.handleUserDataResponse(response);
            });
            this.toastMessage = "Welcome! " + name;
            this.headerMessage = 'Start building your Nest asap?';
            this.showAndHideToast();
            setTimeout(function () {
                _this.dialogRef.close(true);
            }, 2000);
        }
    };
    SignupComponent.prototype.checkEmpty = function (user) {
        return user.email === '';
    };
    /**
     * Toggle to hide and show toast
     */
    SignupComponent.prototype.showAndHideToast = function () {
        var _this = this;
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000);
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
