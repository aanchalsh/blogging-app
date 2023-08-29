"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var auth_guard_1 = require("./auth.guard");
describe('authGuard', function () {
    var executeGuard = function () {
        var guardParameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            guardParameters[_i] = arguments[_i];
        }
        return testing_1.TestBed.runInInjectionContext(function () { return auth_guard_1.authGuard.apply(void 0, guardParameters); });
    };
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
    });
    it('should be created', function () {
        expect(executeGuard).toBeTruthy();
    });
});
