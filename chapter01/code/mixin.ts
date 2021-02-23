type Constructor1<T ={}> = new(...args: any[]) => T;

function RecordStatus1<T extends Constructor1>(base : T) {
    return class extends base {
        private deleted : boolean = false;

        get Deleted() : boolean {
            return this.deleted;
        }
        Delete() : void {
            this.deleted = true;
            console.log(`The record has been marked as deleted.`);
        }
    }
}

function Timestamp1<T extends Constructor1>(base : T) {
    return class extends base {
        Updated : Date = new Date();
    }
}

class Person1 {
    constructor(firstName : string, lastName : string) {
        this.FirstName = firstName;
        this.LastName = lastName;
    }

    FirstName : string;
    LastName : string;
}

const ActivePerson1 = RecordStatus1(Timestamp1(Person1));

let activePerson1 = new ActivePerson1("Peter", "O'Hanlon");
activePerson1.Updated = new Date();
activePerson1.Delete();


console.log(`${activePerson1.Deleted}`);