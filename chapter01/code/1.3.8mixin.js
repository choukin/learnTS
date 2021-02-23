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
var ActiveRecord = /** @class */ (function () {
    function ActiveRecord() {
        this.Deleted = false;
    }
    return ActiveRecord;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(firstName, lastName) {
        var _this = _super.call(this) || this;
        _this.FirstName = firstName;
        _this.LastName = lastName;
        return _this;
    }
    return Person;
}(ActiveRecord));
// 
function RecordStatus(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.deleted = true;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "Deleted", {
            get: function () {
                console.log("get");
                return this.deleted;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.Delete = function (flag) {
            this.deleted = flag || true;
            console.log("setthe record has been marked as deleted.");
        };
        return class_1;
    }(base));
}
// 那个混入放到前面不重要
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
var ActivePerson = RecordStatus(Timestamp(Person));
var activePerson = new ActivePerson('Peter', 'O`Hanlon');
activePerson.Delete(true);
