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
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, AuthService, router) {
        this.formBuilder = formBuilder;
        this.AuthService = AuthService;
        this.router = router;
        this.isSignup = false;
        this.errorMessage = '';
        this.signupSuccess = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        this.signupForm = this.formBuilder.group({
            author: ['', forms_1.Validators.required],
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.onAuthenticate = function () {
        if (this.isSignup && this.signupForm.valid) {
            var _a = this.signupForm.value, author = _a.author, username = _a.username, password = _a.password;
            this.onSignup(author, username, password);
        }
        else if (!this.isSignup && this.loginForm.valid) {
            var _b = this.loginForm.value, username = _b.username, password = _b.password;
            var isLoginSuccessful = this.AuthService.login(username, password);
            if (isLoginSuccessful) {
                this.router.navigate(['/write-blog']);
            }
            else {
                this.errorMessage = 'Invalid username or password';
            }
        }
    };
    LoginComponent.prototype.onSignup = function (author, username, password) {
        var _this = this;
        if (this.AuthService.isUsernameAvailable(username)) {
            localStorage.setItem('signupUsername', username);
            localStorage.setItem('signupPassword', password);
            localStorage.setItem('signupAuthorName', author);
            this.signupForm.reset();
            this.signupSuccess = true;
            setTimeout(function () {
                _this.signupSuccess = false;
                _this.router.navigate(['/login']);
            }, 3000);
        }
        else {
            this.errorMessage = 'Username is already taken. Please choose a different username.';
        }
    };
    LoginComponent.prototype.toggleSignup = function () {
        this.isSignup = !this.isSignup;
        this.errorMessage = '';
        this.loginForm.reset();
        this.signupForm.reset();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
