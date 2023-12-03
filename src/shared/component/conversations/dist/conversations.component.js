"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConversationsComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var slideIn_1 = require("src/shared/animation/slideIn");
var ConversationsComponent = /** @class */ (function () {
    function ConversationsComponent(chatService, userService, dialog, router, themeService, location) {
        this.chatService = chatService;
        this.userService = userService;
        this.dialog = dialog;
        this.router = router;
        this.themeService = themeService;
        this.location = location;
        this.routeAnimation = true;
        this.userConversations = [];
        this.userData = {};
        this.showToast = false;
        this.toastMessage = '';
        this.headerMessage = '';
        this.conversationDetails = [];
    }
    ConversationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.handleGetUserData().subscribe(function (response) {
            _this.userData = response;
            _this.chatService.handleGetConversations(_this.userData.id).subscribe(function (response) {
                _this.userConversations = response.conversations;
                var userIds = _this.userConversations.reduce(function (ids, convo) {
                    if (convo.personAId && !ids.includes(convo.personAId)) {
                        ids.push(convo.personAId);
                    }
                    if (convo.personBId && !ids.includes(convo.personBId)) {
                        ids.push(convo.personBId);
                    }
                    return ids;
                }, []);
                if (userIds.length > 0) {
                    var fetchUserObservables = userIds.map(function (userId) {
                        return _this.userService.handleGetUserById(userId);
                    });
                    rxjs_1.forkJoin(fetchUserObservables).subscribe(function (otherPersons) {
                        // Map conversations and otherPersons
                        _this.conversationDetails = _this.userConversations.map(function (conversation, index) {
                            var otherPerson = otherPersons[index];
                            return { conversation: conversation, otherPerson: otherPerson };
                        });
                    });
                }
            });
        });
    };
    ConversationsComponent.prototype.showAndHideToast = function () {
        var _this = this;
        this.showToast = true;
        setTimeout(function () {
            _this.showToast = false;
        }, 5000);
    };
    ConversationsComponent.prototype.openDialog = function (action) {
        console.log('dialog triggered in navbar');
        console.log(action);
    };
    ConversationsComponent.prototype.handleNavigateBack = function () {
        // this.router.navigateBack();
        this.location.back();
    };
    ConversationsComponent.prototype.generateRandomTime = function () {
        var hours = Math.floor(Math.random() * 12) + 1;
        var minutes = Math.floor(Math.random() * 60);
        var amPm = Math.random() < 0.5 ? 'AM' : 'PM';
        // Format the time
        var formattedHours = hours < 10 ? "0" + hours : "" + hours;
        var formattedMinutes = minutes < 10 ? "0" + minutes : "" + minutes;
        return formattedHours + ":" + formattedMinutes + " " + amPm;
    };
    ConversationsComponent.prototype.handleChat = function (detail) {
        var _this = this;
        console.log(detail);
        console.log("is detail");
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
            //   personBId: detail.otherPerson.userData.id
            // };
            var recieverName = detail.otherPerson.userData.firstName +
                ' ' +
                detail.otherPerson.userData.lastName;
            var recieverImage = detail.otherPerson.userData.profilePicture;
            console.log(this.userService.handleGetUserData());
            this.router.navigate(['chat'], {
                state: {
                    data: [
                        detail.otherPerson.userData.id,
                        this.userData.id,
                        recieverName,
                        recieverImage,
                    ]
                }
            });
        }
    };
    __decorate([
        core_1.HostBinding('@routeAnimationTrigger')
    ], ConversationsComponent.prototype, "routeAnimation");
    ConversationsComponent = __decorate([
        core_1.Component({
            selector: 'app-conversations',
            templateUrl: './conversations.component.html',
            styleUrls: ['./conversations.component.scss'],
            animations: [
                slideIn_1.routeAnimationState
            ]
        })
    ], ConversationsComponent);
    return ConversationsComponent;
}());
exports.ConversationsComponent = ConversationsComponent;
