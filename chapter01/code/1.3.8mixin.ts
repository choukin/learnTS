// class ActiveRecord{
//     Deleted = false;
// }
 
// class Person extends ActiveRecord{
//     constructor(firstName:string,lastName:string) {
//         super()
//         this.FirstName = firstName
//         this.LastName = lastName
        
//     }

//     FirstName :string;
//     LastName :string;
// }

// // TypeScript 约定混入
// type Constructor<T = {}> = new (...args:any[])=>T

// // 
// function RecordStatus<T extends Constructor>(base:T) {
//     return class extends base{
//         private deleted:boolean = true

//         get Deleted():boolean{
//             console.log(`get`);
            
//             return this.deleted
//         }
//         set Deleted(flag:boolean){}
//          Delete(flag:boolean):void{
//             this.deleted = flag||true
//             console.log(`setthe record has been marked as deleted.`);
//         }
//     }
// }

// // 那个混入放到前面不重要
// function Timestamp<T extends Constructor>(base:T) {
//     return class extends base{
//         Updated:Date = new Date()
//     }
// }

// const ActivePerson = RecordStatus(Timestamp(Person))

// let activePerson = new ActivePerson('Peter','O`Hanlon')
// activePerson.Delete(true)

type Constructor<T ={}> = new(...args: any[]) => T;

function RecordStatus<T extends Constructor>(base : T) {
    return class extends base {
        private deleted : boolean = false;

        get Deleted() : boolean {

            console.log(123132);
            
            return this.deleted;
        }
        Delete() : void {
            this.deleted = true;
            console.log(`The record has been marked as deleted.`);
        }
    }
}

function Timestamp<T extends Constructor>(base : T) {
    return class extends base {
        Updated : Date = new Date();
    }
}

class Person {
    constructor(firstName : string, lastName : string) {
        this.FirstName = firstName;
        this.LastName = lastName;
    }

    FirstName : string;
    LastName : string;
}

const ActivePerson = RecordStatus(Timestamp(Person));

let activePerson = new ActivePerson("Peter", "O'Hanlon");
activePerson.Updated = new Date();
activePerson.Delete();


console.log(`${activePerson.Deleted}`);