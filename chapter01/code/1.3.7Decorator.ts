/**
 * 装饰器 AOP
 */
interface IDecoratorExample{
    AnyoneCanRun(args:string):void;
    AdminOnly(args: string):void;
}

class NoRoleCheck implements IDecoratorExample{
    AnyoneCanRun(args:string):void{
        if(!IsInRole('user')) {
        console.log(`${currentUser.user} is not in the user role`);
        return ;
        }
        console.log(args);
    }
    @Admin
    AdminOnly(args:string):void{
        console.log(args);
    }
}


let currentUser = {
    user:'peter',
    roles:[
        {
            role:'user'
        },
        {
            role:'admin1'
        }
    ]
}

/**
 * 检查当前用户是否属于特点角色
 * @param role 
 */
function IsInRole (role:string):boolean{
    return currentUser.roles.some(r=>r.role === role)
}

/**
 * 
 * @param target 装饰器应用到的元素
 * @param propertyKey 元素名称
 * @param descriptor 要应用装饰器的方法的描述符
 */
function Admin(target:any, propertyKey:string|symbol,descriptor:PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function(){
        if(IsInRole('admin')){
            originalMethod.apply(this, arguments)
            return;
        }
        console.log(`${currentUser.user} is not in the admin role`);
    }
    return descriptor
}

/**
 * 角色装饰器
 * @param role 
 */
function Role(role:string){
    return function(target:any,propertyKey:string|symbol,descriptor:PropertyDescriptor) {
        let originalMethod = descriptor.value
        descriptor.value = function(){
            if(IsInRole(role)) {
                originalMethod.apply(this, arguments)
                return;
            }
            return descriptor
        }
    }
}

function ClassRole(role:string) {
    return function (constructor:Function) {
        if(!IsInRole(role)){
            throw new Error(`The user is not authorized to access this class`)
        }
    }
}


function TestDecoratorExample(decoratorMethod:IDecoratorExample) {
    console.log(`Current user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun(`Running as user`)
    decoratorMethod.AdminOnly('Running as admin')
}

// TestDecoratorExample(new NoRoleCheck())

/**
 * 不能对一个独立的函数使用装饰器
 */
class DecoratedExampleMethodDecoration implements IDecoratorExample{
    @Role('user')
    AnyoneCanRun(args:string):void{
        console.log(args,'DecoratedExampleMethodDecoration');
        
    }
    @Role('admin')
    AdminOnly(args:string):void{
        console.log(args,'DecoratedExampleMethodDecoration')
    }
}

TestDecoratorExample(new DecoratedExampleMethodDecoration())

@ClassRole('admin')
class RestrictedClass{
 constructor() {
     console.log(`Inside the constructor`);
 }

 Validate() {
     console.log('Validating');
 }
}