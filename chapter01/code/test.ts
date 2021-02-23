// 华氏度转换成摄氏度

interface ICover{
    Covert(temperature:number):number;
}
class FahrenheitToCelsius {
    Covert(temperature:number):number{
        return (temperature-32)*5/9
    }
}

//摄氏度转换成华氏度
class CelsiusToFahrenheit {
    Covert(temperature:number):number{
        return (temperature*9/5)+32
    }
}

// 温度枚举类型
// enum Temperature {
//     Fahrenheit,
//     Celsius
// }
// 联合类型
// 通过类别名简化类型生命
type Temperature = FahrenheitToCelsius|CelsiusToFahrenheit
function covert(item:Temperature,temperature:number){
   console.log(item.Covert(temperature))
}

covert(new FahrenheitToCelsius,32)
covert(new CelsiusToFahrenheit,0)



function Log(target:any, propertyKey:string|symbol,descriptor:PropertyDescriptor) {
    
    let originalMethod = descriptor.value;
    descriptor.value = function(){
        // ...
        originalMethod.apply(this, arguments)
        console.log('添加的命令：',arguments[0]);
    }
    return descriptor
}
class Command{
    public constructor(public Name:string="",public Action:Function= new Function()){}
}

class Commonds{
    private readonly actions:Map<string,Command>;
    constructor(){
        this.actions = new Map<string,Command>()
    }

    @LogCommonds
    public Add(command:Command):void{
        
        this.actions.set(command.Name, command)
    }

    public Get(Name:string){
        this.actions.get(Name)
    }
    public getAllCommonds(){
        this.actions.forEach((value,key,map)=>{
            console.log(`${key}`);
        })
    }
}
const actions = new Commonds()
const command = new Command('action',
function(){console.log();
})
actions.Add(command)