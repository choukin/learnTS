"use strict";
// 华氏度转换成摄氏度
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FahrenheitToCelsius = /** @class */ (function () {
    function FahrenheitToCelsius() {
    }
    FahrenheitToCelsius.prototype.Covert = function (temperature) {
        return (temperature - 32) * 5 / 9;
    };
    return FahrenheitToCelsius;
}());
//摄氏度转换成华氏度
var CelsiusToFahrenheit = /** @class */ (function () {
    function CelsiusToFahrenheit() {
    }
    CelsiusToFahrenheit.prototype.Covert = function (temperature) {
        return (temperature * 9 / 5) + 32;
    };
    return CelsiusToFahrenheit;
}());
function covert(item, temperature) {
    console.log(item.Covert(temperature));
}
covert(new FahrenheitToCelsius, 32);
covert(new CelsiusToFahrenheit, 0);
function LogCommonds(target, propertyKey, descriptor) {
    console.log('123212312321');
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        // ...
        originalMethod.apply(this, arguments);
        console.log('添加的命令：', arguments[0]);
    };
    return descriptor;
}
var Command = /** @class */ (function () {
    function Command(Name, Action) {
        if (Name === void 0) { Name = ""; }
        if (Action === void 0) { Action = new Function(); }
        this.Name = Name;
        this.Action = Action;
    }
    return Command;
}());
var Commonds = /** @class */ (function () {
    function Commonds() {
        this.actions = new Map();
    }
    Commonds.prototype.Add = function (command) {
        console.log('12312313333');
        this.actions.set(command.Name, command);
    };
    Commonds.prototype.Get = function (Name) {
        this.actions.get(Name);
    };
    Commonds.prototype.getAllCommonds = function () {
        this.actions.forEach(function (value, key, map) {
            console.log("" + key);
        });
    };
    __decorate([
        LogCommonds
    ], Commonds.prototype, "Add", null);
    return Commonds;
}());
var actions = new Commonds();
var command = new Command('action', function () {
    console.log();
});
actions.Add(command);
//# sourceMappingURL=test.js.map