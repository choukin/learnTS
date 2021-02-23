var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NoRoleCheck = /** @class */ (function () {
    function NoRoleCheck() {
    }
    NoRoleCheck.prototype.AnyoneCanRun = function (args) {
        if (!IsInRole('user')) {
            console.log(currentUser.user + " is not in the user role");
            return;
        }
        console.log(args);
    };
    NoRoleCheck.prototype.AdminOnly = function (args) {
        console.log(args);
    };
    __decorate([
        Admin
    ], NoRoleCheck.prototype, "AdminOnly", null);
    return NoRoleCheck;
}());
var currentUser = {
    user: 'peter',
    roles: [
        {
            role: 'user'
        },
        {
            role: 'admin1'
        }
    ]
};
/**
 * 检查当前用户是否属于特点角色
 * @param role
 */
function IsInRole(role) {
    return currentUser.roles.some(function (r) { return r.role === role; });
}
/**
 *
 * @param target 装饰器应用到的元素
 * @param propertyKey 元素名称
 * @param descriptor 要应用装饰器的方法的描述符
 */
function Admin(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        if (IsInRole('admin')) {
            originalMethod.apply(this, arguments);
            return;
        }
        console.log(currentUser.user + " is not in the admin role");
    };
    return descriptor;
}
/**
 * 角色装饰器
 * @param role
 */
function Role(role) {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            if (IsInRole(role)) {
                originalMethod.apply(this, arguments);
                return;
            }
            return descriptor;
        };
    };
}
function ClassRole(role) {
    return function (constructor) {
        if (!IsInRole(role)) {
            throw new Error("The user is not authorized to access this class");
        }
    };
}
function TestDecoratorExample(decoratorMethod) {
    console.log("Current user " + currentUser.user);
    decoratorMethod.AnyoneCanRun("Running as user");
    decoratorMethod.AdminOnly('Running as admin');
}
// TestDecoratorExample(new NoRoleCheck())
/**
 * 不能对一个独立的函数使用装饰器
 */
var DecoratedExampleMethodDecoration = /** @class */ (function () {
    function DecoratedExampleMethodDecoration() {
    }
    DecoratedExampleMethodDecoration.prototype.AnyoneCanRun = function (args) {
        console.log(args, 'DecoratedExampleMethodDecoration');
    };
    DecoratedExampleMethodDecoration.prototype.AdminOnly = function (args) {
        console.log(args, 'DecoratedExampleMethodDecoration');
    };
    __decorate([
        Role('user')
    ], DecoratedExampleMethodDecoration.prototype, "AnyoneCanRun", null);
    __decorate([
        Role('admin')
    ], DecoratedExampleMethodDecoration.prototype, "AdminOnly", null);
    return DecoratedExampleMethodDecoration;
}());
TestDecoratorExample(new DecoratedExampleMethodDecoration());
var RestrictedClass = /** @class */ (function () {
    function RestrictedClass() {
        console.log("Inside the constructor");
    }
    RestrictedClass.prototype.Validate = function () {
        console.log('Validating');
    };
    RestrictedClass = __decorate([
        ClassRole('admin')
    ], RestrictedClass);
    return RestrictedClass;
}());
