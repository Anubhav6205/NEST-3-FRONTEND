"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppointmentComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var slideIn_1 = require("src/shared/animation/slideIn");
var AppointmentComponent = /** @class */ (function () {
    function AppointmentComponent(dialogRef, propertyService, userService, router, data) {
        this.dialogRef = dialogRef;
        this.propertyService = propertyService;
        this.userService = userService;
        this.router = router;
        this.data = data;
        this.routeAnimation = true;
        this.appointmentSchedule = [''];
        this.morningSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'];
        this.landlordDetails = {};
        this.userDetails = {};
        this.propertyDetails = {};
        this.activeTimeSlot = null;
        this.howToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.showToast = false;
        this.afternoonSlots = [
            '12:30 PM',
            '01:00 PM',
            '01:30 PM',
            '02:00 PM',
            '02:30 PM',
            '03:00 PM',
            '03:30 PM',
            '04:00 PM',
            '04:30 PM',
            '05:00 PM',
            '05:30 PM',
            '06:00 PM',
        ];
        this.eveningSlots = ['06:30 PM', '07:00 PM'];
        this.propertyDetails = data.propertyDetails;
        this.landlordDetails = data.propertyDetails.landlordDetails;
    }
    AppointmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.handleGetUserData().subscribe(function (userData) {
            _this.userDetails = userData;
        });
    };
    AppointmentComponent.prototype.handleAppointmentDate = function (selectedDate) {
        this.appointmentSchedule = selectedDate.value
            .toString()
            .split(' ')
            .slice(0, 4);
    };
    AppointmentComponent.prototype.handleAppointmentTime = function (selectedTime) {
        this.activeTimeSlot = selectedTime;
        this.appointmentSchedule[4] = selectedTime;
    };
    AppointmentComponent.prototype.handleSubmitAppointment = function () {
        var _this = this;
        setTimeout(function () {
            var appointment = {
                time: _this.appointmentSchedule,
                propertyDetails: _this.propertyDetails.id,
                userDetails: _this.userDetails.id,
                landlordDetails: _this.landlordDetails.id
            };
            _this.propertyService
                .handleAddAppointment(appointment)
                .subscribe(function () {
                // console.log(response);
                // console.log('is reponse after submitting appointment');
            });
            setTimeout(function () {
                _this.router.navigate(['']);
            }, 2000);
            _this.dialogRef.close();
        });
    };
    AppointmentComponent.prototype.showAndHideToast = function () {
        var _this = this;
        console.log("showing toast");
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000);
    };
    __decorate([
        core_1.HostBinding('@routeAnimationTrigger')
    ], AppointmentComponent.prototype, "routeAnimation");
    AppointmentComponent = __decorate([
        core_1.Component({
            selector: 'app-appointment',
            templateUrl: './appointment.component.html',
            styleUrls: ['./appointment.component.scss'],
            animations: [slideIn_1.routeAnimationState]
        }),
        __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AppointmentComponent);
    return AppointmentComponent;
}());
exports.AppointmentComponent = AppointmentComponent;
