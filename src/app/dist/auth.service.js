"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.isLoggedIn = false;
        this.currentUser = null;
    }
    AuthService.prototype.getLoggedInUser = function () {
        var username = localStorage.getItem('loggedInUsername');
        if (username) {
            var userJson = localStorage.getItem("user_" + username);
            if (userJson) {
                var user = JSON.parse(userJson);
                return { username: username, author: user.author };
            }
        }
        return null;
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.isLoggedIn;
    };
    AuthService.prototype.isUsernameAvailable = function (username) {
        var existingUsernames = this.getAllUsernames();
        return !existingUsernames.includes(username);
    };
    AuthService.prototype.getAllUsernames = function () {
        var storedUsernames = Object.keys(localStorage).filter(function (key) { return key.startsWith('user_'); });
        return storedUsernames.map(function (key) { return key.replace('user_', ''); });
    };
    AuthService.prototype.login = function (username, password) {
        var storedUserJson = localStorage.getItem("user_" + username);
        if (storedUserJson) {
            var storedUser = JSON.parse(storedUserJson);
            if (password === storedUser.password) {
                this.isLoggedIn = true;
                this.currentUser = { username: username, author: storedUser.author };
                localStorage.setItem('loggedInUsername', username);
                localStorage.setItem('loggedInAuthorName', storedUser.author);
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.getUserBlogs = function (username) {
        // Assuming your blog data is stored in localStorage
        var userBlogs = Object.keys(localStorage)
            .filter(function (key) { return key.startsWith("user_" + username + "_blog_"); })
            .map(function (key) {
            var item = localStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            }
            return null;
        })
            .filter(function (blog) { return blog !== null; }); // Remove any null entries
        return userBlogs;
    };
    AuthService.prototype.logout = function () {
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('loggedInUsername');
        localStorage.removeItem('loggedInAuthorName');
    };
    AuthService.prototype.signup = function (username, password, author) {
        if (this.isUsernameAvailable(username)) {
            var userData = {
                password: password,
                author: author
            };
            localStorage.setItem("user_" + username, JSON.stringify(userData));
            this.isLoggedIn = true;
            return true;
        }
        return false;
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
