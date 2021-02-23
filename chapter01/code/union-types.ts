import {StringOrNumber} from './type-aliases'
/**
 * 联合类型
 */
class RangeValidationBase{
    constructor(private start:number, private end: number){}
    protected RangeCheck(value:number):boolean{
        return value >=this.start && value <=this.end
    }
    protected GetNumber(value:string) : number{
        return new Number(value).valueOf()
    }
}

// 对 string number 费别检查
class SeparateTypeRangeValidation extends RangeValidationBase{
    IsInRangeString(value:string):boolean{
        return this.RangeCheck(this.GetNumber(value))
    }
    IsInRangeNumber(value:number):boolean{
        return this.RangeCheck(value)
    }
}

// 不限制传入值
class AnyRangeValidation extends RangeValidationBase {
    IsInRange(value:any):boolean{
        if(typeof value==='number') {
            return this.RangeCheck(value)
        } else if(typeof value ==='string') {
            return this.RangeCheck(this.GetNumber(value))
        }
        return false
    }
}

// 联合类型还可以用来处理更多情况。TypeScript中有两种特殊类型：null和undefined。
// 除非在编译代码时使用了-strictNullChecks选项，或者在tsconfig.json文件中设置了strictNullChecks = true，否则可以将这两种类型赋值给任何类型
// type | type 联合类型
class UnionRangeValidation extends RangeValidationBase{
    IsInRange(value:StringOrNumber):boolean{
        if(typeof value === 'number'){
            return this.RangeCheck(value)
        }
        return this.RangeCheck(this.GetNumber(value))
    }
}

let anyValidation = new AnyRangeValidation(10,20);
let validation = function(input : any) : void {
    if (anyValidation.IsInRange(input)) {
        console.log(`${input} is in the range 10 to 20`);
    } else {
        console.log(`${input} is not in the range 10 to 20`)
    }
}
console.log(`Starting AnyRangeValidation validation`);
validation("15.0123");
validation("20");
validation("22.974");
validation(18);
validation(true);
validation("Peter");
console.log(`Finished AnyRangeValidation validation`);

let unionValidation = new UnionRangeValidation(10,20);
let validation2 = function(input : string | number) {
    if (unionValidation.IsInRange(input)) {
        console.log(`${input} is in the range 10 to 20`);
    } else {
        console.log(`${input} is not in the range 10 to 20`)
    }
}
console.log(`Starting UnionRangeValidation validation`);
validation2("15.0123");
validation2("20");
validation2("22.974");
validation2(18);
// validation2(true); This won't compile
validation2("Peter");
console.log(`Finished UnionRangeValidation validation`);