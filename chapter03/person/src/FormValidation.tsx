import React from "react";
import { Col, Row } from "reactstrap/lib";
import { IPersonState, IValidationProps, StringOrNull } from "./types";

interface IValidator<T> {
    IsValid(input:T):boolean;
}

export interface IValidation {
  Validate(state:IPersonState,errors: string[]):void;
}

export class MinLengthValidator implements IValidator<StringOrNull>{
    private minLength:number;
    constructor(minLength:number){
        this.minLength = minLength
    }

    public IsValid(input:StringOrNull):boolean{
        if(!input){
            return false
        }
        return input.length >= this.minLength
    }
}

export class RegularExpressionValidator implements IValidator<StringOrNull> {
    private regex:RegExp;
    constructor(expression:string){
        this.regex = new RegExp(expression)
    }

    public IsValid(input:StringOrNull):boolean{
        if(!input){
            return false
        }
        return this.regex.test(input)
    }
}

// 验证地址
// ?: 非捕获组
// 捕获组是一个编号组，代表了匹配的编号
export class AddressValidation implements IValidation{
    private readonly minLengthValidator: MinLengthValidator = new MinLengthValidator(5)
    private readonly zipCodeValidator:RegularExpressionValidator = new RegularExpressionValidator('^[0-9]{5}(?:-[0-9]{4})?$')

    public  Validate (state:IPersonState, errors:string[]):void{
        if(!this.minLengthValidator.IsValid(state.Address1)) {
            errors.push("Address line 1 must be greater than 5 characters")
        }
        if(!this.minLengthValidator.IsValid(state.Town)) {
            errors.push("Town must be greater than 5 characters")
        }
        if(!this.minLengthValidator.IsValid(state.Country)){
            errors.push('County must be greater than 5 characters')
        }

        if(!this.zipCodeValidator.IsValid(state.Postcode)) {
            errors.push('The postal/zip code is invalid')
        }
    }
}

export class PersonValidation implements IValidation{
    private readonly firstNameValidator :MinLengthValidator = new MinLengthValidator(1)
    private readonly lastNameValidator: MinLengthValidator = new MinLengthValidator(2)

    public Validate(state:IPersonState,errors:string[]):void{
        if(!this.firstNameValidator.IsValid(state.FirstName)){
            errors.push('the first name is a minimum of 1 character')
        }
        if(!this.lastNameValidator.IsValid(state.LastName)) {
            errors.push('the last name is a minimum of 2 characters')
        }
    }
}

// 验证电话号码
export class PhoneValidation implements IValidation{
    private readonly regexValidator: RegularExpressionValidator = new RegularExpressionValidator(`^(?:\\((?:[0-9]{3})\\)|(?:[0-9]{3}))[-.]?(?:[0-9]{3})[-. ]?(?:[0-9]{4}$)`)
    private readonly minLengthValidator: MinLengthValidator = new MinLengthValidator(1)
    public Validate(state:IPersonState,errors:string[]):void{
        if(!this.minLengthValidator.IsValid(state.PhoneNumber)){
            errors.push('you must enter a phone number')
        } else if(!this.regexValidator.IsValid(state.PhoneNumber)) {
            errors.push('the phone number format is invalid')
        }
    }
}

export default class FormValidation extends React.Component<IValidationProps>{
    private failures: string[] = [];
    private validation:IValidation[];
    constructor(props:IValidationProps){
        super(props)
        this.validation = new Array<IValidation>();
        this.validation.push(new PersonValidation())
        this.validation.push(new AddressValidation())
        this.validation.push(new PhoneValidation())
    }

    private Validate(){
        this.failures = new Array<string>()
        this.validation.forEach(validation=>{
            validation.Validate(this.props.CurrentState, this.failures)
        })
        this.props.CanSave(this.failures.length ===0)
    }

    public render(){
        this.Validate()
        const errors = this.failures.map(function it(failure){
            return (<Row key={failure}><Col><label>{failure}</label></Col></Row>)
        })
        return (<Col>{errors}</Col>)
    }
}