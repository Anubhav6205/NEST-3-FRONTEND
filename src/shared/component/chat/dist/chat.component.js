"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ChatComponent = void 0;
var core_1 = require("@angular/core");
var slideIn_1 = require("src/shared/animation/slideIn");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(chatService, fb, router, location, themeService) {
        this.chatService = chatService;
        this.fb = fb;
        this.router = router;
        this.location = location;
        this.themeService = themeService;
        this.routeAnimation = true;
        this.senderId = '';
        this.recieverId = '';
        this.recieverName = '';
        this.recieverImage = '';
        this.chats = {};
        this.showSearch = false;
        this.searchFromSubscribe = {};
        this.filteredChats = [];
        this.pictureUrl = '';
        this.isChat = true;
        this.chatForm = this.fb.group({
            currentChat: ['']
        });
        this.searchForm = this.fb.group({
            search: ['']
        });
        this.recieverName = history.state.data[2];
        console.log(this.recieverName);
        console.log('is rcvr name');
        this.recieverImage = history.state.data[3];
        console.log(this.recieverImage);
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.senderId = history.state.data[1];
        this.recieverId = history.state.data[0];
        // console.log(this.senderId + ' is sender');
        // console.log(this.recieverId + 'is reciever');
        this.chats = {
            personAId: this.senderId,
            personBId: this.recieverId
        };
        this.chatService.handleGetChats(this.chats).subscribe(function (response) {
            console.log(response.chat);
            _this.chats = response.chat;
            if (_this.chats && _this.chats.messageDetail) {
                _this.filteredChats = _this.chats.messageDetail;
            }
        });
        this.searchFromSubscribe = this.searchForm.valueChanges.subscribe(function (value) {
            var _a;
            _this.filteredChats =
                ((_a = _this.chats.messageDetail) === null || _a === void 0 ? void 0 : _a.filter(function (message) { var _a; return (_a = message.message) === null || _a === void 0 ? void 0 : _a.toLowerCase().toString().startsWith(value.search.toLowerCase()); })) || [];
            _this.chats.messageDetail = _this.filteredChats;
        });
    };
    ChatComponent.prototype.handleImageToBase64 = function (event) {
        return new Promise(function (resolve, reject) {
            var image = event;
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(image);
        });
    };
    ChatComponent.prototype.handleAddPictures = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var files, base64stringsArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('files');
                        files = event.target.files;
                        base64stringsArray = [];
                        // Use Promise.all to wait for all promises to resolve
                        return [4 /*yield*/, Promise.all(Array.from(files).map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var base64string;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.handleImageToBase64(file)];
                                        case 1:
                                            base64string = _a.sent();
                                            base64stringsArray.push(base64string);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        // Use Promise.all to wait for all promises to resolve
                        _a.sent();
                        // Now you can proceed with the array of Base64 strings
                        this.pictureUrl = base64stringsArray[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatComponent.prototype.handleShowSearch = function () {
        this.showSearch = !this.showSearch;
    };
    ChatComponent.prototype.handleSendChat = function () {
        var _this = this;
        this.senderId = history.state.data[1];
        this.recieverId = history.state.data[0];
        var imageOrChat = '';
        if (this.chatForm.value.currentChat === '') {
            imageOrChat = this.pictureUrl;
            this.isChat = false;
        }
        else {
            imageOrChat = this.chatForm.value.currentChat;
            this.isChat = true;
        }
        var currentMessage = {
            senderId: history.state.data[1],
            message: imageOrChat,
            isChat: this.isChat
        };
        this.chatForm.setValue({
            currentChat: ''
        });
        this.pictureUrl = '';
        console.log(currentMessage);
        console.log('is msg dtl');
        var currentMessageArray = [currentMessage];
        this.chats = {
            personAId: this.senderId,
            personBId: this.recieverId,
            messageDetail: currentMessageArray
        };
        this.chatService.handleAddChat(this.chats).subscribe(function (response) {
            _this.chats = response.chat;
            console.log(_this.chats);
            _this.filteredChats = _this.chats.messageDetail;
            console.log('are updted');
        });
    };
    ChatComponent.prototype.handleNavigateBack = function () {
        // this.router.navigateBack();
        this.location.back();
    };
    __decorate([
        core_1.HostBinding('@routeAnimationTrigger')
    ], ChatComponent.prototype, "routeAnimation");
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.scss'],
            animations: [slideIn_1.routeAnimationState]
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;