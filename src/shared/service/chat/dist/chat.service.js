"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatService = void 0;
var core_1 = require("@angular/core");
var ChatService = /** @class */ (function () {
    function ChatService(http) {
        this.http = http;
        this.baseUrl = 'https://nest-2-backend-production.up.railway.app/chat';
    }
    ChatService.prototype.handleGetChats = function (chats) {
        return this.http.post(this.baseUrl + "/get", chats);
    };
    ChatService.prototype.handleAddChat = function (chats) {
        return this.http.post(this.baseUrl + "/add", chats);
    };
    ChatService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
