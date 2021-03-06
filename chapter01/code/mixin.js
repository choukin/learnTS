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
function RecordStatus(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.deleted = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "Deleted", {
            get: function () {
                return this.deleted;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.Delete = function () {
            this.deleted = true;
            console.log("The record has been marked as deleted.");
        };
        return class_1;
    }(base));
}
function Timestamp(base) {
    return /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Updated = new Date();
            return _this;
        }
        return class_2;
    }(base));
}
var Person1 = /** @class */ (function () {
    function Person1(firstName, lastName) {
        this.FirstName = firstName;
        this.LastName = lastName;
    }
    return Person1;
}());
var ActivePerson1 = RecordStatus(Timestamp(Person1));
var activePerson1 = new ActivePerson1("Peter", "O'Hanlon");
activePerson1.Updated = new Date();
activePerson1.Delete();
console.log("" + activePerson1.Deleted);
