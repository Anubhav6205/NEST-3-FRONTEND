"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListAppointmentsComponent = void 0;
var core_1 = require("@angular/core");
var slideIn_1 = require("src/shared/animation/slideIn");
var ListAppointmentsComponent = /** @class */ (function () {
    function ListAppointmentsComponent(userService, themeService, location) {
        this.userService = userService;
        this.themeService = themeService;
        this.location = location;
        this.routeAnimation = true;
        this.appointmentData = [];
        this.userData = {};
        this.appointmentsPresent = false;
    }
    ListAppointmentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.handleGetUserData().subscribe(function (response) {
            _this.userData = response;
            _this.handleGetAppointmentDetails();
        });
    };
    ListAppointmentsComponent.prototype.handleGetAppointmentDetails = function () {
        var _this = this;
        var appointmentDataIds = this.userData.appointmentDetails;
        console.log('getting user data ');
        console.log(appointmentDataIds);
        if (appointmentDataIds != null) {
            this.appointmentsPresent = true;
            for (var _i = 0, appointmentDataIds_1 = appointmentDataIds; _i < appointmentDataIds_1.length; _i++) {
                var appointmentDataId = appointmentDataIds_1[_i];
                this.userService
                    .handleConvertAppointmentIds(appointmentDataId)
                    .subscribe(function (response) {
                    console.log('in subs');
                    if (response) {
                        console.log('Response inside subscription:', response.appointmnent);
                        console.log(response.appointmnent.isUser);
                        var appointment = {
                            isUser: response.appointmnent.isUser,
                            propertyDetails: response.appointmnent.propertyDetails,
                            landlordDetails: response.appointmnent.landlordDetails,
                            userDetails: response.appointmnent.userDetails,
                            time: response.appointmnent.time
                        };
                        _this.appointmentData.push(appointment);
                        // console.log(appointment);
                        // console.log('is converted appointments');
                        // console.log(appointment.isUser);
                    }
                });
            }
        }
    };
    ListAppointmentsComponent.prototype.handleNavigateBack = function () {
        // this.router.navigateBack();
        this.location.back();
    };
    __decorate([
        core_1.HostBinding('@routeAnimationTrigger')
    ], ListAppointmentsComponent.prototype, "routeAnimation");
    ListAppointmentsComponent = __decorate([
        core_1.Component({
            selector: 'app-list-appointments',
            templateUrl: './list-appointments.component.html',
            styleUrls: ['./list-appointments.component.scss'],
            animations: [
                slideIn_1.routeAnimationState
            ]
        })
    ], ListAppointmentsComponent);
    return ListAppointmentsComponent;
}());
exports.ListAppointmentsComponent = ListAppointmentsComponent;
