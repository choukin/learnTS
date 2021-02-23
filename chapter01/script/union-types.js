"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 联合类型
 */
var RangeValidationBase = /** @class */ (function () {
    function RangeValidationBase(start, end) {
        this.start = start;
        this.end = end;
    }
    RangeValidationBase.prototype.RangeCheck = function (value) {
        return value >= this.start && value <= this.end;
    };
    RangeValidationBase.prototype.GetNumber = function (value) {
        return new Number(value).valueOf();
    };
    return RangeValidationBase;
}());
// 对 string number 费别检查
var SeparateTypeRangeValidation = /** @class */ (function (_super) {
    __extends(SeparateTypeRangeValidation, _super);
    function SeparateTypeRangeValidation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeparateTypeRangeValidation.prototype.IsInRangeString = function (value) {
        return this.RangeCheck(this.GetNumber(value));
    };
    SeparateTypeRangeValidation.prototype.IsInRangeNumber = function (value) {
        return this.RangeCheck(value);
    };
    return SeparateTypeRangeValidation;
}(RangeValidationBase));
// 不限制传入值
var AnyRangeValidation = /** @class */ (function (_super) {
    __extends(AnyRangeValidation, _super);
    function AnyRangeValidation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnyRangeValidation.prototype.IsInRange = function (value) {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        else if (typeof value === 'string') {
            return this.RangeCheck(this.GetNumber(value));
        }
        return false;
    };
    return AnyRangeValidation;
}(RangeValidationBase));
// 联合类型还可以用来处理更多情况。TypeScript中有两种特殊类型：null和undefined。
// 除非在编译代码时使用了-strictNullChecks选项，或者在tsconfig.json文件中设置了strictNullChecks = true，否则可以将这两种类型赋值给任何类型
// type | type 联合类型
var UnionRangeValidation = /** @class */ (function (_super) {
    __extends(UnionRangeValidation, _super);
    function UnionRangeValidation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnionRangeValidation.prototype.IsInRange = function (value) {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    };
    return UnionRangeValidation;
}(RangeValidationBase));
var anyValidation = new AnyRangeValidation(10, 20);
var validation = function (input) {
    if (anyValidation.IsInRange(input)) {
        console.log(input + " is in the range 10 to 20");
    }
    else {
        console.log(input + " is not in the range 10 to 20");
    }
};
console.log("Starting AnyRangeValidation validation");
validation("15.0123");
validation("20");
validation("22.974");
validation(18);
validation(true);
validation("Peter");
console.log("Finished AnyRangeValidation validation");
var unionValidation = new UnionRangeValidation(10, 20);
var validation2 = function (input) {
    if (unionValidation.IsInRange(input)) {
        console.log(input + " is in the range 10 to 20");
    }
    else {
        console.log(input + " is not in the range 10 to 20");
    }
};
console.log("Starting UnionRangeValidation validation");
validation2("15.0123");
validation2("20");
validation2("22.974");
validation2(18);
// validation2(true); This won't compile
validation2("Peter");
console.log("Finished UnionRangeValidation validation");
//# sourceMappingURL=union-types.js.map