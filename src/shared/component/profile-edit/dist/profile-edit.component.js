"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ProfileEditComponent = /** @class */ (function () {
    function ProfileEditComponent(route, fb, userService, pageRoute, themeService, location) {
        this.route = route;
        this.fb = fb;
        this.userService = userService;
        this.pageRoute = pageRoute;
        this.themeService = themeService;
        this.location = location;
        this.userData = {};
        this.showToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.userData = history.state.data;
        console.log(this.userData.firstName);
        this.profileForm = this.fb.group({
            contactNumber: [this.userData.contactNumber, forms_1.Validators.required],
            email: [this.userData.email, [forms_1.Validators.required, forms_1.Validators.email]],
            firstName: [this.userData.firstName, forms_1.Validators.required],
            lastName: [this.userData.lastName, forms_1.Validators.required],
            role: [this.userData.role, forms_1.Validators.required]
        });
    }
    /**
     * @function Creates a object of updated user and then hit a post request to backend with updated user to update DB .
     */
    ProfileEditComponent.prototype.handleUpdateUserData = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        this.toastMessage = "Your Data Updated Successfully!";
        this.headerMessage = 'Congrats!';
        this.showAndHideToast();
        var updatedUser = {
            contactNumber: (_a = this.profileForm.get('contactNumber')) === null || _a === void 0 ? void 0 : _a.value,
            email: (_b = this.profileForm.get('email')) === null || _b === void 0 ? void 0 : _b.value,
            firstName: (_c = this.profileForm.get('firstName')) === null || _c === void 0 ? void 0 : _c.value,
            lastName: (_d = this.profileForm.get('lastName')) === null || _d === void 0 ? void 0 : _d.value,
            role: (_e = this.profileForm.get('role')) === null || _e === void 0 ? void 0 : _e.value,
            appointmentDetails: this.userData.appointmentDetails,
            password: this.userData.password,
            id: this.userData.id
        };
        this.userService.handleUserUpdate(updatedUser).subscribe(function (response) {
            console.log('User is updated');
            setTimeout(function () {
                _this.pageRoute.navigate(['']);
            }, 2000);
        });
    };
    ProfileEditComponent.prototype.showAndHideToast = function () {
        var _this = this;
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000);
    };
    ProfileEditComponent.prototype.handleNavigateBack = function () {
        // this.router.navigateBack();
        this.location.back();
    };
    ProfileEditComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-edit',
            templateUrl: './profile-edit.component.html',
            styleUrls: ['./profile-edit.component.scss']
        })
    ], ProfileEditComponent);
    return ProfileEditComponent;
}());
exports.ProfileEditComponent = ProfileEditComponent;
